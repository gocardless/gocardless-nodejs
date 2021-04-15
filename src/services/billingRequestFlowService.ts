'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BillingRequestFlowResponse
  extends Types.BillingRequestFlow,
    Types.APIResponse {}

interface BillingRequestFlowListResponse extends Types.APIResponse {
  billing_request_flows: Types.BillingRequestFlow[];
  meta: Types.ListMeta;
}

interface BillingRequestFlowCreateRequest {
  // Resources linked to this BillingRequestFlow.
  links: Types.BillingRequestFlowCreateRequestLinks;

  // If true, the payer will not be able to edit their existing details (e.g.
  // customer and bank account) within the billing request flow.

  lock_existing_details?: boolean;

  // URL that the payer can be redirected to after completing the request flow.

  redirect_uri?: string;
}

export class BillingRequestFlowService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: BillingRequestFlowCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<BillingRequestFlowResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_request_flows',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'billing_request_flows',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestFlowResponse = {
      ...(response.body?.['billing_request_flows'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
