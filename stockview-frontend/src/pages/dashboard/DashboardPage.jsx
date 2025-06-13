import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StockCard from '../../components/dashboard/StockCard';
import SearchBar from '../../components/dashboard/SearchBar';
import { useAuth } from '../../context/AuthContext';
import stockService from '../../services/stock';
import { FiBarChart2, FiStar, FiTrendingUp } from 'react-icons/fi';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularStocks = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch actual popular stocks
        const popularSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
        const stocksData = await Promise.all(
          popularSymbols.map(symbol => stockService.getStockData(symbol))
        );
        setStocks(stocksData);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularStocks();
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser?.email}</p>
      </div>

      <div className="mb-8">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>

      {error && <Alert type="error" message={error} />}

      {searchResults.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FiBarChart2 className="text-primary-500 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">Total Stocks</p>
                  <p className="text-2xl font-bold">3500+</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiTrendingUp className="text-green-500 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">Today's Gainers</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FiStar className="text-amber-500 text-2xl" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">Your Watchlist</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Popular Stocks</h2>
              <button 
                onClick={() => navigate('/watchlist')}
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                View All
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;