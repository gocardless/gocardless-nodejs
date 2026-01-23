export class OutboundPaymentService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/outbound_payments',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'outbound_payments',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['outbound_payments']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async withdraw(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/outbound_payments/withdrawal',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async cancel(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/outbound_payments/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async approve(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/outbound_payments/:identity/actions/approve',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/outbound_payments/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/outbound_payments',
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
            for (const outboundpayment of list.outbound_payments) {
                yield outboundpayment;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async update(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/outbound_payments/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'outbound_payments',
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async stats(identity, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/outbound_payments/stats',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['outbound_payments'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=outboundPaymentService.js.map