import * as Types from '../types/Types.js';
interface BillingRequestWithActionResponse extends Types.BillingRequestWithAction, Types.APIResponse {
}
interface BillingRequestWithActionCreateWithActionsRequest {
    actions?: Types.BillingRequestWithActionActions;
    fallback_enabled?: boolean;
    links?: Types.BillingRequestWithActionCreateWithActionsRequestLinks;
    mandate_request?: Types.BillingRequestWithActionMandateRequest;
    metadata?: Types.JsonMap;
    payment_request?: Types.BillingRequestWithActionPaymentRequest;
    purpose_code?: Types.BillingRequestWithActionPurposeCode;
}
export declare class BillingRequestWithActionService {
    private api;
    constructor(api: any);
    createWithActions(requestParameters: BillingRequestWithActionCreateWithActionsRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BillingRequestWithActionResponse>;
}
export {};
//# sourceMappingURL=billingRequestWithActionService.d.ts.map