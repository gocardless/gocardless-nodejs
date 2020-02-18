

'use strict';

interface CreditorBankAccount {

}

interface CreditorBankAccountResponse {
  creditorbankaccount: CreditorBankAccount,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface CreditorBankAccountListResponse {
  creditorbankaccount: CreditorBankAccount[],
  request: object,
  response: object,
}

function CreditorBankAccounts(api) {
  this._api = api;
}

CreditorBankAccounts.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<CreditorBankAccountResponse> {
  const urlParameters = [];

  const request = {
    path: '/creditor_bank_accounts',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'creditor_bank_accounts',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

CreditorBankAccounts.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<CreditorBankAccountListResponse> {
  const urlParameters = [];

  const request = {
    path: '/creditor_bank_accounts',
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
CreditorBankAccounts.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let creditor_bank_account of list.creditor_bank_accounts) {
      yield creditor_bank_account;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

CreditorBankAccounts.prototype.find = async function(identity: string, headers: object = {}): Promise<CreditorBankAccountResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/creditor_bank_accounts/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

CreditorBankAccounts.prototype.disable = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CreditorBankAccountResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/creditor_bank_accounts/:identity/actions/disable',
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