

'use strict';

function MandatePdfs(api) {
  this._api = api;
}

MandatePdfs.prototype.create = async function(requestParameters = {}, headers = {}) {
  const urlParameters = [];
  const request = {
    path: '/mandate_pdfs',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandate_pdfs',
    envelope: 'mandate_pdfs',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = MandatePdfs;
