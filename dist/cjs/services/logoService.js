"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoService = void 0;
class LogoService {
    constructor(api) {
        this.api = api;
    }
    async createForCreditor(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/branding/logos',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'logos',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['logos']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.LogoService = LogoService;
//# sourceMappingURL=logoService.js.map