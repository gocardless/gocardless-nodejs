export class FundsAvailabilityService {
    constructor(api) {
        this.api = api;
    }
    async check(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/funds_availability/:identity',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['funds_availability'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=fundsAvailabilityService.js.map