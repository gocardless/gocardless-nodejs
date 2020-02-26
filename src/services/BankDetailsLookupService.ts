'use strict';

import { Api } from '../api/Api';
import {
  BankDetailsLookup,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
} from '../types/Types';

interface BankDetailsLookupResponse extends BankDetailsLookup {
  __metadata__: ResponseMetadata;
}

interface BankDetailsLookupListResponse extends Array<BankDetailsLookup> {
  __metadata__: ResponseMetadata;
}

interface BankDetailsLookupCreateRequest {
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
    idempotencyKey = ''
  ): Promise<BankDetailsLookupResponse> {
    const urlParameters = [];
    const request = {
      path: '/bank_details_lookups',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_details_lookups',
      idempotencyKey,
      fetch: undefined,
    };

    const response: BankDetailsLookupResponse = await this.api.request(request);
    return response;
  }
}
