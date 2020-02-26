import { InstalmentSchedule, ResponseMetadata, JsonMap, InstalmentScheduleCurrency, InstalmentScheduleCreateRequestLinks, CreatedAtFilter, InstalmentScheduleStatus } from '../types/Types';
interface InstalmentScheduleResponse extends InstalmentSchedule {
    __metadata__: ResponseMetadata;
}
interface InstalmentScheduleListResponse extends Array<InstalmentSchedule> {
    __metadata__: ResponseMetadata;
}
interface InstalmentScheduleCreateRequest {
    app_fee?: string;
    currency: InstalmentScheduleCurrency;
    instalments: unknown;
    links: InstalmentScheduleCreateRequestLinks;
    metadata?: JsonMap;
    name: string;
    payment_reference?: string;
    retry_if_possible?: boolean;
    total_amount: string;
}
interface InstalmentScheduleListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    customer?: string;
    limit?: string;
    mandate?: string;
    status?: InstalmentScheduleStatus[];
}
export declare class InstalmentScheduleService {
    private api;
    constructor(api: any);
    create(requestParameters: InstalmentScheduleCreateRequest, headers?: object): Promise<InstalmentScheduleResponse>;
    list(requestParameters: InstalmentScheduleListRequest, headers?: object): Promise<InstalmentScheduleListResponse>;
    find(identity: string, headers?: object): Promise<InstalmentScheduleResponse>;
    cancel(identity: string, headers?: object): Promise<InstalmentScheduleResponse>;
}
export {};