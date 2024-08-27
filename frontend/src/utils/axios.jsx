import axios from 'axios';

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
    withCredentials: true,
});

export default customAxios;
