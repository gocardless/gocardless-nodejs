import * as Types from '../types/Types.js';
interface MandatePdfResponse extends Types.MandatePdf, Types.APIResponse {
}
interface MandatePdfCreateRequest {
    account_holder_name?: string;
    account_number?: string;
    account_type?: Types.MandatePdfAccountType;
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    bank_code?: string;
    bic?: string;
    branch_code?: string;
    city?: string;
    company_name?: string;
    country_code?: string;
    danish_identity_number?: string;
    family_name?: string;
    given_name?: string;
    iban?: string;
    links?: Types.MandatePdfCreateRequestLinks;
    mandate_reference?: string;
    payer_ip_address?: string;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    scheme?: string;
    signature_date?: string;
    subscription_amount?: string;
    subscription_frequency?: Types.MandatePdfSubscriptionFrequency;
    swedish_identity_number?: string;
}
export declare class MandatePdfService {
    private api;
    constructor(api: any);
    create(requestParameters: MandatePdfCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<MandatePdfResponse>;
}
export {};
//# sourceMappingURL=mandatePdfService.d.ts.map