'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RefundService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/refunds',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'refunds',
            headers,
            fetch: async (identity, headers) => this.find(identity, headers),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/refunds',
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
    async find(identity, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/refunds/:identity',
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
            path: '/refunds/:identity',
            method: 'PUT',
            urlParameters,
            requestParameters,
            payloadKey: 'refunds',
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.RefundService = RefundService;
//# sourceMappingURL=RefundService.js.map