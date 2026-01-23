import * as Types from '../types/Types.js';
interface MandateImportEntryResponse extends Types.MandateImportEntry, Types.APIResponse {
}
interface MandateImportEntryListResponse extends Types.APIResponse {
    mandate_import_entries: Array<Types.MandateImportEntry>;
    meta: Types.ListMeta;
}
interface MandateImportEntryCreateRequest {
    amendment?: Types.MandateImportEntryAmendment;
    bank_account: Types.MandateImportEntryBankAccount;
    customer: Types.MandateImportEntryCustomer;
    links: Types.MandateImportEntryCreateRequestLinks;
    mandate?: Types.MandateImportEntryMandate;
    record_identifier?: string;
}
interface MandateImportEntryListRequest {
    after?: string;
    before?: string;
    limit?: string;
    mandate_import: string;
    status?: Types.MandateImportEntryStatus;
}
export declare class MandateImportEntryService {
    private api;
    constructor(api: any);
    create(requestParameters: MandateImportEntryCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<MandateImportEntryResponse>;
    list(requestParameters: MandateImportEntryListRequest, customHeaders?: Types.JsonMap): Promise<MandateImportEntryListResponse>;
    all(requestParameters: MandateImportEntryListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.MandateImportEntry, void, unknown>;
}
export {};
//# sourceMappingURL=mandateImportEntryService.d.ts.map