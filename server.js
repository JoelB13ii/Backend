// backend/server.js
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;
const path = require('path'); // For handling file paths

app.use(express.json());

// MongoDB connection URI
const dbURI = 'mongodb+srv://joelbinny2003:Joel0144@cluster0.gprvzai.mongodb.net/Webstore';
let db;

// Connect to MongoDB
MongoClient.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB Webstore database');
    db = client.db(); // Assign the database object to `db`
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/static', express.static(path.join(__dirname, 'Static')));

// Middleware to pass the database to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Check if the backend is working (Health check)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Import the routes from lessons.js (updated to support MongoDB driver)
const lessonsRoutes = require('./lessons');
const addOrderRoutes = require('./addOrder');
const updateStockRoutes = require('./updateStock');

// Use the routes in the app
app.use(lessonsRoutes);
app.use(addOrderRoutes);
app.use(updateStockRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
