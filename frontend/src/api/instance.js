import axios from 'axios';

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to include token
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or whatever your token key is
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInstance;
