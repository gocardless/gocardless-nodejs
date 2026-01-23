import * as Types from '../types/Types.js';
interface MandateImportResponse extends Types.MandateImport, Types.APIResponse {
}
interface MandateImportCreateRequest {
    links?: Types.MandateImportCreateRequestLinks;
    scheme: Types.MandateImportScheme;
}
export declare class MandateImportService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateImportCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<MandateImportResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<MandateImportResponse>;
    submit(identity: string, customHeaders?: Types.JsonMap): Promise<MandateImportResponse>;
    cancel(identity: string, customHeaders?: Types.JsonMap): Promise<MandateImportResponse>;
}
export {};
//# sourceMappingURL=mandateImportService.d.ts.map