import axios from 'axios';
;
import { END_POINT } from './config';
import { clearAuthToken } from './utils';

const baseURL = `https://${END_POINT}/api/`;

export const api = axios.create({ baseURL });

// Handle logout by clearing localStorage and redirecting
const logout = () => {
  localStorage.clear();
  clearAuthToken();
  window.location.replace('/login');
};

// Example function to fetch data from the backend
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);  // Make a GET request to the specified endpoint
    return response.data;  // Return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response && error.response.status === 401) {
      logout();  // If the error is 401 (Unauthorized), trigger logout
    }
    throw error;  // Rethrow the error for further handling
  }
};
