interface MandateImport {
}
interface MandateImportResponse {
    mandateimport: MandateImport;
    request: object;
    response: object;
}
interface MandateImportListResponse {
    mandateimport: MandateImport[];
    request: object;
    response: object;
}
declare function MandateImports(api: any): void;
