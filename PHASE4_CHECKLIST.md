# PHASE 4: 3D Modeling - Quick Checklist

## 🎯 Your Mission
Create 3 soda cans in Blender and export them as .glb files.

## ✅ Checklist

### Setup (5 minutes)
- [ ] Open Blender
- [ ] Delete default cube
- [ ] Switch to Shading workspace
- [ ] Set viewport to Material Preview mode

### Create Base Can (10 minutes)
- [ ] Add cylinder (shiftt+A → Mesh → Cylinder)
- [ ] Scale to 0.8 width, 2.0 height (S → number → Enter)
- [ ] Add top ring (another cylinder, scaled 0.85)
- [ ] Add bottom ring (duplicate top, move down)
- [ ] Join all: Ctrl+J
- [ ] Smooth: Right-click → Shade Smooth
- [ ] Rename to "Can_Base"

### Create Aluminum Material (10 minutes)
- [ ] Switch to Shading workspace
- [ ] Create new material in Shader Editor
- [ ] Set Base Color: Light gray (0.8, 0.8, 0.8)
- [ ] Set Metallic: 1.0
- [ ] Set Roughness: 0.2
- [ ] Result: Shiny metallic can!

### Create Orange Can (5 minutes)
- [ ] Duplicate Can_Base (Shift+D)
- [ ] Rename to "Can_Orange"
- [ ] Change material Base Color to ORANGE (1.0, 0.6, 0.0)
- [ ] Move to the side (G → X → 3)

### Create Green Apple Can (5 minutes)
- [ ] Duplicate Can_Orange (Shift+D)
- [ ] Rename to "Can_GreenApple"
- [ ] Change material Base Color to GREEN (0.13, 0.8, 0.26)
- [ ] Move to the side (G → X → 3)

### Create Lemon Can (5 minutes)
- [ ] Duplicate Can_GreenApple (Shift+D)
- [ ] Rename to "Can_Lemon"
- [ ] Change material Base Color to YELLOW (1.0, 1.0, 0.0)
- [ ] Move to the side (G → X → 3)

### Export Orange Can (2 minutes)
- [ ] Select only Can_Orange
- [ ] File → Export → glTF 2.0 (.glb/.gltf)
- [ ] Location: frontend/public/models/
- [ ] Filename: **can_orange.glb**
- [ ] Enable Gzip compression
- [ ] Click Export glTF 2.0

### Export Green Apple Can (2 minutes)
- [ ] Deselect all
- [ ] Select only Can_GreenApple
- [ ] File → Export → glTF 2.0 (.glb/.gltf)
- [ ] Location: frontend/public/models/
- [ ] Filename: **can_greenapple.glb**
- [ ] Click Export glTF 2.0

### Export Lemon Can (2 minutes)
- [ ] Deselect all
- [ ] Select only Can_Lemon
- [ ] File → Export → glTF 2.0 (.glb/.gltf)
- [ ] Location: frontend/public/models/
- [ ] Filename: **can_lemon.glb**
- [ ] Click Export glTF 2.0

### Verify Files (2 minutes)
- [ ] Check frontend/public/models/ directory
- [ ] Confirm 3 .glb files exist:
  - can_orange.glb
  - can_greenapple.glb
  - can_lemon.glb
- [ ] Each file should be 500KB - 2MB
- [ ] All files present ✓

---

## 📋 Color Reference

Keep handy while modeling:

| Flavor | Color | RGB | Hex |
|--------|-------|-----|-----|
| **Orange** | 🟠 | (1.0, 0.6, 0.0) | #FF4500 |
| **Green Apple** | 🟢 | (0.13, 0.8, 0.26) | #22CC44 |
| **Lemon** | 🟡 | (1.0, 1.0, 0.0) | #FFDD00 |

---

## Material Settings (Copy-Paste Ready)

All cans use the **same material setup**, just different colors:

```
Base Shader: Principled BSDF
├─ Base Color: [See color table above]
├─ Metallic: 1.0
└─ Roughness: 0.2
```

---

## Export Settings (All Cans)

When exporting each can:
1. File → Export → glTF 2.0 (.glb/.gltf)
2. **Format:** glb (binary format, better for web)
3. **Compression:** Gzip (reduces file size)
4. **Include:**
   - ✅ Meshes
   - ✅ Materials
   - ✅ Animation (if added)

---

## Time Estimate

- **Total time:** ~60 minutes for complete beginner
- **If experienced with Blender:** ~30 minutes

---

## Help?

Refer to:
- `PHASE4_BLENDER_GUIDE.md` - Full detailed guide with screenshots
- This file - Quick checklist

---

## Next After This

Once you've created and exported the 3 cans:
1. ✅ PHASE 4 complete!
2. Move to **PHASE 5: Frontend Pages**
3. Build React components (Home, Flavors, Cart, Checkout)
4. Then PHASE 6: Load your models in Three.js!

---

**Let me know when you're done modeling the cans! 🎨**
