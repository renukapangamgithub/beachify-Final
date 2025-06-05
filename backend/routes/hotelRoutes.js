import express from 'express';
import {
  getAllHotels,
  getHotelsNearLocation,
  searchHotelsByTextLocation,
} from '../controllers/hotelController.js';

const router = express.Router();

// Route to get all hotels from local DB
router.get('/', getAllHotels);

// Route to get hotels near a specific lat/lng
router.get('/near', getHotelsNearLocation);

// 🔥 New: Route to get hotels near a searched location (e.g., "Goa", "Juhu Beach")
router.get('/search', searchHotelsByTextLocation);


export default router;
