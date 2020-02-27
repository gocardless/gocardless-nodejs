'use strict';

import { Api } from '../api/Api';
import {
  PayoutItem,
  APIResponse,
  JsonMap,
  ListMeta,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
} from '../types/Types';

interface PayoutItemResponse extends PayoutItem, APIResponse {}

interface PayoutItemListResponse extends APIResponse {
  payout_items: PayoutItem[];
  meta: ListMeta;
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
      payout_items: response.body['payout_items'],
      meta: response.body['meta'],
      __response__: response.__response__,
    };

    return response;
  }
}
