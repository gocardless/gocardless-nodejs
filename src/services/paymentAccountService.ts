import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface PaymentAccountResponse extends Types.PaymentAccount, Types.APIResponse {}

interface PaymentAccountListResponse extends Types.APIResponse {
  payment_accounts: Array<Types.PaymentAccount>;
  meta: Types.ListMeta;
}

interface PaymentAccountListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  Number of records to return.

  limit?: string;
}

export class PaymentAccountService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<PaymentAccountResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payment_accounts/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentAccountResponse = {
      ...response.body['payment_accounts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: PaymentAccountListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentAccountListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payment_accounts',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentAccountListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: PaymentAccountListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.PaymentAccount, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const paymentaccount of list.payment_accounts) {
        yield paymentaccount;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
