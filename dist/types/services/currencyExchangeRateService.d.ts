import * as Types from '../types/Types.js';
interface CurrencyExchangeRateListResponse extends Types.APIResponse {
    currency_exchange_rates: Array<Types.CurrencyExchangeRate>;
    meta: Types.ListMeta;
}
interface CurrencyExchangeRateListRequest {
    after?: string;
    before?: string;
    limit?: string;
    source?: string;
    target?: string;
}
export declare class CurrencyExchangeRateService {
    private api;
    constructor(api: any);
    list(requestParameters: CurrencyExchangeRateListRequest, customHeaders?: Types.JsonMap): Promise<CurrencyExchangeRateListResponse>;
    all(requestParameters: CurrencyExchangeRateListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.CurrencyExchangeRate, void, unknown>;
}
export {};
//# sourceMappingURL=currencyExchangeRateService.d.ts.map