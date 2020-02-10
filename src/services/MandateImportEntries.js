

'use strict';

function MandateImportEntries(api) {
  this._api = api;
}

MandateImportEntries.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandate_import_entries',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandate_import_entries',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

MandateImportEntries.prototype.list = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandate_import_entries',
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

MandateImportEntries.prototype.all = async function*(requestParameters = {}, headers = {}) {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let mandate_import_entry of list.mandate_import_entries) {
      yield mandate_import_entry;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

module.exports = MandateImportEntries;
