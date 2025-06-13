import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const AlertForm = ({ currentPrice, onSubmit }) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!targetPrice || isNaN(targetPrice)) {
      setError('Please enter a valid price');
      return;
    }
    
    const price = parseFloat(targetPrice);
    
    if (price <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    
    setError('');
    onSubmit(price);
    setTargetPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Current Price: <span className="font-semibold">${currentPrice.toFixed(2)}</span>
        </label>
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBell className="text-gray-400" />
            </div>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="input-field pl-10"
              placeholder="Set target price"
            />
          </div>
          <button 
            type="submit" 
            className="ml-2 btn-primary whitespace-nowrap"
          >
            Set Alert
          </button>
        </div>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        <p>You will receive a notification when the stock reaches this price.</p>
      </div>
    </form>
  );
};

export default AlertForm;