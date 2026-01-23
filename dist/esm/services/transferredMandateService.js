export class TransferredMandateService {
    constructor(api) {
        this.api = api;
    }
    async transferredMandates(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/transferred_mandates/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['transferred_mandates'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=transferredMandateService.js.map