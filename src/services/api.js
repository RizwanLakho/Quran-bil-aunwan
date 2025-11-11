import axios from 'axios';

// Base URL for the Laravel backend
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    console.log('🔍 API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      hasToken: !!token,
      headers: config.headers
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      code: error.code,
      name: error.name,
      hasResponse: !!error.response,
      hasRequest: !!error.request,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data
    });

    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        console.warn('⚠️ Unauthorized - redirecting to login');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No response from server - This is a NETWORK ERROR');
      console.error('Request details:', error.request);
      console.error('Check if backend is running at:', API_BASE_URL);
    } else {
      // Error setting up request
      console.error('❌ Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
