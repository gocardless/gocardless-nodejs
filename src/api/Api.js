'use strict';

const os = require('os');
const process = require('process');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const { URLSearchParams } = require('url');
const got = require('got');

const Constants = require('../Constants');
const GoCardlessException = require('../GoCardlessException');

function Api(token, environment = Constants.Environments.LIVE, options = {}) {
  this._token = token;
  this._environment = environment;

  this._baseUrl = 'https://api.gocardless.com';

  if (this._environment === 'SANDBOX') {
    this._baseUrl = 'https://api-sandbox.gocardless.com';
  }

  this._agent = undefined;

  if (options.proxy) {
    this._agent = options.proxy;
  }

  this.raise_on_idempotency_conflict = options.raise_on_idempotency_conflict || false;
}

const processVersion = process.Version;
const osPlatform = os.platform();
const osRelease = os.release();

const getHeaders = (headers, token) => ({
  ...headers,
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
  'GoCardless-Version': '2015-07-06',
  'GoCardless-Client-Version': '0.1.0',
  'GoCardless-Client-Library': 'gocardless-nodejs',
  'User-Agent': `gocardless-nodejs/0.1.0 node/${processVersion} ${osPlatform}/${osRelease}`,
});

const getRequestBody = (method, requestParameters, payloadKey) => {
  if ((method === 'POST' || method === 'PUT') && requestParameters) {
    if (payloadKey) {
      return {
        [payloadKey]: requestParameters,
      };
    }
    else {
      return requestParameters;
    }
  }

  return undefined;
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
  headers = {},
  fetch,
}) {
  headers = getHeaders(headers, this._token);

  urlParameters.forEach(urlParameter => {
    path = path.replace(`:${urlParameter.key}`, urlParameter.value);
  });

  const searchParams = method === 'GET' ? new URLSearchParams(mapQueryParameters(requestParameters)) : undefined;

  if (method === 'POST' && !headers['Idempotency-Key']) {
    headers['Idempotency-Key'] = uuidv4();
  }

  const json = getRequestBody(method, requestParameters, payloadKey);

  const requestOptions = {
    agent: this._agent,
    prefixUrl: this._baseUrl,
    method,
    responseType: 'json',
    headers,
    searchParams,
    json,
  };

  const request = got(
    path,
    requestOptions,
  );

  try {
    const response = await request;

    return {
      ...response.body,
      request: requestOptions,
      response: {
        headers: response.headers,
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        url: response.url
      }
    };
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
