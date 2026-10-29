import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

 
interface PayerAuthorisationResponse extends Types.PayerAuthorisation, Types.APIResponse {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused for resources that only expose singular (get/create) methods
interface PayerAuthorisationListResponse extends Types.APIResponse {
  payer_authorisations: Array<Types.PayerAuthorisation>;
  meta: Types.ListMeta;
}

interface PayerAuthorisationCreateRequest {
  // All details required for the creation of a
  // Customer Bank Account
  // (https://docs.gocardless.com/docs/api-reference/customer-bank-account).
  bank_account: Types.PayerAuthorisationBankAccount;

  // All details required for the creation of a Customer
  // (https://docs.gocardless.com/docs/api-reference/customer).
  customer: Types.PayerAuthorisationCustomer;

  // All details required for the creation of a Mandate
  // (https://docs.gocardless.com/docs/api-reference/mandate).
  mandate: Types.PayerAuthorisationMandate;
}

interface PayerAuthorisationUpdateRequest {
  // All details required for the creation of a
  // Customer Bank Account
  // (https://docs.gocardless.com/docs/api-reference/customer-bank-account).
  bank_account: Types.PayerAuthorisationBankAccount;

  // All details required for the creation of a Customer
  // (https://docs.gocardless.com/docs/api-reference/customer).
  customer: Types.PayerAuthorisationCustomer;

  // All details required for the creation of a Mandate
  // (https://docs.gocardless.com/docs/api-reference/mandate).
  mandate: Types.PayerAuthorisationMandate;
}

export class PayerAuthorisationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  /** @deprecated Payer Authorisation is legacy API and cannot be used by new integrators. The Billing Request (https://docs.gocardless.com/docs/api-reference/billing-request) API should be used for any new integrations. */
  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  /** @deprecated Payer Authorisation is legacy API and cannot be used by new integrators. The Billing Request (https://docs.gocardless.com/docs/api-reference/billing-request) API should be used for any new integrations. */
  public async create(
    requestParameters: PayerAuthorisationCreateRequest,
    idempotencyKey: string = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<PayerAuthorisationResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payer_authorisations',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'payer_authorisations',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...(response.body?.['payer_authorisations'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  /** @deprecated Payer Authorisation is legacy API and cannot be used by new integrators. The Billing Request (https://docs.gocardless.com/docs/api-reference/billing-request) API should be used for any new integrations. */
  public async update(
    identity: string,
    requestParameters?: Partial<PayerAuthorisationUpdateRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'payer_authorisations',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  /** @deprecated Payer Authorisation is legacy API and cannot be used by new integrators. The Billing Request (https://docs.gocardless.com/docs/api-reference/billing-request) API should be used for any new integrations. */
  public async submit(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity/actions/submit',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  /** @deprecated Payer Authorisation is legacy API and cannot be used by new integrators. The Billing Request (https://docs.gocardless.com/docs/api-reference/billing-request) API should be used for any new integrations. */
  public async confirm(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity/actions/confirm',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
