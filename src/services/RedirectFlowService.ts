'use strict';

import { Api } from '../api/Api';
import {
  RedirectFlow,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  RedirectFlowCreateRequestLinks,
  RedirectFlowPrefilledCustomer,
  RedirectFlowScheme,
} from '../types/Types';

interface RedirectFlowResponse extends RedirectFlow {
  __metadata__: ResponseMetadata;
}

interface RedirectFlowListResponse extends Array<RedirectFlow> {
  __metadata__: ResponseMetadata;
}

interface RedirectFlowCreateRequest {
  // A description of the item the customer is paying for. This will be shown on
  // the hosted payment pages.
  description?: string;

  //
  links: RedirectFlowCreateRequestLinks;

  // Information used to prefill the payment page so your customer doesn't have to
  // re-type details you already hold about them. It will be stored unvalidated
  // and the customer will be able to review and amend it before completing the
  // form.
  prefilled_customer?: RedirectFlowPrefilledCustomer;

  // The Direct Debit scheme of the mandate. If specified, the payment pages will
  // only allow the set-up of a mandate for the specified scheme. It is
  // recommended that you leave this blank so the most appropriate scheme is
  // picked based on the customer's bank account.
  scheme?: RedirectFlowScheme;

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
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [];
    const request = {
      path: '/redirect_flows',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'redirect_flows',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/redirect_flows/:identity',
      method: 'GET',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }

  async complete(
    identity: string,
    requestParameters: RedirectFlowCompleteRequest,
    headers: object = {}
  ): Promise<RedirectFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/redirect_flows/:identity/actions/complete',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: RedirectFlowResponse = await this.api.request(request);
    return response;
  }
}
