import * as Types from '../types/Types.js';
interface OutboundPaymentResponse extends Types.OutboundPayment, Types.APIResponse {
}
interface OutboundPaymentListResponse extends Types.APIResponse {
    outbound_payments: Array<Types.OutboundPayment>;
    meta: Types.ListMeta;
}
interface OutboundPaymentCreateRequest {
    amount: number;
    description?: string;
    execution_date?: string;
    links: Types.OutboundPaymentCreateRequestLinks;
    metadata?: Types.JsonMap;
    reference?: string;
    scheme: Types.OutboundPaymentScheme;
}
interface OutboundPaymentWithdrawRequest {
    amount: number;
    description?: string;
    execution_date?: string;
    links?: Types.OutboundPaymentWithdrawRequestLinks;
    metadata?: Types.JsonMap;
    reference?: string;
    scheme: Types.OutboundPaymentScheme;
}
interface OutboundPaymentCancelRequest {
    metadata?: Types.JsonMap;
}
interface OutboundPaymentListRequest {
    after?: string;
    before?: string;
    created_from?: string;
    created_to?: string;
    limit?: string;
    status?: Types.OutboundPaymentStatus;
}
interface OutboundPaymentUpdateRequest {
    metadata?: Types.JsonMap;
}
export declare class OutboundPaymentService {
    private api;
    constructor(api: any);
    create(requestParameters: OutboundPaymentCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    withdraw(identity: string, requestParameters: OutboundPaymentWithdrawRequest, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    cancel(identity: string, requestParameters: OutboundPaymentCancelRequest, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    approve(identity: string, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    list(requestParameters: OutboundPaymentListRequest, customHeaders?: Types.JsonMap): Promise<OutboundPaymentListResponse>;
    all(requestParameters: OutboundPaymentListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.OutboundPayment, void, unknown>;
    update(identity: string, requestParameters: OutboundPaymentUpdateRequest, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
    stats(identity: string, customHeaders?: Types.JsonMap): Promise<OutboundPaymentResponse>;
}
export {};
//# sourceMappingURL=outboundPaymentService.d.ts.map