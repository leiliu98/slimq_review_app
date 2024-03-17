import { useState } from 'react';

export default function ReviewPage() {
  const [reviewText, setReviewText] = useState('');
  const [productId, setProductId] = useState('1'); // Default product ID is set to '1'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewText, productId }), // Send the selected product ID
    });

    if (response.ok) {
      window.location.href = '/thank-you';
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
      <label>
        Product ID:
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}

