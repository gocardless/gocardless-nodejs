'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BlockResponse extends Types.Block, Types.APIResponse {}

interface BlockListResponse extends Types.APIResponse {
  blocks: Array<Types.Block>;
  meta: Types.ListMeta;
}

interface BlockCreateRequest {
  // Shows if the block is active or disabled. Only active blocks will be used
  // when deciding
  // if a mandate should be blocked.

  active?: boolean;

  // Type of entity we will seek to match against when blocking the mandate. This
  // can currently be one of 'email', 'email_domain', 'bank_account', or
  // 'bank_name'.

  block_type?: Types.BlockBlockType;

  // This field is required if the reason_type is other. It should be a
  // description of
  // the reason for why you wish to block this payer and why it does not align
  // with the
  // given reason_types. This is intended to help us improve our knowledge of
  // types of
  // fraud.

  reason_description?: string;

  // The reason you wish to block this payer, can currently be one of
  // 'identity_fraud',
  // 'no_intent_to_pay', 'unfair_chargeback'. If the reason isn't captured by one
  // of the
  // above then 'other' can be selected but you must provide a reason description.

  reason_type?: Types.BlockReasonType;

  // This field is a reference to the value you wish to block. This may be the raw
  // value
  // (in the case of emails or email domains) or the ID of the resource (in the
  // case of
  // bank accounts and bank names). This means in order to block a specific bank
  // account
  // (even if you wish to block generically by name) it must already have been
  // created as
  // a resource.

  resource_reference?: string;
}

interface BlockListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // ID of a [Block](#core-endpoints-blocks).

  block?: string;

  // Type of entity we will seek to match against when blocking the mandate. This
  // can currently be one of 'email', 'email_domain', 'bank_account', or
  // 'bank_name'.

  block_type?: Types.BlockBlockType;

  // The creation date of this Block.
  created_at?: Types.CreatedAtFilter;

  // Number of records to return.

  limit?: string;

  // The reason you wish to block this payer, can currently be one of
  // 'identity_fraud',
  // 'no_intent_to_pay', 'unfair_chargeback'. If the reason isn't captured by one
  // of the
  // above then 'other' can be selected but you must provide a reason description.

  reason_type?: Types.BlockReasonType;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this
  // resource was updated.

  updated_at?: string;
}

interface BlockBlockByRefRequest {
  // Shows if the block is active or disabled. Only active blocks will be used
  // when deciding
  // if a mandate should be blocked.

  active?: boolean;

  // This field is required if the reason_type is other. It should be a
  // description of
  // the reason for why you wish to block this payer and why it does not align
  // with the
  // given reason_types. This is intended to help us improve our knowledge of
  // types of
  // fraud.

  reason_description?: string;

  // The reason you wish to block this payer, can currently be one of
  // 'identity_fraud',
  // 'no_intent_to_pay', 'unfair_chargeback'. If the reason isn't captured by one
  // of the
  // above then 'other' can be selected but you must provide a reason description.

  reason_type?: Types.BlockReasonType;

  // Type of entity we will seek to get the associated emails and bank accounts to
  // create blocks from. This can currently be one of 'customer' or 'mandate'.

  reference_type?: Types.BlockReferenceType;

  // This field is a reference to the entity you wish to block based on its emails
  // and bank accounts. This may be the ID of a customer or a mandate. This means
  // in
  // order to block by reference the entity must have already been created as a
  // resource.

  reference_value?: string;
}

export class BlockService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: BlockCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<BlockResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/blocks',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'blocks',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockResponse = {
      ...(response.body?.['blocks'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<BlockResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/blocks/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockResponse = {
      ...response.body['blocks'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: BlockListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<BlockListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/blocks',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: BlockListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.Block, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const block of list.blocks) {
        yield block;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async disable(identity: string, customHeaders: Types.JsonMap = {}): Promise<BlockResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/blocks/:identity/actions/disable',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockResponse = {
      ...response.body['blocks'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async enable(identity: string, customHeaders: Types.JsonMap = {}): Promise<BlockResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/blocks/:identity/actions/enable',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockResponse = {
      ...response.body['blocks'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async block_by_ref(
    requestParameters: BlockBlockByRefRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<BlockListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/blocks/block_by_ref',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BlockListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
