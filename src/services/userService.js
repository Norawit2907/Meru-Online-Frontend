import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${backendUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};
