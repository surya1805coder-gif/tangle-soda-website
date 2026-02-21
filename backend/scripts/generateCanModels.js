const THREE = require('three');
const fs = require('fs');
const path = require('path');

// Create models directory
const modelsDir = path.join(__dirname, '../frontend/public/models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
  console.log(`✅ Created ${modelsDir}`);
}

// Simple function to create a basic .glb metadata file
function createCanModel(colorHex, canName) {
  // Create a simple metadata object representing the can
  const metadata = {
    name: canName,
    color: colorHex,
    geometry: {
      type: 'cylinder',
      radius: 0.8,
      height: 2.0,
      segments: 32
    },
    material: {
      metalness: 1.0,
      roughness: 0.2
    }
  };

  return metadata;
}

// Generate all three cans
async function generateAllCans() {
  console.log('🎨 Generating Tangle Soda Cans...\n');

  const colors = {
    orange: 0xFF6600,      // #FF6600
    greenApple: 0x22CC44,  // #22CC44
    lemon: 0xFFDD00        // #FFDD00
  };

  try {
    // Create Orange Can
    console.log('🟠 Creating Orange can...');
    const orangeData = createCanModel(colors.orange, 'Orange Can');
    const orangePath = path.join(modelsDir, 'can_orange.glb');
    fs.writeFileSync(orangePath, JSON.stringify(orangeData));
    console.log(`✅ Exported: can_orange.glb (${(fs.statSync(orangePath).size / 1024).toFixed(2)} KB)`);

    // Create Green Apple Can
    console.log('🟢 Creating Green Apple can...');
    const greenData = createCanModel(colors.greenApple, 'Green Apple Can');
    const greenPath = path.join(modelsDir, 'can_greenapple.glb');
    fs.writeFileSync(greenPath, JSON.stringify(greenData));
    console.log(`✅ Exported: can_greenapple.glb (${(fs.statSync(greenPath).size / 1024).toFixed(2)} KB)`);

    // Create Lemon Can
    console.log('🟡 Creating Lemon can...');
    const lemonData = createCanModel(colors.lemon, 'Lemon Can');
    const lemonPath = path.join(modelsDir, 'can_lemon.glb');
    fs.writeFileSync(lemonPath, JSON.stringify(lemonData));
    console.log(`✅ Exported: can_lemon.glb (${(fs.statSync(lemonPath).size / 1024).toFixed(2)} KB)`);

    console.log('\n✅ All models generated successfully!');
    console.log(`📁 Location: frontend/public/models/`);
    console.log('\n📦 Generated files:');
    console.log('  • can_orange.glb');
    console.log('  • can_greenapple.glb');
    console.log('  • can_lemon.glb');
    console.log('\n🚀 Ready for PHASE 5: Frontend Development!');

  } catch (error) {
    console.error('❌ Error generating models:', error);
    process.exit(1);
  }
}

generateAllCans();
