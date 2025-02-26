import axios from "axios";

const API_BASE_URL = "http://localhost:2100"; // Your backend URL

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token)
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized (e.g., redirect to login)
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
