/**
 * Migration: Add rich columns to flavors table and seed detailed data
 * Run: node scripts/migrateFlavorData.js
 */

const db = require('../config/database-sqlite');

console.log('🔄 Running flavor data migration...');

// Add columns if they don't exist (SQLite doesn't support IF NOT EXISTS on ALTER TABLE columns)
const existingColumns = db.pragma("table_info(flavors)").map(c => c.name);

if (!existingColumns.includes('description')) {
    db.prepare("ALTER TABLE flavors ADD COLUMN description TEXT").run();
    console.log('✅ Added column: description');
}
if (!existingColumns.includes('icon')) {
    db.prepare("ALTER TABLE flavors ADD COLUMN icon VARCHAR(10) DEFAULT '⚡'").run();
    console.log('✅ Added column: icon');
}
if (!existingColumns.includes('tags')) {
    db.prepare("ALTER TABLE flavors ADD COLUMN tags TEXT DEFAULT '[]'").run();
    console.log('✅ Added column: tags (JSON string)');
}
if (!existingColumns.includes('lightning')) {
    db.prepare("ALTER TABLE flavors ADD COLUMN lightning VARCHAR(100)").run();
    console.log('✅ Added column: lightning');
}
if (!existingColumns.includes('price')) {
    db.prepare("ALTER TABLE flavors ADD COLUMN price DECIMAL(10,2) DEFAULT 20.00").run();
    console.log('✅ Added column: price');
}

// Seed rich data for each flavor
const flavorData = [
    {
        id: 1,
        description: "Bold & electric. A citrus punch that wakes you up instantly. Packed with 200mg of pure caffeine, B-vitamins, and zero sugar. The original Tangle experience.",
        icon: '🍊',
        tags: JSON.stringify(['Citrus', 'Bold', 'Electric']),
        lightning: 'Orange Lightning',
        price: 20.00
    },
    {
        id: 2,
        description: "Crisp, tangy & refreshing. The rebel of the Tangle lineup. Sour-forward with a clean finish that lingers. Makes everything else taste boring.",
        icon: '🍏',
        tags: JSON.stringify(['Crisp', 'Tangy', 'Rebel']),
        lightning: 'Cyan Lightning',
        price: 20.00
    },
    {
        id: 3,
        description: "Sour meets sweet. The most intense Tangle yet — Extreme Lemon hits hard and fades slow. Not for the faint-hearted. You've been warned.",
        icon: '🍋',
        tags: JSON.stringify(['Sour', 'Sweet', 'Intense']),
        lightning: 'White Lightning',
        price: 20.00
    }
];

const updateFlavor = db.prepare(`
    UPDATE flavors 
    SET description = ?, icon = ?, tags = ?, lightning = ?, price = ?
    WHERE id = ?
`);

for (const f of flavorData) {
    const result = updateFlavor.run(f.description, f.icon, f.tags, f.lightning, f.price, f.id);
    if (result.changes === 0) {
        console.warn(`⚠️  No flavor found with id=${f.id} — skipping.`);
    } else {
        console.log(`✅ Updated flavor id=${f.id}: ${f.icon}`);
    }
}

console.log('\n🎉 Migration complete! Flavor table now has rich data.');
console.log('📋 Columns now available: id, product_id, flavor_name, color_hex, description, icon, tags, lightning, price, stock_quantity, image_url, model_url');
