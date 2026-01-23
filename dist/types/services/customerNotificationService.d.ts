import * as Types from '../types/Types.js';
interface CustomerNotificationResponse extends Types.CustomerNotification, Types.APIResponse {
}
export declare class CustomerNotificationService {
    private api;
    constructor(api: any);
    handle(identity: string, customHeaders?: Types.JsonMap): Promise<CustomerNotificationResponse>;
}
export {};
//# sourceMappingURL=customerNotificationService.d.ts.map