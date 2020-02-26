'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/payments',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'payments',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/payments',
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
            path: '/payments/:identity',
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
            path: '/payments/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'payments',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async cancel(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/payments/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async retry(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/payments/:identity/actions/retry',
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
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map