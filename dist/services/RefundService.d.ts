import { Refund, ResponseMetadata, JsonMap, RefundCreateRequestLinks, CreatedAtFilter, RefundRefundType } from '../types/Types';
interface RefundResponse extends Refund {
    __metadata__: ResponseMetadata;
}
interface RefundListResponse extends Array<Refund> {
    __metadata__: ResponseMetadata;
}
interface RefundCreateRequest {
    amount: string;
    links: RefundCreateRequestLinks;
    metadata?: JsonMap;
    reference?: string;
    total_amount_confirmation?: string;
}
interface RefundListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    limit?: string;
    mandate?: string;
    payment?: string;
    refund_type?: RefundRefundType;
}
interface RefundUpdateRequest {
    metadata?: JsonMap;
}
export declare class RefundService {
    private api;
    constructor(api: any);
    create(requestParameters: RefundCreateRequest, headers?: object): Promise<RefundResponse>;
    list(requestParameters: RefundListRequest, headers?: object): Promise<RefundListResponse>;
    find(identity: string, headers?: object): Promise<RefundResponse>;
    update(identity: string, requestParameters: RefundUpdateRequest, headers?: object): Promise<RefundResponse>;
}
export {};
