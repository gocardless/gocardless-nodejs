'use strict';

import { Payment } from '../types/Types';
import { Api } from '../api/Api';

interface PaymentResponse extends Payment {
  request: object;
  response: object;
}

interface PaymentListResponse extends Payment {
  request: object;
  response: object;
}

class PaymentService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<PaymentResponse> {
    const urlParameters = [];
    const request = {
      path: '/payments',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'payments',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: PaymentResponse = await this.api.request(request);
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
  ): Promise<PaymentListResponse> {
    const urlParameters = [];
    const request = {
      path: '/payments',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PaymentListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/payments/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PaymentResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/payments/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'payments',
      headers,
      fetch: null,
    };

    const response: PaymentResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/payments/:identity/actions/cancel',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PaymentResponse = await this.api.request(request);
    return response;
  }

  async retry(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/payments/:identity/actions/retry',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PaymentResponse = await this.api.request(request);
    return response;
  }
}
