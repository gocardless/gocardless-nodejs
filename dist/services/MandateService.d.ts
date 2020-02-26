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
    create(requestParameters: MandateCreateRequest, headers?: object): Promise<MandateResponse>;
    list(requestParameters: MandateListRequest, headers?: object): Promise<MandateListResponse>;
    find(identity: string, headers?: object): Promise<MandateResponse>;
    update(identity: string, requestParameters: MandateUpdateRequest, headers?: object): Promise<MandateResponse>;
    cancel(identity: string, requestParameters: MandateCancelRequest, headers?: object): Promise<MandateResponse>;
    reinstate(identity: string, requestParameters: MandateReinstateRequest, headers?: object): Promise<MandateResponse>;
}
export {};
