'use strict';

import { CustomerBankAccount } from '../types/Types';
import { Api } from '../api/Api';

interface CustomerBankAccountResponse extends CustomerBankAccount {
  request: object;
  response: object;
}

interface CustomerBankAccountListResponse extends CustomerBankAccount {
  request: object;
  response: object;
}

class CustomerBankAccountService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [];
    const request = {
      path: '/customer_bank_accounts',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'customer_bank_accounts',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: CustomerBankAccountResponse = await this.api.request(
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
  ): Promise<CustomerBankAccountListResponse> {
    const urlParameters = [];
    const request = {
      path: '/customer_bank_accounts',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerBankAccountListResponse = await this.api.request(
      request
    );
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customer_bank_accounts/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async update(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customer_bank_accounts/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'customer_bank_accounts',
      headers,
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }

  async disable(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerBankAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customer_bank_accounts/:identity/actions/disable',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerBankAccountResponse = await this.api.request(
      request
    );
    return response;
  }
}
