const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Define schema for Products collection
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    availableInventory: Number,
    rating: Number,
    location: String,
}, { collection: 'Products' });

const Product = mongoose.model('Product', productSchema);

// Test route
router.get('/', (req, res) => {
    res.send('Backend is working!');
});

// GET route to fetch all products
router.get('/products', async (req, res) => {
    try {
        console.log('Fetching products from Webstore/Products...');
        const products = await Product.find();
        console.log('Number of products found:', products.length);
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products: ' + err);
    }
});

// Middleware to serve static files from "Frontend/Static"
router.use('/static', express.static(path.join(__dirname, 'Frontend', 'Static')));

module.exports = router;
