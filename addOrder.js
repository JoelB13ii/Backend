const express = require('express');
const router = express.Router();

// POST route to add a new order
router.post('/addOrder', async (req, res) => {
  const order = req.body;

  // Ensure all required fields are provided
  const requiredFields = ['firstName', 'lastName', 'address', 'city', 'phoneNumber', 'cartItems', 'totalPrice'];
  const missingFields = requiredFields.filter(field => !order[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Missing required fields',
      missingFields: missingFields
    });
  }

  // Validate cartItems
  if (!Array.isArray(order.cartItems) || order.cartItems.length === 0) {
    return res.status(400).json({ message: 'cartItems must be a non-empty array' });
  }

  // Log the received order for debugging
  console.log('Received order:', JSON.stringify(order, null, 2));

  try {
    // Insert the order into the MongoDB collection
    const result = await req.db.collection('Orders').insertOne(order);

    console.log('Order successfully inserted:', result.insertedId);

    res.status(201).json({
      message: 'Order added successfully!',
      orderId: result.insertedId
    });
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ message: 'Failed to add order', error: error.message });
  }
});

module.exports = router;
