import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused for resources that only expose list methods
interface PaymentResponse extends Types.Payment, Types.APIResponse {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused for resources that only expose singular (get/create) methods
interface PaymentListResponse extends Types.APIResponse {
  payments: Array<Types.Payment>;
  meta: Types.ListMeta;
}

interface PaymentCreateRequest {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).
  //
  // Minimum and maximum amounts vary by payment scheme. For more information, see
  // Transaction limits
  // (https://support.gocardless.com/hc/en-gb/articles/115000309245-Transaction-limits)
  //
  // For Variable Recurring Payments (VRP), this must not exceed the mandate's
  // `max_amount_per_payment`
  // constraint.

  amount: string;

  // The amount to be deducted from the payment as the OAuth app's fee, in the
  // lowest denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  // A future date on which the payment should be collected. If not specified, the
  // payment will be collected as soon as possible. If the value is before the
  // mandate
  // (https://developer.gocardless.com/api-reference/#core-endpoints-mandates)'s
  // `next_possible_charge_date` creation will fail. If the value is not a working
  // day it will be rolled forwards to the next available one.

  charge_date?: string;

  // ISO 4217 (https://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency: `${Types.PaymentCurrency}`;

  // A human-readable description of the payment. This will be included in the
  // notification email GoCardless sends to your customer if your organisation
  // does not send its own notifications (see compliance requirements
  // (https://developer.gocardless.com/api-reference/#appendix-compliance-requirements)).

  description?: string;

  // Set this to true or false in the request to create an ACH payment to
  // explicitly choose whether the payment should be processed through Faster
  // ACH or standard ACH, rather than relying on the presence or absence of the
  // charge date to indicate that.

  faster_ach?: boolean;

  // Resources linked to this Payment.
  links: Types.PaymentCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Indicates how a Variable Recurring Payment (VRP) is initiated, by or on
  // behalf of the payer.
  //
  // - `in_session`: The payer is actively participating in the payment creation
  // session.
  // - `off_session`: The payer is not present during the transaction, and the
  // payment is initiated by the merchant based on an established consent (e.g., a
  // recurring subscription payment).

  psu_interaction_type?: `${Types.PaymentPsuInteractionType}`;

  // An optional reference that will appear on your customer's bank statement. The
  // character limit for this reference is dependent on the scheme.
  //  ACH <ul>
  // <li>10 characters</li>
  // </ul>
  //  Autogiro <ul>
  // <li>11 characters</li>
  // </ul>
  //  Bacs <ul>
  // <li>10 characters</li>
  // </ul>
  //  BECS <ul>
  // <li>30 characters</li>
  // </ul>
  //  BECS NZ <ul>
  // <li>12 characters</li>
  // </ul>
  //  Betalingsservice <ul>
  // <li>30 characters</li>
  // </ul>
  //  Faster Payments <ul>
  // <li>18 characters</li>
  // </ul>
  //  PAD <ul>
  // <li>scheme doesn't offer references</li>
  // </ul>
  //  PayTo <ul>
  // <li>18 characters</li>
  // </ul>
  //  SEPA <ul>
  // <li>140 characters</li>
  // </ul>
  //  Note that this reference must be unique (for each merchant) for the BECS
  // scheme as it is a scheme requirement. Restricted: You can only specify a
  // payment reference for Bacs payments (that is, when collecting from the UK) if
  // you're on the GoCardless Plus, Pro or Enterprise packages
  // (https://gocardless.com/pricing).
  //  Restricted: You can not specify a payment reference for Faster Payments.

  reference?: string;

  // On failure, automatically retry the payment using intelligent retries
  // (https://developer.gocardless.com/success-plus/overview). Default is `false`.
  // Important: To be able to use intelligent retries, Success+ needs to be
  // enabled in GoCardless dashboard (https://manage.gocardless.com/success-plus).
  //

  retry_if_possible?: boolean;
}

interface PaymentListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  //
  charge_date?: Types.PaymentChargeDate;

  // The creation date of this Payment.
  created_at?: Types.CreatedAtFilter;

  // ID of a creditor to filter payments by. If you pass this parameter, you
  // cannot also pass `customer`.

  creditor?: string;

  // ISO 4217 (https://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency?: `${Types.PaymentCurrency}`;

  // ID of a customer to filter payments by. If you pass this parameter, you
  // cannot also pass `creditor`.

  customer?: string;

  // Number of records to return.

  limit?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.

  mandate?: string;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to",
  // "sepa_core", "sepa_credit_transfer" and "sepa_instant_credit_transfer" are
  // supported.

  scheme?: string;

  // The direction to sort in.
  // One of:
  //
  // - `asc`
  // - `desc`

  sort_direction?: `${Types.PaymentSortDirection}`;

  // Field by which to sort records.
  // One of:
  //
  // - `charge_date`
  // - `amount`

  sort_field?: `${Types.PaymentSortField}`;

  // One of:
  //
  // - `pending_customer_approval`: we're waiting for the customer to approve this
  // payment
  // - `pending_submission`: the payment has been created, but not yet submitted
  // to the banks
  // - `submitted`: the payment has been submitted to the banks
  // - `confirmed`: the payment has been confirmed as collected
  // - `paid_out`: the payment has been included in a payout
  // (https://developer.gocardless.com/api-reference/#core-endpoints-payouts)
  // - `cancelled`: the payment has been cancelled
  // - `customer_approval_denied`: the customer has denied approval for the
  // payment. You should contact the customer directly
  // - `failed`: the payment failed to be processed. Note that payments can fail
  // after being confirmed if the failure message is sent late by the banks.
  // - `charged_back`: the payment has been charged back

  status?: `${Types.PaymentStatus}`;

  // Unique identifier, beginning with "SB".

  subscription?: string;
}

interface PaymentUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // On failure, automatically retry the payment using intelligent retries
  // (https://developer.gocardless.com/success-plus/overview). Default is `false`.
  // Important: To be able to use intelligent retries, Success+ needs to be
  // enabled in GoCardless dashboard (https://manage.gocardless.com/success-plus).
  //

  retry_if_possible?: boolean;
}

interface PaymentCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

interface PaymentRetryRequest {
  // A future date on which the payment should be collected. If not specified, the
  // payment will be collected as soon as possible. If the value is before the
  // mandate
  // (https://developer.gocardless.com/api-reference/#core-endpoints-mandates)'s
  // `next_possible_charge_date` creation will fail. If the value is not a working
  // day it will be rolled forwards to the next available one.

  charge_date?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class PaymentService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: PaymentCreateRequest,
    idempotencyKey: string = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payments',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'payments',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...(response.body?.['payments'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters?: Partial<PaymentListRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payments',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters?: Partial<PaymentListRequest>,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.Payment, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const payment of list.payments) {
        yield payment;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async update(
    identity: string,
    requestParameters?: Partial<PaymentUpdateRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'payments',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async cancel(
    identity: string,
    requestParameters?: Partial<PaymentCancelRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async retry(
    identity: string,
    requestParameters?: Partial<PaymentRetryRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity/actions/retry',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
