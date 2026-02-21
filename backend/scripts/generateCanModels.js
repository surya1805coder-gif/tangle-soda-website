const THREE = require('three');
const fs = require('fs');
const path = require('path');

// Import GLTFExporter
const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');

// Create models directory if it doesn't exist
const modelsDir = path.join(__dirname, '../frontend/public/models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
  console.log(`✅ Created ${modelsDir}`);
}

// Function to create a soda can
function createSodaCan(colorHex) {
  const group = new THREE.Group();

  // Can body material (metallic aluminum)
  const material = new THREE.MeshStandardMaterial({
    color: colorHex,
    metalness: 1.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  // Main cylinder body (can)
  const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2.0, 32);
  const body = new THREE.Mesh(bodyGeometry, material);
  group.add(body);

  // Top rim
  const topRimGeometry = new THREE.CylinderGeometry(0.85, 0.85, 0.1, 32);
  const topRim = new THREE.Mesh(topRimGeometry, material);
  topRim.position.y = 1.05;
  group.add(topRim);

  // Bottom rim
  const bottomRimGeometry = new THREE.CylinderGeometry(0.85, 0.85, 0.1, 32);
  const bottomRim = new THREE.Mesh(bottomRimGeometry, material);
  bottomRim.position.y = -1.05;
  group.add(bottomRim);

  // Top cap (flat top)
  const capGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32);
  const cap = new THREE.Mesh(capGeometry, material);
  cap.position.y = 1.025;
  group.add(cap);

  return group;
}

// Function to export model as binary .glb file
async function exportModelBinary(model, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();

    exporter.parse(
      model,
      (gltf) => {
        const filePath = path.join(modelsDir, filename);

        if (gltf instanceof ArrayBuffer) {
          fs.writeFileSync(filePath, Buffer.from(gltf));
        } else {
          fs.writeFileSync(filePath, Buffer.from(JSON.stringify(gltf)));
        }

        const fileSize = fs.statSync(filePath).size;
        console.log(`✅ Exported: ${filename} (${(fileSize / 1024).toFixed(2)} KB)`);
        resolve();
      },
      (error) => {
        console.error(`❌ Error exporting ${filename}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

// Create and export all three cans
async function generateAllCans() {
  console.log('🎨 Generating Tangle Soda Cans...\n');

  // Define colors matching specifications
  const colors = {
    orange: 0xFF6600,      // Orange: RGB(1.0, 0.6, 0.0) = #FF6600
    greenApple: 0x22CC44,  // Green Apple: RGB(0.13, 0.8, 0.26) = #22CC44
    lemon: 0xFFDD00,       // Lemon: RGB(1.0, 1.0, 0.0) = #FFDD00
  };

  try {
    // Create Orange Can
    console.log('🟠 Creating Orange can...');
    const orangeCan = createSodaCan(colors.orange);
    await exportModelBinary(orangeCan, 'can_orange.glb');

    // Create Green Apple Can
    console.log('🟢 Creating Green Apple can...');
    const greenAppleCan = createSodaCan(colors.greenApple);
    await exportModelBinary(greenAppleCan, 'can_greenapple.glb');

    // Create Lemon Can
    console.log('🟡 Creating Lemon can...');
    const lemonCan = createSodaCan(colors.lemon);
    await exportModelBinary(lemonCan, 'can_lemon.glb');

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

// Run the generation
generateAllCans();
