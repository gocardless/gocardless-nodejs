'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PaymentResponse extends Types.Payment, Types.APIResponse {}

interface PaymentListResponse extends Types.APIResponse {
  payments: Array<Types.Payment>;
  meta: Types.ListMeta;
}

interface PaymentCreateRequest {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).

  amount: string;

  // The amount to be deducted from the payment as the OAuth app's fee, in the
  // lowest denomination for the currency (e.g. pence in GBP, cents in EUR).

  app_fee?: string;

  // A future date on which the payment should be collected. If not specified, the
  // payment will be collected as soon as possible. If the value is before the
  // [mandate](#core-endpoints-mandates)'s `next_possible_charge_date` creation
  // will fail. If the value is not a working day it will be rolled forwards to
  // the next available one.

  charge_date?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency: Types.PaymentCurrency;

  // A human-readable description of the payment. This will be included in the
  // notification email GoCardless sends to your customer if your organisation
  // does not send its own notifications (see [compliance
  // requirements](#appendix-compliance-requirements)).

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
  // <ul>
  // <li>`in_session`: The payer is actively participating in the payment creation
  // session.</li>
  // <li>`off_session`: The payer is not present during the transaction, and the
  // payment is initiated by the merchant based on an established consent (e.g., a
  // recurring subscription payment).</li>
  // </ul>

  psu_interaction_type?: Types.PaymentPsuInteractionType;

  // An optional reference that will appear on your customer's bank statement. The
  // character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>Faster Payments</strong> - 18 characters<br /> <strong>PAD</strong> -
  // scheme doesn't offer references<br /> <strong>PayTo</strong> - 18
  // characters<br /> <strong>SEPA</strong> - 140 characters<br /> Note that this
  // reference must be unique (for each merchant) for the BECS scheme as it is a
  // scheme requirement. <p class='restricted-notice'><strong>Restricted</strong>:
  // You can only specify a payment reference for Bacs payments (that is, when
  // collecting from the UK) if you're on the <a
  // href='https://gocardless.com/pricing'>GoCardless Plus, Pro or Enterprise
  // packages</a>.</p> <p class='restricted-notice'><strong>Restricted</strong>:
  // You can not specify a payment reference for Faster Payments.</p>

  reference?: string;

  // On failure, automatically retry the payment using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>

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

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.

  currency?: Types.PaymentCurrency;

  // ID of a customer to filter payments by. If you pass this parameter, you
  // cannot also pass `creditor`.

  customer?: string;

  // Number of records to return.

  limit?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.

  mandate?: string;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported.

  scheme?: string;

  // The direction to sort in.
  // One of:
  // <ul>
  // <li>`asc`</li>
  // <li>`desc`</li>
  // </ul>

  sort_direction?: Types.PaymentSortDirection;

  // Field by which to sort records.
  // One of:
  // <ul>
  // <li>`charge_date`</li>
  // <li>`amount`</li>
  // </ul>

  sort_field?: Types.PaymentSortField;

  // One of:
  // <ul>
  // <li>`pending_customer_approval`: we're waiting for the customer to approve
  // this payment</li>
  // <li>`pending_submission`: the payment has been created, but not yet submitted
  // to the banks</li>
  // <li>`submitted`: the payment has been submitted to the banks</li>
  // <li>`confirmed`: the payment has been confirmed as collected</li>
  // <li>`paid_out`:  the payment has been included in a
  // [payout](#core-endpoints-payouts)</li>
  // <li>`cancelled`: the payment has been cancelled</li>
  // <li>`customer_approval_denied`: the customer has denied approval for the
  // payment. You should contact the customer directly</li>
  // <li>`failed`: the payment failed to be processed. Note that payments can fail
  // after being confirmed if the failure message is sent late by the banks.</li>
  // <li>`charged_back`: the payment has been charged back</li>
  // </ul>

  status?: Types.PaymentStatus;

  // Unique identifier, beginning with "SB".

  subscription?: string;
}

interface PaymentUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // On failure, automatically retry the payment using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>

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
  // [mandate](#core-endpoints-mandates)'s `next_possible_charge_date` creation
  // will fail. If the value is not a working day it will be rolled forwards to
  // the next available one.

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
    idempotencyKey = '',
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
    requestParameters: PaymentListRequest,
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
    requestParameters: PaymentListRequest,
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
    requestParameters: PaymentUpdateRequest,
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
    requestParameters: PaymentCancelRequest,
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
    requestParameters: PaymentRetryRequest,
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
