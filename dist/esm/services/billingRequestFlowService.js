export class BillingRequestFlowService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/billing_request_flows',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'billing_request_flows',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['billing_request_flows']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async initialise(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/billing_request_flows/:identity/actions/initialise',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['billing_request_flows'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=billingRequestFlowService.js.map