// backend/server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const port = 5000;

// MongoDB connection URI
const dbURI = 'mongodb+srv://joelbinny2003:Joel0144@cluster0.gprvzai.mongodb.net/Webstore';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Webstore database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import the routes from lessons.js (updated path)
const lessonsRoutes = require('./lessons');

// Use the routes in the app
app.use(lessonsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
