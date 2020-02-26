'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class PayoutItemService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/payout_items',
            method: 'GET',
            urlParameters,
            requestParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=PayoutItem.js.map