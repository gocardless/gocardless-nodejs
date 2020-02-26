'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerBankAccountService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/customer_bank_accounts',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'customer_bank_accounts',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/customer_bank_accounts',
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
            path: '/customer_bank_accounts/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async update(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customer_bank_accounts/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'customer_bank_accounts',
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async disable(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customer_bank_accounts/:identity/actions/disable',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.CustomerBankAccountService = CustomerBankAccountService;
//# sourceMappingURL=CustomerBankAccountService.js.map