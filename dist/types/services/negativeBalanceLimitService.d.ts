import * as Types from '../types/Types.js';
interface NegativeBalanceLimitListResponse extends Types.APIResponse {
    negative_balance_limits: Array<Types.NegativeBalanceLimit>;
    meta: Types.ListMeta;
}
interface NegativeBalanceLimitListRequest {
    after?: string;
    before?: string;
    creditor?: string;
    currency?: Types.NegativeBalanceLimitCurrency;
    limit?: string;
}
export declare class NegativeBalanceLimitService {
    private api;
    constructor(api: any);
    list(requestParameters: NegativeBalanceLimitListRequest, customHeaders?: Types.JsonMap): Promise<NegativeBalanceLimitListResponse>;
    all(requestParameters: NegativeBalanceLimitListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.NegativeBalanceLimit, void, unknown>;
}
export {};
//# sourceMappingURL=negativeBalanceLimitService.d.ts.map