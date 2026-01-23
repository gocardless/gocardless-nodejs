import * as Types from '../types/Types.js';
interface PayoutResponse extends Types.Payout, Types.APIResponse {
}
interface PayoutListResponse extends Types.APIResponse {
    payouts: Array<Types.Payout>;
    meta: Types.ListMeta;
}
interface PayoutListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    creditor?: string;
    creditor_bank_account?: string;
    currency?: Types.PayoutCurrency;
    limit?: string;
    metadata?: Types.JsonMap;
    payout_type?: Types.PayoutPayoutType;
    reference?: string;
    status?: Types.PayoutStatus;
}
interface PayoutUpdateRequest {
    metadata?: Types.JsonMap;
}
export declare class PayoutService {
    private api;
    constructor(api: any);
    list(requestParameters: PayoutListRequest, customHeaders?: Types.JsonMap): Promise<PayoutListResponse>;
    all(requestParameters: PayoutListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Payout, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<PayoutResponse>;
    update(identity: string, requestParameters: PayoutUpdateRequest, customHeaders?: Types.JsonMap): Promise<PayoutResponse>;
}
export {};
//# sourceMappingURL=payoutService.d.ts.map