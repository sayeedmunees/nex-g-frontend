import React from "react";
import { Link } from "react-router-dom";

const Pnf = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-light text-luxury-green mb-4">404</h1>
          <h2 className="text-2xl font-light text-dark-gray mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center bg-luxury-green text-white px-8 py-3 font-semibold hover:bg-luxury-green/90 transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Pnf;
