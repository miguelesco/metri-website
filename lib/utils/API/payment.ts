import { CreatePaymentParams, DefaultResponse, IPaymentReportResponse } from "../interfaces";
import { fetchData } from "../utilities";

export const createPayment = async ({ payment }: CreatePaymentParams): Promise<DefaultResponse<IPaymentReportResponse>> => {

    try {
        const response = await fetchData<IPaymentReportResponse>('api/v1/payments', 'POST', {payment});
    
        if (!response.error) {
          const { data } = response;
          return { data, error: null };
        } else {
          return { data: null, error: response.error };
        }
      } catch (error) {
        console.error('Error registering user:', error);
        return { data: null, error: 'An error occurred. Please try again.' };
      }
};