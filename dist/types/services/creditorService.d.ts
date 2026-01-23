import * as Types from '../types/Types.js';
interface CreditorResponse extends Types.Creditor, Types.APIResponse {
}
interface CreditorListResponse extends Types.APIResponse {
    creditors: Array<Types.Creditor>;
    meta: Types.ListMeta;
}
interface CreditorCreateRequest {
    bank_reference_prefix?: string;
    country_code: string;
    creditor_type: Types.CreditorCreditorType;
    name: string;
}
interface CreditorListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    limit?: string;
}
interface CreditorUpdateRequest {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    bank_reference_prefix?: string;
    city?: string;
    country_code?: string;
    links?: Types.CreditorUpdateRequestLinks;
    name?: string;
    postal_code?: string;
    region?: string;
}
export declare class CreditorService {
    private api;
    constructor(api: any);
    create(requestParameters: CreditorCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<CreditorResponse>;
    list(requestParameters: CreditorListRequest, customHeaders?: Types.JsonMap): Promise<CreditorListResponse>;
    all(requestParameters: CreditorListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Creditor, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<CreditorResponse>;
    update(identity: string, requestParameters: CreditorUpdateRequest, customHeaders?: Types.JsonMap): Promise<CreditorResponse>;
}
export {};
//# sourceMappingURL=creditorService.d.ts.map