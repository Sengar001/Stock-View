import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiHome, FiStar, FiBarChart2, FiSettings,
    FiUser, FiLogOut, FiBell
} from 'react-icons/fi';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();

    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/watchlist', icon: FiStar, label: 'Watchlist' },
        ...(currentUser?.role === 'ADMIN'
            ? [{ path: '/admin', icon: FiBarChart2, label: 'Admin' }]
            : []),
        { path: '/alerts', icon: FiBell, label: 'Alerts' },
        { path: '/profile', icon: FiUser, label: 'Profile' },
        { path: '/settings', icon: FiSettings, label: 'Settings' },
    ];

    return (
        <div className="bg-white h-full shadow-md w-64 p-4 flex flex-col">
            <div className="mb-8">
                <div className="flex items-center justify-center">
                    <div className="bg-primary-500 rounded-lg p-2">
                        <FiBarChart2 className="text-white text-2xl" />
                    </div>
                    <h1 className="ml-2 font-bold text-xl text-gray-800">StockView</h1>
                </div>
            </div>

            <nav className="flex-1">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-lg ${isActive
                                        ? 'bg-primary-50 text-primary-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                <item.icon className="mr-3 text-lg" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                    <FiLogOut className="mr-3 text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;