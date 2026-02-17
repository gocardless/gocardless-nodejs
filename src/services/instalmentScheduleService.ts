import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface InstalmentScheduleResponse extends Types.InstalmentSchedule, Types.APIResponse {}

interface InstalmentScheduleListResponse extends Types.APIResponse {
  instalment_schedules: Array<Types.InstalmentSchedule>;
  meta: Types.ListMeta;
}

interface InstalmentScheduleCreateWithDatesRequest {
  //  The amount to be deducted from each payment as an app fee, to be paid to the
  //  partner integration which created the subscription, in the lowest
  //  denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  //  [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  //  code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  //  are supported.

  currency: Types.InstalmentScheduleCurrency;

  //  An explicit array of instalment payments, each specifying at least an
  //  `amount` and `charge_date`. See [create (with
  //  dates)](#instalment-schedules-create-with-dates)

  instalments: Types.InstalmentScheduleInstalment[];

  // Resources linked to this InstalmentSchedule.
  links: Types.InstalmentScheduleCreateWithDatesRequestLinks;

  //  Key-value store of custom data. Up to 3 keys are permitted, with key names
  //  up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  //  Name of the instalment schedule, up to 100 chars. This name will also be
  //  copied to the payments of the instalment schedule if you use schedule-based
  //  creation.

  name: string;

  //  An optional reference that will appear on your customer's bank statement.
  //  The character limit for this reference is dependent on the scheme.<br />
  //  <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  //  characters<br /> <strong>Bacs</strong> - 10 characters<br />
  //  <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  //  characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  //  <strong>Faster Payments</strong> - 18 characters<br /> <strong>PAD</strong>
  //  - scheme doesn't offer references<br /> <strong>PayTo</strong> - 18
  //  characters<br /> <strong>SEPA</strong> - 140 characters<br /> Note that this
  //  reference must be unique (for each merchant) for the BECS scheme as it is a
  //  scheme requirement. <p
  //  class='restricted-notice'><strong>Restricted</strong>: You can only specify
  //  a payment reference for Bacs payments (that is, when collecting from the UK)
  //  if you're on the <a href='https://gocardless.com/pricing'>GoCardless Plus,
  //  Pro or Enterprise packages</a>.</p> <p
  //  class='restricted-notice'><strong>Restricted</strong>: You can not specify a
  //  payment reference for Faster Payments.</p>

  payment_reference?: string;

  //  On failure, automatically retry payments using [intelligent
  //  retries](/success-plus/overview). Default is `false`. <p
  //  class="notice"><strong>Important</strong>: To be able to use intelligent
  //  retries, Success+ needs to be enabled in [GoCardless
  //  dashboard](https://manage.gocardless.com/success-plus). </p>

  retry_if_possible?: boolean;

  //  The total amount of the instalment schedule, defined as the sum of all
  //  individual
  //  payments, in the lowest denomination for the currency (e.g. pence in GBP,
  //  cents in
  //  EUR). If the requested payment amounts do not sum up correctly, a validation
  //  error
  //  will be returned.

  total_amount: string;
}

interface InstalmentScheduleCreateWithScheduleRequest {
  //  The amount to be deducted from each payment as an app fee, to be paid to the
  //  partner integration which created the subscription, in the lowest
  //  denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  //  [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  //  code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  //  are supported.

  currency: Types.InstalmentScheduleCurrency;

  //  Frequency of the payments you want to create, together with an array of
  //  payment
  //  amounts to be collected, with a specified start date for the first payment.
  //  See [create (with schedule)](#instalment-schedules-create-with-schedule)
  //
  instalments: Types.InstalmentScheduleInstalments;

  // Resources linked to this InstalmentSchedule.
  links: Types.InstalmentScheduleCreateWithScheduleRequestLinks;

  //  Key-value store of custom data. Up to 3 keys are permitted, with key names
  //  up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  //  Name of the instalment schedule, up to 100 chars. This name will also be
  //  copied to the payments of the instalment schedule if you use schedule-based
  //  creation.

  name: string;

  //  An optional reference that will appear on your customer's bank statement.
  //  The character limit for this reference is dependent on the scheme.<br />
  //  <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  //  characters<br /> <strong>Bacs</strong> - 10 characters<br />
  //  <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  //  characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  //  <strong>Faster Payments</strong> - 18 characters<br /> <strong>PAD</strong>
  //  - scheme doesn't offer references<br /> <strong>PayTo</strong> - 18
  //  characters<br /> <strong>SEPA</strong> - 140 characters<br /> Note that this
  //  reference must be unique (for each merchant) for the BECS scheme as it is a
  //  scheme requirement. <p
  //  class='restricted-notice'><strong>Restricted</strong>: You can only specify
  //  a payment reference for Bacs payments (that is, when collecting from the UK)
  //  if you're on the <a href='https://gocardless.com/pricing'>GoCardless Plus,
  //  Pro or Enterprise packages</a>.</p> <p
  //  class='restricted-notice'><strong>Restricted</strong>: You can not specify a
  //  payment reference for Faster Payments.</p>

  payment_reference?: string;

  //  On failure, automatically retry payments using [intelligent
  //  retries](/success-plus/overview). Default is `false`. <p
  //  class="notice"><strong>Important</strong>: To be able to use intelligent
  //  retries, Success+ needs to be enabled in [GoCardless
  //  dashboard](https://manage.gocardless.com/success-plus). </p>

  retry_if_possible?: boolean;

  //  The total amount of the instalment schedule, defined as the sum of all
  //  individual
  //  payments, in the lowest denomination for the currency (e.g. pence in GBP,
  //  cents in
  //  EUR). If the requested payment amounts do not sum up correctly, a validation
  //  error
  //  will be returned.

  total_amount: string;
}

interface InstalmentScheduleListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this InstalmentSchedule.
  created_at?: Types.CreatedAtFilter;

  //  ID of the associated [customer](#core-endpoints-customers).

  customer?: string;

  //  Number of records to return.

  limit?: string;

  //  ID of the associated [mandate](#core-endpoints-mandates) which the
  //  instalment schedule will create payments against.

  mandate?: string;

  //  At most five valid status values

  status?: Types.InstalmentScheduleStatus[];
}

interface InstalmentScheduleUpdateRequest {
  //  Key-value store of custom data. Up to 3 keys are permitted, with key names
  //  up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class InstalmentScheduleService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async createWithDates(
    requestParameters: InstalmentScheduleCreateWithDatesRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<InstalmentScheduleResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/instalment_schedules',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'instalment_schedules',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...(response.body?.['instalment_schedules'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async createWithSchedule(
    requestParameters: InstalmentScheduleCreateWithScheduleRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<InstalmentScheduleResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/instalment_schedules',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'instalment_schedules',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...(response.body?.['instalment_schedules'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: InstalmentScheduleListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<InstalmentScheduleListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/instalment_schedules',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: InstalmentScheduleListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.InstalmentSchedule, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const instalmentschedule of list.instalment_schedules) {
        yield instalmentschedule;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<InstalmentScheduleResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/instalment_schedules/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async update(
    identity: string,
    requestParameters: InstalmentScheduleUpdateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<InstalmentScheduleResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/instalment_schedules/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'instalment_schedules',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async cancel(identity: string, customHeaders: Types.JsonMap = {}): Promise<InstalmentScheduleResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/instalment_schedules/:identity/actions/cancel',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstalmentScheduleResponse = {
      ...response.body['instalment_schedules'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
