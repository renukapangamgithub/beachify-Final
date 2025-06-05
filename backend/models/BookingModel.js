import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tourId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
