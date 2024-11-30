// addOrder.js
const express = require('express');
const router = express.Router();

// POST route to add a new order
router.post('/addOrder', (req, res) => {
  const order = req.body;

  // Make sure all required fields are provided
  if (!order.firstName || !order.lastName || !order.address || !order.city || !order.phoneNumber || !order.cartItems || !order.totalPrice) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Inserting order:', order);  // Log the order to ensure it is being received

  // Insert the order into the MongoDB collection
  req.db.collection('Orders').insertOne(order)
    .then((result) => {
      console.log('Order inserted:', result);  // Log the result of insertion
      res.status(201).json({
        message: 'Order added successfully!',
        orderId: result.insertedId,
      });
    })
    .catch((error) => {
      console.error('Error inserting order:', error);
      res.status(500).json({ message: 'Failed to add order' });
    });
});

module.exports = router;
