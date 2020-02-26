import { CustomerNotification, ResponseMetadata } from '../types/Types';
interface CustomerNotificationResponse extends CustomerNotification {
    __metadata__: ResponseMetadata;
}
export declare class CustomerNotificationService {
    private api;
    constructor(api: any);
    handle(identity: string, headers?: object): Promise<CustomerNotificationResponse>;
}
export {};
