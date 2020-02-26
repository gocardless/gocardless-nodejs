import { MandatePdf, ResponseMetadata, MandatePdfAccountType, MandatePdfCreateRequestLinks, MandatePdfSubscriptionFrequency } from '../types/Types';
interface MandatePdfResponse extends MandatePdf {
    __metadata__: ResponseMetadata;
}
interface MandatePdfCreateRequest {
    account_holder_name?: string;
    account_number?: string;
    account_type?: MandatePdfAccountType;
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    bank_code?: string;
    bic?: string;
    branch_code?: string;
    city?: string;
    country_code?: string;
    danish_identity_number?: string;
    iban?: string;
    links?: MandatePdfCreateRequestLinks;
    mandate_reference?: string;
    payer_ip_address?: string;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    scheme?: string;
    signature_date?: string;
    subscription_amount?: string;
    subscription_frequency?: MandatePdfSubscriptionFrequency;
    swedish_identity_number?: string;
}
export declare class MandatePdfService {
    private api;
    constructor(api: any);
    create(requestParameters: MandatePdfCreateRequest, idempotencyKey?: string): Promise<MandatePdfResponse>;
}
export {};
