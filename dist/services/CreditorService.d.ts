import { Creditor, ResponseMetadata, CreatedAtFilter, CreditorUpdateRequestLinks } from '../types/Types';
interface CreditorResponse extends Creditor {
    __metadata__: ResponseMetadata;
}
interface CreditorListResponse extends Array<Creditor> {
    __metadata__: ResponseMetadata;
}
interface CreditorCreateRequest {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    country_code?: string;
    name: string;
    postal_code?: string;
    region?: string;
}
interface CreditorListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    limit?: string;
}
interface CreditorUpdateRequest {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    country_code?: string;
    links?: CreditorUpdateRequestLinks;
    name?: string;
    postal_code?: string;
    region?: string;
}
export declare class CreditorService {
    private api;
    constructor(api: any);
    create(requestParameters: CreditorCreateRequest, idempotencyKey?: string): Promise<CreditorResponse>;
    list(requestParameters: CreditorListRequest): Promise<CreditorListResponse>;
    find(identity: string): Promise<CreditorResponse>;
    update(identity: string, requestParameters: CreditorUpdateRequest): Promise<CreditorResponse>;
}
export {};
