// pages/api/reviews.js

import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const connection = await mysql.createConnection({
        host: 'yourHost',
        user: 'yourUser',
        password: 'yourPassword',
        database: 'yourDatabase',
      });
      
      const { reviewText, productId } = req.body;
      const [result] = await connection.query('INSERT INTO reviews (product_id, review_text) VALUES (?, ?)', [productId, reviewText]);

      await connection.end();
      res.status(200).json({ message: 'Review submitted successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Database connection error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
