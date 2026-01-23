import * as Types from '../types/Types.js';
interface CustomerResponse extends Types.Customer, Types.APIResponse {
}
interface CustomerListResponse extends Types.APIResponse {
    customers: Array<Types.Customer>;
    meta: Types.ListMeta;
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
    metadata?: Types.JsonMap;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
}
interface CustomerListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    currency?: Types.CustomerCurrency;
    limit?: string;
    sort_direction?: Types.CustomerSortDirection;
    sort_field?: Types.CustomerSortField;
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
    metadata?: Types.JsonMap;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
}
export declare class CustomerService {
    private api;
    constructor(api: any);
    create(requestParameters: CustomerCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<CustomerResponse>;
    list(requestParameters: CustomerListRequest, customHeaders?: Types.JsonMap): Promise<CustomerListResponse>;
    all(requestParameters: CustomerListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Customer, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<CustomerResponse>;
    update(identity: string, requestParameters: CustomerUpdateRequest, customHeaders?: Types.JsonMap): Promise<CustomerResponse>;
    remove(identity: string, customHeaders?: Types.JsonMap): Promise<CustomerResponse>;
}
export {};
//# sourceMappingURL=customerService.d.ts.map