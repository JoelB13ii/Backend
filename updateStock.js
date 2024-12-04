const express = require('express');
const router = express.Router();

// PUT route to update available inventory for activities
router.put('/updateStock', async (req, res) => {
  const { cartItems } = req.body;

  // Validate that cartItems is provided and is a non-empty array
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'cartItems must be a non-empty array' });
  }

  try {
    // Loop through each item in the cart
    for (const item of cartItems) {
      const { id, quantity } = item;

      if (!id || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Each cart item must have a valid id and quantity' });
      }

      // Update the available inventory for the corresponding activity
      const result = await req.db.collection('Activities').updateOne(
        { id: id }, // Match the activity by ID
        { $inc: { availableInventory: -quantity } } // Decrease available inventory by the quantity
      );

      // Check if the update was successful
      if (result.modifiedCount === 0) {
        console.warn(`No activity found with id: ${id}`);
      }
    }

    res.status(200).json({ message: 'Stock updated successfully!' });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Failed to update stock', error: error.message });
  }
});

module.exports = router;
