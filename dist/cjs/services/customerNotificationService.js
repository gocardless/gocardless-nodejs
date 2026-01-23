"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerNotificationService = void 0;
class CustomerNotificationService {
    constructor(api) {
        this.api = api;
    }
    async handle(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/customer_notifications/:identity/actions/handle',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['customer_notifications'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.CustomerNotificationService = CustomerNotificationService;
//# sourceMappingURL=customerNotificationService.js.map