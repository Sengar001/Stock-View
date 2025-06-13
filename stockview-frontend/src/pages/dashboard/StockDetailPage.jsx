import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import StockChart from '../../components/dashboard/StockChart';
import PriceIndicator from '../../components/dashboard/PriceIndicator';
import AlertForm from '../../components/dashboard/AlertForm';
import stockService from '../../services/stock';
import userService from '../../services/user';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const StockDetailPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stock, setStock] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        const stockData = await stockService.getStockData(symbol);
        const history = await stockService.getHistoricalData(symbol);
        
        setStock(stockData);
        setHistoricalData(history);
        
        // Check if stock is in user's watchlist
        if (currentUser) {
          const watchlist = await userService.getWatchlist();
          setIsInWatchlist(watchlist.some(item => item.symbol === symbol));
        }
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error('Error fetching stock details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol, currentUser]);

  const handleWatchlistToggle = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      if (isInWatchlist) {
        await userService.removeFromWatchlist(symbol);
      } else {
        await userService.addToWatchlist(symbol);
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (err) {
      console.error('Watchlist error:', err);
      setError('Failed to update watchlist');
    }
  };

  const handleCreateAlert = async (targetPrice) => {
    try {
      await userService.createAlert(symbol, targetPrice);
      setAlertSuccess('Price alert created successfully!');
      setTimeout(() => setAlertSuccess(''), 3000);
    } catch (err) {
      console.error('Create alert error:', err);
      setError('Failed to create alert');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-500 hover:text-primary-600 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        
        <div className="card text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-primary-500 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      
      {alertSuccess && (
        <Alert type="success" message={alertSuccess} onClose={() => setAlertSuccess('')} />
      )}
      
      {error && (
        <Alert type="error" message={error} onClose={() => setError('')} />
      )}
      
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-4">{stock.symbol}</h1>
              <PriceIndicator change={stock.change} />
            </div>
            <p className="text-gray-600 mt-1">{stock.name}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isInWatchlist 
                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiStar className={`mr-2 ${isInWatchlist ? 'fill-amber-500' : ''}`} />
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-end">
            <p className="text-4xl font-bold">${stock.price.toFixed(2)}</p>
            <div className="ml-4">
              <p className={`${stock.change > 0 ? 'text-success-500' : 'text-danger-500'}`}>
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent})
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h3 className="font-bold mb-4">Key Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Previous Close</span>
              <span className="font-medium">${(stock.price - stock.change).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Day Range</span>
              <span className="font-medium">${stock.low.toFixed(2)} - ${stock.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volume</span>
              <span className="font-medium">{stock.volume.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-bold mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Week Change</span>
              <span className="font-medium text-success-500">+2.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Month Change</span>
              <span className="font-medium text-danger-500">-1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Change</span>
              <span className="font-medium text-success-500">+15.8%</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-bold mb-4">Set Price Alert</h3>
          <AlertForm 
            currentPrice={stock.price} 
            onSubmit={handleCreateAlert} 
          />
        </div>
      </div>
      
      <StockChart data={historicalData} />
    </div>
  );
};

export default StockDetailPage;