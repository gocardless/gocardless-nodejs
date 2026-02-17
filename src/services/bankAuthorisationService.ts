import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface BankAuthorisationResponse extends Types.BankAuthorisation, Types.APIResponse {}

interface BankAuthorisationListResponse extends Types.APIResponse {
  bank_authorisations: Array<Types.BankAuthorisation>;
  meta: Types.ListMeta;
}

interface BankAuthorisationCreateRequest {
  // Resources linked to this BankAuthorisation.
  links: Types.BankAuthorisationCreateRequestLinks;

  //  URL that the payer can be redirected to after authorising the payment.
  //
  //  On completion of bank authorisation, the query parameter of either
  //  `outcome=success` or `outcome=failure` will be
  //  appended to the `redirect_uri` to indicate the result of the bank
  //  authorisation. If the bank authorisation is
  //  expired, the query parameter `outcome=timeout` will be appended to the
  //  `redirect_uri`, in which case you should
  //  prompt the user to try the bank authorisation step again.
  //
  //  Please note: bank authorisations can still fail despite an `outcome=success`
  //  on the `redirect_uri`. It is therefore recommended to wait for the relevant
  //  bank authorisation event, such as
  //  [`BANK_AUTHORISATION_AUTHORISED`](#billing-request-bankauthorisationauthorised),
  //  [`BANK_AUTHORISATION_DENIED`](#billing-request-bankauthorisationdenied), or
  //  [`BANK_AUTHORISATION_FAILED`](#billing-request-bankauthorisationfailed) in
  //  order to show the correct outcome to the user.
  //
  //  The BillingRequestFlow ID will also be appended to the `redirect_uri` as
  //  query parameter `id=BRF123`.
  //
  //  Defaults to `https://pay.gocardless.com/billing/static/thankyou`.

  redirect_uri?: string;
}

export class BankAuthorisationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: BankAuthorisationCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<BankAuthorisationResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/bank_authorisations',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_authorisations',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAuthorisationResponse = {
      ...(response.body?.['bank_authorisations'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<BankAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/bank_authorisations/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAuthorisationResponse = {
      ...response.body['bank_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
