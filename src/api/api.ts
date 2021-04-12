'use strict';

import os = require('os');
import process = require('process');
import _ = require('lodash');
import { v4 as uuidv4 } from 'uuid';
import * as url from 'url';
import got from 'got';
import qs from 'qs';

import { Environments, CLIENT_VERSION, API_VERSION } from '../constants';
import * as GoCardlessErrors from '../errors';

interface APIOptions {
  proxy?: object;
  raiseOnIdempotencyConflict?: boolean;
}

interface UrlParameter {
  key?: string;
  value?: string;
}

interface APIRequestParameters {
  path: string;
  method: string;
  urlParameters?: UrlParameter[];
  requestParameters?: object;
  payloadKey?: string;
  idempotencyKey?: string;
  fetch: Function | null;
  customHeaders?: object;
}

export class Api {
  private _token: string;
  private _environment: Environments;
  private _baseUrl: string;
  private _agent: object;
  private raiseOnIdempotencyConflict: boolean;

  private processVersion: string;
  private osRelease: string;
  private osPlatform;

  constructor(
    token: string,
    environment = Environments.Live,
    options: APIOptions
  ) {
    this._token = token;
    this._environment = environment;

    this._baseUrl = 'https://api.gocardless.com';
    if (this._environment === Environments.Sandbox) {
      this._baseUrl = 'https://api-sandbox.gocardless.com';
    }

    this._agent = undefined;
    if (options.proxy) {
      this._agent = options.proxy;
    }

    this.raiseOnIdempotencyConflict =
      options.raiseOnIdempotencyConflict || false;

    this.processVersion = process.version;
    this.osPlatform = os.platform();
    this.osRelease = os.release();
  }

  async request({
    path,
    method,
    urlParameters = [],
    requestParameters = {},
    payloadKey = '',
    idempotencyKey = '',
    customHeaders = {},
    fetch,
  }: APIRequestParameters) {
    urlParameters.forEach(urlParameter => {
      path = path.replace(`:${urlParameter.key}`, urlParameter.value);
    });

    // `got` adds a slash to the end of `prefix_url` so we don't want one at the
    // start of the path
    if (path[0] === '/') {
      path = path.slice(1);
    }

    const requestOptions = this.createRequestOptions(
      method,
      requestParameters,
      payloadKey,
      idempotencyKey,
      customHeaders
    );

    try {
      const response = await got(path, requestOptions);

      return {
        body: response.body,
        __response__: {
          headers: response.headers,
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          url: response.url,
        },
      };
    } catch (e) {
      if (e instanceof got.ParseError) {
        throw new GoCardlessErrors.MalformedResponseError(
          'Malformed JSON received from GoCardless API',
          e.response
        );
      }

      if (e instanceof got.HTTPError) {
        const err = GoCardlessErrors.ApiError.buildFromResponse(e.response);

        if (
          err instanceof GoCardlessErrors.IdempotentCreationConflictError &&
          !this.raiseOnIdempotencyConflict
        ) {
          return fetch(err.conflictingResourceId);
        }

        throw err;
      }

      throw e;
    }
  }

  private getHeaders(token, customHeaders = {}) {
    const mandatoryHeaders = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'GoCardless-Version': `${API_VERSION}`,
      'GoCardless-Client-Version': `${CLIENT_VERSION}`,
      'GoCardless-Client-Library': 'gocardless-nodejs',
      'User-Agent': `gocardless-nodejs/${CLIENT_VERSION} node/${this.processVersion} ${this.osPlatform}/${this.osRelease}`,
    };

    return { ...customHeaders, ...mandatoryHeaders };
  }

  private createRequestOptions(
    method = 'get',
    requestParameters = {},
    payloadKey = '',
    idempotencyKey = '',
    customHeaders = {}
  ) {
    const headers = this.getHeaders(this._token, customHeaders);
    const searchParams =
      method === 'get'
        ? new url.URLSearchParams(this.formatQueryParameters(requestParameters))
        : undefined;

    // We want to always send POST requests with an idempotency key. If the user does not
    // specify one, we'll generate one for them.
    if (method.toLowerCase() === 'post') {
      headers['Idempotency-Key'] = idempotencyKey
        ? idempotencyKey
        : this.generateIdempotencyKey();
    }

    const json = this.getRequestBody(method, requestParameters, payloadKey);
    return {
      agent: this._agent,
      prefixUrl: this._baseUrl,
      // tslint:disable-next-line:no-any
      method: method as any,
      responseType: 'json' as 'json',
      headers,
      searchParams,
      json,
    };
  }

  private getRequestBody(method: string, requestParameters, payloadKey) {
    if ((method === 'post' || method === 'put') && requestParameters) {
      if (payloadKey) {
        return {
          [payloadKey]: requestParameters,
        };
      } else {
        return {
          data: requestParameters,
        };
      }
    }

    return undefined;
  }

  private generateIdempotencyKey() {
    return uuidv4();
  }

  private formatQueryParameters(parameters) {
    return qs.stringify(parameters, {
      encode: false,
      indices: false,
      arrayFormat: 'comma',
    });
  }
}
