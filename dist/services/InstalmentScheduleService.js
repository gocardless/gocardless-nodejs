'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class InstalmentScheduleService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/instalment_schedules',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'instalment_schedules',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/instalment_schedules',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async find(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/instalment_schedules/:identity',
            method: 'get',
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
            path: '/instalment_schedules/:identity/actions/cancel',
            method: 'post',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.InstalmentScheduleService = InstalmentScheduleService;
//# sourceMappingURL=InstalmentScheduleService.js.map