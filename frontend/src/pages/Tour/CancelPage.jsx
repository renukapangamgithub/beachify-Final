import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6">Looks like you didn’t complete the booking.</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow"
      >
        Try Again
      </Link>
    </div>
  );
};

export default CancelPage;
