'use strict';

import { Mandate } from '../types/Types';
import { Api } from '../api/Api';

interface MandateResponse extends Mandate {
  request: object;
  response: object;
}

interface MandateListResponse extends Mandate {
  request: object;
  response: object;
}

class MandateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandates',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: MandateResponse = await this.api.request(request);
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
  ): Promise<MandateListResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandates',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandates/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandates/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandates/:identity/actions/cancel',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async reinstate(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandates/:identity/actions/reinstate',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }
}
