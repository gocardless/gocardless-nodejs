'use strict';

import { Api } from '../api/Api';
import {
  InstalmentSchedule,
  APIResponse,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  InstalmentScheduleCreateRequestLinks,
  CreatedAtFilter,
  InstalmentScheduleStatus,
} from '../types/Types';

interface InstalmentScheduleResponse extends InstalmentSchedule, APIResponse {}

interface InstalmentScheduleListResponse extends APIResponse {
  instalment_schedules: InstalmentSchedule[];
  meta: JsonMap;
}

interface InstalmentScheduleCreateRequest {
  // The amount to be deducted from each payment as an app fee, to be paid to the
  // partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.
  currency: InstalmentScheduleCurrency;

  //
  instalments: unknown;

  //
  links: InstalmentScheduleCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the instalment schedule, up to 100 chars. This name will also be
  // copied to the payments of the instalment schedule if you use schedule-based
  // creation.
  //
  name: string;

  // An optional reference that will appear on your customer's bank statement. The
  // character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>PAD</strong> - 12 characters<br /> <strong>SEPA</strong> - 140
  // characters <p class='restricted-notice'><strong>Restricted</strong>: You can
  // only specify a payment reference for Bacs payments (that is, when collecting
  // from the UK) if you're on the <a
  // href='https://gocardless.com/pricing'>GoCardless Plus, Pro or Enterprise
  // packages</a>.</p>
  payment_reference?: string;

  // On failure, automatically retry payments using [Optimise Smart Payment
  // Retries](#optimise-smart-payment-retries). Default is `false`.
  retry_if_possible?: boolean;

  // The total amount of the instalment schedule, defined as the sum of all
  // individual
  // payments. If the requested payment amounts do not sum up correctly, a
  // validation
  // error will be returned.
  //
  total_amount: string;
}

interface InstalmentScheduleListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // ID of the associated [customer](#core-endpoints-customers).
  customer?: string;

  // Number of records to return.
  limit?: string;

  // ID of the associated [mandate](#core-endpoints-mandates) which the instalment
  // schedule will create payments against.
  mandate?: string;

  // At most five valid status values
  status?: InstalmentScheduleStatus[];
}

export class InstalmentScheduleService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: InstalmentScheduleCreateRequest,
    idempotencyKey = ''
  ): Promise<InstalmentScheduleResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/instalment_schedules',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'instalment_schedules',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return response;
  }

  async list(
    requestParameters: InstalmentScheduleListRequest
  ): Promise<InstalmentScheduleListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/instalment_schedules',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleListResponse = {
      instalment_schedules: response.body['instalment_schedules'],
      meta: response.body['meta'],
      __response__: response.__response__,
    };

    return response;
  }

  async find(identity: string): Promise<InstalmentScheduleResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/instalment_schedules/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return response;
  }

  async cancel(identity: string): Promise<InstalmentScheduleResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/instalment_schedules/:identity/actions/cancel',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return response;
  }
}
