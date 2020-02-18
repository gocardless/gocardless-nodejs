interface MandateImportEntry {
}
interface MandateImportEntryResponse {
    mandateimportentry: MandateImportEntry;
    request: object;
    response: object;
}
interface MandateImportEntryListResponse {
    mandateimportentry: MandateImportEntry[];
    request: object;
    response: object;
}
declare function MandateImportEntries(api: any): void;
