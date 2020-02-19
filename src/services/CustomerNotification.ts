'use strict';

import { CustomerNotification } from '../types/Types';
import { Api } from '../api/Api';

interface CustomerNotificationResponse extends CustomerNotification {
  request: object;
  response: object;
}

interface CustomerNotificationListResponse extends CustomerNotification {
  request: object;
  response: object;
}

class CustomerNotificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async handle(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<CustomerNotificationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/customer_notifications/:identity/actions/handle',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerNotificationResponse = await this.api.request(
      request
    );
    return response;
  }
}
