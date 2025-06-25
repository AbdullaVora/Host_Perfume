import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    // baseURL: "http://localhost:4000", // Use your actual API URL here
});

// Add token to headers for all requests
api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("Admintoken")); // Get user from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
