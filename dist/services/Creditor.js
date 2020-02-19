'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CreditorService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/creditors',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'creditors',
            headers,
            fetch: async (identity, headers) => this.find(identity, headers),
        };
        const response = await this.api.request(request);
        return response;
    }
    // TODO: Should this be an iterator return type?
    // Maybe AsyncIterableIterator<Payment>
    // Might need this in tsconfig to work properly:
    // {
    //  "lib": ["esnext.asynciterable"]
    // }
    // https://github.com/octokit/rest.js/issues/1189
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/creditors',
            method: 'GET',
            urlParameters,
            requestParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async find(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/creditors/:identity',
            method: 'GET',
            urlParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async update(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/creditors/:identity',
            method: 'PUT',
            urlParameters,
            requestParameters,
            payloadKey: 'creditors',
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=Creditor.js.map