import * as Types from '../types/Types.js';
interface ExportResponse extends Types.Export, Types.APIResponse {
}
interface ExportListResponse extends Types.APIResponse {
    exports: Array<Types.Export>;
    meta: Types.ListMeta;
}
interface ExportListRequest {
    after?: string;
    before?: string;
    limit?: string;
}
export declare class ExportService {
    private api;
    constructor(api: any);
    find(identity: string, customHeaders?: Types.JsonMap): Promise<ExportResponse>;
    list(requestParameters: ExportListRequest, customHeaders?: Types.JsonMap): Promise<ExportListResponse>;
    all(requestParameters: ExportListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Export, void, unknown>;
}
export {};
//# sourceMappingURL=exportService.d.ts.map