import { MandateImport, ResponseMetadata, MandateImportScheme } from '../types/Types';
interface MandateImportResponse extends MandateImport {
    __metadata__: ResponseMetadata;
}
interface MandateImportCreateRequest {
    scheme: MandateImportScheme;
}
export declare class MandateImportService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateImportCreateRequest, idempotencyKey?: string): Promise<MandateImportResponse>;
    find(identity: string): Promise<MandateImportResponse>;
    submit(identity: string): Promise<MandateImportResponse>;
    cancel(identity: string): Promise<MandateImportResponse>;
}
export {};
