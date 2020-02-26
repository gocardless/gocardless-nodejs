import { Customer, ResponseMetadata, JsonMap, CustomerCurrency, CreatedAtFilter } from '../types/Types';
interface CustomerResponse extends Customer {
    __metadata__: ResponseMetadata;
}
interface CustomerListResponse extends Array<Customer> {
    __metadata__: ResponseMetadata;
}
interface CustomerCreateRequest {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    company_name?: string;
    country_code?: string;
    danish_identity_number?: string;
    email?: string;
    family_name?: string;
    given_name?: string;
    language?: string;
    metadata?: JsonMap;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
}
interface CustomerListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    currency?: CustomerCurrency;
    limit?: string;
}
interface CustomerUpdateRequest {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    company_name?: string;
    country_code?: string;
    danish_identity_number?: string;
    email?: string;
    family_name?: string;
    given_name?: string;
    language?: string;
    metadata?: JsonMap;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
}
export declare class CustomerService {
    private api;
    constructor(api: any);
    create(requestParameters: CustomerCreateRequest, headers?: object): Promise<CustomerResponse>;
    list(requestParameters: CustomerListRequest, headers?: object): Promise<CustomerListResponse>;
    find(identity: string, headers?: object): Promise<CustomerResponse>;
    update(identity: string, requestParameters: CustomerUpdateRequest, headers?: object): Promise<CustomerResponse>;
    remove(identity: string, headers?: object): Promise<CustomerResponse>;
}
export {};
