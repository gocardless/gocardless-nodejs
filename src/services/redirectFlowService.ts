'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface RedirectFlowResponse extends Types.RedirectFlow, Types.APIResponse {}

interface RedirectFlowListResponse extends Types.APIResponse {
  redirect_flows: Types.RedirectFlow[];
  meta: Types.ListMeta;
}

interface RedirectFlowCreateRequest {
  // A description of the item the customer is paying for. This will be shown on
  // the hosted payment pages.
  description?: string;

  // Resources linked to this RedirectFlow.
  links: Types.RedirectFlowCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: Types.JsonMap;

  // Information used to prefill the payment page so your customer doesn't have to
  // re-type details you already hold about them. It will be stored unvalidated
  // and the customer will be able to review and amend it before completing the
  // form.prefilled_customer?: Types.RedirectFlowPrefilledCustomer

  // The Direct Debit scheme of the mandate. If specified, the payment pages will
  // only allow the set-up of a mandate for the specified scheme. It is
  // recommended that you leave this blank so the most appropriate scheme is
  // picked based on the customer's bank account.
  scheme?: Types.RedirectFlowScheme;

  // The customer's session ID must be provided when the redirect flow is set up
  // and again when it is completed. This allows integrators to ensure that the
  // user who was originally sent to the GoCardless payment pages is the one who
  // has completed them.
  session_token: string;

  // The URL to redirect to upon successful mandate setup. You must use a URL
  // beginning `https` in the live environment.
  success_redirect_url: string;
}

interface RedirectFlowCompleteRequest {
  // The customer's session ID must be provided when the redirect flow is set up
  // and again when it is completed. This allows integrators to ensure that the
  // user who was originally sent to the GoCardless payment pages is the one who
  // has completed them.
  session_token: string;
}

export class RedirectFlowService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: RedirectFlowCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/redirect_flows',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'redirect_flows',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RedirectFlowResponse = {
      ...response.body['redirect_flows'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async find(identity: string): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/redirect_flows/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RedirectFlowResponse = {
      ...response.body['redirect_flows'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async complete(
    identity: string,
    requestParameters: RedirectFlowCompleteRequest
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/redirect_flows/:identity/actions/complete',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: RedirectFlowResponse = {
      ...response.body['redirect_flows'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
