import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-extrabold text-primary-500 mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Page not found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          to="/dashboard" 
          className="btn-primary inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Go back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;