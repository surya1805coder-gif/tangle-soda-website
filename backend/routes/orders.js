const express = require('express');
const router = express.Router();
const db = require('../config/database-sqlite');

// POST /api/orders — Create a new order
router.post('/', (req, res) => {
  try {
    const { sessionId, items, shippingAddress, email, total } = req.body;

    if (!sessionId || !items || items.length === 0 || !shippingAddress || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, items, shippingAddress, email'
      });
    }

    // Insert order
    const insertOrder = db.prepare(`
      INSERT INTO orders (session_id, status, total_price, payment_method, shipping_address)
      VALUES (?, 'pending', ?, 'card', ?)
    `);
    const orderResult = insertOrder.run(sessionId, total, JSON.stringify({ ...shippingAddress, email }));
    const orderId = orderResult.lastInsertRowid;

    // Insert order items
    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, flavor_id, quantity, price_at_purchase)
      VALUES (?, ?, ?, ?)
    `);
    for (const item of items) {
      insertItem.run(orderId, item.flavor_id, item.quantity, item.price || 20.00);
    }

    // Clear the session cart
    db.prepare('DELETE FROM cart WHERE session_id = ?').run(sessionId);

    res.json({
      success: true,
      message: 'Order created successfully',
      data: { orderId, status: 'pending', total }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  }
});

// GET /api/orders/:id — Get single order with items
router.get('/:id', (req, res) => {
  try {
    const orderId = req.params.id;

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const items = db.prepare(`
      SELECT oi.*, f.flavor_name, f.color_hex
      FROM order_items oi
      JOIN flavors f ON oi.flavor_id = f.id
      WHERE oi.order_id = ?
    `).all(orderId);

    // Parse shipping address JSON
    let shippingAddress = {};
    try { shippingAddress = JSON.parse(order.shipping_address); } catch (e) {}

    res.json({
      success: true,
      data: { ...order, shippingAddress, items }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

// GET /api/orders/session/:sessionId — Get all orders for a session
router.get('/session/:sessionId', (req, res) => {
  try {
    const orders = db.prepare(
      'SELECT * FROM orders WHERE session_id = ? ORDER BY order_date DESC'
    ).all(req.params.sessionId);

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

module.exports = router;
