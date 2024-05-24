import { APIURL } from "../enviromentCheck";

// utils/checkSession.js
export const checkSession = async () => {
  const token = localStorage.getItem('jwt');
    const response = await fetch(`${APIURL}/check_session`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  };
  