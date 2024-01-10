'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BankDetailsLookupResponse
  extends Types.BankDetailsLookup,
    Types.APIResponse {}

interface BankDetailsLookupListResponse extends Types.APIResponse {
  bank_details_lookups: Types.BankDetailsLookup[];
  meta: Types.ListMeta;
}

interface BankDetailsLookupCreateRequest {
  // The account holder name associated with the account number (if available). If
  // provided and the country code is GB, a payer name verification will be
  // performed.

  account_holder_name?: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.

  account_number?: string;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.

  bank_code?: string;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.

  branch_code?: string;

  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. Must be provided if specifying local details.

  country_code?: string;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details).

  iban?: string;
}

export class BankDetailsLookupService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: BankDetailsLookupCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<BankDetailsLookupResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/bank_details_lookups',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_details_lookups',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankDetailsLookupResponse = {
      ...(response.body?.['bank_details_lookups'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
