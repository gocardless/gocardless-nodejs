import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface PaymentAccountTransactionResponse extends Types.PaymentAccountTransaction, Types.APIResponse {}

interface PaymentAccountTransactionListResponse extends Types.APIResponse {
  payment_account_transactions: Array<Types.PaymentAccountTransaction>;
  meta: Types.ListMeta;
}

interface PaymentAccountTransactionListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  The direction of the transaction. Debits mean money leaving the account
  //  (e.g. outbound payment), while credits signify money coming in (e.g. manual
  //  top-up).

  direction?: Types.PaymentAccountTransactionDirection;

  //  Number of records to return.

  limit?: string;

  //  The beginning of query period

  value_date_from: string;

  //  The end of query period

  value_date_to: string;
}

export class PaymentAccountTransactionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: PaymentAccountTransactionListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<PaymentAccountTransactionListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payment_accounts/:identity/transactions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PaymentAccountTransactionListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: PaymentAccountTransactionListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.PaymentAccountTransaction, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const paymentaccounttransaction of list.payment_account_transactions) {
        yield paymentaccounttransaction;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
