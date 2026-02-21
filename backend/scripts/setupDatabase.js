const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: 'postgres' // Connect to default postgres database first
});

async function setupDatabase() {
  const client = await pool.connect();

  try {
    console.log('🔧 Starting database setup...');

    // 1. Create database if it doesn't exist
    console.log('📦 Creating database...');
    const dbName = process.env.DB_NAME || 'tangle_soda';

    try {
      await client.query(`CREATE DATABASE ${dbName};`);
      console.log(`✅ Database '${dbName}' created successfully!`);
    } catch (err) {
      if (err.code === '42P04') {
        console.log(`✅ Database '${dbName}' already exists!`);
      } else {
        throw err;
      }
    }

    // Close this connection and connect to the new database
    client.release();

    // Create new pool with the new database
    const newPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: dbName
    });

    const dbClient = await newPool.connect();

    try {
      // 2. Read and execute schema
      console.log('\n📋 Running schema...');
      const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');

      // Split by semicolon and filter out empty statements
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt && !stmt.startsWith('--'));

      for (const statement of statements) {
        try {
          await dbClient.query(statement);
        } catch (err) {
          if (!err.message.includes('already exists')) {
            console.error('Error executing statement:', err);
          }
        }
      }

      console.log('✅ Schema executed successfully!');

      // 3. Insert sample data
      console.log('\n📝 Inserting sample data...');

      // Get product ID
      const productResult = await dbClient.query(
        "SELECT id FROM products WHERE name = 'Tangle'"
      );

      let productId;
      if (productResult.rows.length === 0) {
        const insertResult = await dbClient.query(
          "INSERT INTO products (name, description) VALUES ($1, $2) RETURNING id",
          ['Tangle', 'High-energy drink with amazing flavors']
        );
        productId = insertResult.rows[0].id;
        console.log(`✅ Created Tangle product: ${productId}`);
      } else {
        productId = productResult.rows[0].id;
      }

      // Insert flavors
      const flavors = [
        { name: 'Orange', color: '#FF4500', image: '/images/orange.png' },
        { name: 'Green Apple', color: '#22CC44', image: '/images/green-apple.png' },
        { name: 'Lemon', color: '#FFDD00', image: '/images/lemon.png' }
      ];

      for (const flavor of flavors) {
        try {
          await dbClient.query(
            "INSERT INTO flavors (product_id, flavor_name, color_hex, image_url, stock_quantity) VALUES ($1, $2, $3, $4, $5)",
            [productId, flavor.name, flavor.color, flavor.image, 100]
          );
          console.log(`✅ Created flavor: ${flavor.name}`);
        } catch (err) {
          if (!err.message.includes('duplicate')) {
            console.error(`Error creating flavor ${flavor.name}:`, err.message);
          }
        }
      }

      console.log('\n✅ Database setup complete!');
      console.log(`📊 Database: ${dbName}`);
      console.log('🍊 Flavors: Orange, Green Apple, Lemon');

    } finally {
      dbClient.release();
      await newPool.end();
    }

  } catch (err) {
    console.error('❌ Database setup failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run setup
setupDatabase().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
