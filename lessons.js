// backend/lessons.js
const express = require('express');
const router = express.Router();

// Fetch all lessons
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await req.db.collection('Products').find().toArray();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lessons', details: err });
  }
});



module.exports = router;
