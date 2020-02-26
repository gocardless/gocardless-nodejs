import { Mandate, ResponseMetadata, JsonMap, MandateCreateRequestLinks, CreatedAtFilter, MandateStatus } from '../types/Types';
interface MandateResponse extends Mandate {
    __metadata__: ResponseMetadata;
}
interface MandateListResponse extends Array<Mandate> {
    __metadata__: ResponseMetadata;
}
interface MandateCreateRequest {
    links: MandateCreateRequestLinks;
    metadata?: JsonMap;
    payer_ip_address?: string;
    reference?: string;
    scheme?: string;
}
interface MandateListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    limit?: string;
    reference?: string;
    status?: MandateStatus[];
}
interface MandateUpdateRequest {
    metadata?: JsonMap;
}
interface MandateCancelRequest {
    metadata?: JsonMap;
}
interface MandateReinstateRequest {
    metadata?: JsonMap;
}
export declare class MandateService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateCreateRequest, idempotencyKey?: string): Promise<MandateResponse>;
    list(requestParameters: MandateListRequest): Promise<MandateListResponse>;
    find(identity: string): Promise<MandateResponse>;
    update(identity: string, requestParameters: MandateUpdateRequest): Promise<MandateResponse>;
    cancel(identity: string, requestParameters: MandateCancelRequest): Promise<MandateResponse>;
    reinstate(identity: string, requestParameters: MandateReinstateRequest): Promise<MandateResponse>;
}
export {};
