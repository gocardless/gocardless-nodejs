

'use strict';

interface Payment {

}

interface PaymentResponse {
  payment: Payment,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface PaymentListResponse {
  payment: Payment[],
  request: object,
  response: object,
}

function Payments(api) {
  this._api = api;
}

Payments.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<PaymentResponse> {
  const urlParameters = [];

  const request = {
    path: '/payments',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'payments',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Payments.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<PaymentListResponse> {
  const urlParameters = [];

  const request = {
    path: '/payments',
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
Payments.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let payment of list.payments) {
      yield payment;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Payments.prototype.find = async function(identity: string, headers: object = {}): Promise<PaymentResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/payments/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Payments.prototype.update = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<PaymentResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/payments/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'payments',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Payments.prototype.cancel = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<PaymentResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/payments/:identity/actions/cancel',
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

Payments.prototype.retry = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<PaymentResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/payments/:identity/actions/retry',
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