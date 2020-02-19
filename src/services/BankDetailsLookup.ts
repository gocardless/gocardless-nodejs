'use strict';

import { BankDetailsLookup } from '../types/Types';
import { Api } from '../api/Api';

interface BankDetailsLookupResponse extends BankDetailsLookup {
  request: object;
  response: object;
}

interface BankDetailsLookupListResponse extends BankDetailsLookup {
  request: object;
  response: object;
}

class BankDetailsLookupService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<BankDetailsLookupResponse> {
    const urlParameters = [];
    const request = {
      path: '/bank_details_lookups',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_details_lookups',
      headers,
      fetch: undefined,
    };

    const response: BankDetailsLookupResponse = await this.api.request(request);
    return response;
  }
}
