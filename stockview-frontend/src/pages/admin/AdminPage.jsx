import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const AdminPage = () => {
    const { currentUser } = useAuth();
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            setError('You do not have permission to access this page');
            setLoading(false);
            return;
        }

        // Simulate fetching data
        const fetchData = async () => {
            try {
                setLoading(true);
                // In a real app, you'd fetch data from your API
                setTimeout(() => {
                    setStocks([
                        { id: 1, symbol: 'AAPL', name: 'Apple Inc.' },
                        { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation' },
                        { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.' },
                        { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.' },
                        { id: 5, symbol: 'TSLA', name: 'Tesla Inc.' },
                    ]);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage stocks and users</p>
            </div>

            {error && <Alert type="error" message={error} />}

            <div className="card mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Stock Management</h2>
                    <button className="btn-primary flex items-center">
                        <FiPlus className="mr-2" /> Add Stock
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Symbol
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stocks.map((stock) => (
                                <tr key={stock.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{stock.symbol}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-gray-900">{stock.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                                            <FiEdit className="inline mr-1" /> Edit
                                        </button>
                                        <button className="text-danger-600 hover:text-danger-900">
                                            <FiTrash2 className="inline mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">User Management</h2>
                </div>

                <div className="text-center py-12">
                    <p className="text-gray-500">User management features coming soon</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;