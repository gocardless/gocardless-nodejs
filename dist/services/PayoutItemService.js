'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class PayoutItemService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/payout_items',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.PayoutItemService = PayoutItemService;
//# sourceMappingURL=PayoutItemService.js.map