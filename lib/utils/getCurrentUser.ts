// utils/api.js
export const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
  
      const response = await fetch('http://localhost:3001/current_user', {
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };
  