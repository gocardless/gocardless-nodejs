'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CurrencyExchangeRateResponse
  extends Types.CurrencyExchangeRate,
    Types.APIResponse {}

interface CurrencyExchangeRateListResponse extends Types.APIResponse {
  currency_exchange_rates: Types.CurrencyExchangeRate[];
  meta: Types.ListMeta;
}

interface CurrencyExchangeRateListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: Types.CreatedAtFilter;

  // Number of records to return.
  limit?: string;

  // Source currency
  source?: string;

  // Target currency
  target?: string;
}

export class CurrencyExchangeRateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: CurrencyExchangeRateListRequest
  ): Promise<CurrencyExchangeRateListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/currency_exchange_rates',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CurrencyExchangeRateListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: CurrencyExchangeRateListRequest
  ): AsyncGenerator<Types.CurrencyExchangeRate, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const currencyexchangerate of list.currency_exchange_rates) {
        yield currencyexchangerate;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
