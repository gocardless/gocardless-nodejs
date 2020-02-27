'use strict';

import { Api } from '../api/Api';
import {
  Refund,
  APIResponse,
  JsonMap,
  ListMeta,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  RefundCreateRequestLinks,
  CreatedAtFilter,
  RefundRefundType,
} from '../types/Types';

interface RefundResponse extends Refund, APIResponse {}

interface RefundListResponse extends APIResponse {
  refunds: Refund[];
  meta: ListMeta;
}

interface RefundCreateRequest {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount: string;

  //
  links: RefundCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

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

  // Total expected refunded amount in minor unit (e.g. pence/cents/öre). If there
  // are
  // other partial refunds against this payment, this value should be the sum of
  // the
  // existing refunds plus the amount of the refund being created.
  //
  // Must be supplied if `links[payment]` is present.
  //
  total_amount_confirmation?: string;
}

interface RefundListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Number of records to return.
  limit?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  mandate?: string;

  // Unique identifier, beginning with "PM".
  payment?: string;

  // Whether a refund was issued against a mandate or a payment. One of:
  // <ul>
  //   <li>`payment`: <em>default</em> returns refunds created against payments
  // only</li>
  //   <li>`mandate`: returns refunds created against mandates only</li>
  // </ul>
  refund_type?: RefundRefundType;
}

interface RefundUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

export class RefundService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: RefundCreateRequest,
    idempotencyKey = ''
  ): Promise<RefundResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/refunds',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'refunds',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RefundResponse = {
      ...response.body['refunds'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: RefundListRequest
  ): Promise<RefundListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/refunds',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RefundListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: RefundListRequest
  ): AsyncGenerator<Refund, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const refund of list.refunds) {
        yield refund;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<RefundResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/refunds/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RefundResponse = {
      ...response.body['refunds'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: RefundUpdateRequest
  ): Promise<RefundResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/refunds/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'refunds',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RefundResponse = {
      ...response.body['refunds'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
