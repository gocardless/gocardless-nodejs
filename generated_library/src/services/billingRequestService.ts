'use strict';

import { Api } from '../api/api';
import * as Types from "../types/Types"


interface BillingRequestResponse extends Types.BillingRequest, Types.APIResponse {
}

interface BillingRequestListResponse extends Types.APIResponse {
  billing_requests: Array<Types.BillingRequest>
  meta: Types.ListMeta
}
  
    
    
    

    interface BillingRequestCreateRequest {
      
          // (Optional) If true, this billing request can fallback from instant payment to
// direct debit.
// Should not be set if GoCardless payment intelligence feature is used.
// 
// See [Billing Requests: Retain customers with
// Fallbacks](https://developer.gocardless.com/billing-requests/retain-customers-with-fallbacks/)
// for more information.
          
            fallback_enabled?: boolean
          
        
      
          // Request for an instalment schedule. Has to contain either
// `instalments_with_schedule` object or an array of `instalments_with_dates`
// objects
          instalment_schedule_request?: Types.BillingRequestInstalmentScheduleRequest
          
        
      // Resources linked to this BillingRequest.
            links?: Types.BillingRequestCreateRequestLinks
          
      
          // 
          mandate_request?: Types.BillingRequestMandateRequest
          
        
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
          // 
          payment_request?: Types.BillingRequestPaymentRequest
          
        
      
          // Specifies the high-level purpose of a mandate and/or payment using a set of
// pre-defined categories. Required for the PayTo scheme, optional for all
// others. Currently `mortgage`, `utility`, `loan`, `dependant_support`,
// `gambling`, `retail`, `salary`, `personal`, `government`, `pension`, `tax`
// and `other` are supported.
          
            purpose_code?: Types.BillingRequestPurposeCode
          
        
      
          // 
          subscription_request?: Types.BillingRequestSubscriptionRequest
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestCollectCustomerDetailsRequest {
      
          // 
          customer?: Types.BillingRequestCustomer
          
        
      
          // 
          customer_billing_detail?: Types.BillingRequestCustomerBillingDetail
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestCollectBankAccountRequest {
      
          // Name of the account holder, as known by the bank. This field will be
// transliterated, upcased and truncated to 18 characters. This field is
// required unless the request includes a [customer bank account
// token](#javascript-flow-customer-bank-account-tokens).
          
            account_holder_name?: string
          
        
      
          // Bank account number - see [local details](#appendix-local-bank-details) for
// more information. Alternatively you can provide an `iban`.
          
            account_number?: string
          
        
      
          // Account number suffix (only for bank accounts denominated in NZD) - see
// [local details](#local-bank-details-new-zealand) for more information.
          
            account_number_suffix?: string
          
        
      
          // Bank account type. Required for USD-denominated bank accounts. Must not be
// provided for bank accounts in other currencies. See [local
// details](#local-bank-details-united-states) for more information.
          
            account_type?: Types.BillingRequestAccountType
          
        
      
          // Bank code - see [local details](#appendix-local-bank-details) for more
// information. Alternatively you can provide an `iban`.
          
            bank_code?: string
          
        
      
          // Branch code - see [local details](#appendix-local-bank-details) for more
// information. Alternatively you can provide an `iban`.
          
            branch_code?: string
          
        
      
          // [ISO 3166-1 alpha-2
// code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
// Defaults to the country code of the `iban` if supplied, otherwise is
// required.
          
            country_code?: string
          
        
      
          // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
// Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
// supported.
          
            currency?: string
          
        
      
          // International Bank Account Number. Alternatively you can provide [local
// details](#appendix-local-bank-details). IBANs are not accepted for Swedish
// bank accounts denominated in SEK - you must supply [local
// details](#local-bank-details-sweden).
          
            iban?: string
          
        
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
          // A unique record such as an email address, mobile number or company number,
// that can be used to make and accept payments.
          
            pay_id?: string
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestConfirmPayerDetailsRequest {
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
          // This attribute can be set to true if the payer has indicated that multiple
// signatures are required for the mandate. As long as every other Billing
// Request actions have been completed, the payer will receive an email
// notification containing instructions on how to complete the additional
// signature. The dual signature flow can only be completed using GoCardless
// branded pages.
          
            payer_requested_dual_signature?: boolean
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestFulfilRequest {
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestCancelRequest {
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestListRequest {
      
          // Cursor pointing to the start of the desired set.
          
            after?: string
          
        
      
          // Cursor pointing to the end of the desired set.
          
            before?: string
          
        
      // The creation date of this BillingRequest.
          created_at?: Types.CreatedAtFilter
        
      
          // ID of a [customer](#core-endpoints-customers). If specified, this endpoint
// will return all requests for the given customer.
          
            customer?: string
          
        
      
          // Number of records to return.
          
            limit?: string
          
        
      
          // One of:
// <ul>
// <li>`pending`: the billing request is pending and can be used</li>
// <li>`ready_to_fulfil`: the billing request is ready to fulfil</li>
// <li>`fulfilling`: the billing request is currently undergoing fulfilment</li>
// <li>`fulfilled`: the billing request has been fulfilled and a payment
// created</li>
// <li>`cancelled`: the billing request has been cancelled and cannot be
// used</li>
// </ul>
          
            status?: Types.BillingRequestStatus
          
        
      
    }
    
  

  

  
    
    
    

    interface BillingRequestNotifyRequest {
      
          // Currently, can only be `email`.
          
            notification_type: Types.BillingRequestNotificationType
          
        
      
          // URL that the payer can be redirected to after authorising the payment.
          
            redirect_uri?: string
          
        
      
    }
    
  

  
    
    
    
  

  
    
    
    

    interface BillingRequestChooseCurrencyRequest {
      
          // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
// Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
// supported.
          
            currency: string
          
        
      
          // Key-value store of custom data. Up to 3 keys are permitted, with key names up
// to 50 characters and values up to 500 characters.
          
            metadata?: Types.JsonMap
          
        
      
    }
    
  

  
    
    
    

    interface BillingRequestSelectInstitutionRequest {
      
          // [ISO
// 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
// alpha-2 code. The country code of the institution.
          
            country_code: string
          
        
      
          // The unique identifier for this institution
          
            institution: string
          
        
      
    }
    
  



export class BillingRequestService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  
  
    
    
      
public async create(requestParameters: BillingRequestCreateRequest, idempotencyKey: string='', customHeaders: Types.JsonMap={}): Promise<BillingRequestResponse> {

const urlParameters = [];
  const requestParams = {
    path: '/billing_requests',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey: 'billing_requests',
    idempotencyKey,
    customHeaders,
    fetch: async (identity) => await this.find(identity) ,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...(response.body?.['billing_requests'] ?? response),
    __response__: response.__response__,
  }

  return formattedResponse;
}
    
  
    
    
public async collectCustomerDetails(identity: string, requestParameters: BillingRequestCollectCustomerDetailsRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/collect_customer_details',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async collectBankAccount(identity: string, requestParameters: BillingRequestCollectBankAccountRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/collect_bank_account',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async confirmPayerDetails(identity: string, requestParameters: BillingRequestConfirmPayerDetailsRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/confirm_payer_details',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async fulfil(identity: string, requestParameters: BillingRequestFulfilRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/fulfil',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async cancel(identity: string, requestParameters: BillingRequestCancelRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/cancel',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async list(requestParameters: BillingRequestListRequest): Promise<BillingRequestListResponse> {

const urlParameters = [];
  const requestParams = {
    path: '/billing_requests',
    method: 'get',
    urlParameters,
    requestParameters,
    payloadKey: null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestListResponse = {
    ...response.body,
    __response__: response.__response__,
  }

  return formattedResponse;
}



public async *all(
  requestParameters: BillingRequestListRequest
): AsyncGenerator<Types.BillingRequest, void, unknown> {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor });

    for (let billingrequest of list.billing_requests) {
      yield billingrequest;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}


    
  
    
    
public async find(identity: string,): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity',
    method: 'get',
    urlParameters,
    
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async notify(identity: string, requestParameters: BillingRequestNotifyRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/notify',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async fallback(identity: string,): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/fallback',
    method: 'post',
    urlParameters,
    
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async chooseCurrency(identity: string, requestParameters: BillingRequestChooseCurrencyRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/choose_currency',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
    
    
public async selectInstitution(identity: string, requestParameters: BillingRequestSelectInstitutionRequest): Promise<BillingRequestResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/billing_requests/:identity/actions/select_institution',
    method: 'post',
    urlParameters,
    requestParameters,
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: BillingRequestResponse = {
    ...response.body['billing_requests'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
}
