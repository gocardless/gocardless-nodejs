"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutItemService = void 0;
class PayoutItemService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/payout_items',
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
            for (const payoutitem of list.payout_items) {
                yield payoutitem;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
}
exports.PayoutItemService = PayoutItemService;
//# sourceMappingURL=payoutItemService.js.map