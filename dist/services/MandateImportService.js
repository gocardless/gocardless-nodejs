'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandateImportService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/mandate_imports',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_imports',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async find(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/mandate_imports/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async submit(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/mandate_imports/:identity/actions/submit',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async cancel(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/mandate_imports/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.MandateImportService = MandateImportService;
//# sourceMappingURL=MandateImportService.js.map