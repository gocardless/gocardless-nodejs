

'use strict';

function Customers(api) {
  this._api = api;
}

Customers.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/customers',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'customers',
    envelope: 'customers',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.list = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/customers',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'customers',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.all = async function(requestParameters = {}, headers = {}) {
  const items = [];
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    list.customers.forEach(p => items.push(p));

    cursor = list.meta.cursors.after;
  } while (cursor);

  return items;
}

Customers.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/customers/:identity',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'customers',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.update = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/customers/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'customers',
    envelope: 'customers',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.remove = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/customers/:identity',
    method: 'DELETE',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'customers',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Customers;
