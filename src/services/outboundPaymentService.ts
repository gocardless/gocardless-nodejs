import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface OutboundPaymentResponse extends Types.OutboundPayment, Types.APIResponse {}

interface OutboundPaymentListResponse extends Types.APIResponse {
  outbound_payments: Array<Types.OutboundPayment>;
  meta: Types.ListMeta;
}

interface OutboundPaymentCreateRequest {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).

  amount: number;

  // A human-readable description of the outbound payment

  description?: string;

  // A future date on which the outbound payment should be sent.
  // If not specified, the payment will be sent as soon as possible.

  execution_date?: string;

  // Resources linked to this OutboundPayment.
  links: Types.OutboundPaymentCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with
  // key names up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>Faster Payments</strong> - 18 characters, including:
  // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 &-./"<br />

  reference?: string;

  // Bank payment scheme to process the outbound payment. Currently only
  // "faster_payments" (GBP) is supported.

  scheme: Types.OutboundPaymentScheme;
}

interface OutboundPaymentWithdrawRequest {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP, cents
  // in EUR).

  amount: number;

  // A human-readable description of the outbound payment

  description?: string;

  // A future date on which the outbound payment should be sent.
  // If not specified, the payment will be sent as soon as possible.

  execution_date?: string;

  // Resources linked to this OutboundPayment.
  links?: Types.OutboundPaymentWithdrawRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with
  // key names up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>Faster Payments</strong> - 18 characters, including:
  // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 &-./"<br />

  reference?: string;

  // Bank payment scheme to process the outbound payment. Currently only
  // "faster_payments" (GBP) is supported.

  scheme: Types.OutboundPaymentScheme;
}

interface OutboundPaymentCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with
  // key names up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

interface OutboundPaymentListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The beginning of query period

  created_from?: string;

  // The end of query period

  created_to?: string;

  // Number of records to return.

  limit?: string;

  // One of:
  // <ul>
  // <li>`verifying`: The payment has been
  // [created](#outbound-payments-create-an-outbound-payment) and the verification
  // process has begun.</li>
  // <li>`pending_approval`: The payment is awaiting
  // [approval](#outbound-payments-approve-an-outbound-payment).</li>
  // <li>`scheduled`: The payment has passed verification &
  // [approval](#outbound-payments-approve-an-outbound-payment), but processing
  // has not yet begun.</li>
  // <li>`executing`: The execution date has arrived and the payment has been
  // placed in queue for processing.</li>
  // <li>`executed`: The payment has been accepted by the scheme and is now on its
  // way to the recipient.</li>
  // <li>`cancelled`: The payment has been
  // [cancelled](#outbound-payments-cancel-an-outbound-payment) or was not
  // [approved](#outbound-payments-approve-an-outbound-payment) on time.</li>
  // <li>`failed`: The payment was not sent, usually due to an error while or
  // after executing.</li>
  // </ul>

  status?: Types.OutboundPaymentStatus;
}

interface OutboundPaymentUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with
  // key names up to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class OutboundPaymentService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: OutboundPaymentCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payments',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'outbound_payments',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...(response.body?.['outbound_payments'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async withdraw(
    identity: string,
    requestParameters: OutboundPaymentWithdrawRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payments/withdrawal',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async cancel(
    identity: string,
    requestParameters: OutboundPaymentCancelRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/outbound_payments/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async approve(identity: string, customHeaders: Types.JsonMap = {}): Promise<OutboundPaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/outbound_payments/:identity/actions/approve',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<OutboundPaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/outbound_payments/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: OutboundPaymentListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payments',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: OutboundPaymentListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.OutboundPayment, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const outboundpayment of list.outbound_payments) {
        yield outboundpayment;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async update(
    identity: string,
    requestParameters: OutboundPaymentUpdateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/outbound_payments/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'outbound_payments',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async stats(identity: string, customHeaders: Types.JsonMap = {}): Promise<OutboundPaymentResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payments/stats',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentResponse = {
      ...response.body['outbound_payments'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
