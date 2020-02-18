

'use strict';

interface Refund {

}

interface RefundResponse {
  refund: Refund,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface RefundListResponse {
  refund: Refund[],
  request: object,
  response: object,
}

function Refunds(api) {
  this._api = api;
}

Refunds.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<RefundResponse> {
  const urlParameters = [];

  const request = {
    path: '/refunds',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'refunds',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Refunds.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<RefundListResponse> {
  const urlParameters = [];

  const request = {
    path: '/refunds',
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
Refunds.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let refund of list.refunds) {
      yield refund;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Refunds.prototype.find = async function(identity: string, headers: object = {}): Promise<RefundResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/refunds/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Refunds.prototype.update = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<RefundResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/refunds/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'refunds',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}