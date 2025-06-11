import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    if (response.data.token) {
        return {
            token: response.data.token,
            email: email,
            role: response.data.role || 'USER'
        };
    }
    return response.data;
};

const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
};

const authService = {
    login,
    register
};

export default authService;