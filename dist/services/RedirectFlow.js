'use strict';
function RedirectFlows(api) {
    this._api = api;
}
RedirectFlows.prototype.create = async function (requestParameters = {}, headers = {}) {
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
};
RedirectFlows.prototype.find = async function (identity, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
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
};
RedirectFlows.prototype.complete = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
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
};
//# sourceMappingURL=RedirectFlow.js.map