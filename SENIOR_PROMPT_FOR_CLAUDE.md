# 🎯 SENIOR-LEVEL PROMPT FOR CLAUDE - PHASE 4: 3D MODELING ASSISTANCE

---

## **PROMPT TO COPY-PASTE TO CLAUDE:**

```
You are an expert Blender 3D modeling instructor and web developer.
Your role is to guide me through creating professional soda can models for a web-based e-commerce website.

## PROJECT CONTEXT:
- Project Name: Tangle 3D Soda Website (Fullstack React + Three.js)
- Purpose: Create 3 interactive 3D soda cans for an energy drink brand
- Target audience: Teens and Gen Z
- Flavor variants: Orange, Green Apple, Lemon
- Delivery format: .glb files (optimized for web with Three.js)
- Technical level: Beginner to intermediate with Blender

## SPECIFICATIONS:

### Brand Colors (DO NOT DEVIATE):
- Orange: RGB(1.0, 0.6, 0.0) or #FF4500
- Green Apple: RGB(0.13, 0.8, 0.26) or #22CC44
- Lemon: RGB(1.0, 1.0, 0.0) or #FFDD00

### Can Model Requirements:
1. **Geometry:**
   - Cylindrical can body (standard soda can proportions)
   - Top and bottom rings/rims
   - Simple, clean design (suitable for web performance)
   - Polygon count: Under 100k per model

2. **Material Properties:**
   - All cans: Metallic aluminum finish
   - Metallic value: 1.0 (fully metallic)
   - Roughness: 0.2 (polished, shiny appearance)
   - Base colors: As specified above

3. **Export Requirements:**
   - Format: .glb (binary glTF 2.0)
   - Compression: Gzip enabled
   - File size target: 500KB - 2MB per model
   - Location: frontend/public/models/
   - Filenames:
     * can_orange.glb
     * can_greenapple.glb
     * can_lemon.glb

## MY CURRENT SITUATION:
- I have Blender 4.0+ installed (or will install it)
- I'm a beginner to intermediate in Blender
- I have ~60 minutes to complete all 3 models from start to export
- I need step-by-step guidance with keyboard shortcuts
- I prefer practical, action-oriented instructions over theory

## WHAT I NEED FROM YOU:

1. **Step-by-step modeling guide** with exact keyboard shortcuts
2. **Material setup instructions** (copy-paste RGB values)
3. **Export procedure** for each can (detailed, no ambiguity)
4. **Troubleshooting tips** for common Blender issues
5. **Optimization suggestions** for web performance
6. **Quick checklist** I can mark off as I progress
7. **Visual feedback points** - what should I see at each step?

## OUTPUT FORMAT:
- Organize by clear sections
- Use numbered steps for procedures
- Include keyboard shortcuts in bold
- Provide exact RGB/numeric values (no approximations)
- Add time estimates for each major section
- Include a progress checklist at the end

## CONSTRAINTS:
- Keep it practical and actionable (no unnecessary theory)
- Assume beginner Blender knowledge
- Don't require external plugins or add-ons
- Focus on speed and efficiency (60-minute target)
- Ensure final models are web-optimized for Three.js loading

## SUCCESS CRITERIA:
✓ 3 .glb files created with correct colors
✓ Files located in frontend/public/models/
✓ Each file 500KB - 2MB in size
✓ Models render correctly in Material Preview mode
✓ Can be used in Three.js scene (PHASE 6)

Please provide a complete, beginner-friendly guide that I can follow in one sitting.
```

---

## **WHY THIS PROMPT IS "SENIOR LEVEL":**

✅ **Clear Context** - You explain what the project is and why
✅ **Specific Requirements** - Exact RGB values, file sizes, formats
✅ **Constraints** - Time limit, technical level, scope boundaries
✅ **Output Format** - You specify HOW you want the response structured
✅ **Success Criteria** - Claude knows exactly what "done" looks like
✅ **Role Definition** - "You are an expert..." sets the tone
✅ **No Ambiguity** - Everything is measurable and testable

This is the kind of prompt that gets:
- Better results from AI
- More focused responses
- Fewer follow-up questions
- Professional-quality output

---

## **HOW TO USE THIS:**

1. **Copy the prompt above** (from the code block)
2. **Open a new Claude conversation**
3. **Paste the entire prompt**
4. **Claude will give you:**
   - Complete Blender guide
   - Step-by-step instructions
   - Checklist to track progress
   - Troubleshooting help
   - Export instructions

---

## **ALTERNATIVELY - EVEN SHORTER VERSION:**

If you want a more concise version:

```
You are a Blender expert. I'm building a Tangle 3D Soda website.
I need to create 3 soda cans (.glb files) in ~60 minutes.

Flavors & Colors:
- Orange: RGB(1.0, 0.6, 0.0)
- Green Apple: RGB(0.13, 0.8, 0.26)
- Lemon: RGB(1.0, 1.0, 0.0)

All cans: Metallic (1.0), Roughness (0.2)

I'm a beginner. Give me:
1. Step-by-step modeling guide (with keyboard shortcuts)
2. Material setup (exact RGB values)
3. Export procedure (.glb format, 500KB-2MB each)
4. Quick checklist to track progress

Target: 3 files in frontend/public/models/ (can_orange.glb, can_greenapple.glb, can_lemon.glb)
```

---

## 💡 **KEY TAKEAWAYS FOR FUTURE PROMPTS:**

When asking Claude for help, always include:
- **WHO you are** (student, developer, beginner)
- **WHAT you're building** (project context)
- **WHY it matters** (business/learning goal)
- **SPECIFIC numbers** (RGB values, file sizes, time limits)
- **HOW you want it** (format, structure, detail level)
- **WHEN it's done** (success criteria, deliverables)

This is the "senior level" approach that gets professional results! 🎯
