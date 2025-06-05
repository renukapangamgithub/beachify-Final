import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    serviceType: {
        type: String,
        required: true, // e.g., "Tour Guide", "Weather"
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
