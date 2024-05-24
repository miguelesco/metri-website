import { DefaultResponse } from "./interfaces";

const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;

const APIURL = enviroment === 'production' ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL_DEV;

export const fetchData = async <T>(url: string, method: string, body?: any, sendToken: boolean = true): Promise<DefaultResponse<T>> => {
    try {
      const token = localStorage.getItem('jwt');
  
      const response = await fetch(`${APIURL}/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sendToken ? `Bearer ${token}` : undefined
        } as HeadersInit, // Cast headers to HeadersInit
        credentials: 'include',
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { data: null, error: errorData.error };
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: null, error: 'An error occurred. Please try again.' };
    }
  };