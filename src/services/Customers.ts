

'use strict';

interface Customer {

}

interface CustomerResponse {
  customer: Customer,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface CustomerListResponse {
  customer: Customer[],
  request: object,
  response: object,
}

function Customers(api) {
  this._api = api;
}

Customers.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<CustomerResponse> {
  const urlParameters = [];

  const request = {
    path: '/customers',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'customers',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<CustomerListResponse> {
  const urlParameters = [];

  const request = {
    path: '/customers',
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
Customers.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let customer of list.customers) {
      yield customer;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Customers.prototype.find = async function(identity: string, headers: object = {}): Promise<CustomerResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customers/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.update = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CustomerResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customers/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'customers',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Customers.prototype.remove = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CustomerResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customers/:identity',
    method: 'DELETE',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Customers;
