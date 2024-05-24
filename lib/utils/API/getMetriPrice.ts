import { APIURL } from "./enviromentCheck";
import { IMetriPriceResponse } from "./interfaces";

// utils/api.js
export const getCurrentUser = async () => {
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
        return(errorData.error || 'Failed to fetch user');
      }
  
      const data: IMetriPriceResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };
  