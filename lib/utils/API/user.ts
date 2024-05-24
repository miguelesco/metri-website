import { APIURL } from "../enviromentCheck";
import { DefaultResponse, ICurrentUser, ILoginResponse, LoginParams, RegisterParams } from "./interfaces";

// utils/api.js
export const getCurrentUser = async (): Promise<DefaultResponse<ICurrentUser>> => {
  try {
    const token = localStorage.getItem('jwt');
  
    const response = await fetch(`${APIURL}/current_user`, {
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
  
    const data: ICurrentUser = await response.json();
    return {data, error: null};
  } catch (error) {
    console.error('Error fetching current user:', error);
    return {data: null, error: 'An error occurred. Please try again.'};
  }
};

export const loginUser = async ({email, password}: LoginParams): Promise<DefaultResponse<ILoginResponse>> => {
  try {
      const response = await fetch(`${APIURL}/users/sign_in`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify({
              user: {
                  email,
                  password,
              },
          }),
      });

      if (response.ok) {
          const data: ILoginResponse = await response.json();
          // Redirect to a protected route or homepage
          return { data, error: null };
      } else {
          const data = await response.json();
          return { data: null, error: data.error };
      }
  } catch (err) {
      return { data: null, error: 'An error occurred. Please try again.' };
  }
};

export const registerUser = async ({ email, password, confirmPassword }: RegisterParams): Promise<DefaultResponse<ILoginResponse>> => {
  try {
    const response = await fetch(`${APIURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: confirmPassword,
        },
      }),
    });

    if (response.ok) {
      const data: ILoginResponse = await response.json();
      return { data, error: null };
    } else {
      const data = await response.json();
      return { data: null, error: data.error };
    }
  } catch (err) {
    return { data: null, error: 'An error occurred. Please try again.' };
  }
};
