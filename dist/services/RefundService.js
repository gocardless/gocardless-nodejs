'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RefundService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/refunds',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'refunds',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/refunds',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async find(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/refunds/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async update(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/refunds/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'refunds',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.RefundService = RefundService;
//# sourceMappingURL=RefundService.js.map