import * as Types from '../types/Types.js';
interface BillingRequestTemplateResponse extends Types.BillingRequestTemplate, Types.APIResponse {
}
interface BillingRequestTemplateListResponse extends Types.APIResponse {
    billing_request_templates: Array<Types.BillingRequestTemplate>;
    meta: Types.ListMeta;
}
interface BillingRequestTemplateListRequest {
    after?: string;
    before?: string;
    limit?: string;
    payment_request_scheme?: string;
}
interface BillingRequestTemplateCreateRequest {
    links?: Types.BillingRequestTemplateCreateRequestLinks;
    mandate_request_constraints?: Types.BillingRequestTemplateMandateRequestConstraints;
    mandate_request_currency?: string;
    mandate_request_description?: string;
    mandate_request_metadata?: Types.JsonMap;
    mandate_request_scheme?: string;
    mandate_request_verify?: Types.BillingRequestTemplateMandateRequestVerify;
    metadata?: Types.JsonMap;
    name?: string;
    payment_request_amount?: string;
    payment_request_currency?: string;
    payment_request_description?: string;
    payment_request_metadata?: Types.JsonMap;
    payment_request_scheme?: string;
    redirect_uri?: string;
}
interface BillingRequestTemplateUpdateRequest {
    mandate_request_constraints?: Types.BillingRequestTemplateMandateRequestConstraints;
    mandate_request_currency?: string;
    mandate_request_description?: string;
    mandate_request_metadata?: Types.JsonMap;
    mandate_request_scheme?: string;
    mandate_request_verify?: Types.BillingRequestTemplateMandateRequestVerify;
    metadata?: Types.JsonMap;
    name?: string;
    payment_request_amount?: string;
    payment_request_currency?: string;
    payment_request_description?: string;
    payment_request_metadata?: Types.JsonMap;
    payment_request_scheme?: string;
    redirect_uri?: string;
}
export declare class BillingRequestTemplateService {
    private api;
    constructor(api: any);
    list(requestParameters: BillingRequestTemplateListRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestTemplateListResponse>;
    all(requestParameters: BillingRequestTemplateListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.BillingRequestTemplate, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BillingRequestTemplateResponse>;
    create(requestParameters: BillingRequestTemplateCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BillingRequestTemplateResponse>;
    update(identity: string, requestParameters: BillingRequestTemplateUpdateRequest, customHeaders?: Types.JsonMap): Promise<BillingRequestTemplateResponse>;
}
export {};
//# sourceMappingURL=billingRequestTemplateService.d.ts.map