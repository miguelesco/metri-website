// utils/checkSession.js
export const checkSession = async () => {
    const response = await fetch('http://localhost:3001/check_session', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  };
  