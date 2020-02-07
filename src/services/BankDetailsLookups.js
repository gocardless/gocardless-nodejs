

'use strict';

function BankDetailsLookups(api) {
  this._api = api;
}

BankDetailsLookups.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/bank_details_lookups',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'bank_details_lookups',
    envelope: 'bank_details_lookups',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = BankDetailsLookups;
