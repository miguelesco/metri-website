import { fetchData } from "../utilities";

// utils/checkSession.js
export const checkSession = async () => {
  const response = await fetchData('check_session', 'GET');
  if (response.data) {
    return true;
  } else {
    return false;
  }
};
  