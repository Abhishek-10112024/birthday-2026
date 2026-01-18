# 📝 What to Edit - Quick Reference

This guide shows exactly which files to edit for common customizations.

## 🎯 Most Important Files to Edit

### 1. Your Memories ⭐ (MUST EDIT)
**File:** `src/app/services/memory.service.ts`

**What to change:**
```typescript
memories = signal<Memory[]>([
  {
    id: 1,
    title: 'First Meeting',        // ← Change this
    date: 'January 2024',           // ← Change this
    description: 'Your story...',   // ← Change this
    imageUrl: 'assets/images/memory1.jpg',
    x: 20,  // ← Adjust position if needed
    y: 30,  // ← Adjust position if needed
    unlocked: false
  },
  // ... repeat for all 6 memories
]);
```

**Tips:**
- Keep descriptions personal and meaningful
- Use dates that matter to both of you
- x and y are percentages (0-100)
- Keep stars spread out (at least 10-15% apart)

---

### 2. Your Photos 📸 (MUST ADD)
**Location:** `public/assets/images/`

**Files to add:**
- `memory1.jpg`
- `memory2.jpg`
- `memory3.jpg`
- `memory4.jpg`
- `memory5.jpg`
- `memory6.jpg`

**Requirements:**
- Format: JPG or PNG
- Size: Recommended 800x600px
- File size: Keep under 500KB each
- Names must match exactly (case-sensitive)

---

### 3. Background Music 🎵 (OPTIONAL)
**Location:** `public/assets/audio/`

**File to add:**
- `ambient.mp3`

**Tips:**
- Choose soft, romantic instrumental
- 3-5 minutes duration (will loop)
- MP3 format works best
- Free music: YouTube Audio Library, Free Music Archive

---

### 4. Final Message 💌 (MUST EDIT)
**File:** `src/app/pages/final-message/final-message.component.html`

**What to change:**

**Line ~50 - Your name:**
```html
<span class="signature-name">[Your Name]</span>
```
Change to:
```html
<span class="signature-name">John</span>
```

**Lines ~30-45 - Your message:**
```html
<p>
  Every star in the sky reminds me of a moment we shared,
  a laugh we had, a memory we created together.
</p>
```
Replace all the `<p>` paragraphs with your own words.

**Keep:**
- The HTML structure (`<p>` tags)
- The `class="highlight"` on one paragraph for emphasis
- The overall flow

---

## 🎨 Optional Customizations

### 5. Change Colors (OPTIONAL)
**File:** `src/styles.scss`

**Line ~6-8:**
```scss
$theme: mat.define-theme((
  color: (
    theme-type: dark,
    primary: mat.$violet-palette,    // ← Change this
    tertiary: mat.$magenta-palette,  // ← Change this
  ),
```

**Available colors:**
- `mat.$red-palette`
- `mat.$pink-palette`
- `mat.$purple-palette`
- `mat.$violet-palette`
- `mat.$indigo-palette`
- `mat.$blue-palette`
- `mat.$cyan-palette`
- `mat.$teal-palette`
- `mat.$green-palette`
- `mat.$amber-palette`
- `mat.$orange-palette`

---

### 6. Add More Memories (OPTIONAL)
**File:** `src/app/services/memory.service.ts`

**Add to the memories array:**
```typescript
{
  id: 7,  // ← Next number
  title: 'Another Memory',
  date: 'Month Year',
  description: 'Description...',
  imageUrl: 'assets/images/memory7.jpg',  // ← Add this image
  x: 50,  // ← Choose position
  y: 80,  // ← Choose position
  unlocked: false
}
```

**Also add constellation line:**
```typescript
constellationLines = signal<ConstellationLine[]>([
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },  // ← Add this
]);
```

**Don't forget:**
- Add the corresponding image file
- Adjust positions to avoid overlap

---

### 7. Change Landing Page Text (OPTIONAL)
**File:** `src/app/pages/landing/landing.component.html`

**Lines ~10-15:**
```html
<h1 class="landing-title">A Journey Through Time</h1>
<p class="landing-subtitle">
  Every star holds a memory.<br>
  Every memory tells our story.
</p>
```

Change to your own text.

---

### 8. Change Button Text (OPTIONAL)
**File:** `src/app/pages/landing/landing.component.html`

**Line ~18:**
```html
<button mat-raised-button class="start-button" (click)="startJourney()">
  <mat-icon>auto_awesome</mat-icon>
  Begin the Journey  <!-- ← Change this -->
</button>
```

**File:** `src/app/pages/final-message/final-message.component.html`

**Line ~70:**
```html
<button mat-raised-button class="primary-button">
  <mat-icon>favorite</mat-icon>
  Let's Talk  <!-- ← Change this -->
</button>
```

---

### 9. Adjust Star Positions (IF NEEDED)
**File:** `src/app/services/memory.service.ts`

If stars overlap or look crowded, adjust `x` and `y` values:

```typescript
{
  id: 1,
  // ... other properties
  x: 20,  // ← Horizontal position (0 = left, 100 = right)
  y: 30,  // ← Vertical position (0 = top, 100 = bottom)
}
```

**Tips:**
- Keep between 15-85 to avoid edges
- Spread stars at least 10-15% apart
- Test on mobile to ensure visibility

---

### 10. Change Constellation Pattern (ADVANCED)
**File:** `src/app/services/memory.service.ts`

**Lines ~40-47:**
```typescript
constellationLines = signal<ConstellationLine[]>([
  { from: 1, to: 2 },  // Connects star 1 to star 2
  { from: 2, to: 3 },  // Connects star 2 to star 3
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 }
]);
```

**Examples:**

**Star pattern:**
```typescript
{ from: 1, to: 2 },
{ from: 1, to: 3 },
{ from: 1, to: 4 },
{ from: 1, to: 5 },
{ from: 1, to: 6 }
```

**Circle pattern:**
```typescript
{ from: 1, to: 2 },
{ from: 2, to: 3 },
{ from: 3, to: 4 },
{ from: 4, to: 5 },
{ from: 5, to: 6 },
{ from: 6, to: 1 }
```

---

## ⚠️ Files You Should NOT Edit

Unless you know what you're doing, don't edit:
- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `angular.json`
- `package.json`
- `tsconfig.json`
- Any `.spec.ts` files

---

## 🔍 Quick Find Guide

**Need to change...** | **Edit this file...**
--- | ---
Memory titles/descriptions | `src/app/services/memory.service.ts`
Photos | Add to `public/assets/images/`
Background music | Add to `public/assets/audio/`
Final message text | `src/app/pages/final-message/final-message.component.html`
Your name in signature | `src/app/pages/final-message/final-message.component.html`
Landing page text | `src/app/pages/landing/landing.component.html`
Button text | Component HTML files
Theme colors | `src/styles.scss`
Star positions | `src/app/services/memory.service.ts`
Constellation lines | `src/app/services/memory.service.ts`

---

## 📋 Editing Checklist

Before you start:
- [ ] Make a backup of original files
- [ ] Have your photos ready
- [ ] Have your music file ready
- [ ] Write out your memories first
- [ ] Draft your final message

While editing:
- [ ] Edit memory.service.ts
- [ ] Add all photos
- [ ] Add music file
- [ ] Edit final message
- [ ] Update your name
- [ ] Test after each change

After editing:
- [ ] Run `npm start` to test
- [ ] Check all memories load
- [ ] Verify images appear
- [ ] Test music plays
- [ ] Read through all text
- [ ] Check for typos
- [ ] Test on mobile

---

## 💡 Pro Tips

1. **Edit one file at a time** - Test after each change
2. **Keep backups** - Copy files before editing
3. **Watch for typos** - Especially in file paths
4. **Case matters** - `Memory1.jpg` ≠ `memory1.jpg`
5. **Save often** - Don't lose your work
6. **Test frequently** - Catch errors early
7. **Use a good editor** - VS Code recommended

---

## 🆘 Common Mistakes

**Images not showing?**
- Check file names match exactly
- Verify files are in correct folder
- Look for typos in `memory.service.ts`

**Build errors?**
- Check for missing commas
- Verify all quotes are closed
- Look for missing brackets

**Text looks weird?**
- Check HTML tags are closed
- Verify no missing `<p>` or `</p>`

---

**Ready to customize?** Start with the memories, add your photos, and personalize the final message. You've got this! 💫
