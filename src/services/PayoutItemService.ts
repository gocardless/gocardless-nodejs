'use strict';

import { Api } from '../api/Api';
import {
  PayoutItem,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
} from '../types/Types';

interface PayoutItemResponse extends PayoutItem {
  __metadata__: ResponseMetadata;
}

interface PayoutItemListResponse extends Array<PayoutItem> {
  __metadata__: ResponseMetadata;
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
    const request = {
      path: '/payout_items',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response: PayoutItemListResponse = await this.api.request(request);
    return response;
  }
}
