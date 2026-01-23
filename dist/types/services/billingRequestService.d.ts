import * as Types from '../types/Types.js';
interface BillingRequestResponse extends Types.BillingRequest, Types.APIResponse {
}
interface BillingRequestListResponse extends Types.APIResponse {
    billing_requests: Array<Types.BillingRequest>;
    meta: Types.ListMeta;
}
interface BillingRequestCreateRequest {
    fallback_enabled?: boolean;
    instalment_schedule_request?: Types.BillingRequestInstalmentScheduleRequest;
    links?: Types.BillingRequestCreateRequestLinks;
    mandate_request?: Types.BillingRequestMandateRequest;
    metadata?: Types.JsonMap;
    payment_request?: Types.BillingRequestPaymentRequest;
    purpose_code?: Types.BillingRequestPurposeCode;
    subscription_request?: Types.BillingRequestSubscriptionRequest;
}
interface BillingRequestCollectCustomerDetailsRequest {
    customer?: Types.BillingRequestCustomer;
    customer_billing_detail?: Types.BillingRequestCustomerBillingDetail;
}
interface BillingRequestCollectBankAccountRequest {
    account_holder_name?: string;
    account_number?: string;
    account_number_suffix?: string;
    account_type?: Types.BillingRequestAccountType;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    currency?: string;
    iban?: string;
    metadata?: Types.JsonMap;
    pay_id?: string;
}
interface BillingRequestConfirmPayerDetailsRequest {
    metadata?: Types.JsonMap;
    payer_requested_dual_signature?: boolean;
}
interface BillingRequestFulfilRequest {
    metadata?: Types.JsonMap;
}
interface BillingRequestCancelRequest {
    metadata?: Types.JsonMap;
}
interface BillingRequestListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    customer?: string;
    limit?: string;
    status?: Types.BillingRequestStatus;
}
interface BillingRequestNotifyRequest {
    notification_type: Types.BillingRequestNotificationType;
    redirect_uri?: string;
}
interface BillingRequestChooseCurrencyRequest {
    currency: string;
    metadata?: Types.JsonMap;
}
interface BillingRequestSelectInstitutionRequest {
    country_code: string;
    institution: string;
}
export declare class BillingRequestService {
    private api;
    constructor(api: any);
    create(requestParameters: BillingRequestCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    collectCustomerDetails(identity: string, requestParameters: BillingRequestCollectCustomerDetailsRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    collectBankAccount(identity: string, requestParameters: BillingRequestCollectBankAccountRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    confirmPayerDetails(identity: string, requestParameters: BillingRequestConfirmPayerDetailsRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    fulfil(identity: string, requestParameters: BillingRequestFulfilRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    cancel(identity: string, requestParameters: BillingRequestCancelRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    list(requestParameters: BillingRequestListRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestListResponse>;
    all(requestParameters: BillingRequestListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.BillingRequest, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    notify(identity: string, requestParameters: BillingRequestNotifyRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    fallback(identity: string, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    chooseCurrency(identity: string, requestParameters: BillingRequestChooseCurrencyRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
    selectInstitution(identity: string, requestParameters: BillingRequestSelectInstitutionRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestResponse>;
}
export {};
//# sourceMappingURL=billingRequestService.d.ts.map