

'use strict';

function Creditors(api) {
  this._api = api;
}

Creditors.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/creditors',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'creditors',
    envelope: 'creditors',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Creditors.prototype.list = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/creditors',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'creditors',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Creditors.prototype.all = async function(requestParameters = {}, headers = {}) {
  const items = [];
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    list.creditors.forEach(p => items.push(p));

    cursor = list.meta.cursors.after;
  } while (cursor);

  return items;
}

Creditors.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/creditors/:identity',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'creditors',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Creditors.prototype.update = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/creditors/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'creditors',
    envelope: 'creditors',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Creditors;
