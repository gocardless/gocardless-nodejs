"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionService = void 0;
class InstitutionService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/institutions',
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
    async list_for_billing_request(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/billing_requests/:identity/institutions',
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
}
exports.InstitutionService = InstitutionService;
//# sourceMappingURL=institutionService.js.map