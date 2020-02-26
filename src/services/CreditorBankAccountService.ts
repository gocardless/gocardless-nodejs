'use strict';

import { Api } from '../api/Api';
import {
  CreditorBankAccount,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CreditorBankAccountAccountType,
  CreditorBankAccountCreateRequestLinks,
  CreatedAtFilter,
} from '../types/Types';

interface CreditorBankAccountResponse extends CreditorBankAccount {
  __metadata__: ResponseMetadata;
}

interface CreditorBankAccountListResponse extends Array<CreditorBankAccount> {
  __metadata__: ResponseMetadata;
}

interface CreditorBankAccountCreateRequest {
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
  account_type?: CreditorBankAccountAccountType;

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
  links: CreditorBankAccountCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Defaults to `false`. When this is set to `true`, it will cause this bank
  // account to be set as the account that GoCardless will pay out to.
  set_as_default_payout_account?: boolean;
}

interface CreditorBankAccountListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Unique identifier, beginning with "CR".
  creditor?: string;

  // Boolean value showing whether the bank account is enabled or disabled
  enabled?: boolean;

  // Number of records to return.
  limit?: string;
}

export class CreditorBankAccountService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: CreditorBankAccountCreateRequest,
    headers: object = {}
  ): Promise<CreditorBankAccountResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditor_bank_accounts',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'creditor_bank_accounts',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: CreditorBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async list(
    requestParameters: CreditorBankAccountListRequest,
    headers: object = {}
  ): Promise<CreditorBankAccountListResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditor_bank_accounts',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CreditorBankAccountListResponse = await this.api.request(
      request
    );
    return response;
  }

  async find(
    identity: string,
    headers: object = {}
  ): Promise<CreditorBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/creditor_bank_accounts/:identity',
      method: 'GET',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CreditorBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async disable(
    identity: string,
    headers: object = {}
  ): Promise<CreditorBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/creditor_bank_accounts/:identity/actions/disable',
      method: 'POST',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CreditorBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }
}
