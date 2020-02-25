'use strict';

import { Api } from '../api/Api';
import {
  MandatePdf,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  MandatePdfAccountType,
  MandatePdfCreateRequestLinks,
  MandatePdfSubscriptionFrequency,
} from '../types/Types';

interface MandatePdfResponse extends MandatePdf {
  __metadata__: ResponseMetadata;
}

interface MandatePdfListResponse extends Array<MandatePdf> {
  __metadata__: ResponseMetadata;
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
  account_type?: MandatePdfAccountType;

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

  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. Required if providing local details.
  country_code?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK). Can only be supplied for Betalingsservice mandates.
  danish_identity_number?: string;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs cannot be provided for Autogiro
  // mandates.
  iban?: string;

  //
  links?: MandatePdfCreateRequestLinks;

  // Unique 6 to 18 character reference. This may be left blank at the point of
  // signing.
  mandate_reference?: string;

  // For American customers only. IP address of the computer used by the customer
  // to set up the mandate. This is required in order to create compliant Mandate
  // PDFs according to the ACH scheme rules.
  payer_ip_address?: string;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string;

  // The customer's postal code.
  postal_code?: string;

  // The customer's address region, county or department. For US customers a 2
  // letter state code ([ISO
  // 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) e.g CA) is required.
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
  subscription_frequency?: MandatePdfSubscriptionFrequency;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Can only be
  // supplied for Autogiro mandates.
  swedish_identity_number?: string;
}

class MandatePdfService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandatePdfCreateRequest,
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
