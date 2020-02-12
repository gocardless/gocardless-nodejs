

'use strict';

interface RedirectFlow {

}

interface RedirectFlowResponse {
  redirectflow: RedirectFlow,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface RedirectFlowListResponse {
  redirectflow: RedirectFlow[],
  request: object,
  response: object,
}

function RedirectFlows(api) {
  this._api = api;
}

RedirectFlows.prototype.create = async function(requestParameters: object = {}, headers: object = {}): Promise<RedirectFlowResponse> {
  const urlParameters = [];

  const request = {
    path: '/redirect_flows',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'redirect_flows',
    headers,
    fetch: async (identity, headers) => await this.find(identity, headers),
  };

  const response = await this._api.request(request);

  return response;
}

RedirectFlows.prototype.find = async function(identity: string, headers: object = {}): Promise<RedirectFlowResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/redirect_flows/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

RedirectFlows.prototype.complete = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<RedirectFlowResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/redirect_flows/:identity/actions/complete',
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

module.exports = RedirectFlows;
