'use strict';

import { PayoutItem } from '../types/Types';
import { Api } from '../api/Api';

interface PayoutItemResponse extends PayoutItem {
  request: object;
  response: object;
}

interface PayoutItemListResponse extends PayoutItem {
  request: object;
  response: object;
}

class PayoutItemService {
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
  ): Promise<PayoutItemListResponse> {
    const urlParameters = [];
    const request = {
      path: '/payout_items',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: PayoutItemListResponse = await this.api.request(request);
    return response;
  }
}
