

'use strict';

interface BankDetailsLookup {

}

interface BankDetailsLookupResponse {
  bankdetailslookup: BankDetailsLookup,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface BankDetailsLookupListResponse {
  bankdetailslookup: BankDetailsLookup[],
  request: object,
  response: object,
}

function BankDetailsLookups(api) {
  this._api = api;
}

BankDetailsLookups.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<BankDetailsLookupResponse> {
  const urlParameters = [];

  const request = {
    path: '/bank_details_lookups',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'bank_details_lookups',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = BankDetailsLookups;
