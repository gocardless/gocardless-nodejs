'use strict';

import { Customer } from '../types/Types';
import { Api } from '../api/Api';

interface CustomerResponse extends Customer {
  request: object;
  response: object;
}

interface CustomerListResponse extends Customer {
  request: object;
  response: object;
}

class CustomerService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [];
    const request = {
      path: '/customers',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'customers',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: CustomerResponse = await this.api.request(request);
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
  ): Promise<CustomerListResponse> {
    const urlParameters = [];
    const request = {
      path: '/customers',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customers/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customers/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'customers',
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }

  async remove(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customers/:identity',
      method: 'DELETE',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }
}
