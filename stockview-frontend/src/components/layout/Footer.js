import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-primary-500 rounded-lg p-1">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-800">StockView</span>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">
                            Real-time stock market insights at your fingertips
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
                            <ul className="space-y-2">
                                <li><Link to="/dashboard" className="text-sm text-gray-500 hover:text-primary-500">Dashboard</Link></li>
                                <li><Link to="/watchlist" className="text-sm text-gray-500 hover:text-primary-500">Watchlist</Link></li>
                                <li><Link to="/" className="text-sm text-gray-500 hover:text-primary-500">Market News</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Company</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-sm text-gray-500 hover:text-primary-500">About</Link></li>
                                <li><Link to="/contact" className="text-sm text-gray-500 hover:text-primary-500">Contact</Link></li>
                                <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-primary-500">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} StockView. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;