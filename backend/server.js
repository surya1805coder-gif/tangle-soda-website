console.log('=== SERVER.JS LOADED AT:', new Date().toISOString(), '===');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database-sqlite');
const ordersRouter = require('./routes/orders');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/orders', ordersRouter);

// GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Tangle Soda API',
    version: '1.0.0',
    status: 'Running'
  });
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ========== PRODUCTS & FLAVORS ==========

// GET /api/flavors
app.get('/api/flavors', (req, res) => {
  try {
    const flavors = db.prepare('SELECT * FROM flavors').all();
    res.json({
      success: true,
      data: flavors,
      count: flavors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch flavors',
      message: error.message
    });
  }
});

// GET /api/flavors/:id
app.get('/api/flavors/:id', (req, res) => {
  try {
    const flavor = db.prepare('SELECT * FROM flavors WHERE id = ?').get(req.params.id);
    if (!flavor) {
      return res.status(404).json({ success: false, error: 'Flavor not found' });
    }
    res.json({ success: true, data: flavor });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch flavor',
      message: error.message
    });
  }
});

// GET /api/products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const flavors = db.prepare('SELECT * FROM flavors WHERE product_id = ?').all(productId);

    res.json({
      success: true,
      data: {
        ...product,
        flavors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
      message: error.message
    });
  }
});

// ========== CART ENDPOINTS ==========

// GET /api/cart/:sessionId
app.get('/api/cart/:sessionId', (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const cartItems = db.prepare(`
      SELECT c.id, c.quantity, f.id as flavor_id, f.flavor_name, f.color_hex, f.image_url, f.price, p.name as product_name
      FROM cart c
      JOIN flavors f ON c.flavor_id = f.id
      JOIN products p ON f.product_id = p.id
      WHERE c.session_id = ?
      ORDER BY c.added_at DESC
    `).all(sessionId);

    res.json({
      success: true,
      data: cartItems,
      count: cartItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cart',
      message: error.message
    });
  }
});

// POST /api/cart
app.post('/api/cart', (req, res) => {
  console.log('📌 POST /api/cart called! Body:', req.body);
  try {
    const { sessionId, flavorId, quantity } = req.body;

    if (!sessionId || !flavorId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid fields (sessionId, flavorId, quantity)'
      });
    }

    const flavor = db.prepare('SELECT * FROM flavors WHERE id = ?').get(flavorId);
    if (!flavor) {
      return res.status(404).json({
        success: false,
        error: 'Flavor not found'
      });
    }

    const existing = db.prepare(
      'SELECT * FROM cart WHERE session_id = ? AND flavor_id = ?'
    ).get(sessionId, flavorId);

    if (existing) {
      const stmt = db.prepare(
        'UPDATE cart SET quantity = quantity + ? WHERE id = ?'
      );
      stmt.run(quantity, existing.id);
    } else {
      const stmt = db.prepare(
        'INSERT INTO cart (session_id, flavor_id, quantity) VALUES (?, ?, ?)'
      );
      stmt.run(sessionId, flavorId, quantity);
    }

    res.json({
      success: true,
      message: 'Item added to cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add item to cart',
      message: error.message
    });
  }
});

// PUT /api/cart/:cartId
app.put('/api/cart/:cartId', (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quantity'
      });
    }

    const cartItem = db.prepare('SELECT * FROM cart WHERE id = ?').get(cartId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    const stmt = db.prepare('UPDATE cart SET quantity = ? WHERE id = ?');
    stmt.run(quantity, cartId);

    res.json({
      success: true,
      message: 'Cart item updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update cart item',
      message: error.message
    });
  }
});

// DELETE /api/cart/:cartId
app.delete('/api/cart/:cartId', (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cartItem = db.prepare('SELECT * FROM cart WHERE id = ?').get(cartId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    const stmt = db.prepare('DELETE FROM cart WHERE id = ?');
    stmt.run(cartId);

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove item from cart',
      message: error.message
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`
  });
});

app.listen(PORT, () => {
  console.log(`✅ Tangle Backend Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
});
