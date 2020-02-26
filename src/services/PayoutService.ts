'use strict';

import { Api } from '../api/Api';
import {
  Payout,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CreatedAtFilter,
  PayoutPayoutType,
  PayoutStatus,
} from '../types/Types';

interface PayoutResponse extends Payout {
  __metadata__: ResponseMetadata;
}

interface PayoutListResponse extends Array<Payout> {
  __metadata__: ResponseMetadata;
}

interface PayoutListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Unique identifier, beginning with "CR".
  creditor?: string;

  // Unique identifier, beginning with "BA".
  creditor_bank_account?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.
  currency?: PayoutCurrency;

  // Number of records to return.
  limit?: string;

  // Whether a payout contains merchant revenue or partner fees.
  payout_type?: PayoutPayoutType;

  // Reference which appears on the creditor's bank statement.
  reference?: string;

  // One of:
  // <ul>
  // <li>`pending`: the payout has been created, but not yet sent to the
  // banks</li>
  // <li>`paid`: the payout has been sent to the banks</li>
  // <li>`bounced`: the payout bounced when sent, the payout can be retried.</li>
  // </ul>
  status?: PayoutStatus;
}

export class PayoutService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: PayoutListRequest,
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

  async find(identity: string, headers: object = {}): Promise<PayoutResponse> {
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
