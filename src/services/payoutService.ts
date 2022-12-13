'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PayoutResponse extends Types.Payout, Types.APIResponse {}

interface PayoutListResponse extends Types.APIResponse {
  payouts: Types.Payout[];
  meta: Types.ListMeta;
}

interface PayoutListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this Payout.
  created_at?: Types.CreatedAtFilter;

  // Unique identifier, beginning with "CR".

  creditor?: string;

  // Unique identifier, beginning with "BA".

  creditor_bank_account?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency?: Types.PayoutCurrency;

  // Number of records to return.

  limit?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters. _Note:_ This should not be
  // used for storing PII data.

  metadata?: Types.JsonMap;

  // Whether a payout contains merchant revenue or partner fees.

  payout_type?: Types.PayoutPayoutType;

  // Reference which appears on the creditor's bank statement.

  reference?: string;

  // One of:
  // <ul>
  // <li>`pending`: the payout has been created, but not yet sent to your bank or
  // it is in the process of being exchanged through our FX provider.</li>
  // <li>`paid`: the payout has been sent to the your bank. FX payouts will become
  // `paid` after we emit the `fx_rate_confirmed` webhook.</li>
  // <li>`bounced`: the payout bounced when sent, the payout can be retried.</li>
  // </ul>

  status?: Types.PayoutStatus;
}

interface PayoutUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class PayoutService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: PayoutListRequest
  ): Promise<PayoutListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payouts',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayoutListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: PayoutListRequest
  ): AsyncGenerator<Types.Payout, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const payout of list.payouts) {
        yield payout;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<PayoutResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payouts/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayoutResponse = {
      ...response.body['payouts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: PayoutUpdateRequest
  ): Promise<PayoutResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payouts/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'payouts',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayoutResponse = {
      ...response.body['payouts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
