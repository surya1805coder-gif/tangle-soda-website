const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'tangle.db');

// Open database connection
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log(`✅ Connected to SQLite: ${dbPath}`);

module.exports = db;
