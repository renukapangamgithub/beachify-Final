import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for booking your tour with us!</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
