import * as Types from '../types/Types.js';
interface BillingRequestFlowResponse extends Types.BillingRequestFlow, Types.APIResponse {
}
interface BillingRequestFlowCreateRequest {
    auto_fulfil?: boolean;
    customer_details_captured?: boolean;
    exit_uri?: string;
    language?: string;
    links: Types.BillingRequestFlowCreateRequestLinks;
    lock_bank_account?: boolean;
    lock_currency?: boolean;
    lock_customer_details?: boolean;
    prefilled_bank_account?: Types.BillingRequestFlowPrefilledBankAccount;
    prefilled_customer?: Types.BillingRequestFlowPrefilledCustomer;
    redirect_uri?: string;
    show_redirect_buttons?: boolean;
    show_success_redirect_button?: boolean;
    skip_success_screen?: boolean;
}
export declare class BillingRequestFlowService {
    private api;
    constructor(api: any);
    create(requestParameters: BillingRequestFlowCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BillingRequestFlowResponse>;
    initialise(identity: string, customHeaders?: Types.JsonMap): Promise<BillingRequestFlowResponse>;
}
export {};
//# sourceMappingURL=billingRequestFlowService.d.ts.map