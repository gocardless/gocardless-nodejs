import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface OutboundPaymentImportResponse extends Types.OutboundPaymentImport, Types.APIResponse {}

interface OutboundPaymentImportListResponse extends Types.APIResponse {
  outbound_payment_imports: Array<Types.OutboundPaymentImport>;
  meta: Types.ListMeta;
}

interface OutboundPaymentImportCreateRequest {
  //

  entry_items: Types.OutboundPaymentImportEntryItem[];

  // Resources linked to this OutboundPaymentImport.
  links?: Types.OutboundPaymentImportCreateRequestLinks;
}

interface OutboundPaymentImportListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this OutboundPaymentImport.
  created_at?: Types.CreatedAtFilter;

  // Number of records to return.

  limit?: string;

  // The status of the outbound payment import.
  // <ul>
  // <li>`created`: The initial state of a new import.</li>
  // <li>`validating`: Import validation in progress.</li>
  // <li>`invalid`: Import validation failed.</li>
  // <li>`valid`: Import validation succeeded.</li>
  // <li>`processing`: Authorisation received; payments are being generated.</li>
  // <li>`processed`: All entries have been successfully converted into outbound
  // payments.</li>
  // <li>`cancelled`: The import was cancelled by a user or automatically expired
  // by the system.</li>
  // </ul>

  status?: Types.OutboundPaymentImportStatus;
}

export class OutboundPaymentImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: OutboundPaymentImportCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentImportResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payment_imports',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'outbound_payment_imports',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentImportResponse = {
      ...(response.body?.['outbound_payment_imports'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<OutboundPaymentImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/outbound_payment_imports/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentImportResponse = {
      ...response.body['outbound_payment_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: OutboundPaymentImportListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<OutboundPaymentImportListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/outbound_payment_imports',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: OutboundPaymentImportListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: OutboundPaymentImportListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.OutboundPaymentImport, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const outboundpaymentimport of list.outbound_payment_imports) {
        yield outboundpaymentimport;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
