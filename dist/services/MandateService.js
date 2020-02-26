'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandateService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/mandates',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandates',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/mandates',
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
            path: '/mandates/:identity',
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
            path: '/mandates/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'mandates',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async cancel(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/mandates/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async reinstate(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/mandates/:identity/actions/reinstate',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.MandateService = MandateService;
//# sourceMappingURL=MandateService.js.map