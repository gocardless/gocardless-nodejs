'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class PayoutService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/payouts',
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
    async find(identity, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/payouts/:identity',
            method: 'GET',
            urlParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=Payout.js.map