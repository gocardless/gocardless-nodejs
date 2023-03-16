'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CreditorBankAccountResponse
  extends Types.CreditorBankAccount,
    Types.APIResponse {}

interface CreditorBankAccountListResponse extends Types.APIResponse {
  creditor_bank_accounts: Types.CreditorBankAccount[];
  meta: Types.ListMeta;
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

  account_type?: Types.CreditorBankAccountAccountType;

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

  // Resources linked to this CreditorBankAccount.
  links: Types.CreditorBankAccountCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Defaults to `true`. When this is set to `true`, it will cause this bank
  // account to be set as the account that GoCardless will pay out to.

  set_as_default_payout_account?: boolean;
}

interface CreditorBankAccountListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this CreditorBankAccount.
  created_at?: Types.CreatedAtFilter;

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
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<CreditorBankAccountResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditor_bank_accounts',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'creditor_bank_accounts',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorBankAccountResponse = {
      ...(response.body?.['creditor_bank_accounts'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: CreditorBankAccountListRequest
  ): Promise<CreditorBankAccountListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditor_bank_accounts',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorBankAccountListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: CreditorBankAccountListRequest
  ): AsyncGenerator<Types.CreditorBankAccount, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const creditorbankaccount of list.creditor_bank_accounts) {
        yield creditorbankaccount;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<CreditorBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditor_bank_accounts/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorBankAccountResponse = {
      ...response.body['creditor_bank_accounts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async disable(identity: string): Promise<CreditorBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditor_bank_accounts/:identity/actions/disable',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorBankAccountResponse = {
      ...response.body['creditor_bank_accounts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
