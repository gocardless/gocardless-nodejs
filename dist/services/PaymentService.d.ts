import { Payment, ResponseMetadata, JsonMap, PaymentCurrency, PaymentCreateRequestLinks, PaymentChargeDate, CreatedAtFilter, PaymentStatus } from '../types/Types';
interface PaymentResponse extends Payment {
    __metadata__: ResponseMetadata;
}
interface PaymentListResponse extends Array<Payment> {
    __metadata__: ResponseMetadata;
}
interface PaymentCreateRequest {
    amount: string;
    app_fee?: string;
    charge_date?: string;
    currency: PaymentCurrency;
    description?: string;
    links: PaymentCreateRequestLinks;
    metadata?: JsonMap;
    reference?: string;
    retry_if_possible?: boolean;
}
interface PaymentListRequest {
    after?: string;
    before?: string;
    charge_date?: PaymentChargeDate;
    created_at?: CreatedAtFilter;
    creditor?: string;
    currency?: PaymentCurrency;
    customer?: string;
    limit?: string;
    mandate?: string;
    status?: PaymentStatus;
    subscription?: string;
}
interface PaymentUpdateRequest {
    metadata?: JsonMap;
    retry_if_possible?: boolean;
}
interface PaymentCancelRequest {
    metadata?: JsonMap;
}
interface PaymentRetryRequest {
    metadata?: JsonMap;
}
export declare class PaymentService {
    private api;
    constructor(api: any);
    create(requestParameters: PaymentCreateRequest, idempotencyKey?: string): Promise<PaymentResponse>;
    list(requestParameters: PaymentListRequest): Promise<PaymentListResponse>;
    find(identity: string): Promise<PaymentResponse>;
    update(identity: string, requestParameters: PaymentUpdateRequest): Promise<PaymentResponse>;
    cancel(identity: string, requestParameters: PaymentCancelRequest): Promise<PaymentResponse>;
    retry(identity: string, requestParameters: PaymentRetryRequest): Promise<PaymentResponse>;
}
export {};
