'use strict';

import { Api } from '../api/Api';
import {
  CustomerNotification,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
} from '../types/Types';

interface CustomerNotificationResponse extends CustomerNotification {
  __metadata__: ResponseMetadata;
}

interface CustomerNotificationListResponse extends Array<CustomerNotification> {
  __metadata__: ResponseMetadata;
}

class CustomerNotificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async handle(
    identity: string,
    headers: object = {}
  ): Promise<CustomerNotificationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customer_notifications/:identity/actions/handle',
      method: 'POST',
      urlParameters,

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
