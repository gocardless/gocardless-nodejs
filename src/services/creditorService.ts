'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CreditorResponse extends Types.Creditor, Types.APIResponse {}

interface CreditorListResponse extends Types.APIResponse {
  creditors: Array<Types.Creditor>;
  meta: Types.ListMeta;
}

interface CreditorCreateRequest {
  // Prefix for the bank reference of payouts sent to this creditor. For instance,
  // if
  // the creditor's `bank_reference_prefix` was `ACME`, the bank reference of a
  // payout
  // sent to that creditor could be `ACME-8G7Q8`.
  //
  // This prefix is also used for refunds in EUR and GBP.
  //

  bank_reference_prefix?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

  country_code: string;

  // The type of business of the creditor. Currently, `individual`, `company`,
  // `charity`, `partnership`, and `trust` are supported.

  creditor_type: Types.CreditorCreditorType;

  // The creditor's trading name.

  name: string;
}

interface CreditorListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this Creditor.
  created_at?: Types.CreatedAtFilter;

  // Number of records to return.

  limit?: string;
}

interface CreditorUpdateRequest {
  // The first line of the creditor's address.

  address_line1?: string;

  // The second line of the creditor's address.

  address_line2?: string;

  // The third line of the creditor's address.

  address_line3?: string;

  // Prefix for the bank reference of payouts sent to this creditor. For instance,
  // if
  // the creditor's `bank_reference_prefix` was `ACME`, the bank reference of a
  // payout
  // sent to that creditor could be `ACME-8G7Q8`.
  //
  // This prefix is also used for refunds in EUR and GBP.
  //

  bank_reference_prefix?: string;

  // The city of the creditor's address.

  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

  country_code?: string;

  // Resources linked to this Creditor.
  links?: Types.CreditorUpdateRequestLinks;

  // The creditor's trading name.

  name?: string;

  // The creditor's postal code.

  postal_code?: string;

  // The creditor's address region, county or department.

  region?: string;
}

export class CreditorService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: CreditorCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<CreditorResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditors',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...(response.body?.['creditors'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: CreditorListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<CreditorListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditors',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: CreditorListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.Creditor, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const creditor of list.creditors) {
        yield creditor;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditors/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...response.body['creditors'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async update(
    identity: string,
    requestParameters: CreditorUpdateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditors/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...response.body['creditors'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
