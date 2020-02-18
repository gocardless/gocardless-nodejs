

'use strict';

interface MandateImportEntry {

}

interface MandateImportEntryResponse {
  mandateimportentry: MandateImportEntry,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface MandateImportEntryListResponse {
  mandateimportentry: MandateImportEntry[],
  request: object,
  response: object,
}

function MandateImportEntries(api) {
  this._api = api;
}

MandateImportEntries.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<MandateImportEntryResponse> {
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

MandateImportEntries.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<MandateImportEntryListResponse> {
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

// TODO: Should this be an iterator return type?
// Maybe AsyncIterableIterator<Payment>
// Might need this in tsconfig to work properly:
// {
//  "lib": ["esnext.asynciterable"]
// }
// https://github.com/octokit/rest.js/issues/1189
MandateImportEntries.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let mandate_import_entry of list.mandate_import_entries) {
      yield mandate_import_entry;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}