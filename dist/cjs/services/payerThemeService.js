"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayerThemeService = void 0;
class PayerThemeService {
    constructor(api) {
        this.api = api;
    }
    async createForCreditor(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/branding/payer_themes',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'payer_themes',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['payer_themes']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.PayerThemeService = PayerThemeService;
//# sourceMappingURL=payerThemeService.js.map