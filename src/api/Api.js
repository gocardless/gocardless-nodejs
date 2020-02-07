'use strict';

const os = require('os');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const got = require('got');

const GoCardlessException = require('../GoCardlessException');

// TODO: Return the response
function Api(token, environment = Environments.LIVE, options = {}) {
  this._token = token;
  this._environment = environment;

  this._baseUrl = 'https://api.gocardless.com/';

  if (this._environment === 'SANDBOX') {
    this._baseUrl = 'https://api-sandbox.gocardless.com/';
  }

  this._agent = undefined;

  if (options.proxy) {
    this._agent = options.proxy;
  }

  this.raise_on_idempotency_conflict = options.raise_on_idempotency_conflict || false;
}

const mapQueryParameters = (obj) => {
  return _.keys(obj)
    .map(k => [k, obj[k]]);
}

const isIdempotencyConflict = (response) => {
 return response.statusCode === 409 &&
   response.body &&
   response.body.error &&
   response.body.error.errors &&
   response.body.error.errors[0] &&
   response.body.error.errors[0].reason === 'idempotent_creation_conflict';
}

Api.prototype.request = async function({
  path,
  method = 'GET',
  urlParameters = [],
  requestParameters = {},
  payloadKey = '',
  envelope = '',
  headers = {},
  fetch,
}) {
  headers['Accept'] = 'application/json';
  headers['Authorization'] = `Bearer ${this._token}`;
  headers['GoCardless-Version'] = '2015-07-06';
  headers['GoCardless-Client-Version'] = '0.1.0';
  headers['GoCardless-Client-Library'] = 'gocardless-nodejs';
  headers['User-Agent'] = `gocardless-nodejs/0.1.0 node/${process.version} ${os.platform()}/${os.release()}`;

  urlParameters.forEach(urlParameter => {
    path = path.replace(`:${urlParameter.key}`, urlParameter.value);
  });

  const searchParams = method === 'GET' ? new URLSearchParams(mapQueryParameters(requestParameters)) : undefined;

  if (method === 'POST' && !headers['Idempotency-Key']) {
    headers['Idempotency-Key'] = uuidv4();
  }

  let json = undefined;
  if ((method === 'POST' || method === 'PUT') && requestParameters) {
    if (payloadKey) {
      json = {
        [payloadKey]: requestParameters,
      };
    }
    else {
      json = requestParameters;
    }
  }

  const request = got(
    path,
    {
      agent: this._agent,
      prefixUrl: this._baseUrl,
      method,
      responseType: 'json',
      headers,
      searchParams,
      json,
    },
  );

  try {
    const response = await request;

    if (envelope) {
      return response.body[envelope];
    }

    return response.body;
  } catch (error) {
    const { response } = error;

    if (isIdempotencyConflict(response) && !this.raise_on_idempotency_conflict) {
      const resourceId = response.body.error.errors[0].links.conflicting_resource_id;
      return await fetch(resourceId, headers);
    }

    if (response) {
      throw new GoCardlessException(response);
    }

    throw error;
  }
}

module.exports = Api;
