const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'tangle.db');
const dataDir = path.dirname(dbPath);

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`📁 Created data directory: ${dataDir}`);
}

try {
  // Create or open database
  const db = new Database(dbPath);
  console.log(`✅ Connected to SQLite database: ${dbPath}`);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create tables directly
  console.log('\n📋 Creating tables...');

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created products table');

  // Flavors table
  db.exec(`
    CREATE TABLE IF NOT EXISTS flavors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      flavor_name VARCHAR(255) NOT NULL,
      color_hex VARCHAR(7),
      image_url VARCHAR(500),
      model_url VARCHAR(500),
      stock_quantity INTEGER DEFAULT 100,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created flavors table');

  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      profile_picture_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created users table');

  // Cart table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      session_id VARCHAR(255),
      flavor_id INTEGER NOT NULL REFERENCES flavors(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created cart table');

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      session_id VARCHAR(255),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending',
      total_price DECIMAL(10, 2),
      payment_method VARCHAR(50),
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created orders table');

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      flavor_id INTEGER NOT NULL REFERENCES flavors(id),
      quantity INTEGER NOT NULL,
      price_at_purchase DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created order_items table');

  // Assets table
  db.exec(`
    CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_name VARCHAR(255) NOT NULL,
      asset_type VARCHAR(50),
      file_path VARCHAR(500),
      file_size INTEGER,
      flavor_id INTEGER REFERENCES flavors(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Created assets table');

  // Create indices
  console.log('\n📊 Creating indices...');
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_flavors_product_id ON flavors(product_id);
    CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
    CREATE INDEX IF NOT EXISTS idx_cart_flavor_id ON cart(flavor_id);
    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_flavor_id ON order_items(flavor_id);
    CREATE INDEX IF NOT EXISTS idx_assets_flavor_id ON assets(flavor_id);
  `);
  console.log('✅ Created all indices');

  // Insert sample data
  console.log('\n📝 Inserting sample data...');

  // Insert product
  const insertProduct = db.prepare(
    "INSERT INTO products (name, description) VALUES (?, ?)"
  );
  const productResult = insertProduct.run('Tangle', 'High-energy drink with amazing flavors');
  const productId = productResult.lastInsertRowid;
  console.log(`✅ Created Tangle product`);

  // Insert flavors
  const flavors = [
    { name: 'Orange', color: '#FF4500' },
    { name: 'Green Apple', color: '#22CC44' },
    { name: 'Lemon', color: '#FFDD00' }
  ];

  const insertFlavor = db.prepare(
    "INSERT INTO flavors (product_id, flavor_name, color_hex, stock_quantity) VALUES (?, ?, ?, ?)"
  );

  for (const flavor of flavors) {
    insertFlavor.run(productId, flavor.name, flavor.color, 100);
    console.log(`✅ Created flavor: ${flavor.name}`);
  }

  console.log('\n✅ DATABASE SETUP COMPLETE!');
  console.log(`\n📊 Database Location: ${dbPath}`);
  console.log('🍊 Flavors Created: Orange, Green Apple, Lemon');
  console.log('📦 Database is ready to use!\n');

  db.close();

} catch (err) {
  console.error('❌ Database setup failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
