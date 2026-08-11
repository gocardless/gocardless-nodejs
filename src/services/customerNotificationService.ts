import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused for resources that only expose list methods
interface CustomerNotificationResponse extends Types.CustomerNotification, Types.APIResponse {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused for resources that only expose singular (get/create) methods
interface CustomerNotificationListResponse extends Types.APIResponse {
  customer_notifications: Array<Types.CustomerNotification>;
  meta: Types.ListMeta;
}

export class CustomerNotificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async handle(identity: string, customHeaders: Types.JsonMap = {}): Promise<CustomerNotificationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/customer_notifications/:identity/actions/handle',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CustomerNotificationResponse = {
      ...response.body['customer_notifications'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
