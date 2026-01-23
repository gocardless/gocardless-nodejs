import * as Types from '../types/Types.js';
interface PayerAuthorisationResponse extends Types.PayerAuthorisation, Types.APIResponse {
}
interface PayerAuthorisationCreateRequest {
    bank_account: Types.PayerAuthorisationBankAccount;
    customer: Types.PayerAuthorisationCustomer;
    mandate: Types.PayerAuthorisationMandate;
}
interface PayerAuthorisationUpdateRequest {
    bank_account: Types.PayerAuthorisationBankAccount;
    customer: Types.PayerAuthorisationCustomer;
    mandate: Types.PayerAuthorisationMandate;
}
export declare class PayerAuthorisationService {
    private api;
    constructor(api: any);
    find(identity: string, customHeaders?: Types.JsonMap): Promise<PayerAuthorisationResponse>;
    create(requestParameters: PayerAuthorisationCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<PayerAuthorisationResponse>;
    update(identity: string, requestParameters: PayerAuthorisationUpdateRequest, customHeaders?: Types.JsonMap): Promise<PayerAuthorisationResponse>;
    submit(identity: string, customHeaders?: Types.JsonMap): Promise<PayerAuthorisationResponse>;
    confirm(identity: string, customHeaders?: Types.JsonMap): Promise<PayerAuthorisationResponse>;
}
export {};
//# sourceMappingURL=payerAuthorisationService.d.ts.map