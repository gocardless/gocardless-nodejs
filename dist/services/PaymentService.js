'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/payments',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'payments',
            headers,
            fetch: async (identity, headers) => this.find(identity, headers),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/payments',
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
            path: '/payments/:identity',
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
            path: '/payments/:identity',
            method: 'PUT',
            urlParameters,
            requestParameters,
            payloadKey: 'payments',
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async cancel(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/payments/:identity/actions/cancel',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async retry(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/payments/:identity/actions/retry',
            method: 'POST',
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
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map