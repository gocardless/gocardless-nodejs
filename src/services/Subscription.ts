'use strict';

import { Subscription } from '../types/Types';
import { Api } from '../api/Api';

interface SubscriptionResponse extends Subscription {
  request: object;
  response: object;
}

interface SubscriptionListResponse extends Subscription {
  request: object;
  response: object;
}

class SubscriptionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<SubscriptionResponse> {
    const urlParameters = [];
    const request = {
      path: '/subscriptions',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: SubscriptionResponse = await this.api.request(request);
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
  ): Promise<SubscriptionListResponse> {
    const urlParameters = [];
    const request = {
      path: '/subscriptions',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: SubscriptionListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/subscriptions/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/subscriptions/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      headers,
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/subscriptions/:identity/actions/cancel',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }
}
