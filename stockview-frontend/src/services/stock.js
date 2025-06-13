import axios from 'axios';

const API_URL = 'http://localhost:8090/api/stocks';

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

const getStockData = async (symbol) => {
    const response = await api.get(`/${symbol}`);
    return response.data;
};

const getHistoricalData = async (symbol, interval = 'daily') => {
    const response = await api.get(`/${symbol}/history?interval=${interval}`);
    return response.data;
};

const searchStocks = async (query) => {
    const response = await api.get(`/search?query=${query}`);
    return response.data;
};

// export default {
//     getStockData,
//     getHistoricalData,
//     searchStocks
// };

const stockService = {
    getStockData,
    getHistoricalData,
    searchStocks
};

export default stockService;