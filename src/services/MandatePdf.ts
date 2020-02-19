'use strict';

import { MandatePdf } from '../types/Types';
import { Api } from '../api/Api';

interface MandatePdfResponse extends MandatePdf {
  request: object;
  response: object;
}

interface MandatePdfListResponse extends MandatePdf {
  request: object;
  response: object;
}

class MandatePdfService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<MandatePdfResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandate_pdfs',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_pdfs',
      headers,
      fetch: undefined,
    };

    const response: MandatePdfResponse = await this.api.request(request);
    return response;
  }
}
