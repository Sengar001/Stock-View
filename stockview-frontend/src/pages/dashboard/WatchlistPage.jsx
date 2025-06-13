import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StockCard from '../../components/dashboard/StockCard';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/user';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';
import { FiStar } from 'react-icons/fi';

const WatchlistPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const data = await userService.getWatchlist();
        setWatchlist(data);
      } catch (err) {
        setError('Failed to fetch watchlist');
        console.error('Watchlist error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [currentUser, navigate]);

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
        <div className="flex items-center">
          <FiStar className="text-amber-500 text-2xl mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Your Watchlist</h1>
        </div>
        <p className="text-gray-600">Track your favorite stocks</p>
      </div>

      {error && <Alert type="error" message={error} />}

      {watchlist.length === 0 ? (
        <div className="card text-center py-16">
          <FiStar className="mx-auto text-amber-500 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500 mb-6">Add stocks to your watchlist to track them here</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary inline-flex items-center"
          >
            Browse Stocks
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;