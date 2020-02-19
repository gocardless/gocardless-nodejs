'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class BankDetailsLookupService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/bank_details_lookups',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'bank_details_lookups',
            headers,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=BankDetailsLookup.js.map