

'use strict';

interface MandateImport {

}

interface MandateImportResponse {
  mandateimport: MandateImport,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface MandateImportListResponse {
  mandateimport: MandateImport[],
  request: object,
  response: object,
}

function MandateImports(api) {
  this._api = api;
}

MandateImports.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<MandateImportResponse> {
  const urlParameters = [];

  const request = {
    path: '/mandate_imports',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandate_imports',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

MandateImports.prototype.find = async function(identity: string, headers: object = {}): Promise<MandateImportResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/mandate_imports/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

MandateImports.prototype.submit = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<MandateImportResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/mandate_imports/:identity/actions/submit',
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

MandateImports.prototype.cancel = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<MandateImportResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/mandate_imports/:identity/actions/cancel',
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