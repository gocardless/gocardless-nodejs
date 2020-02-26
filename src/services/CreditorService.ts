'use strict';

import { Api } from '../api/Api';
import {
  Creditor,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CreatedAtFilter,
  CreditorUpdateRequestLinks,
} from '../types/Types';

interface CreditorResponse extends Creditor {
  __metadata__: ResponseMetadata;
}

interface CreditorListResponse extends Array<Creditor> {
  __metadata__: ResponseMetadata;
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

  //

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

  //
  created_at?: CreatedAtFilter;

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

  // The city of the creditor's address.
  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string;

  //
  links?: CreditorUpdateRequestLinks;

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
    idempotencyKey = ''
  ): Promise<CreditorResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditors',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response: CreditorResponse = await this.api.request(request);
    return response;
  }

  async list(
    requestParameters: CreditorListRequest
  ): Promise<CreditorListResponse> {
    const urlParameters = [];
    const request = {
      path: '/creditors',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response: CreditorListResponse = await this.api.request(request);
    return response;
  }

  async find(identity: string): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/creditors/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: CreditorResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: CreditorUpdateRequest
  ): Promise<CreditorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/creditors/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'creditors',
      fetch: null,
    };

    const response: CreditorResponse = await this.api.request(request);
    return response;
  }
}
