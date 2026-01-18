# Constellation of Memories - Customization Guide

## 🎨 How to Personalize Your Website

### 1. Update Memories
Edit `src/app/services/memory.service.ts` to customize your memories:

```typescript
memories = signal<Memory[]>([
  {
    id: 1,
    title: 'Your Memory Title',
    date: 'Month Year',
    description: 'Your heartfelt description of this memory...',
    imageUrl: 'assets/images/memory1.jpg',
    x: 20,  // Position on screen (0-100%)
    y: 30,  // Position on screen (0-100%)
    unlocked: false
  },
  // Add more memories...
]);
```

**Tips:**
- Add 6-10 memories for best experience
- Keep descriptions personal and meaningful
- Adjust x/y positions to spread stars across the screen
- Use dates that are meaningful to both of you

### 2. Add Your Images
Place your photos in `public/assets/images/`:
- memory1.jpg
- memory2.jpg
- memory3.jpg
- etc.

**Recommended:**
- Size: 800x600px or similar
- Format: JPG or PNG
- Keep file sizes under 500KB for fast loading

### 3. Add Background Music
Place your audio file in `public/assets/audio/`:
- ambient.mp3

**Where to find music:**
- YouTube Audio Library (free)
- Free Music Archive
- Incompetech
- Epidemic Sound (paid)

**Recommended:**
- Soft, romantic instrumental
- 3-5 minutes duration (loops automatically)
- MP3 format

### 4. Customize Final Message
Edit `src/app/pages/final-message/final-message.component.html`:

Find the message section and update with your own words:
```html
<p>
  Your personal message here...
</p>
```

Update your name in the signature:
```html
<span class="signature-name">[Your Name]</span>
```

### 5. Adjust Colors (Optional)
Edit `src/styles.scss` to change the color scheme:

```scss
// Change primary colors
$primary-palette: mat.define-palette(mat.$indigo-palette);
$accent-palette: mat.define-palette(mat.$pink-palette);
```

Available palettes: red, pink, purple, indigo, blue, cyan, teal, green, etc.

### 6. Modify Star Positions
If stars overlap or look crowded, adjust positions in `memory.service.ts`:
- x: horizontal position (0 = left, 100 = right)
- y: vertical position (0 = top, 100 = bottom)

**Tips:**
- Keep stars at least 10-15% apart
- Avoid edges (keep between 15-85%)
- Test on mobile to ensure visibility

### 7. Change Constellation Lines
Edit the `constellationLines` array in `memory.service.ts`:

```typescript
constellationLines = signal<ConstellationLine[]>([
  { from: 1, to: 2 },  // Connects memory 1 to memory 2
  { from: 2, to: 3 },  // Connects memory 2 to memory 3
  // Add more connections...
]);
```

### 8. Add More Memories
To add more than 6 memories:

1. Add new memory objects in `memory.service.ts`
2. Add corresponding images
3. Update constellation lines to connect them
4. Adjust positions to avoid overlap

## 🚀 Running the Project

### Development
```bash
npm start
```
Visit: http://localhost:4200

### Build for Production
```bash
npm run build
```
Output will be in `dist/constellation-of-memories/browser/`

## 📱 Testing

1. **Desktop**: Test in Chrome, Firefox, Safari
2. **Mobile**: Test on actual devices or browser dev tools
3. **Audio**: Make sure audio plays (some browsers require user interaction)
4. **Images**: Verify all images load correctly

## 🎯 Deployment Options

### Option 1: Netlify (Easiest)
1. Create account at netlify.com
2. Drag and drop the `dist/constellation-of-memories/browser` folder
3. Get your URL and share it!

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts

### Option 3: GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Deploy the `dist` folder

## 💡 Tips for Maximum Impact

1. **Choose meaningful memories**: Pick moments that were special to both of you
2. **Write from the heart**: Be genuine and sincere in your descriptions
3. **Quality photos**: Use clear, meaningful photos
4. **Test everything**: Make sure all features work before sharing
5. **Perfect timing**: Choose the right moment to share the website
6. **Personal touch**: Add inside jokes or references only you two understand
7. **Music matters**: Choose a song that has meaning or sets the right mood

## 🐛 Troubleshooting

### Images not loading
- Check file paths match exactly (case-sensitive)
- Ensure images are in `public/assets/images/`
- Verify image file names in `memory.service.ts`

### Audio not playing
- Some browsers block autoplay
- User must interact with page first (click "Begin Journey")
- Check audio file is in `public/assets/audio/`
- Try MP3 format

### Stars overlapping
- Adjust x/y positions in `memory.service.ts`
- Keep at least 10-15% distance between stars

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all file paths are correct
3. Ensure all dependencies are installed
4. Try clearing browser cache

Good luck! 💫❤️
