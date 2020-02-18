'use strict';
function Creditors(api) {
    this._api = api;
}
Creditors.prototype.create = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/creditors',
        method: 'POST',
        urlParameters,
        requestParameters,
        payloadKey: 'creditors',
        headers,
        fetch: async (identity, headers) => await this.find(identity, headers),
    };
    const response = await this._api.request(request);
    return response;
};
Creditors.prototype.list = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/creditors',
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
Creditors.prototype.all = async function* (requestParameters = {}, headers = {}) {
    let cursor = undefined;
    do {
        let list = await this.list({ ...requestParameters, after: cursor }, headers);
        for (let creditor of list.creditors) {
            yield creditor;
        }
        cursor = list.meta.cursors.after;
    } while (cursor);
};
Creditors.prototype.find = async function (identity, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/creditors/:identity',
        method: 'GET',
        urlParameters,
        payloadKey: undefined,
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
Creditors.prototype.update = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/creditors/:identity',
        method: 'PUT',
        urlParameters,
        requestParameters,
        payloadKey: 'creditors',
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
//# sourceMappingURL=Creditor.js.map