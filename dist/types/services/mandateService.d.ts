import * as Types from '../types/Types.js';
interface MandateResponse extends Types.Mandate, Types.APIResponse {
}
interface MandateListResponse extends Types.APIResponse {
    mandates: Array<Types.Mandate>;
    meta: Types.ListMeta;
}
interface MandateCreateRequest {
    authorisation_source?: Types.MandateAuthorisationSource;
    links: Types.MandateCreateRequestLinks;
    metadata?: Types.JsonMap;
    payer_ip_address?: string;
    reference?: string;
    scheme?: string;
}
interface MandateListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    limit?: string;
    mandate_type?: string;
    reference?: string;
    scheme?: string[];
    status?: Types.MandateStatus[];
}
interface MandateUpdateRequest {
    metadata?: Types.JsonMap;
}
interface MandateCancelRequest {
    metadata?: Types.JsonMap;
}
interface MandateReinstateRequest {
    metadata?: Types.JsonMap;
}
export declare class MandateService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<MandateResponse>;
    list(requestParameters: MandateListRequest, customHeaders?: Types.JsonMap): Promise<MandateListResponse>;
    all(requestParameters: MandateListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Mandate, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<MandateResponse>;
    update(identity: string, requestParameters: MandateUpdateRequest, customHeaders?: Types.JsonMap): Promise<MandateResponse>;
    cancel(identity: string, requestParameters: MandateCancelRequest, customHeaders?: Types.JsonMap): Promise<MandateResponse>;
    reinstate(identity: string, requestParameters: MandateReinstateRequest, customHeaders?: Types.JsonMap): Promise<MandateResponse>;
}
export {};
//# sourceMappingURL=mandateService.d.ts.map