# Database Setup Guide

## Prerequisites
- PostgreSQL 14+ installed on your system
- Node.js and npm (already installed)

## Installation Instructions

### Windows

1. **Download PostgreSQL:**
   - Visit: https://www.postgresql.org/download/windows/
   - Download PostgreSQL installer (version 14 or higher)

2. **Run the Installer:**
   - Execute the installer
   - Follow the setup wizard
   - **Important:** Remember the password you set for the `postgres` user
   - Keep port as `5432`
   - Complete the installation

3. **Verify Installation:**
   - Open PowerShell or Command Prompt
   - Run: `psql --version`
   - Should display PostgreSQL version

### macOS

```bash
# Using Homebrew
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Verify installation
psql --version
```

### Linux (Ubuntu/Debian)

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql

# Verify installation
psql --version
```

---

## Automatic Database Setup

After PostgreSQL is installed and running:

1. **Update your .env file:**
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=tangle_soda
   DB_USER=postgres
   DB_PASSWORD=<your_password_here>
   ```

2. **Run the setup script:**
   ```bash
   cd backend
   npm run setup-db
   ```

   This will automatically:
   - Create the `tangle_soda` database
   - Create all required tables
   - Insert sample data (3 flavors: Orange, Green Apple, Lemon)

3. **Verify Setup:**
   ```bash
   psql -U postgres -d tangle_soda

   # In psql, run:
   \dt  # List all tables
   SELECT * FROM flavors;  # See the 3 flavors
   \q   # Exit
   ```

---

## Manual Database Setup (if needed)

If you prefer to set up manually:

1. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```

2. **Create database:**
   ```sql
   CREATE DATABASE tangle_soda;
   ```

3. **Connect to new database:**
   ```sql
   \c tangle_soda
   ```

4. **Run schema script:**
   - Open `database/schema.sql`
   - Copy all content
   - Paste into psql
   - Press Enter

5. **Insert sample data:**
   ```sql
   INSERT INTO products (name, description) VALUES
     ('Tangle', 'High-energy drink with amazing flavors');

   INSERT INTO flavors (product_id, flavor_name, color_hex, image_url, stock_quantity)
   VALUES
     ((SELECT id FROM products WHERE name = 'Tangle'), 'Orange', '#FF4500', '/images/orange.png', 100),
     ((SELECT id FROM products WHERE name = 'Tangle'), 'Green Apple', '#22CC44', '/images/green-apple.png', 100),
     ((SELECT id FROM products WHERE name = 'Tangle'), 'Lemon', '#FFDD00', '/images/lemon.png', 100);
   ```

6. **Verify:**
   ```sql
   SELECT * FROM flavors;
   ```

---

## Troubleshooting

### Connection Error: "FATAL: Ident authentication failed"
- Make sure you're using the correct password in `.env`
- Restart PostgreSQL service

### Database Already Exists Error
- This is normal, the setup script handles it automatically

### Port 5432 Already in Use
- PostgreSQL is already running, which is good!
- Or: Stop other services using port 5432

### "psql: command not found"
- PostgreSQL is not installed or PATH not set
- Restart terminal/command prompt after installing PostgreSQL

---

## Next Steps

Once database is set up:

1. Test the backend connection:
   ```bash
   npm run dev
   ```

2. Check the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

3. Continue with PHASE 3: Backend API development

---

Generated: 2026-02-21
