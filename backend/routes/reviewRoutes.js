import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:serviceType', getReviews);
router.post('/', createReview); // Optional: if you want to allow user submissions

export default router;
