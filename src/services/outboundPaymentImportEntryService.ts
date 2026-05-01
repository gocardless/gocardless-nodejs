import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface OutboundPaymentImportEntryResponse extends Types.OutboundPaymentImportEntry, Types.APIResponse {}

interface OutboundPaymentImportEntryListResponse extends Types.APIResponse {
  outbound_payment_import_entries: Array<Types.OutboundPaymentImportEntry>;
  meta: Types.ListMeta;
}

interface OutboundPaymentImportEntryListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // Number of records to return.

  limit?: string;

  // Unique identifier, beginning with "IM".

  outbound_payment_import: string;
}

export class OutboundPaymentImportEntryService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: OutboundPaymentImportEntryListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentImportEntryListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payment_import_entries',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentImportEntryListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: OutboundPaymentImportEntryListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.OutboundPaymentImportEntry, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const outboundpaymentimportentry of list.outbound_payment_import_entries) {
        yield outboundpaymentimportentry;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
