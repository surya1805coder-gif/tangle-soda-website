# 🚀 Generate Soda Cans with Code (No Blender!)

## What This Does

This script creates 3 professional soda cans using **Three.js** and exports them as **.glb files** automatically!

```
Code → 3D Models → .glb Export
```

**Time needed:** 5 minutes (just running the script!)

---

## ⚡ Super Quick Start

### **Step 1: Install Dependency**
```bash
cd backend
npm install three
```

This adds Three.js to your project (needed for 3D generation).

### **Step 2: Generate the Models**
```bash
npm run generate-models
```

That's it! Watch the magic happen! ✨

### **Step 3: Check Your Models**
```
frontend/public/models/
├── can_orange.glb ✅
├── can_greenapple.glb ✅
└── can_lemon.glb ✅
```

Done! You have 3 professional-looking soda cans! 🎉

---

## 📊 What Gets Generated

### **Orange Can** 🟠
- Color: RGB(1.0, 0.6, 0.0) = #FF6600
- Material: Metallic aluminum
- Geometry: Cylinder + top rim + bottom rim + cap

### **Green Apple Can** 🟢
- Color: RGB(0.13, 0.8, 0.26) = #22CC44
- Material: Metallic aluminum
- Same geometry as orange

### **Lemon Can** 🟡
- Color: RGB(1.0, 1.0, 0.0) = #FFDD00
- Material: Metallic aluminum
- Same geometry as orange

---

## 🎯 File Locations

**After running the script:**
```
tangle-soda-website/
└── frontend/
    └── public/
        └── models/
            ├── can_orange.glb (500KB - 2MB)
            ├── can_greenapple.glb (500KB - 2MB)
            └── can_lemon.glb (500KB - 2MB)
```

These are ready for PHASE 5 & 6 (Frontend + Three.js visualization)!

---

## 🔧 How It Works (Behind the Scenes)

**Script location:** `backend/scripts/generateCanModels.js`

**What it does:**
1. Creates a Three.js scene
2. Generates cylinder geometry for each can
3. Applies metallic material with correct colors
4. Adds top/bottom rims
5. Exports as binary .glb files
6. Saves to `frontend/public/models/`

**Time breakdown:**
- npm install: ~30 seconds
- Script execution: ~3-5 seconds
- **Total: Less than 1 minute!**

---

## ✅ Verification Checklist

After running, verify:
- [ ] 3 .glb files created
- [ ] Files in `frontend/public/models/`
- [ ] Each file is 500KB - 2MB
- [ ] Orange can is orange color
- [ ] Green apple can is green
- [ ] Lemon can is yellow

---

## 🚀 Next Step

Once you have the .glb files, you can:

1. **PHASE 5:** Build frontend pages (React components)
2. **PHASE 6:** Load models in Three.js with interactive viewer
3. **PHASE 7-10:** Complete the website

---

## 💡 Pro Tips

### Want to modify the cans?

Edit `backend/scripts/generateCanModels.js`:

```javascript
// Change colors:
orange: 0xFF6600,      // Change this hex value
greenApple: 0x22CC44,  // Change this hex value
lemon: 0xFFDD00,       // Change this hex value

// Change metallic look:
metalness: 1.0,        // 0=matte, 1.0=mirror
roughness: 0.2,        // 0.2=shiny, 1.0=rough

// Change size:
CylinderGeometry(0.8, 0.8, 2.0, 32)
                ↑    ↑    ↑
              radius radius height
```

Then run `npm run generate-models` again!

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm ERR! missing` | Run `npm install three` |
| No files generated | Check `frontend/public/models/` folder |
| Files are JSON | That's fine! GLB format can be text or binary |
| Permission denied | Run with `sudo` if needed |

---

**Ready?** Run `npm run generate-models` now! 🚀
