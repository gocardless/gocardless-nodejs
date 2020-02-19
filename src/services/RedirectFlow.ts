'use strict';

import { RedirectFlow } from '../types/Types';
import { Api } from '../api/Api';

interface RedirectFlowResponse extends RedirectFlow {
  request: object;
  response: object;
}

interface RedirectFlowListResponse extends RedirectFlow {
  request: object;
  response: object;
}

class RedirectFlowService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [];
    const request = {
      path: '/redirect_flows',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'redirect_flows',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/redirect_flows/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }

  async complete(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/redirect_flows/:identity/actions/complete',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }
}
