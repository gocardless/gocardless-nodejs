'use strict';

import { Api } from '../api/Api';
import {
  Customer,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CreatedAtFilter,
} from '../types/Types';

interface CustomerResponse extends Customer {
  __metadata__: ResponseMetadata;
}

interface CustomerListResponse extends Array<Customer> {
  __metadata__: ResponseMetadata;
}

interface CustomerCreateRequest {
  // The first line of the customer's address.
  address_line1?: string;

  // The second line of the customer's address.
  address_line2?: string;

  // The third line of the customer's address.
  address_line3?: string;

  // The city of the customer's address.
  city?: string;

  // Customer's company name. Required unless a `given_name` and `family_name` are
  // provided. For Canadian customers, the use of a `company_name` value will mean
  // that any mandate created from this customer will be considered to be a
  // "Business PAD" (otherwise, any mandate will be considered to be a "Personal
  // PAD").
  company_name?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. Used
  // as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en", "fr",
  // "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported. If this
  // is not provided, the language will be chosen based on the `country_code` (if
  // supplied) or default to "en".
  language?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string;

  // The customer's postal code.
  postal_code?: string;

  // The customer's address region, county or department. For US customers a 2
  // letter state code ([ISO
  // 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) e.g CA) is required.
  region?: string;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be supplied
  // if the customer's bank account is denominated in Swedish krona (SEK). This
  // field cannot be changed once it has been set.
  swedish_identity_number?: string;
}

interface CustomerListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.
  currency?: CustomerCurrency;

  // Number of records to return.
  limit?: string;
}

interface CustomerUpdateRequest {
  // The first line of the customer's address.
  address_line1?: string;

  // The second line of the customer's address.
  address_line2?: string;

  // The third line of the customer's address.
  address_line3?: string;

  // The city of the customer's address.
  city?: string;

  // Customer's company name. Required unless a `given_name` and `family_name` are
  // provided. For Canadian customers, the use of a `company_name` value will mean
  // that any mandate created from this customer will be considered to be a
  // "Business PAD" (otherwise, any mandate will be considered to be a "Personal
  // PAD").
  company_name?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. Used
  // as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en", "fr",
  // "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported. If this
  // is not provided, the language will be chosen based on the `country_code` (if
  // supplied) or default to "en".
  language?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string;

  // The customer's postal code.
  postal_code?: string;

  // The customer's address region, county or department. For US customers a 2
  // letter state code ([ISO
  // 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) e.g CA) is required.
  region?: string;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be supplied
  // if the customer's bank account is denominated in Swedish krona (SEK). This
  // field cannot be changed once it has been set.
  swedish_identity_number?: string;
}

class CustomerService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: CustomerCreateRequest,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [];
    const request = {
      path: '/customers',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'customers',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }

  async list(
    requestParameters: CustomerListRequest,
    headers: object = {}
  ): Promise<CustomerListResponse> {
    const urlParameters = [];
    const request = {
      path: '/customers',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customers/:identity',
      method: 'GET',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: CustomerUpdateRequest,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customers/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'customers',
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }

  async remove(
    identity: string,
    headers: object = {}
  ): Promise<CustomerResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/customers/:identity',
      method: 'DELETE',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: CustomerResponse = await this.api.request(request);
    return response;
  }
}
