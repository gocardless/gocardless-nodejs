'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/customers',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'customers',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/customers',
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
            path: '/customers/:identity',
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
            path: '/customers/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'customers',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async remove(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customers/:identity',
            method: 'delete',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map