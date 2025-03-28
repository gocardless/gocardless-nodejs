'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CustomerNotificationResponse extends Types.CustomerNotification, Types.APIResponse {}

interface CustomerNotificationListResponse extends Types.APIResponse {
  customer_notifications: Array<Types.CustomerNotification>;
  meta: Types.ListMeta;
}

export class CustomerNotificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async handle(identity: string): Promise<CustomerNotificationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/customer_notifications/:identity/actions/handle',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CustomerNotificationResponse = {
      ...response.body['customer_notifications'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
