

'use strict';

interface Payout {

}

interface PayoutResponse {
  payout: Payout,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface PayoutListResponse {
  payout: Payout[],
  request: object,
  response: object,
}

function Payouts(api) {
  this._api = api;
}

Payouts.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<PayoutListResponse> {
  const urlParameters = [];

  const request = {
    path: '/payouts',
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
Payouts.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let payout of list.payouts) {
      yield payout;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Payouts.prototype.find = async function(identity: string, headers: object = {}): Promise<PayoutResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/payouts/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Payouts;