

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

MandateImportEntries.prototype.all = async function(requestParameters = {}, headers = {}) {
  const items = [];
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    list.mandate_import_entries.forEach(p => items.push(p));

    cursor = list.meta.cursors.after;
  } while (cursor);

  return items;
}

module.exports = MandateImportEntries;
