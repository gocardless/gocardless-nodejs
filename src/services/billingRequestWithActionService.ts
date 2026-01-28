'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BillingRequestWithActionResponse extends Types.BillingRequestWithAction, Types.APIResponse {}

interface BillingRequestWithActionListResponse extends Types.APIResponse {
  billing_request_with_actions: Array<Types.BillingRequestWithAction>;
  meta: Types.ListMeta;
}

interface BillingRequestWithActionCreateWithActionsRequest {
  // Action payloads
  actions?: Types.BillingRequestWithActionActions;

  // (Optional) If true, this billing request can fallback from instant payment to
  // direct debit.
  // Should not be set if GoCardless payment intelligence feature is used.
  //
  // See [Billing Requests: Retain customers with
  // Fallbacks](https://developer.gocardless.com/billing-requests/retain-customers-with-fallbacks/)
  // for more information.

  fallback_enabled?: boolean;

  // Resources linked to this BillingRequestWithAction.
  links?: Types.BillingRequestWithActionCreateWithActionsRequestLinks;

  //
  mandate_request?: Types.BillingRequestWithActionMandateRequest;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Specifies the context or scenario in which the payment is being made. Defines
  // whether the payment is for advance/arrears billing, point of sale
  // transactions, ecommerce, or account transfers. This helps banks and payment
  // processors understand the payment scenario and apply appropriate processing
  // rules and risk controls.

  payment_context_code?: Types.BillingRequestWithActionPaymentContextCode;

  // Specifies the underlying purpose of the payment. Defines the specific reason
  // or type of service/goods the payment relates to, improving straight-through
  // processing and compliance.
  // See [VRP Commercial Payment Purpose
  // Codes](https://developer.gocardless.com/vrp-commercial-payment-purpose-codes/)
  // for the complete list of valid codes.

  payment_purpose_code?: string;

  //
  payment_request?: Types.BillingRequestWithActionPaymentRequest;

  // Specifies the high-level purpose/category of a mandate and/or payment using a
  // set of pre-defined categories. Provides context on the nature and reason for
  // the payment to facilitate processing and compliance.
  // See [Billing Request Purpose
  // Codes](https://developer.gocardless.com/billing-request-purpose-codes/) for
  // the complete list of valid codes.

  purpose_code?: Types.BillingRequestWithActionPurposeCode;
}

export class BillingRequestWithActionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async createWithActions(
    requestParameters: BillingRequestWithActionCreateWithActionsRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<BillingRequestWithActionResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_requests/create_with_actions',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'billing_request_with_actions',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestWithActionResponse = {
      ...(response.body?.['billing_request_with_actions'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
