'use strict';

import { Api } from '../api/api';
import * as Types from "../types/Types"


interface TaxRateResponse extends Types.TaxRate, Types.APIResponse {
}

interface TaxRateListResponse extends Types.APIResponse {
  tax_rates: Array<Types.TaxRate>
  meta: Types.ListMeta
}
  
    
    
    

    interface TaxRateListRequest {
      
          // Cursor pointing to the start of the desired set.
          
            after?: string
          
        
      
          // Cursor pointing to the end of the desired set.
          
            before?: string
          
        
      
          // The jurisdiction this tax rate applies to
          
            jurisdiction?: string
          
        
      
          // Number of records to return.
          
            limit?: string
          
        
      
    }
    
  

  



export class TaxRateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  
  
    
    
public async list(requestParameters: TaxRateListRequest): Promise<TaxRateListResponse> {

const urlParameters = [];
  const requestParams = {
    path: '/tax_rates',
    method: 'get',
    urlParameters,
    requestParameters,
    payloadKey: null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: TaxRateListResponse = {
    ...response.body,
    __response__: response.__response__,
  }

  return formattedResponse;
}



public async *all(
  requestParameters: TaxRateListRequest
): AsyncGenerator<Types.TaxRate, void, unknown> {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor });

    for (let taxrate of list.tax_rates) {
      yield taxrate;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}


    
  
    
    
public async find(identity: string,): Promise<TaxRateResponse> {
const urlParameters = [
  { key: 'identity', value: identity},
];
  const requestParams = {
    path: '/tax_rates/:identity',
    method: 'get',
    urlParameters,
    
    payloadKey:null,
    fetch: null,
  };

  const response = await this.api.request(requestParams);
  const formattedResponse: TaxRateResponse = {
    ...response.body['tax_rates'],
    __response__: response.__response__,
  }

  return formattedResponse;
}

    
  
}
