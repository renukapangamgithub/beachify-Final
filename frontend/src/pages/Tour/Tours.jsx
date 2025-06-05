import React, { useState, useEffect } from "react";
import axios from "axios";
import TourList from "../../components/Tours/TourList";


const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tours");
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center border border-gray-300 shadow-md rounded-lg">
      {/* Heading with a Plane Icon */}
      <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2 mb-8 border-b-4 border-blue-500 pb-3">
        Explore Our Exclusive Tours  
        <span className="animate-bounce">✈️</span>
      </h1>

      {/* Tour List */}
      <div className="w-full max-w-6xl border border-gray-300 rounded-lg p-6 shadow-md">
        {tours.length > 0 ? (
          <TourList tours={tours} />
        ) : (
          <p className="text-gray-600 text-lg font-medium">No tours available.</p>
        )}
      </div>
    </div>
  );
};

export default Tours;
