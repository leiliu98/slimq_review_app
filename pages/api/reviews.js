// pages/api/reviews.js

import mysql from 'mysql2/promise';

// pages/api/reviews.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Your database logic here
        // For example:
        // const result = await database.query('INSERT INTO reviews ...');
  
        console.log('Review submitted:', req.body);
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
  
