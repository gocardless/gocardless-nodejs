import * as Types from '../types/Types.js';
interface RefundResponse extends Types.Refund, Types.APIResponse {
}
interface RefundListResponse extends Types.APIResponse {
    refunds: Array<Types.Refund>;
    meta: Types.ListMeta;
}
interface RefundCreateRequest {
    amount: string;
    links: Types.RefundCreateRequestLinks;
    metadata?: Types.JsonMap;
    reference?: string;
    total_amount_confirmation?: string;
}
interface RefundListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    limit?: string;
    mandate?: string;
    payment?: string;
    refund_type?: Types.RefundRefundType;
}
interface RefundUpdateRequest {
    metadata?: Types.JsonMap;
}
export declare class RefundService {
    private api;
    constructor(api: any);
    create(requestParameters: RefundCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<RefundResponse>;
    list(requestParameters: RefundListRequest, customHeaders?: Types.JsonMap): Promise<RefundListResponse>;
    all(requestParameters: RefundListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Refund, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<RefundResponse>;
    update(identity: string, requestParameters: RefundUpdateRequest, customHeaders?: Types.JsonMap): Promise<RefundResponse>;
}
export {};
//# sourceMappingURL=refundService.d.ts.map