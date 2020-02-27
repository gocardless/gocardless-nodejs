'use strict';

import { Api } from '../api/Api';
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

  //
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

  // Whether a payout contains merchant revenue or partner fees.
  payout_type?: Types.PayoutPayoutType;

  // Reference which appears on the creditor's bank statement.
  reference?: string;

  // One of:
  // <ul>
  // <li>`pending`: the payout has been created, but not yet sent to the
  // banks</li>
  // <li>`paid`: the payout has been sent to the banks</li>
  // <li>`bounced`: the payout bounced when sent, the payout can be retried.</li>
  // </ul>
  status?: Types.PayoutStatus;
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
}
