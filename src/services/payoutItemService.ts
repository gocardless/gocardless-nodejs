'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PayoutItemResponse extends Types.PayoutItem, Types.APIResponse {}

interface PayoutItemListResponse extends Types.APIResponse {
  payout_items: Types.PayoutItem[];
  meta: Types.ListMeta;
}

interface PayoutItemListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  // Number of records to return.
  limit?: string;

  // Unique identifier, beginning with "PO".
  payout: string;
}

export class PayoutItemService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: PayoutItemListRequest
  ): Promise<PayoutItemListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payout_items',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayoutItemListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: PayoutItemListRequest
  ): AsyncGenerator<Types.PayoutItem, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const payoutitem of list.payout_items) {
        yield payoutitem;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
