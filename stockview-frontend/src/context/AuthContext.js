import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            try {
                const user = JSON.parse(storedUser);
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to parse user data', error);
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            const user = { email, token: response.token };

            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.token);

            return user;
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    };

    const register = async (email, password) => {
        try {
            await authService.register(email, password);
            const user = { email };

            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error) {
            throw new Error('Registration failed: ' + error.message);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};