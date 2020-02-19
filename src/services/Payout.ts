'use strict';

import { Payout } from '../types/Types';
import { Api } from '../api/Api';

interface PayoutResponse extends Payout {
  request: object;
  response: object;
}

interface PayoutListResponse extends Payout {
  request: object;
  response: object;
}

class PayoutService {
  private api: Api;

  constructor(api) {
    this.api = api;
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
  ): Promise<PayoutListResponse> {
    const urlParameters = [];
    const request = {
      path: '/payouts',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PayoutListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<PayoutResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/payouts/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PayoutResponse = await this.api.request(request);
    return response;
  }
}
