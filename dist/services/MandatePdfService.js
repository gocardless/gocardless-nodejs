'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandatePdfService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/mandate_pdfs',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_pdfs',
            idempotencyKey,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.MandatePdfService = MandatePdfService;
//# sourceMappingURL=MandatePdfService.js.map