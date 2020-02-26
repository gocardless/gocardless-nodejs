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
    create(requestParameters: MandateImportCreateRequest, headers?: object): Promise<MandateImportResponse>;
    find(identity: string, headers?: object): Promise<MandateImportResponse>;
    submit(identity: string, headers?: object): Promise<MandateImportResponse>;
    cancel(identity: string, headers?: object): Promise<MandateImportResponse>;
}
export {};
