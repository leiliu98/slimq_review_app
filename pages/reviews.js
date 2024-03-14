// pages/review.js
import { useState } from 'react';

export default function ReviewPage() {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewText, productId: 1 }), // Adjust productId as necessary
    });

    if (response.ok) {
      window.location.href = '/thank-you';
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Enter your review"
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

