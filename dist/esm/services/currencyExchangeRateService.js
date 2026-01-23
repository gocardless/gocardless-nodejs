export class CurrencyExchangeRateService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/currency_exchange_rates',
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
            for (const currencyexchangerate of list.currency_exchange_rates) {
                yield currencyexchangerate;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
}
//# sourceMappingURL=currencyExchangeRateService.js.map