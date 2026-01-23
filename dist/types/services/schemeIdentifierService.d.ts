import * as Types from '../types/Types.js';
interface SchemeIdentifierResponse extends Types.SchemeIdentifier, Types.APIResponse {
}
interface SchemeIdentifierListResponse extends Types.APIResponse {
    scheme_identifiers: Array<Types.SchemeIdentifier>;
    meta: Types.ListMeta;
}
interface SchemeIdentifierCreateRequest {
    links?: Types.SchemeIdentifierCreateRequestLinks;
    name: string;
    scheme: Types.SchemeIdentifierScheme;
}
interface SchemeIdentifierListRequest {
    after?: string;
    before?: string;
    creditor?: string;
    limit?: string;
}
export declare class SchemeIdentifierService {
    private api;
    constructor(api: any);
    create(requestParameters: SchemeIdentifierCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<SchemeIdentifierResponse>;
    list(requestParameters: SchemeIdentifierListRequest, customHeaders?: Types.JsonMap): Promise<SchemeIdentifierListResponse>;
    all(requestParameters: SchemeIdentifierListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.SchemeIdentifier, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<SchemeIdentifierResponse>;
}
export {};
//# sourceMappingURL=schemeIdentifierService.d.ts.map