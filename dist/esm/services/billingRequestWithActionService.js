export class BillingRequestWithActionService {
    constructor(api) {
        this.api = api;
    }
    async createWithActions(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/billing_requests/create_with_actions',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'billing_request_with_actions',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['billing_request_with_actions']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=billingRequestWithActionService.js.map