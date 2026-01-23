import * as Types from '../types/Types.js';
interface BankAccountHolderVerificationResponse extends Types.BankAccountHolderVerification, Types.APIResponse {
}
interface BankAccountHolderVerificationCreateRequest {
    links: Types.BankAccountHolderVerificationCreateRequestLinks;
    type: Types.BankAccountHolderVerificationType;
}
export declare class BankAccountHolderVerificationService {
    private api;
    constructor(api: any);
    create(requestParameters: BankAccountHolderVerificationCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BankAccountHolderVerificationResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BankAccountHolderVerificationResponse>;
}
export {};
//# sourceMappingURL=bankAccountHolderVerificationService.d.ts.map