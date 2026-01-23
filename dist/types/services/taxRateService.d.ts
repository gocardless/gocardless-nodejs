import * as Types from '../types/Types.js';
interface TaxRateResponse extends Types.TaxRate, Types.APIResponse {
}
interface TaxRateListResponse extends Types.APIResponse {
    tax_rates: Array<Types.TaxRate>;
    meta: Types.ListMeta;
}
interface TaxRateListRequest {
    after?: string;
    before?: string;
    jurisdiction?: string;
    limit?: string;
}
export declare class TaxRateService {
    private api;
    constructor(api: any);
    list(requestParameters: TaxRateListRequest, customHeaders?: Types.JsonMap): Promise<TaxRateListResponse>;
    all(requestParameters: TaxRateListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.TaxRate, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<TaxRateResponse>;
}
export {};
//# sourceMappingURL=taxRateService.d.ts.map