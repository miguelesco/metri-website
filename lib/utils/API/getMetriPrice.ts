import { DefaultResponse, IMetriPriceResponse } from "../interfaces";
import { fetchData } from "../utilities";

// utils/api.js
export const getMetriExchangeRate = async (): Promise<DefaultResponse<IMetriPriceResponse>> => {
    try {
      const response = await fetchData<IMetriPriceResponse>('api/v1/metri_price', 'GET');
  
      if (!response.error) {
        const { data } = response;
        return { data, error: null };
      } else {
        return { data: null, error: response.error };
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
      return { data: null, error: 'An error occurred. Please try again.' };
    }
  };
  