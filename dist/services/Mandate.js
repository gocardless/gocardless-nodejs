'use strict';
function Mandates(api) {
    this._api = api;
}
Mandates.prototype.create = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/mandates',
        method: 'POST',
        urlParameters,
        requestParameters,
        payloadKey: 'mandates',
        headers,
        fetch: async (identity, headers) => await this.find(identity, headers),
    };
    const response = await this._api.request(request);
    return response;
};
Mandates.prototype.list = async function (requestParameters = {}, headers = {}) {
    const urlParameters = [];
    const request = {
        path: '/mandates',
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
Mandates.prototype.all = async function* (requestParameters = {}, headers = {}) {
    let cursor = undefined;
    do {
        let list = await this.list({ ...requestParameters, after: cursor }, headers);
        for (let mandate of list.mandates) {
            yield mandate;
        }
        cursor = list.meta.cursors.after;
    } while (cursor);
};
Mandates.prototype.find = async function (identity, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/mandates/:identity',
        method: 'GET',
        urlParameters,
        payloadKey: undefined,
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
Mandates.prototype.update = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/mandates/:identity',
        method: 'PUT',
        urlParameters,
        requestParameters,
        payloadKey: 'mandates',
        headers,
        fetch: undefined,
    };
    const response = await this._api.request(request);
    return response;
};
Mandates.prototype.cancel = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/mandates/:identity/actions/cancel',
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
Mandates.prototype.reinstate = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
    ];
    const request = {
        path: '/mandates/:identity/actions/reinstate',
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
//# sourceMappingURL=Mandate.js.map