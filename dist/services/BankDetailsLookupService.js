'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class BankDetailsLookupService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/bank_details_lookups',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'bank_details_lookups',
            idempotencyKey,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.BankDetailsLookupService = BankDetailsLookupService;
//# sourceMappingURL=BankDetailsLookupService.js.map