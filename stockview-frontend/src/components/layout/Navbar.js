import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiLogOut, FiBell, FiStar, FiHome, FiBarChart2 } from 'react-icons/fi';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="flex items-center space-x-2">
                    <div className="bg-primary-500 rounded-lg p-2">
                        <FiBarChart2 className="text-white text-xl" />
                    </div>
                    <span className="font-bold text-xl text-gray-800">StockView</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-primary-500">
                        <FiHome className="mr-2" /> Dashboard
                    </Link>
                    <Link to="/watchlist" className="flex items-center text-gray-600 hover:text-primary-500">
                        <FiStar className="mr-2" /> Watchlist
                    </Link>
                    {currentUser?.role === 'ADMIN' && (
                        <Link to="/admin" className="flex items-center text-gray-600 hover:text-primary-500">
                            <FiBarChart2 className="mr-2" /> Admin
                        </Link>
                    )}
                </nav>

                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            <button className="relative p-2 text-gray-600 hover:text-primary-500">
                                <FiBell className="text-xl" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-danger-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                    <FiUser className="text-primary-500" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-medium text-gray-800">{currentUser.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-danger-500"
                            >
                                <FiLogOut className="mr-1" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-outline">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;