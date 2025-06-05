import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ serviceType, limit, onCommentClick }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      await axios.get(`https://beachify-final-backend.onrender.com/api/reviews/${serviceType}`);
      const sortedReviews = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [serviceType]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const res = await axios.post('https://beachify-final-backend.onrender.com/api/reviews', {
        username,
        message,
        rating,
        serviceType
      });

      if (res.status === 201) {
        setUsername('');
        setMessage('');
        setRating(5);
        fetchReviews(); // Refresh review list
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  if (reviews.length === 0 && limit) return <p>No reviews available yet.</p>;

  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <div>
      {/* Display Reviews */}
      {displayReviews.map((review) => (
        <div
          key={review._id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", cursor: onCommentClick ? 'pointer' : 'default' }}
          onClick={onCommentClick ? () => onCommentClick() : undefined}
        >
          <strong>{review.username}</strong> ({review.rating}⭐):<br />
          <em>{review.message}</em>
        </div>
      ))}

      {/* View All Link */}
      {limit && reviews.length > limit && (
        <p style={{ color: 'blue', cursor: 'pointer' }} onClick={onCommentClick}>
          View all reviews...
        </p>
      )}

      {/* Review Submission Form (only show in full view) */}
      {!limit && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          <h4>Add Your Review</h4>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
          />
          <textarea
            placeholder="Write your review..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
          />
          <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ marginBottom: '10px' }}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewList;
