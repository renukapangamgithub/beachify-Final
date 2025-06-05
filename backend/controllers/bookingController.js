import Booking from "../models/BookingModel.js";

export const placeBooking = async (req, res) => {
  try {
    const { userId, tourId, amount } = req.body;
    const newBooking = new Booking({ userId, tourId, amount });
    await newBooking.save();
    res.json({ success: true, booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Booking failed" });
  }
};

export const verifyBooking = async (req, res) => {
  const { bookingId, success } = req.body;
  try {
    if (success === "true") {
      await Booking.findByIdAndUpdate(bookingId, { payment: true, status: "Confirmed" });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await Booking.findByIdAndDelete(bookingId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying booking" });
  }
};

export const userBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.body.userId });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

export const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error listing bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    await Booking.findByIdAndUpdate(bookingId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};
