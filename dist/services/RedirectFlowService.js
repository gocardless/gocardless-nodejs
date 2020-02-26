'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RedirectFlowService {
    constructor(api) {
        this.api = api;
    }
    async create(requestParameters, idempotencyKey = '') {
        const urlParameters = [];
        const request = {
            path: '/redirect_flows',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: 'redirect_flows',
            idempotencyKey,
            fetch: async (identity) => this.find(identity),
        };
        const response = await this.api.request(request);
        return response;
    }
    async find(identity) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/redirect_flows/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
    async complete(identity, requestParameters) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const request = {
            path: '/redirect_flows/:identity/actions/complete',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.RedirectFlowService = RedirectFlowService;
//# sourceMappingURL=RedirectFlowService.js.map