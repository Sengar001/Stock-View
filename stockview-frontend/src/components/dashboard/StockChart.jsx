import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { FiCalendar } from 'react-icons/fi';

const StockChart = ({ data }) => {
  const [interval, setInterval] = useState('daily');
  
  if (!data || data.length === 0) {
    return (
      <div className="card h-80 flex flex-col items-center justify-center">
        <FiCalendar className="text-gray-400 text-4xl mb-4" />
        <p className="text-gray-500">No historical data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Price History</h3>
        <div className="flex space-x-2">
          {['daily', 'weekly', 'monthly'].map((item) => (
            <button
              key={item}
              onClick={() => setInterval(item)}
              className={`px-3 py-1 rounded-full text-sm ${
                interval === item
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (interval === 'daily') return value.split('-').slice(1).join('-');
                if (interval === 'weekly') return `Wk ${value}`;
                return value;
              }}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#0284c7' }}
              name="Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;