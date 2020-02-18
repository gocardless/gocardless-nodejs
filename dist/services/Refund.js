'use strict';
function Refunds(api) {
    this._api = api;
}
Refunds.prototype.create = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/refunds',
        method: 'POST',
        urlParameters,
        requestParameters,
        payloadKey: 'refunds',
        headers,
        fetch: async (identity, headers) => await this.find(identity, headers),
    };
    const response = await this._api.request(request);
    return response;
};
Refunds.prototype.list = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/refunds',
        method: 'GET',
        urlParameters,
        requestParameters,
        payloadKey: undefined,
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
// TODO: Should this be an iterator return type?
// Maybe AsyncIterableIterator<Payment>
// Might need this in tsconfig to work properly:
// {
//  "lib": ["esnext.asynciterable"]
// }
// https://github.com/octokit/rest.js/issues/1189
Refunds.prototype.all = async function* (requestParameters = {}, headers = {}) {
    let cursor = undefined;
    do {
        let list = await this.list({ ...requestParameters, after: cursor }, headers);
        for (let refund of list.refunds) {
            yield refund;
        }
        cursor = list.meta.cursors.after;
    } while (cursor);
};
Refunds.prototype.find = async function (identity, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/refunds/:identity',
        method: 'GET',
        urlParameters,
        payloadKey: undefined,
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
Refunds.prototype.update = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/refunds/:identity',
        method: 'PUT',
        urlParameters,
        requestParameters,
        payloadKey: 'refunds',
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
//# sourceMappingURL=Refund.js.map