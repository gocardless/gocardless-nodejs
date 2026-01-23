import * as Types from '../types/Types.js';
interface PayoutItemListResponse extends Types.APIResponse {
    payout_items: Array<Types.PayoutItem>;
    meta: Types.ListMeta;
}
interface PayoutItemListRequest {
    after?: string;
    before?: string;
    include_2020_tax_cutover?: Types.PayoutItemInclude2020TaxCutover;
    limit?: string;
    payout: string;
}
export declare class PayoutItemService {
    private api;
    constructor(api: any);
    list(requestParameters: PayoutItemListRequest, customHeaders?: Types.JsonMap): Promise<PayoutItemListResponse>;
    all(requestParameters: PayoutItemListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.PayoutItem, void, unknown>;
}
export {};
//# sourceMappingURL=payoutItemService.d.ts.map