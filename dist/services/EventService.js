'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class EventService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters) {
        const urlParameters = [];
        const request = {
            path: '/events',
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
            path: '/events/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
        };
        const response = await this.api.request(request);
        return response;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=EventService.js.map