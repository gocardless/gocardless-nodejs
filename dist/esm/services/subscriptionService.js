export class SubscriptionService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/subscriptions',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'subscriptions',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['subscriptions']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/subscriptions',
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
            for (const subscription of list.subscriptions) {
                yield subscription;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/subscriptions/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['subscriptions'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async update(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/subscriptions/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'subscriptions',
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['subscriptions'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async pause(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/subscriptions/:identity/actions/pause',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['subscriptions'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async resume(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/subscriptions/:identity/actions/resume',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['subscriptions'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async cancel(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/subscriptions/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['subscriptions'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=subscriptionService.js.map