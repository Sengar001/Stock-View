import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import stockService from '../../services/stock';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await stockService.searchStocks(query);
      onSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearchResults([]);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stocks by symbol or name..."
            className="input-field pl-10 pr-10 w-full"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <button 
          type="submit" 
          disabled={loading || !query.trim()}
          className="ml-2 btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;