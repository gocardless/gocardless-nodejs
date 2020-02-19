'use strict';

import { CreditorBankAccount } from '../types/Types';
import { Api } from '../api/Api';

interface CreditorBankAccountResponse extends CreditorBankAccount {
  request: object;
  response: object;
}

interface CreditorBankAccountListResponse extends CreditorBankAccount {
  request: object;
  response: object;
}

class CreditorBankAccountService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
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

  // TODO: Should this be an iterator return type?
  // Maybe AsyncIterableIterator<Payment>
  // Might need this in tsconfig to work properly:
  // {
  //  "lib": ["esnext.asynciterable"]
  // }
  // https://github.com/octokit/rest.js/issues/1189
  async list(
    requestParameters: object,
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
    requestParameters: object,
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
    requestParameters: object,
    headers: object = {}
  ): Promise<CreditorBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/creditor_bank_accounts/:identity/actions/disable',
      method: 'POST',
      urlParameters,
      requestParameters,
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
