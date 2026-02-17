import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface BalanceResponse extends Types.Balance, Types.APIResponse {}

interface BalanceListResponse extends Types.APIResponse {
  balances: Array<Types.Balance>;
  meta: Types.ListMeta;
}

interface BalanceListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  ID of a [creditor](#core-endpoints-creditors).

  creditor: string;

  //  Number of records to return.

  limit?: string;
}

export class BalanceService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: BalanceListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<BalanceListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/balances',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BalanceListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: BalanceListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.Balance, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const balance of list.balances) {
        yield balance;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
