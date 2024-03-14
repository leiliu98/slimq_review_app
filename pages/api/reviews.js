// pages/api/reviews.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reviewText, productId } = req.body; // Ensure these variables match what you're sending in the request

    try {
      const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT || 3306 // Default MySQL port is 3306
      });

      // Assuming your table is called 'reviews' and has columns 'product_id' and 'review_text'
      const query = `
        INSERT INTO reviews (product_id, review_text)
        VALUES (?, ?)
      `;
      const [result] = await connection.execute(query, [productId, reviewText]);

      await connection.end();
      console.log('Review submitted:', result);
      res.status(200).json({ message: 'Review submitted successfully' });

    } catch (error) {
      console.error('API error:', error);

      // Send back a detailed error message in development
      if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({ error: error.message });
      }
      
      // Send back a generic error message in production
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
