'use strict';

import { Api } from '../api/Api';
import {
  CustomerBankAccount,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CustomerBankAccountAccountType,
  CustomerBankAccountCreateRequestLinks,
  CreatedAtFilter,
} from '../types/Types';

interface CustomerBankAccountResponse extends CustomerBankAccount {
  __metadata__: ResponseMetadata;
}

interface CustomerBankAccountListResponse extends Array<CustomerBankAccount> {
  __metadata__: ResponseMetadata;
}

interface CustomerBankAccountCreateRequest {
  // Name of the account holder, as known by the bank. Usually this is the same as
  // the name stored with the linked [creditor](#core-endpoints-creditors). This
  // field will be transliterated, upcased and truncated to 18 characters.
  account_holder_name: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: CustomerBankAccountAccountType;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  bank_code?: string;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  branch_code?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.
  currency?: string;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs are not accepted for Swedish
  // bank accounts denominated in SEK - you must supply [local
  // details](#local-bank-details-sweden).
  iban?: string;

  //
  links: CustomerBankAccountCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

interface CustomerBankAccountListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Unique identifier, beginning with "CU".
  customer?: string;

  // Get enabled or disabled customer bank accounts.
  enabled?: boolean;

  // Number of records to return.
  limit?: string;
}

interface CustomerBankAccountUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

export class CustomerBankAccountService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: CustomerBankAccountCreateRequest,
    idempotencyKey = ''
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [];
    const request = {
      path: '/customer_bank_accounts',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'customer_bank_accounts',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async list(
    requestParameters: CustomerBankAccountListRequest
  ): Promise<CustomerBankAccountListResponse> {
    const urlParameters = [];
    const request = {
      path: '/customer_bank_accounts',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response: CustomerBankAccountListResponse = await this.api.request(
      request
    );
    return response;
  }

  async find(identity: string): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customer_bank_accounts/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async update(
    identity: string,
    requestParameters: CustomerBankAccountUpdateRequest
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customer_bank_accounts/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'customer_bank_accounts',
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async disable(identity: string): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customer_bank_accounts/:identity/actions/disable',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }
}