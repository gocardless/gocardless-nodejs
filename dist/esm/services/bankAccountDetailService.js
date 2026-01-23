export class BankAccountDetailService {
    constructor(api) {
        this.api = api;
    }
    async find(identity, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/bank_account_details/:identity',
            method: 'get',
            urlParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['bank_account_details'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
//# sourceMappingURL=bankAccountDetailService.js.map