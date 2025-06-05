import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QbzxIKifv5DsMPzVbkOxnTpo8TvCge0kBMV1cjEM4N2xNNRyNBjVphbJbm6G00TbOjCPtPP8SIEzFPKYeMxRuOh00kbCo5PhL"); // ✅ Use your actual public key

const BookingPage = () => {
  const { tourId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const userId = "6629c1b8d03e2f5a8d4c67b3"; // 🔁 Replace with actual user ID from auth
      const amount = 5000; // Optional: fetch actual tour price dynamically

      const { data } = await axios.post("http://localhost:5000/api/stripe/create-checkout-session", {
        tourId,
        userId,
        amount,
      });

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Failed to initiate checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Book Your Tour</h1>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default BookingPage;
