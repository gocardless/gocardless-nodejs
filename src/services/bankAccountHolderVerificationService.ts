import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface BankAccountHolderVerificationResponse extends Types.BankAccountHolderVerification, Types.APIResponse {}

interface BankAccountHolderVerificationListResponse extends Types.APIResponse {
  bank_account_holder_verifications: Array<Types.BankAccountHolderVerification>;
  meta: Types.ListMeta;
}

interface BankAccountHolderVerificationCreateRequest {
  // Resources linked to this BankAccountHolderVerification.
  links: Types.BankAccountHolderVerificationCreateRequestLinks;

  // Type of the verification that has been performed
  // eg. [Confirmation of
  // Payee](https://www.wearepay.uk/what-we-do/overlay-services/confirmation-of-payee/)

  type: Types.BankAccountHolderVerificationType;
}

export class BankAccountHolderVerificationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: BankAccountHolderVerificationCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<BankAccountHolderVerificationResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/bank_account_holder_verifications',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_account_holder_verifications',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAccountHolderVerificationResponse = {
      ...(response.body?.['bank_account_holder_verifications'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(
    identity: string,
    customHeaders: Types.JsonMap = {},
  ): Promise<BankAccountHolderVerificationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/bank_account_holder_verifications/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAccountHolderVerificationResponse = {
      ...response.body['bank_account_holder_verifications'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
