

'use strict';

function PayoutItems(api) {
  this._api = api;
}

PayoutItems.prototype.list = async function(requestParameters = {}, headers = {}) {
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

PayoutItems.prototype.all = async function*(requestParameters = {}, headers = {}) {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let payout_item of list.payout_items) {
      yield payout_item;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

module.exports = PayoutItems;
