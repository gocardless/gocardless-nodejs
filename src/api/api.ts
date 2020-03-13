'use strict';

import os = require('os');
import process = require('process');
import _ = require('lodash');
import { v4 as uuidv4 } from 'uuid';
import * as url from 'url';
import got from 'got';
import qs from 'qs';

import { Environments } from '../constants';
import { GoCardlessException } from '../GoCardlessException';

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
    fetch,
  }: APIRequestParameters) {
    urlParameters.forEach(urlParameter => {
      path = path.replace(`:${urlParameter.key}`, urlParameter.value);
    });

    const requestOptions = this.createRequestOptions(
      method,
      requestParameters,
      payloadKey,
      idempotencyKey
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
    } catch (error) {
      const { response } = error;

      if (
        this.isIdempotencyConflict(response) &&
        !this.raiseOnIdempotencyConflict
      ) {
        const resourceId =
          response.body.error.errors[0].links.conflicting_resource_id;
        return fetch(resourceId);
      }

      if (response) {
        throw new GoCardlessException(response);
      }

      throw error;
    }
  }

  private getHeaders(token) {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'GoCardless-Version': '2015-07-06',
      'GoCardless-Client-Version': '1.0.2',
      'GoCardless-Client-Library': 'gocardless-nodejs',
      'User-Agent': `gocardless-nodejs/1.0.2 node/${this.processVersion} ${this.osPlatform}/${this.osRelease}`,
    };
  }

  private createRequestOptions(
    method = 'get',
    requestParameters = {},
    payloadKey = '',
    idempotencyKey = ''
  ) {
    const headers = this.getHeaders(this._token);
    const searchParams =
      method === 'get'
        ? new url.URLSearchParams(this.mapQueryParameters(requestParameters))
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

  private mapQueryParameters(parameters) {
    return qs.stringify(parameters, { encode: false });
  }

  private isIdempotencyConflict(response) {
    return (
      response.statusCode === 409 &&
      response.body &&
      response.body.error &&
      response.body.error.errors &&
      response.body.error.errors[0] &&
      response.body.error.errors[0].reason === 'idempotent_creation_conflict'
    );
  }
}
