import * as Types from '../types/Types.js';
interface BankAuthorisationResponse extends Types.BankAuthorisation, Types.APIResponse {
}
interface BankAuthorisationCreateRequest {
    links: Types.BankAuthorisationCreateRequestLinks;
    redirect_uri?: string;
}
export declare class BankAuthorisationService {
    private api;
    constructor(api: any);
    create(requestParameters: BankAuthorisationCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BankAuthorisationResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BankAuthorisationResponse>;
}
export {};
//# sourceMappingURL=bankAuthorisationService.d.ts.map