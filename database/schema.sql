-- Tangle Soda Database Setup Script

-- Create database
CREATE DATABASE tangle_soda;

-- Connect to the database (you'll need to do this separately in psql)
-- \c tangle_soda

-- Create tables
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flavors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  flavor_name VARCHAR(255) NOT NULL,
  color_hex VARCHAR(7),
  image_url VARCHAR(500),
  model_url VARCHAR(500),
  stock_quantity INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_picture_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  flavor_id UUID NOT NULL REFERENCES flavors(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  total_price DECIMAL(10, 2),
  payment_method VARCHAR(50),
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  flavor_id UUID NOT NULL REFERENCES flavors(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_name VARCHAR(255) NOT NULL,
  asset_type VARCHAR(50),
  file_path VARCHAR(500),
  file_size INTEGER,
  flavor_id UUID REFERENCES flavors(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indices
CREATE INDEX idx_flavors_product_id ON flavors(product_id);
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_cart_flavor_id ON cart(flavor_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_flavor_id ON order_items(flavor_id);
CREATE INDEX idx_assets_flavor_id ON assets(flavor_id);

-- Insert sample data
INSERT INTO products (name, description) VALUES
  ('Tangle', 'High-energy drink with amazing flavors');

-- Get the product ID (you'll need to adjust this based on actual ID)
-- INSERT INTO flavors (product_id, flavor_name, color_hex, image_url) VALUES
--   ((SELECT id FROM products WHERE name = 'Tangle'), 'Orange', '#FF4500', '/images/orange.png'),
--   ((SELECT id FROM products WHERE name = 'Tangle'), 'Green Apple', '#22CC44', '/images/green-apple.png'),
--   ((SELECT id FROM products WHERE name = 'Tangle'), 'Lemon', '#FFDD00', '/images/lemon.png');
