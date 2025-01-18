import axios from "axios";

// Setup Axios to point to your backend server
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080", // Make sure the backend URL matches
});

export default api;
