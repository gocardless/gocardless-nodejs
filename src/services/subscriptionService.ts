'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface SubscriptionResponse extends Types.Subscription, Types.APIResponse {}

interface SubscriptionListResponse extends Types.APIResponse {
  subscriptions: Types.Subscription[];
  meta: Types.ListMeta;
}

interface SubscriptionCreateRequest {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).

  amount: string;

  // The amount to be deducted from each payment as an app fee, to be paid to the
  // partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  // The total number of payments that should be taken by this subscription.

  count?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.

  day_of_month?: string;

  // Date on or after which no further payments should be created.
  // <br />
  // If this field is blank and `count` is not specified, the subscription will
  // continue forever.
  // <br />
  // <p class="deprecated-notice"><strong>Deprecated</strong>: This field will be
  // removed in a future API version. Use `count` to specify a number of payments
  // instead.</p>

  end_date?: string;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.

  interval?: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly` or
  // `yearly`.

  interval_unit: Types.SubscriptionIntervalUnit;

  // Resources linked to this Subscription.
  links: Types.SubscriptionCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //

  month?: Types.SubscriptionMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.

  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  // <p class="restricted-notice"><strong>Restricted</strong>: You need your own
  // Service User Number to specify a payment reference for Bacs payments.</p>

  payment_reference?: string;

  // On failure, automatically retry payments using [intelligent
  // retries](#success-intelligent-retries). Default is `false`.

  retry_if_possible?: boolean;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // left blank and `month` or `day_of_month` are provided, this will be set to
  // the date of the first payment. If created without `month` or `day_of_month`
  // this will be set as the mandate's `next_possible_charge_date`

  start_date?: string;
}

interface SubscriptionListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this Subscription.
  created_at?: Types.CreatedAtFilter;

  // Unique identifier, beginning with "CU".

  customer?: string;

  // Number of records to return.

  limit?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.

  mandate?: string;

  // Upto 5 of:
  // <ul>
  // <li>`pending_customer_approval`</li>
  // <li>`customer_approval_denied`</li>
  // <li>`active`</li>
  // <li>`finished`</li>
  // <li>`cancelled`</li>
  // <li>`paused`</li>
  // </ul>
  // Omit entirely to include subscriptions in all states.

  status?: Types.SubscriptionStatus[];
}

interface SubscriptionUpdateRequest {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).

  amount?: string;

  // The amount to be deducted from each payment as an app fee, to be paid to the
  // partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.

  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  // <p class="restricted-notice"><strong>Restricted</strong>: You need your own
  // Service User Number to specify a payment reference for Bacs payments.</p>

  payment_reference?: string;

  // On failure, automatically retry payments using [intelligent
  // retries](#success-intelligent-retries). Default is `false`.

  retry_if_possible?: boolean;
}

interface SubscriptionPauseRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // The number of cycles to pause a subscription for. A cycle is one duration of
  // `interval` and `interval_unit`.

  pause_cycles?: number;
}

interface SubscriptionResumeRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

interface SubscriptionCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class SubscriptionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: SubscriptionCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<SubscriptionResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/subscriptions',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...(response.body?.['subscriptions'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: SubscriptionListRequest
  ): Promise<SubscriptionListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/subscriptions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: SubscriptionListRequest
  ): AsyncGenerator<Types.Subscription, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const subscription of list.subscriptions) {
        yield subscription;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/subscriptions/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...response.body['subscriptions'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: SubscriptionUpdateRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/subscriptions/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...response.body['subscriptions'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async pause(
    identity: string,
    requestParameters: SubscriptionPauseRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/subscriptions/:identity/actions/pause',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...response.body['subscriptions'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async resume(
    identity: string,
    requestParameters: SubscriptionResumeRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/subscriptions/:identity/actions/resume',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...response.body['subscriptions'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async cancel(
    identity: string,
    requestParameters: SubscriptionCancelRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/subscriptions/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SubscriptionResponse = {
      ...response.body['subscriptions'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
