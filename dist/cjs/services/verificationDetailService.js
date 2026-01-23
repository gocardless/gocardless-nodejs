"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationDetailService = void 0;
class VerificationDetailService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/verification_details',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'verification_details',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['verification_details']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/verification_details',
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
            for (const verificationdetail of list.verification_details) {
                yield verificationdetail;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
}
exports.VerificationDetailService = VerificationDetailService;
//# sourceMappingURL=verificationDetailService.js.map