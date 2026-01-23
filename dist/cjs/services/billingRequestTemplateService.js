"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRequestTemplateService = void 0;
class BillingRequestTemplateService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/billing_request_templates',
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
            for (const billingrequesttemplate of list.billing_request_templates) {
                yield billingrequesttemplate;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/billing_request_templates/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['billing_request_templates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/billing_request_templates',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'billing_request_templates',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['billing_request_templates']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async update(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/billing_request_templates/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'billing_request_templates',
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['billing_request_templates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.BillingRequestTemplateService = BillingRequestTemplateService;
//# sourceMappingURL=billingRequestTemplateService.js.map