'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PaymentResponse extends Types.Payment, Types.APIResponse {}

interface PaymentListResponse extends Types.APIResponse {
  payments: Types.Payment[];
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
  // payment will be collected as soon as possible. This must be on or after the
  // [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`, and will
  // be rolled-forwards by GoCardless if it is not a working day.
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

  // Resources linked to this Payment.
  links: Types.PaymentCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: Types.JsonMap;

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
  reference?: string;

  // On failure, automatically retry the payment using [intelligent
  // retries](#success-intelligent-retries). Default is `false`.
  retry_if_possible?: boolean;
}

interface PaymentListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  // charge_date?: Types.PaymentChargeDate

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
  // retries](#success-intelligent-retries). Default is `false`.
  retry_if_possible?: boolean;
}

interface PaymentCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: Types.JsonMap;
}

interface PaymentRetryRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: Types.JsonMap;
}

export class PaymentService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: PaymentCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
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
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: PaymentListRequest
  ): Promise<PaymentListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payments',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: PaymentListRequest
  ): AsyncGenerator<Types.Payment, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const payment of list.payments) {
        yield payment;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: PaymentUpdateRequest
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'payments',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async cancel(
    identity: string,
    requestParameters: PaymentCancelRequest
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async retry(
    identity: string,
    requestParameters: PaymentRetryRequest
  ): Promise<PaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payments/:identity/actions/retry',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentResponse = {
      ...response.body['payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
