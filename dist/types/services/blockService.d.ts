import * as Types from '../types/Types.js';
interface BlockResponse extends Types.Block, Types.APIResponse {
}
interface BlockListResponse extends Types.APIResponse {
    blocks: Array<Types.Block>;
    meta: Types.ListMeta;
}
interface BlockCreateRequest {
    active?: boolean;
    block_type?: Types.BlockBlockType;
    reason_description?: string;
    reason_type?: Types.BlockReasonType;
    resource_reference?: string;
}
interface BlockListRequest {
    after?: string;
    before?: string;
    block?: string;
    block_type?: Types.BlockBlockType;
    created_at?: Types.CreatedAtFilter;
    limit?: string;
    reason_type?: Types.BlockReasonType;
    updated_at?: string;
}
interface BlockBlockByRefRequest {
    active?: boolean;
    reason_description?: string;
    reason_type?: Types.BlockReasonType;
    reference_type?: Types.BlockReferenceType;
    reference_value?: string;
}
export declare class BlockService {
    private api;
    constructor(api: any);
    create(requestParameters: BlockCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BlockResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BlockResponse>;
    list(requestParameters: BlockListRequest, customHeaders?: Types.JsonMap): Promise<BlockListResponse>;
    all(requestParameters: BlockListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Block, void, unknown>;
    disable(identity: string, customHeaders?: Types.JsonMap): Promise<BlockResponse>;
    enable(identity: string, customHeaders?: Types.JsonMap): Promise<BlockResponse>;
    block_by_ref(requestParameters: BlockBlockByRefRequest, customHeaders?: Types.JsonMap): Promise<BlockListResponse>;
}
export {};
//# sourceMappingURL=blockService.d.ts.map