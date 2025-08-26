'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface CreditorBankAccountValidateResponse extends Types.CreditorBankAccountValidate, Types.APIResponse {}

interface CreditorBankAccountValidateListResponse extends Types.APIResponse {
  creditor_bank_accounts: Array<Types.CreditorBankAccountValidate>;
  meta: Types.ListMeta;
}

interface CreditorBankAccountValidateValidateRequest {
  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs are not accepted for Swedish
  // bank accounts denominated in SEK - you must supply [local
  // details](#local-bank-details-sweden).

  iban?: string;

  //
  local_details?: Types.CreditorBankAccountValidateLocalDetails;
}

export class CreditorBankAccountValidateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async validate(
    identity: string,
    requestParameters: CreditorBankAccountValidateValidateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<CreditorBankAccountValidateResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/creditor_bank_accounts/validate',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: CreditorBankAccountValidateResponse = {
      ...response.body['creditor_bank_accounts'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
