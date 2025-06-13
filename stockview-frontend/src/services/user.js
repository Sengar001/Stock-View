import axios from 'axios';

const API_URL = 'http://localhost:8090/api/user';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getWatchlist = async () => {
    const response = await api.get('/watchlist');
    return response.data;
};

const addToWatchlist = async (symbol) => {
    const response = await api.post(`/watchlist/${symbol}`);
    return response.data;
};

const removeFromWatchlist = async (symbol) => {
    const response = await api.delete(`/watchlist/${symbol}`);
    return response.data;
};

const createAlert = async (symbol, targetPrice) => {
    const response = await api.post('/alerts', { symbol, targetPrice });
    return response.data;
};

const getUserAlerts = async () => {
    const response = await api.get('/alerts');
    return response.data;
};

const userService = {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    createAlert,
    getUserAlerts
};

export default userService;

// export default {
//     getWatchlist,
//     addToWatchlist,
//     removeFromWatchlist,
//     createAlert,
//     getUserAlerts
// };