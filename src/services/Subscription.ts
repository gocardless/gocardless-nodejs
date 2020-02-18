

'use strict';

interface Subscription {

}

interface SubscriptionResponse {
  subscription: Subscription,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface SubscriptionListResponse {
  subscription: Subscription[],
  request: object,
  response: object,
}

function Subscriptions(api) {
  this._api = api;
}

Subscriptions.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<SubscriptionResponse> {
  const urlParameters = [];

  const request = {
    path: '/subscriptions',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'subscriptions',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

Subscriptions.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<SubscriptionListResponse> {
  const urlParameters = [];

  const request = {
    path: '/subscriptions',
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
Subscriptions.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let subscription of list.subscriptions) {
      yield subscription;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Subscriptions.prototype.find = async function(identity: string, headers: object = {}): Promise<SubscriptionResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/subscriptions/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Subscriptions.prototype.update = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<SubscriptionResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/subscriptions/:identity',
    method: 'PUT',
    urlParameters,
    requestParameters,
    payloadKey: 'subscriptions',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

Subscriptions.prototype.cancel = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<SubscriptionResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/subscriptions/:identity/actions/cancel',
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