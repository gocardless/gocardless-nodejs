'use strict';

import { Api } from '../api/Api';
import * as Types from '../types/Types';

interface MandateImportEntryResponse
  extends Types.MandateImportEntry,
    Types.APIResponse {}

interface MandateImportEntryListResponse extends Types.APIResponse {
  mandate_import_entries: Types.MandateImportEntry[];
  meta: Types.ListMeta;
}

interface MandateImportEntryCreateRequest {
  //
  amendment?: Types.MandateImportEntryAmendment;

  //
  bank_account: Types.MandateImportEntryBankAccount;

  //
  customer: Types.MandateImportEntryCustomer;

  //
  links: Types.MandateImportEntryCreateRequestLinks;

  // A unique identifier for this entry, which you can use (once the import has
  // been
  // processed by GoCardless) to identify the records that have been created.
  //
  record_identifier?: string;
}

interface MandateImportEntryListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  // Number of records to return.
  limit?: string;

  // Unique identifier, beginning with "IM".
  mandate_import: string;
}

export class MandateImportEntryService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateImportEntryCreateRequest,
    idempotencyKey = ''
  ): Promise<MandateImportEntryResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_import_entries',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_import_entries',
      idempotencyKey,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportEntryResponse = {
      ...response.body['mandate_import_entries'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: MandateImportEntryListRequest
  ): Promise<MandateImportEntryListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_import_entries',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportEntryListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: MandateImportEntryListRequest
  ): AsyncGenerator<Types.MandateImportEntry, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const mandateimportentry of list.mandate_import_entries) {
        yield mandateimportentry;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
