"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditorBankAccountService = void 0;
class CreditorBankAccountService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/creditor_bank_accounts',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'creditor_bank_accounts',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['creditor_bank_accounts']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/creditor_bank_accounts',
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
            for (const creditorbankaccount of list.creditor_bank_accounts) {
                yield creditorbankaccount;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/creditor_bank_accounts/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['creditor_bank_accounts'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async disable(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/creditor_bank_accounts/:identity/actions/disable',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['creditor_bank_accounts'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.CreditorBankAccountService = CreditorBankAccountService;
//# sourceMappingURL=creditorBankAccountService.js.map