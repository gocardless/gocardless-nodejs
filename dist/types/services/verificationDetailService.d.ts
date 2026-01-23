import * as Types from '../types/Types.js';
interface VerificationDetailResponse extends Types.VerificationDetail, Types.APIResponse {
}
interface VerificationDetailListResponse extends Types.APIResponse {
    verification_details: Array<Types.VerificationDetail>;
    meta: Types.ListMeta;
}
interface VerificationDetailCreateRequest {
    address_line1: string;
    address_line2?: string;
    address_line3?: string;
    city: string;
    company_number: string;
    description: string;
    directors: Types.VerificationDetailDirector[];
    links: Types.VerificationDetailCreateRequestLinks;
    name: string;
    postal_code: string;
}
interface VerificationDetailListRequest {
    after?: string;
    before?: string;
    creditor: string;
    limit?: string;
}
export declare class VerificationDetailService {
    private api;
    constructor(api: any);
    create(requestParameters: VerificationDetailCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<VerificationDetailResponse>;
    list(requestParameters: VerificationDetailListRequest, customHeaders?: Types.JsonMap): Promise<VerificationDetailListResponse>;
    all(requestParameters: VerificationDetailListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.VerificationDetail, void, unknown>;
}
export {};
//# sourceMappingURL=verificationDetailService.d.ts.map