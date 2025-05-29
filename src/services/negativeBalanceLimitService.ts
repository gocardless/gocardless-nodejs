'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface NegativeBalanceLimitResponse extends Types.NegativeBalanceLimit, Types.APIResponse {}

interface NegativeBalanceLimitListResponse extends Types.APIResponse {
  negative_balance_limits: Array<Types.NegativeBalanceLimit>;
  meta: Types.ListMeta;
}

interface NegativeBalanceLimitListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // Unique identifier, beginning with "CR".

  creditor?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency?: Types.NegativeBalanceLimitCurrency;

  // Number of records to return.

  limit?: string;
}

interface NegativeBalanceLimitCreateRequest {
  // The limit amount in pence (e.g. 10000 for a -100 GBP limit).

  balance_limit: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency: Types.NegativeBalanceLimitCurrency;

  // Resources linked to this NegativeBalanceLimit.
  links?: Types.NegativeBalanceLimitCreateRequestLinks;
}

export class NegativeBalanceLimitService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: NegativeBalanceLimitListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<NegativeBalanceLimitListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/negative_balance_limits',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: NegativeBalanceLimitListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: NegativeBalanceLimitListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.NegativeBalanceLimit, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const negativebalancelimit of list.negative_balance_limits) {
        yield negativebalancelimit;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async create(
    requestParameters: NegativeBalanceLimitCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<NegativeBalanceLimitResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/negative_balance_limits',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'negative_balance_limits',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: NegativeBalanceLimitResponse = {
      ...(response.body?.['negative_balance_limits'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
