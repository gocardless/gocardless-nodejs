

'use strict';

function Refunds(api) {
  this._api = api;
}

Refunds.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/refunds',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'refunds',
    envelope: 'refunds',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Refunds.prototype.list = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/refunds',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'refunds',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Refunds.prototype.all = async function(requestParameters = {}, headers = {}) {
  const items = [];
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    list.refunds.forEach(p => items.push(p));

    cursor = list.meta.cursors.after;
  } while (cursor);

  return items;
}

Refunds.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/refunds/:identity',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'refunds',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Refunds.prototype.update = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/refunds/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'refunds',
    envelope: 'refunds',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Refunds;
