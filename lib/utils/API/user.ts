import { fetchData } from "../utilities";
import { DefaultResponse, ICurrentUser, IHistoryResponse, ILoginResponse, LoginParams, RegisterParams } from "../interfaces";


// utils/api.js
export const getCurrentUser = async (): Promise<DefaultResponse<ICurrentUser>> => {
  try {
    const response = await fetchData<ICurrentUser>('current_user', 'GET');
  
    if (!response.error) {
      const { data } = response;
      return { data, error: null };
    } else {
      return { data: null, error: response.error };
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    return { data: null, error: 'An error occurred. Please try again.' };
  }
};

export const loginUser = async ({ email, password }: LoginParams): Promise<DefaultResponse<ILoginResponse>> => {
  try {
    const response = await fetchData<ILoginResponse>('users/sign_in', 'POST', {
      user: {
        email,
        password,
      },
    },
    false
  );

    if (!response.error) {
      const {data} = response;
      return { data, error: null };
    } else {
      return { data: null, error: response.error };
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return { data: null, error: 'An error occurred. Please try again.' };
  }
};

export const registerUser = async ({ email, password, confirmPassword }: RegisterParams): Promise<DefaultResponse<ILoginResponse>> => {
  try {
    const response = await fetchData<ILoginResponse>('users', 'POST', {
      user: {
        email,
        password,
        password_confirmation: confirmPassword,
      },
    },
    false
  );

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

export const getUserHistory = async (): Promise<DefaultResponse<IHistoryResponse[]>> => {
  try {
    const response = await fetchData<IHistoryResponse[]>('api/v1/transaction_history', 'GET');
  
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
}