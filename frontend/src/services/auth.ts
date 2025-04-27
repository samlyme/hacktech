import axios from 'axios';

// API endpoint for token generation
const API_URL = import.meta.env.VITE_BACKEND_URL + '/token';

// Store JWT token in local storage
export const storeToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

// Get the JWT token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Remove JWT token from local storage
export const removeToken = () => {
  localStorage.removeItem('access_token');
};

// Sign in with username and password
export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL, {
      username: username,
      password: password,
    });

    const { access_token } = response.data;
    storeToken(access_token);

    return access_token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};