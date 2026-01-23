"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountHolderVerificationService = void 0;
class BankAccountHolderVerificationService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/bank_account_holder_verifications',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'bank_account_holder_verifications',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['bank_account_holder_verifications']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/bank_account_holder_verifications/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['bank_account_holder_verifications'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.BankAccountHolderVerificationService = BankAccountHolderVerificationService;
//# sourceMappingURL=bankAccountHolderVerificationService.js.map