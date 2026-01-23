"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
class EventService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/events',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body,
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async *all(requestParameters, customHeaders = {}) {
        let cursor = undefined;
        do {
            const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);
            for (const event of list.events) {
                yield event;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/events/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['events'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventService.js.map