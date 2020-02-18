

'use strict';

interface MandatePdf {

}

interface MandatePdfResponse {
  mandatepdf: MandatePdf,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface MandatePdfListResponse {
  mandatepdf: MandatePdf[],
  request: object,
  response: object,
}

function MandatePdfs(api) {
  this._api = api;
}

MandatePdfs.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<MandatePdfResponse> {
  const urlParameters = [];

  const request = {
    path: '/mandate_pdfs',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'mandate_pdfs',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}