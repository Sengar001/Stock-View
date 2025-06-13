import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const PriceIndicator = ({ change }) => {
  const isPositive = change > 0;
  const arrowIcon = isPositive ? <FiArrowUp /> : <FiArrowDown />;
  const colorClass = isPositive ? 'text-success-500' : 'text-danger-500';
  
  return (
    <span className={`flex items-center ${colorClass}`}>
      {arrowIcon}
      <span className="ml-1 font-medium">
        {Math.abs(change).toFixed(2)}%
      </span>
    </span>
  );
};

export default PriceIndicator;