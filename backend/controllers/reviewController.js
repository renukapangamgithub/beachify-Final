import Review from '../models/Review.js';

// Get reviews for a specific service
export const getReviews = async (req, res) => {
    const { serviceType } = req.params;
    try {
        const reviews = await Review.find({ serviceType });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: err });
    }
};

// (Optional) Post new review
export const createReview = async (req, res) => {
    const { username, message, rating, serviceType } = req.body;
    try {
        const newReview = new Review({ username, message, rating, serviceType });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add review', error: err });
    }
};
