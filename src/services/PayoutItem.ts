

'use strict';

interface PayoutItem {

}

interface PayoutItemResponse {
  payoutitem: PayoutItem,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface PayoutItemListResponse {
  payoutitem: PayoutItem[],
  request: object,
  response: object,
}

function PayoutItems(api) {
  this._api = api;
}

PayoutItems.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<PayoutItemListResponse> {
  const urlParameters = [];

  const request = {
    path: '/payout_items',
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
PayoutItems.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let payout_item of list.payout_items) {
      yield payout_item;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}