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
  // (Experimental feature) Fulfil the Billing Request on completion of the flow
  // (true by default). Disabling the auto_fulfil is not allowed currently.

  auto_fulfil?: boolean;

  // Identifies whether a Billing Request belongs to a specific customer

  customer_details_captured?: boolean;

  // URL that the payer can be taken to if there isn't a way to progress ahead in
  // flow.

  exit_uri?: string;

  // Sets the default language of the Billing Request Flow and the customer. [ISO
  // 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.

  language?: string;

  // Resources linked to this BillingRequestFlow.
  links: Types.BillingRequestFlowCreateRequestLinks;

  // If true, the payer will not be able to change their bank account within the
  // flow. If the bank_account details are collected as part of bank_authorisation
  // then GC will set this value to true mid flow.
  //
  // You can only lock bank account if these have already been completed as a part
  // of the billing request.
  //

  lock_bank_account?: boolean;

  // If true, the payer will not be able to change their currency/scheme manually
  // within the flow. Note that this only applies to the mandate only flows -
  // currency/scheme can never be changed when there is a specified subscription
  // or payment.

  lock_currency?: boolean;

  // If true, the payer will not be able to edit their customer details within the
  // flow. If the customer details are collected as part of bank_authorisation
  // then GC will set this value to true mid flow.
  //
  // You can only lock customer details if these have already been completed as a
  // part of the billing request.
  //

  lock_customer_details?: boolean;

  // Bank account information used to prefill the payment page so your customer
  // doesn't have to re-type details you already hold about them. It will be
  // stored unvalidated and the customer will be able to review and amend it
  // before completing the form.
  prefilled_bank_account?: Types.BillingRequestFlowPrefilledBankAccount;

  // Customer information used to prefill the payment page so your customer
  // doesn't have to re-type details you already hold about them. It will be
  // stored unvalidated and the customer will be able to review and amend it
  // before completing the form.
  prefilled_customer?: Types.BillingRequestFlowPrefilledCustomer;

  // URL that the payer can be redirected to after completing the request flow.

  redirect_uri?: string;

  // If true, the payer will be able to see redirect action buttons on Thank You
  // page. These action buttons will provide a way to connect back to the billing
  // request flow app if opened within a mobile app. For successful flow, the
  // button will take the payer back the billing request flow where they will see
  // the success screen. For failure, button will take the payer to url being
  // provided against exit_uri field.

  show_redirect_buttons?: boolean;

  // If true, the payer will be able to see a redirect action button on the
  // Success page. This action button will provide a way to redirect the payer to
  // the given redirect_uri. This functionality is helpful when merchants do not
  // want payers to be automatically redirected or on Android devices, where
  // automatic redirections are not possible.

  show_success_redirect_button?: boolean;

  // If true, the payer will not be redirected to the success screen after
  // completing the flow. A redirect_uri needs to be provided for this parameter
  // to be taken into account.

  skip_success_screen?: boolean;
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

  async initialise(identity: string): Promise<BillingRequestFlowResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/billing_request_flows/:identity/actions/initialise',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestFlowResponse = {
      ...response.body['billing_request_flows'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
