import router from '@/router';
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        accept: 'application/json',
    },
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('Authorization');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

instance.interceptors.response.use(
    function (response) {
        const data = response.data;
        if (data.error) {
            return Promise.reject({
                message: data.error,
                response,
            });
        }
        return response;
    },

    function (error) {
        if ([403, 401].includes(error?.response?.status)) {
            router.push({ name: 'Login' });
        } else if (error.response.status === 422) {
            const { data } = error.response;
            return Promise.reject(data);
        }
        return Promise.reject(error);
    },
);
export default instance;
