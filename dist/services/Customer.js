'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/customers',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'customers',
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
            path: '/customers',
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
            path: '/customers/:identity',
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
            path: '/customers/:identity',
            method: 'PUT',
            urlParameters,
            requestParameters,
            payloadKey: 'customers',
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async remove(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customers/:identity',
            method: 'DELETE',
            urlParameters,
            requestParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=Customer.js.map