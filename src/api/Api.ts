'use strict';

import os = require('os');
import process = require('process');
import _ = require('lodash');
import uuidv4 = require('uuid/v4');
import * as url from 'url';
import got from 'got';

import Constants = require('../Constants');
import GoCardlessException = require('../GoCardlessException');


enum Environment {
    Live = "LIVE",
}

enum HTTPMethod {
    Post = "POST",
    Get = "GET",
    Put = "PUT",
}

type APIOptions = {
    proxy?: any
    raise_on_idempotency_conflict: boolean
}


class Api {
  private _token: string;
  private _environment: Environment;
  private _baseUrl: string;
  private _agent: any;
  private raise_on_idempotency_conflict: boolean;

  private processVersion: string;
  private osPlatform: any;
  private osRelease: any;

  constructor(token: string, environment = Environment.Live, options: APIOptions) {
    this._token = token;
    this._environment = environment;

    this._baseUrl = 'https://api.gocardless.com';
    if (this._environment === Constants.Environments.SANDBOX) {
      this._baseUrl = 'https://api-sandbox.gocardless.com';
    }

    this._agent = undefined;
    if (options.proxy) {
      this._agent = options.proxy;
    }

    this.raise_on_idempotency_conflict = options.raise_on_idempotency_conflict || false;

    this.processVersion = process.version;
    this.osPlatform = os.platform();
    this.osRelease = os.release();
  }

  public createRequestOptions(
      method = HTTPMethod.Get,
      requestParameters = {},
      payloadKey = '',
      headers = {},
    ) {
    headers = this.getHeaders(headers, this._token);

    const searchParams = method === HTTPMethod.Get ? new url.URLSearchParams(this.mapQueryParameters(requestParameters)) : undefined;

    if (method === 'POST' && !headers['Idempotency-Key']) {
      headers['Idempotency-Key'] = uuidv4();
    }

    const json = this.getRequestBody(method, requestParameters, payloadKey);
    return {
        agent: this._agent,
        prefixUrl: this._baseUrl,
        method,
        responseType: 'json' as 'json',
        headers,
        searchParams,
        json,
    };
  }

  public async request(
      path: string,
      method = HTTPMethod.Get,
      urlParameters = [],
      requestParameters = {},
      payloadKey = '',
      headers = {},
      fetch,
      ) {
    urlParameters.forEach(urlParameter => {
        path = path.replace(`:${urlParameter.key}`, urlParameter.value);
        });

    const requestOptions = this.createRequestOptions(
        method,
        requestParameters,
        payloadKey,
        headers,
    );
    const request = got(path, requestOptions);

    try {
      const response: any = await request;
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

      if (this.isIdempotencyConflict(response) && !this.raise_on_idempotency_conflict) {
        const resourceId = response.body.error.errors[0].links.conflicting_resource_id;
        return await fetch(resourceId, headers);
      }

      if (response) {
        throw new GoCardlessException(response);
      }

      throw error;
    }
  }

  private getHeaders(headers, token) {
    return {
      ...headers,
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'GoCardless-Version': '2015-07-06',
        'GoCardless-Client-Version': '0.1.0',
        'GoCardless-Client-Library': 'gocardless-nodejs',
        'User-Agent': `gocardless-nodejs/0.1.0 node/${this.processVersion} ${this.osPlatform}/${this.osRelease}`,
    }
  }

  private getRequestBody(method: HTTPMethod, requestParameters, payloadKey) {
    if ((method === HTTPMethod.Post || method === HTTPMethod.Put) && requestParameters) {
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

  private mapQueryParameters(obj) {
    return _.keys(obj)
      .map(k => [k, obj[k]]);
  }

  private isIdempotencyConflict(response) {
    return response.statusCode === 409 &&
      response.body &&
      response.body.error &&
      response.body.error.errors &&
      response.body.error.errors[0] &&
      response.body.error.errors[0].reason === 'idempotent_creation_conflict';
  }
}
