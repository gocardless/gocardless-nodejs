'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface MandateImportEntryResponse extends Types.MandateImportEntry, Types.APIResponse {}

interface MandateImportEntryListResponse extends Types.APIResponse {
  mandate_import_entries: Array<Types.MandateImportEntry>;
  meta: Types.ListMeta;
}

interface MandateImportEntryCreateRequest {
  //
  amendment?: Types.MandateImportEntryAmendment;

  //
  bank_account: Types.MandateImportEntryBankAccount;

  //
  customer: Types.MandateImportEntryCustomer;

  // Resources linked to this MandateImportEntry.
  links: Types.MandateImportEntryCreateRequestLinks;

  //
  mandate?: Types.MandateImportEntryMandate;

  //  A unique identifier for this entry, which you can use (once the import has
  //  been
  //  processed by GoCardless) to identify the records that have been created.
  //  Limited
  //  to 255 characters.
  //

  record_identifier?: string;
}

interface MandateImportEntryListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  Number of records to return.

  limit?: string;

  //  Unique identifier, beginning with "IM".

  mandate_import: string;

  //  One of:
  //  <ul>
  //  <li>`sucessfully_processed`: the entry has been imported and the associated
  //  records created.</li>
  //  <li>`unsuccessfully_processed`: the entry could not be processed due to an
  //  error, see the 'processing_errors' value</li>
  //  </ul>

  status?: Types.MandateImportEntryStatus;
}

export class MandateImportEntryService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: MandateImportEntryCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<MandateImportEntryResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_import_entries',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_import_entries',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportEntryResponse = {
      ...(response.body?.['mandate_import_entries'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: MandateImportEntryListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<MandateImportEntryListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_import_entries',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportEntryListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: MandateImportEntryListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.MandateImportEntry, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const mandateimportentry of list.mandate_import_entries) {
        yield mandateimportentry;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
