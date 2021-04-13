'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CreditorResponse extends Types.Creditor, Types.APIResponse {}

interface CreditorListResponse extends Types.APIResponse {
  creditors: Types.Creditor[];
  meta: Types.ListMeta;
}

interface CreditorCreateRequest {
  // The first line of the creditor's address.

  address_line1?: string;

  // The second line of the creditor's address.

  address_line2?: string;

  // The third line of the creditor's address.

  address_line3?: string;

  // The city of the creditor's address.

  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

  country_code?: string;

  // The creditor's name.

  name: string;

  // The creditor's postal code.

  postal_code?: string;

  // The creditor's address region, county or department.

  region?: string;
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

interface CreditorGetRequest {}

interface CreditorUpdateRequest {
  // The first line of the creditor's address.

  address_line1?: string;

  // The second line of the creditor's address.

  address_line2?: string;

  // The third line of the creditor's address.

  address_line3?: string;

  // The city of the creditor's address.

  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

  country_code?: string;

  // Resources linked to this Creditor.
  links?: Types.CreditorUpdateRequestLinks;

  // The creditor's name.

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

  async create(
    requestParameters: CreditorCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
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
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...response.body['creditors'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: CreditorListRequest
  ): Promise<CreditorListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditors',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }
  async *all(
    requestParameters: CreditorListRequest
  ): AsyncGenerator<Types.Creditor, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const creditor of list.creditors) {
        yield creditor;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditors/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...response.body['creditors'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: CreditorUpdateRequest
  ): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/creditors/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorResponse = {
      ...response.body['creditors'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
