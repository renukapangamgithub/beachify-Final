import express from "express";
import {
  placeBooking,
  verifyBooking,
  userBookings,
  listBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/place", placeBooking);
router.post("/verify", verifyBooking);
router.post("/user", userBookings);
router.get("/list", listBookings);
router.post("/status", updateBookingStatus);

export default router;
