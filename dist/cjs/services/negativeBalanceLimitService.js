"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegativeBalanceLimitService = void 0;
class NegativeBalanceLimitService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/negative_balance_limits',
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
            for (const negativebalancelimit of list.negative_balance_limits) {
                yield negativebalancelimit;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
}
exports.NegativeBalanceLimitService = NegativeBalanceLimitService;
//# sourceMappingURL=negativeBalanceLimitService.js.map