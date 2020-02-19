'use strict';

import { Refund } from '../types/Types';
import { Api } from '../api/Api';

interface RefundResponse extends Refund {
  request: object;
  response: object;
}

interface RefundListResponse extends Refund {
  request: object;
  response: object;
}

class RefundService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<RefundResponse> {
    const urlParameters = [];
    const request = {
      path: '/refunds',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'refunds',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: RefundResponse = await this.api.request(request);
    return response;
  }

  // TODO: Should this be an iterator return type?
  // Maybe AsyncIterableIterator<Payment>
  // Might need this in tsconfig to work properly:
  // {
  //  "lib": ["esnext.asynciterable"]
  // }
  // https://github.com/octokit/rest.js/issues/1189
  async list(
    requestParameters: object,
    headers: object = {}
  ): Promise<RefundListResponse> {
    const urlParameters = [];
    const request = {
      path: '/refunds',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RefundListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<RefundResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/refunds/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RefundResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<RefundResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/refunds/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'refunds',
      headers,
      fetch: null,
    };

    const response: RefundResponse = await this.api.request(request);
    return response;
  }
}
