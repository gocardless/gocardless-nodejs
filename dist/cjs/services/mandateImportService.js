"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandateImportService = void 0;
class MandateImportService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/mandate_imports',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_imports',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['mandate_imports']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandate_imports/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandate_imports'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async submit(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandate_imports/:identity/actions/submit',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandate_imports'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async cancel(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/mandate_imports/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['mandate_imports'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.MandateImportService = MandateImportService;
//# sourceMappingURL=mandateImportService.js.map