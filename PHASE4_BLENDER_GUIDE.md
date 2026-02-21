# PHASE 4: 3D Modeling Guide - Tangle Soda Cans

## 📚 Table of Contents
1. Blender Setup
2. Creating the Base Can Model
3. Modeling Each Flavor
4. Exporting to .glb Format
5. Optimization Tips

---

## ✅ Prerequisites

Before starting, ensure you have:
- **Blender 4.0+** (Download from blender.org if not installed)
- **7-10 GB of free disk space** (for Blender + projects)
- **Folder ready:** `frontend/public/models/` (will store .glb files)

---

## 📖 PART 1: Blender Setup

### Step 1: Open Blender
1. Launch Blender
2. Create a **new general project**
3. Delete the default cube:
   - Select the cube (it's usually selected)
   - Press **X** → **Delete**
4. You should have an empty scene with just a camera and light

### Step 2: Configure Viewport
1. Press **Z** on keyboard → Select **Material Preview** mode (for realistic shading)
2. Switch to **Shading** workspace at top (for creating materials)
3. Set up World Lighting:
   - Go to **World Properties** (sphere icon on right)
   - Set strength to **1.5** for better visibility

---

## 🥫 PART 2: Create the Base Soda Can Model

### Step 1: Add a Cylinder (Can Body)
1. Press **Shift + A** → **Mesh** → **Cylinder**
2. Scale it:
   - Press **S** (scale)
   - Type **0.8** and press Enter (makes it 80% size)
3. Height adjustment:
   - Press **S** then **Z** (scale on Z-axis only)
   - Type **2** and press Enter (makes it twice as tall as wide)

### Step 2: Smooth the Cylinder
1. Select the cylinder
2. Right-click → **Shade Smooth**
3. In properties panel (right), enable **Auto Smooth**

### Step 3: Add Top Ring
1. Add another cylinder: **Shift + A** → **Mesh** → **Cylinder**
2. Scale it smaller: **S** → **0.85**
3. Move it up:
   - Press **G** (grab/move)
   - Press **Z** (move on Z-axis only)
   - Type **2** and press Enter

### Step 4: Add Bottom Ring
1. Duplicate the top ring: **Shift + D**
2. Move it down:
   - Press **G** → **Z** → Type **-4** → Enter
3. Your can now has: body + top ring + bottom ring

### Step 5: Join All Parts
1. Select the main cylinder (left-click)
2. Hold **Shift** and click the top ring (still holding Shift)
3. Continue holding Shift and click the bottom ring
4. Press **Ctrl + J** to join all objects

**Name this object:** "Can_Base"

---

## 🎨 PART 3: Create Materials

### Step 1: Create Aluminum Material
1. In **Shading** workspace, select the can
2. In **Shader Editor** (bottom panel):
   - Click **+ New** to create a material
3. Delete the default "Principled BSDF" node (select and press X)
4. Add a new shader:
   - Press **Shift + A** in Shader Editor
   - **Shader** → **Principled BSDF**
5. Connect to Material Output:
   - Drag yellow dot from BSDF to **Base Color** → Material Output
6. Set properties:
   - **Base Color:** Light gray (RGB: 0.8, 0.8, 0.8)
   - **Metallic:** 1.0 (fully metallic)
   - **Roughness:** 0.2 (shiny, polished look)

**Result:** Metallic aluminum-looking can!

---

## 🍊 PART 4: Create the ORANGE Can

### Step 1: Duplicate the Base Can
1. Select "Can_Base"
2. Press **Shift + D** to duplicate
3. Press Enter to confirm (don't move it)
4. Rename to "Can_Orange"

### Step 2: Change Material to Orange
1. Select the orange can
2. In **Shading** workspace:
   - Find the material's Principled BSDF
   - **Base Color:** Change to ORANGE
     - **RGB values:** R=1.0, G=0.6, B=0.0
   - Keep Metallic: 1.0, Roughness: 0.2

### Step 3: Add Orange Slice Geometry (Optional)
For a more detailed look, you can create orange slices on the can:
1. Add a UV Sphere: **Shift + A** → **Mesh** → **UV Sphere**
2. Scale it: **S** → **0.3**
3. Move it to the can surface: **G** → **Z** (adjust position)
4. Create an orange material for it (same as can, but slightly more saturated)

### Step 4: Position and Save
- Move can to the side: **G** → **X** → Type a value
- This way you can see all 3 later

---

## 🟢 PART 5: Create the GREEN APPLE Can

### Step 1: Duplicate Orange Can
1. Select "Can_Orange"
2. Press **Shift + D** to duplicate
3. Move it: **G** → **X** → Type **3** → Enter
4. Rename to "Can_GreenApple"

### Step 2: Change Material to Green Apple
1. In **Shading** workspace:
   - **Base Color:** GREEN
     - **RGB values:** R=0.13, G=0.8, B=0.26 (or #22CC44)
   - Keep Metallic: 1.0, Roughness: 0.2

### Step 3: Add Green Slice (Optional)
1. Create apple slices geometry similar to orange
2. Color the slices with apple green

---

## 🟡 PART 6: Create the LEMON Can

### Step 1: Duplicate Green Can
1. Select "Can_GreenApple"
2. Press **Shift + D** to duplicate
3. Move it: **G** → **X** → Type **3** → Enter
4. Rename to "Can_Lemon"

### Step 2: Change Material to Lemon Yellow
1. In **Shading** workspace:
   - **Base Color:** YELLOW
     - **RGB values:** R=1.0, G=1.0, B=0.0 (or #FFDD00)
   - Keep Metallic: 1.0, Roughness: 0.2

### Step 3: Add Lemon Slice (Optional)
1. Create lemon slice geometry
2. Color appropriately

---

## ✨ PART 7: Final Touches & Rendering

### Step 1: Add Labels (Optional but Recommended)
For each can, you can add text:
1. Press **Shift + A** → **Text**
2. Edit text (Tab key)
3. Type "ORANGE", "GREEN APPLE", "LEMON"
4. Scale and position on each can
5. Create a simple material (white or contrasting color)

### Step 2: Check Lighting
1. Switch to **Camera** view: **Numpad 0**
2. Adjust lights if needed (top right properties)
3. Your cans should look shiny and professional

### Step 3: Preview the Models
1. Press **F12** to render preview
2. This shows what your models look like rendered
3. Press **Escape** to return to editing

---

## 📦 PART 8: Export to .glb Format

### Step 1: Select Each Can Individually

**For Can_Orange:**
1. Click anywhere in viewport to deselect all
2. Select ONLY "Can_Orange" (left-click on it)
   - Make sure outlines it in orange
3. If there are other objects (labels, slices) that belong to it, select them too while holding **Shift**

### Step 2: Export as .glb
1. **File** → **Export** → **glTF 2.0 (.glb/.gltf)**
2. Choose location: `frontend/public/models/`
3. Filename: **can_orange.glb**
4. In export options (right panel):
   - ✅ Check **Animation** (if you add animations later)
   - ✅ Check **All Influences**
   - Set **Compression:** Gzip (for smaller file)
5. Click **Export glTF 2.0**

### Step 3: Export Green Apple Can
1. Deselect all
2. Select "Can_GreenApple" (and any child objects)
3. **File** → **Export** → **glTF 2.0 (.glb/.gltf)**
4. Filename: **can_greenapple.glb**
5. Click **Export glTF 2.0**

### Step 4: Export Lemon Can
1. Deselect all
2. Select "Can_Lemon" (and any child objects)
3. **File** → **Export** → **glTF 2.0 (.glb/.gltf)**
4. Filename: **can_lemon.glb**
5. Click **Export glTF 2.0**

---

## ✅ Verification

After exporting, verify your files:
```
frontend/public/models/
├── can_orange.glb        ✓ (Should be 500KB - 2MB)
├── can_greenapple.glb    ✓ (Should be 500KB - 2MB)
└── can_lemon.glb         ✓ (Should be 500KB - 2MB)
```

Check file sizes:
- If any file is > 5MB, you may need to optimize
- If files are < 200KB, they might be too small (missing details)

---

## 🚀 Quick Tips for Better Results

### Lighting
- Use 2-3 lights total (not too many)
- One bright key light from top-left
- One softer fill light from opposite side
- World lighting at ~1-2 strength

### Materials
- **Metallic:** Real cans are metallic (1.0)
- **Roughness:** 0.1-0.3 for polished aluminum, 0.5+ for duller finish
- **Color:**
  - Orange: RGB(255, 153, 0)
  - Green: RGB(34, 204, 68)
  - Yellow: RGB(255, 221, 0)

### File Size Optimization
If files are too large (> 3MB):
1. Reduce texture resolution
2. Remove unnecessary geometry (extra subdivisions)
3. Use Gzip compression during export
4. Consider removing fine details like texture maps

### Performance
- Keep polygon count under 100k per model
- Use simple materials (avoid complex node trees initially)
- Test loading in Three.js (PHASE 6) before over-optimizing

---

## 🎬 What's Next After Modeling?

Once you export the .glb files:
1. Copy them to `frontend/public/models/`
2. Move to **PHASE 5: Frontend Pages** to build the UI
3. In **PHASE 6: Three.js**, load these models and add lighting/effects

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can looks too dark | Increase World Light strength to 2+ |
| Can doesn't look metallic | Ensure Metallic slider is at 1.0 |
| Export file is huge (>10MB) | Reduce geometry or enable compression |
| Slices don't match can color | Check RGB values match exactly |
| Text looks weird | Scale text larger, adjust font |

---

## Start Now!

Ready to build? Here's the quickstart checklist:

- [ ] Blender opened and default cube deleted
- [ ] Base can cylinder created and shaped
- [ ] Aluminum material applied (Metallic, Roughness)
- [ ] Orange can duplicated and colored
- [ ] Green apple can duplicated and colored
- [ ] Lemon can duplicated and colored
- [ ] All 3 cans exported as .glb files
- [ ] Files verified in `frontend/public/models/`

When you're done, let me know and we'll move to PHASE 5! 🎉
