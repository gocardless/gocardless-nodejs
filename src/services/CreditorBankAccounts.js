

'use strict';

function CreditorBankAccounts(api) {
  this._api = api;
}

CreditorBankAccounts.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/creditor_bank_accounts',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'creditor_bank_accounts',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

CreditorBankAccounts.prototype.list = async function(requestParameters = {}, headers = {}) {
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

CreditorBankAccounts.prototype.all = async function*(requestParameters = {}, headers = {}) {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let creditor_bank_account of list.creditor_bank_accounts) {
      yield creditor_bank_account;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

CreditorBankAccounts.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/creditor_bank_accounts/:identity',
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

CreditorBankAccounts.prototype.disable = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
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

module.exports = CreditorBankAccounts;
