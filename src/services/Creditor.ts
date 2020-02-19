'use strict';

import { Creditor } from '../types/Types';
import { Api } from '../api/Api';

interface CreditorResponse extends Creditor {
  request: object;
  response: object;
}

interface CreditorListResponse extends Creditor {
  request: object;
  response: object;
}

class CreditorService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<CreditorResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditors',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: CreditorResponse = await this.api.request(request);
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
  ): Promise<CreditorListResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditors',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CreditorListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/creditors/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CreditorResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/creditors/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      headers,
      fetch: null,
    };

    const response: CreditorResponse = await this.api.request(request);
    return response;
  }
}
