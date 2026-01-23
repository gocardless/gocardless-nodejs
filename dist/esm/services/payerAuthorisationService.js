export class PayerAuthorisationService {
    constructor(api) {
        this.api = api;
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/payer_authorisations/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['payer_authorisations'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/payer_authorisations',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'payer_authorisations',
            idempotencyKey,
            customHeaders,
            fetch: async (identity) => await this.find(identity),
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['payer_authorisations']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async update(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/payer_authorisations/:identity',
            method: 'put',
            urlParameters,
            requestParameters,
            payloadKey: 'payer_authorisations',
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['payer_authorisations'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async submit(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/payer_authorisations/:identity/actions/submit',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['payer_authorisations'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async confirm(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/payer_authorisations/:identity/actions/confirm',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['payer_authorisations'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=payerAuthorisationService.js.map