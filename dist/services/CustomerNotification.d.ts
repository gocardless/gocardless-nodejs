interface CustomerNotification {
}
interface CustomerNotificationResponse {
    customernotification: CustomerNotification;
    request: object;
    response: object;
}
interface CustomerNotificationListResponse {
    customernotification: CustomerNotification[];
    request: object;
    response: object;
}
declare function CustomerNotifications(api: any): void;
