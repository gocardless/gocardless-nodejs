'use strict';

import { Api } from '../api/Api';
import {
  Subscription,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  SubscriptionIntervalUnit,
  SubscriptionCreateRequestLinks,
  SubscriptionMonth,
  CreatedAtFilter,
  SubscriptionStatus,
} from '../types/Types';

interface SubscriptionResponse extends Subscription {
  __metadata__: ResponseMetadata;
}

interface SubscriptionListResponse extends Array<Subscription> {
  __metadata__: ResponseMetadata;
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

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code. Currently
  // `GBP`, `EUR`, `SEK`, `DKK`, `AUD`, `NZD` and `CAD` are supported.
  currency: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.
  day_of_month?: string;

  // Date on or after which no further payments should be created. If this field
  // is blank and `count` is not specified, the subscription will continue
  // forever. <p class='deprecated-notice'><strong>Deprecated</strong>: This field
  // will be removed in a future API version. Use `count` to specify a number of
  // payments instead. </p>
  end_date?: string;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.
  interval?: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly` or
  // `yearly`.
  interval_unit: SubscriptionIntervalUnit;

  //
  links: SubscriptionCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //
  month?: SubscriptionMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment created and will appear on your customer's bank statement. See the
  // documentation for the [create payment endpoint](#payments-create-a-payment)
  // for more details. <p class='restricted-notice'><strong>Restricted</strong>:
  // You need your own Service User Number to specify a payment reference for Bacs
  // payments.</p>
  payment_reference?: string;

  // On failure, automatically retry payments using [Optimise Smart Payment
  // Retries](#optimise-smart-payment-retries). Default is `false`.
  retry_if_possible?: boolean;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // blank, this will be set as the mandate's `next_possible_charge_date`.
  start_date?: string;
}

interface SubscriptionListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Unique identifier, beginning with "CU".
  customer?: string;

  // Number of records to return.
  limit?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  mandate?: string;

  // At most four valid status values
  status?: SubscriptionStatus[];
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
  metadata?: JsonMap;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment created and will appear on your customer's bank statement. See the
  // documentation for the [create payment endpoint](#payments-create-a-payment)
  // for more details. <p class='restricted-notice'><strong>Restricted</strong>:
  // You need your own Service User Number to specify a payment reference for Bacs
  // payments.</p>
  payment_reference?: string;
}

interface SubscriptionCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

export class SubscriptionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: SubscriptionCreateRequest,
    idempotencyKey = ''
  ): Promise<SubscriptionResponse> {
    const urlParameters = [];
    const request = {
      path: '/subscriptions',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }

  async list(
    requestParameters: SubscriptionListRequest
  ): Promise<SubscriptionListResponse> {
    const urlParameters = [];
    const request = {
      path: '/subscriptions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response: SubscriptionListResponse = await this.api.request(request);
    return response;
  }

  async find(identity: string): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/subscriptions/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: SubscriptionUpdateRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/subscriptions/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'subscriptions',
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: SubscriptionCancelRequest
  ): Promise<SubscriptionResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/subscriptions/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response: SubscriptionResponse = await this.api.request(request);
    return response;
  }
}
