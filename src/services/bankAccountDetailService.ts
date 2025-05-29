'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BankAccountDetailResponse extends Types.BankAccountDetail, Types.APIResponse {}

interface BankAccountDetailListResponse extends Types.APIResponse {
  bank_account_details: Array<Types.BankAccountDetail>;
  meta: Types.ListMeta;
}

export class BankAccountDetailService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<BankAccountDetailResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/bank_account_details/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAccountDetailResponse = {
      ...response.body['bank_account_details'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
