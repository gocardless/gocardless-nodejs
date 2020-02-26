import { MandateImportEntry, ResponseMetadata, MandateImportEntryAmendment, MandateImportEntryBankAccount, MandateImportEntryCustomer, MandateImportEntryCreateRequestLinks } from '../types/Types';
interface MandateImportEntryResponse extends MandateImportEntry {
    __metadata__: ResponseMetadata;
}
interface MandateImportEntryListResponse extends Array<MandateImportEntry> {
    __metadata__: ResponseMetadata;
}
interface MandateImportEntryCreateRequest {
    amendment?: MandateImportEntryAmendment;
    bank_account: MandateImportEntryBankAccount;
    customer: MandateImportEntryCustomer;
    links: MandateImportEntryCreateRequestLinks;
    record_identifier?: string;
}
interface MandateImportEntryListRequest {
    after?: string;
    before?: string;
    limit?: string;
    mandate_import: string;
}
export declare class MandateImportEntryService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateImportEntryCreateRequest, idempotencyKey?: string): Promise<MandateImportEntryResponse>;
    list(requestParameters: MandateImportEntryListRequest): Promise<MandateImportEntryListResponse>;
}
export {};
