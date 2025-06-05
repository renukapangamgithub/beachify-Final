import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Context
import { BookingProvider } from "../context/BookingContext";

// Stripe Pages
import Tours from "../pages/Tour/Tours";
import BookingPage from "../pages/Tour/BookingPage";
import SuccessPage from "../pages/Tour/SuccessPage";
import CancelPage from "../pages/Tour/CancelPage";

// General Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Beaches from "../destinations/Beaches/Beaches";
import WaterSports from "../Things/WaterSports/WaterSports";
import Contact from "../pages/Contact/Contact";
import Sightseeing from "../Things/Sightseeing/Sightseeing";
import Events from "../Things/Events/Events";
import MoreInfo from "../discover/MoreInfo";
import HotelList from "../pages/Hotels/HotelList";

// Stripe public key
const stripePromise = loadStripe("pk_test_51QbzxIKifv5DsMPzVbkOxnTpo8TvCge0kBMV1cjEM4N2xNNRyNBjVphbJbm6G00TbOjCPtPP8SIEzFPKYeMxRuOh00kbCo5PhL");

const Routers = () => {
  return (
    <BookingProvider>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/more-info" element={<MoreInfo />} />
        <Route path="/destinations/beaches" element={<Beaches />} />
        <Route path="/things/watersports" element={<WaterSports />} />
        <Route path="/things/sightseeing" element={<Sightseeing />} />
        <Route path="/things/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/accommodation/hotels" element={<HotelList/>}/>
      
        {/* Stripe Booking Flow */}
        <Route path="/plan-trip/tours" element={<Tours />} />
        <Route
          path="/booking/:tourId"
          element={
            <Elements stripe={stripePromise}>
              <BookingPage />
            </Elements>
          }
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BookingProvider>
  );
};

export default Routers;
