'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerNotificationService {
    constructor(api) {
        this.api = api;
    }
    async handle(identity, requestParameters, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/customer_notifications/:identity/actions/handle',
            method: 'POST',
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
//# sourceMappingURL=CustomerNotification.js.map