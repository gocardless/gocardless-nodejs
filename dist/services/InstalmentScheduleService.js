'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class InstalmentScheduleService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/instalment_schedules',
            method: 'POST',
            urlParameters,
            requestParameters,
            payloadKey: 'instalment_schedules',
            headers,
            fetch: async (identity, headers) => this.find(identity, headers),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters, headers = {}) {
        const urlParameters = [];
        const request = {
            path: '/instalment_schedules',
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
    async find(identity, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/instalment_schedules/:identity',
            method: 'GET',
            urlParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async cancel(identity, headers = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/instalment_schedules/:identity/actions/cancel',
            method: 'POST',
            urlParameters,
            payloadKey: null,
            headers,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.InstalmentScheduleService = InstalmentScheduleService;
//# sourceMappingURL=InstalmentScheduleService.js.map