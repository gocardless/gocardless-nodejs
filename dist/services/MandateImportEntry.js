'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MandateImportEntryService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/mandate_import_entries',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'mandate_import_entries',
            headers,
            fetch: undefined,
        };
        const response = await this.api.request(request);
        return response;
    }
    // TODO: Should this be an iterator return type?
    // Maybe AsyncIterableIterator<Payment>
    // Might need this in tsconfig to work properly:
    // {
    //  "lib": ["esnext.asynciterable"]
    // }
    // https://github.com/octokit/rest.js/issues/1189
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/mandate_import_entries',
            method: 'GET',
            urlParameters,
            requestParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
//# sourceMappingURL=MandateImportEntry.js.map