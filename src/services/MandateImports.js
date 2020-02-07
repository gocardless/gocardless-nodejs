

'use strict';

function MandateImports(api) {
  this._api = api;
}

MandateImports.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandate_imports',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandate_imports',
    envelope: 'mandate_imports',
    headers,
    fetch: async (identity, headers) => await this.find(identity, {}, headers),
  };

  const response = await this._api.request(request);

  return response;
}

MandateImports.prototype.find = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandate_imports/:identity',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    envelope: 'mandate_imports',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

MandateImports.prototype.submit = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandate_imports/:identity/actions/submit',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    envelope: 'mandate_imports',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

MandateImports.prototype.cancel = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/mandate_imports/:identity/actions/cancel',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    envelope: 'mandate_imports',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = MandateImports;
