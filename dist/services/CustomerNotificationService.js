'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerNotificationService {
    constructor(api) {
        this.api = api;
    }
    async handle(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customer_notifications/:identity/actions/handle',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.CustomerNotificationService = CustomerNotificationService;
//# sourceMappingURL=CustomerNotificationService.js.map