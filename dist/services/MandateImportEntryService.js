'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandateImportEntryService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/mandate_import_entries',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_import_entries',
            idempotencyKey,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/mandate_import_entries',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.MandateImportEntryService = MandateImportEntryService;
//# sourceMappingURL=MandateImportEntryService.js.map