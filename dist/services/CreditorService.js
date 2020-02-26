'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CreditorService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/creditors',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'creditors',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/creditors',
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
            path: '/creditors/:identity',
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
            path: '/creditors/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'creditors',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.CreditorService = CreditorService;
//# sourceMappingURL=CreditorService.js.map