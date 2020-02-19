'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandatePdfService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/mandate_pdfs',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_pdfs',
            headers,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=MandatePdf.js.map