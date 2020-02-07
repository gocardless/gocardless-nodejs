

'use strict';

function Mandates(api) {
  this._api = api;
}

Mandates.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandates',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandates',
    envelope: 'mandates',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Mandates.prototype.list = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandates',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'mandates',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Mandates.prototype.all = async function(requestParameters = {}, headers = {}) {
  const items = [];
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    list.mandates.forEach(p => items.push(p));

    cursor = list.meta.cursors.after;
  } while (cursor);

  return items;
}

Mandates.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandates/:identity',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'mandates',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Mandates.prototype.update = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandates/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'mandates',
    envelope: 'mandates',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Mandates.prototype.cancel = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandates/:identity/actions/cancel',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    envelope: 'mandates',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Mandates.prototype.reinstate = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandates/:identity/actions/reinstate',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    envelope: 'mandates',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Mandates;
