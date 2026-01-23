"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRateService = void 0;
class TaxRateService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/tax_rates',
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
            for (const taxrate of list.tax_rates) {
                yield taxrate;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/tax_rates/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['tax_rates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.TaxRateService = TaxRateService;
//# sourceMappingURL=taxRateService.js.map