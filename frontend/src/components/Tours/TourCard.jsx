import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Main Tour Card (Clickable) */}
      <div
        className="bg-white border border-gray-300 rounded-lg shadow-md p-5 w-72 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-44 object-cover rounded-md border border-gray-200"
        />

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mt-3">{tour.title}</h2>

        {/* Location */}
        <p className="text-gray-500 text-sm mt-1">📍 {tour.location}</p>

        {/* Price */}
        <p className="text-blue-600 font-semibold text-lg mt-2">₹{tour.price}</p>
      </div>

      {/* Modal with Blur Effect */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blur Background */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>

          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative z-10">
            {/* Large Image */}
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-60 object-cover rounded-md"
            />

            {/* Details */}
            <h2 className="text-xl font-bold text-gray-900 mt-4">{tour.title}</h2>
            <p className="text-gray-500 mt-2">📍 {tour.location}</p>
            <p className="text-blue-600 font-semibold text-lg mt-2">₹{tour.price}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2 mr-2"
                onClick={() => navigate(`/booking/${tour._id}`)}
              >
                Book Now
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg w-1/2"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourCard;
