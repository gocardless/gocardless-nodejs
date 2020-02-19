

'use strict';

interface CustomerBankAccount {

}

interface CustomerBankAccountResponse {
  customerbankaccount: CustomerBankAccount,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface CustomerBankAccountListResponse {
  customerbankaccount: CustomerBankAccount[],
  request: object,
  response: object,
}

function CustomerBankAccounts(api) {
  this._api = api;
}

CustomerBankAccounts.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<CustomerBankAccountResponse> {
  const urlParameters = [];

  const request = {
    path: '/customer_bank_accounts',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'customer_bank_accounts',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

CustomerBankAccounts.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<CustomerBankAccountListResponse> {
  const urlParameters = [];

  const request = {
    path: '/customer_bank_accounts',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

// TODO: Should this be an iterator return type?
// Maybe AsyncIterableIterator<Payment>
// Might need this in tsconfig to work properly:
// {
//  "lib": ["esnext.asynciterable"]
// }
// https://github.com/octokit/rest.js/issues/1189
CustomerBankAccounts.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let customer_bank_account of list.customer_bank_accounts) {
      yield customer_bank_account;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

CustomerBankAccounts.prototype.find = async function(identity: string, headers: object = {}): Promise<CustomerBankAccountResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customer_bank_accounts/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

CustomerBankAccounts.prototype.update = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CustomerBankAccountResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customer_bank_accounts/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'customer_bank_accounts',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

CustomerBankAccounts.prototype.disable = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CustomerBankAccountResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customer_bank_accounts/:identity/actions/disable',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = CustomerBankAccounts;
