import * as Types from '../types/Types.js';
interface InstitutionListResponse extends Types.APIResponse {
    institutions: Array<Types.Institution>;
    meta: Types.ListMeta;
}
interface InstitutionListRequest {
    branch_code?: string;
    country_code?: string;
    feature?: string;
    scheme?: string;
}
interface InstitutionListForBillingRequestRequest {
    country_code: string;
    ids?: string[];
    include_disabled?: boolean;
    search?: string;
}
export declare class InstitutionService {
    private api;
    constructor(api: any);
    list(requestParameters: InstitutionListRequest, customHeaders?: Types.JsonMap): Promise<InstitutionListResponse>;
    list_for_billing_request(requestParameters: InstitutionListForBillingRequestRequest, customHeaders?: Types.JsonMap): Promise<InstitutionListResponse>;
}
export {};
//# sourceMappingURL=institutionService.d.ts.map