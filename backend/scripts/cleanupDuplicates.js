// Cleanup: remove duplicate products/flavors that were seeded twice
const db = require('../config/database-sqlite');

console.log('Before cleanup:');
console.log('Products:', db.prepare('SELECT id, name FROM products').all());
console.log('Flavors:', db.prepare('SELECT id, flavor_name, product_id FROM flavors').all());

// Delete flavors for any product beyond id=1
db.prepare('DELETE FROM cart WHERE flavor_id IN (SELECT id FROM flavors WHERE product_id > 1)').run();
db.prepare('DELETE FROM flavors WHERE product_id > 1').run();
db.prepare('DELETE FROM products WHERE id > 1').run();

console.log('\nAfter cleanup:');
console.log('Products:', db.prepare('SELECT id, name FROM products').all());
console.log('Flavors:', db.prepare('SELECT id, flavor_name, product_id, icon, description FROM flavors').all());
console.log('\n✅ Cleanup complete!');
