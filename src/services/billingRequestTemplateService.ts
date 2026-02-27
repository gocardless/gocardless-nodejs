import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface BillingRequestTemplateResponse extends Types.BillingRequestTemplate, Types.APIResponse {}

interface BillingRequestTemplateListResponse extends Types.APIResponse {
  billing_request_templates: Array<Types.BillingRequestTemplate>;
  meta: Types.ListMeta;
}

interface BillingRequestTemplateListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // Number of records to return.

  limit?: string;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer` and
  // `sepa_instant_credit_transfer` are supported in supported Eurozone countries
  // (EUR). For Eurozone countries, `sepa_credit_transfer` is used as the default.
  // Please be aware that `sepa_instant_credit_transfer` may incur an additional
  // fee for your customer.

  payment_request_scheme?: string;
}

interface BillingRequestTemplateCreateRequest {
  // Resources linked to this BillingRequestTemplate.
  links?: Types.BillingRequestTemplateCreateRequestLinks;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  mandate_request_constraints?: Types.BillingRequestTemplateMandateRequestConstraints;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.

  mandate_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //

  mandate_request_description?: string;

  // Key-value store of custom data that will be applied to the mandate created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  mandate_request_metadata?: Types.JsonMap;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with from
  // a list of your available schemes.

  mandate_request_scheme?: string;

  // Verification preference for the mandate. One of:
  // <ul>
  //   <li>`minimum`: only verify if absolutely required, such as when part of
  // scheme rules</li>
  //   <li>`recommended`: in addition to `minimum`, use the GoCardless payment
  // intelligence solution to decide if a payer should be verified</li>
  //   <li>`when_available`: if verification mechanisms are available, use
  // them</li>
  //   <li>`always`: as `when_available`, but fail to create the Billing Request
  // if a mechanism isn't available</li>
  // </ul>
  //
  // By default, all Billing Requests use the `recommended` verification
  // preference. It uses GoCardless payment intelligence solution to determine if
  // a payer is fraudulent or not. The verification mechanism is based on the
  // response and the payer may be asked to verify themselves. If the feature is
  // not available, `recommended` behaves like `minimum`.
  //
  // If you never wish to take advantage of our reduced risk products and Verified
  // Mandates as they are released in new schemes, please use the `minimum`
  // verification preference.
  //
  // See [Billing Requests: Creating Verified
  // Mandates](https://developer.gocardless.com/getting-started/billing-requests/verified-mandates/)
  // for more information.

  mandate_request_verify?: Types.BillingRequestTemplateMandateRequestVerify;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Name for the template. Provides a friendly human name for the template, as it
  // is shown in the dashboard. Must not exceed 255 characters.

  name?: string;

  // Amount in full.

  payment_request_amount?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // `GBP` and `EUR` supported; `GBP` with your customers in the UK and for `EUR`
  // with your customers in supported Eurozone countries only.

  payment_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //

  payment_request_description?: string;

  // Key-value store of custom data that will be applied to the payment created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  payment_request_metadata?: Types.JsonMap;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer` and
  // `sepa_instant_credit_transfer` are supported in supported Eurozone countries
  // (EUR). For Eurozone countries, `sepa_credit_transfer` is used as the default.
  // Please be aware that `sepa_instant_credit_transfer` may incur an additional
  // fee for your customer.

  payment_request_scheme?: string;

  // URL that the payer can be redirected to after completing the request flow.

  redirect_uri?: string;
}

interface BillingRequestTemplateUpdateRequest {
  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  mandate_request_constraints?: Types.BillingRequestTemplateMandateRequestConstraints;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.

  mandate_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //

  mandate_request_description?: string;

  // Key-value store of custom data that will be applied to the mandate created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  mandate_request_metadata?: Types.JsonMap;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with from
  // a list of your available schemes.

  mandate_request_scheme?: string;

  // Verification preference for the mandate. One of:
  // <ul>
  //   <li>`minimum`: only verify if absolutely required, such as when part of
  // scheme rules</li>
  //   <li>`recommended`: in addition to `minimum`, use the GoCardless payment
  // intelligence solution to decide if a payer should be verified</li>
  //   <li>`when_available`: if verification mechanisms are available, use
  // them</li>
  //   <li>`always`: as `when_available`, but fail to create the Billing Request
  // if a mechanism isn't available</li>
  // </ul>
  //
  // By default, all Billing Requests use the `recommended` verification
  // preference. It uses GoCardless payment intelligence solution to determine if
  // a payer is fraudulent or not. The verification mechanism is based on the
  // response and the payer may be asked to verify themselves. If the feature is
  // not available, `recommended` behaves like `minimum`.
  //
  // If you never wish to take advantage of our reduced risk products and Verified
  // Mandates as they are released in new schemes, please use the `minimum`
  // verification preference.
  //
  // See [Billing Requests: Creating Verified
  // Mandates](https://developer.gocardless.com/getting-started/billing-requests/verified-mandates/)
  // for more information.

  mandate_request_verify?: Types.BillingRequestTemplateMandateRequestVerify;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // Name for the template. Provides a friendly human name for the template, as it
  // is shown in the dashboard. Must not exceed 255 characters.

  name?: string;

  // Amount in full.

  payment_request_amount?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // `GBP` and `EUR` supported; `GBP` with your customers in the UK and for `EUR`
  // with your customers in supported Eurozone countries only.

  payment_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //

  payment_request_description?: string;

  // Key-value store of custom data that will be applied to the payment created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  payment_request_metadata?: Types.JsonMap;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer` and
  // `sepa_instant_credit_transfer` are supported in supported Eurozone countries
  // (EUR). For Eurozone countries, `sepa_credit_transfer` is used as the default.
  // Please be aware that `sepa_instant_credit_transfer` may incur an additional
  // fee for your customer.

  payment_request_scheme?: string;

  // URL that the payer can be redirected to after completing the request flow.

  redirect_uri?: string;
}

export class BillingRequestTemplateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: BillingRequestTemplateListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<BillingRequestTemplateListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_request_templates',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestTemplateListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: BillingRequestTemplateListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.BillingRequestTemplate, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const billingrequesttemplate of list.billing_request_templates) {
        yield billingrequesttemplate;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<BillingRequestTemplateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/billing_request_templates/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestTemplateResponse = {
      ...response.body['billing_request_templates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async create(
    requestParameters: BillingRequestTemplateCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<BillingRequestTemplateResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_request_templates',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'billing_request_templates',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestTemplateResponse = {
      ...(response.body?.['billing_request_templates'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async update(
    identity: string,
    requestParameters: BillingRequestTemplateUpdateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<BillingRequestTemplateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/billing_request_templates/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'billing_request_templates',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BillingRequestTemplateResponse = {
      ...response.body['billing_request_templates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
