'use strict';

import { Api } from '../api/Api';
import {
  CustomerNotification,
  APIResponse,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
} from '../types/Types';

interface CustomerNotificationResponse
  extends CustomerNotification,
    APIResponse {}

interface CustomerNotificationListResponse extends APIResponse {
  customer_notifications: CustomerNotification[];
  meta: JsonMap;
}

export class CustomerNotificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async handle(identity: string): Promise<CustomerNotificationResponse> {
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

    return response;
  }
}
