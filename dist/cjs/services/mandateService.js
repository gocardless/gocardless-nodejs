"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandateService = void 0;
class MandateService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/mandates',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandates',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['mandates']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/mandates',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body,
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async *all(requestParameters, customHeaders = {}) {
        let cursor = undefined;
        do {
            const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);
            for (const mandate of list.mandates) {
                yield mandate;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandates/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async update(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandates/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'mandates',
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async cancel(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandates/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async reinstate(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandates/:identity/actions/reinstate',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.MandateService = MandateService;
//# sourceMappingURL=mandateService.js.map