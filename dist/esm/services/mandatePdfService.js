export class MandatePdfService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '', customHeaders = {}) {
        var _a, _b;
        const urlParameters = [];
        const requestParams = {
            path: '/mandate_pdfs',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_pdfs',
            idempotencyKey,
            customHeaders,
            fetch: undefined,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a['mandate_pdfs']) !== null && _b !== void 0 ? _b : response),
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=mandatePdfService.js.map