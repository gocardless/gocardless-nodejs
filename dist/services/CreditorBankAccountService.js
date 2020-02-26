'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CreditorBankAccountService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/creditor_bank_accounts',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'creditor_bank_accounts',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/creditor_bank_accounts',
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
            path: '/creditor_bank_accounts/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async disable(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/creditor_bank_accounts/:identity/actions/disable',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.CreditorBankAccountService = CreditorBankAccountService;
//# sourceMappingURL=CreditorBankAccountService.js.map