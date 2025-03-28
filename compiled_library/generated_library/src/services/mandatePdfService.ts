'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface MandatePdfResponse extends Types.MandatePdf, Types.APIResponse {}

interface MandatePdfListResponse extends Types.APIResponse {
  mandate_pdfs: Array<Types.MandatePdf>;
  meta: Types.ListMeta;
}

interface MandatePdfCreateRequest {
  // Name of the account holder, as known by the bank. Usually this matches the
  // name of the [customer](#core-endpoints-customers). This field cannot exceed
  // 18 characters.

  account_holder_name?: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.

  account_number?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.

  account_type?: Types.MandatePdfAccountType;

  // The first line of the customer's address.

  address_line1?: string;

  // The second line of the customer's address.

  address_line2?: string;

  // The third line of the customer's address.

  address_line3?: string;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.

  bank_code?: string;

  // SWIFT BIC. Will be derived automatically if a valid `iban` or [local
  // details](#appendix-local-bank-details) are provided.

  bic?: string;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.

  branch_code?: string;

  // The city of the customer's address.

  city?: string;

  // The customer's company name. Used to populate the "Customer Name or Company
  // name" field on the PDF.

  company_name?: string;

  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. Required if providing local details.

  country_code?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Should only be supplied for Betalingsservice mandates.

  danish_identity_number?: string;

  // The customer's family name (i.e. last name). Used to populate the "Customer
  // Name or Company name" field on the PDF. Ignored if `company_name` is
  // provided.

  family_name?: string;

  // The customer's given name (i.e. first name). Used to populate the "Customer
  // Name or Company name" field on the PDF. Ignored if `company_name` is
  // provided.

  given_name?: string;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs cannot be provided for Autogiro
  // mandates.

  iban?: string;

  // Resources linked to this MandatePdf.
  links?: Types.MandatePdfCreateRequestLinks;

  // Unique 6 to 18 character reference. This may be left blank at the point of
  // signing.

  mandate_reference?: string;

  // For American customers only. IP address of the computer used by the customer
  // to set up the mandate. This is required in order to create compliant Mandate
  // PDFs according to the ACH scheme rules.

  payer_ip_address?: string;

  // The customer phone number. Should only be provided for BECS NZ mandates.

  phone_number?: string;

  // The customer's postal code.

  postal_code?: string;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state code
  // is required (e.g. `CA` for California).

  region?: string;

  // Direct Debit scheme. Can be supplied or automatically detected from the bank
  // account details provided. If you do not provide a scheme, you must provide
  // either a mandate, an `iban`, or [local details](#appendix-local-bank-details)
  // including a `country_code`.

  scheme?: string;

  // If provided, a form will be generated with this date and no signature field.

  signature_date?: string;

  // For American customers only. Subscription amount being authorised by the
  // mandate. In the lowest denomination for the currency (cents in USD). Is
  // required if `subscription_frequency` has been provided.

  subscription_amount?: string;

  // For American customers only. Frequency of the subscription being authorised
  // by the mandate. One of `weekly`, `monthly` or `yearly`. Is required if
  // `subscription_amount` has been provided.

  subscription_frequency?: Types.MandatePdfSubscriptionFrequency;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Should only be
  // supplied for Autogiro mandates.

  swedish_identity_number?: string;
}

export class MandatePdfService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: MandatePdfCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<MandatePdfResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_pdfs',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_pdfs',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandatePdfResponse = {
      ...(response.body?.['mandate_pdfs'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
