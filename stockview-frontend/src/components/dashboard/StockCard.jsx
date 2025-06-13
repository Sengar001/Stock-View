import React from 'react';
import { Link } from 'react-router-dom';
import PriceIndicator from './PriceIndicator';

const StockCard = ({ stock }) => {
  return (
    <Link 
      to={`/stock/${stock.symbol}`} 
      className="card hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{stock.symbol}</h3>
          <p className="text-gray-600 text-sm line-clamp-1">{stock.name}</p>
        </div>
        <PriceIndicator change={stock.change} />
      </div>
      
      <div className="mt-4 flex-grow">
        <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>Change: {stock.change.toFixed(2)}</span>
          <span>Percent: {stock.changePercent}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {stock.exchange}
        </span>
        <span className="text-xs text-gray-500">
          Vol: {(stock.volume / 1000000).toFixed(1)}M
        </span>
      </div>
    </Link>
  );
};

export default StockCard;