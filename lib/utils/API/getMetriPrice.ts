import { APIURL } from "../enviromentCheck";
import { DefaultResponse, IMetriPriceResponse } from "./interfaces";

// utils/api.js
export const getMetriExchangeRate = async (): Promise<DefaultResponse<IMetriPriceResponse>> => {
    try {
      const token = localStorage.getItem('jwt');
  
      const response = await fetch(`${APIURL}/api/v1/metri_price`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return {data: null, error: errorData.error};
      }
  
      const data: IMetriPriceResponse = await response.json();
      return {data, error: null};
    } catch (error) {
      console.error('Error fetching current user:', error);
      return {data: null, error: 'An error occurred. Please try again.'};
    }
  };
  