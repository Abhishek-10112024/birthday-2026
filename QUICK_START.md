# 🚀 Quick Start Guide

Get your romantic website up and running in 5 minutes!

## Step 1: Install Dependencies ✅

```bash
cd constellation-of-memories
npm install
```

## Step 2: Add Your Content 📝

### A. Update Memories
Open `src/app/services/memory.service.ts` and edit the memories array:

```typescript
{
  id: 1,
  title: 'First Meeting',  // ← Change this
  date: 'January 2024',    // ← Change this
  description: 'Your story here...',  // ← Change this
  imageUrl: 'assets/images/memory1.jpg',
  x: 20,
  y: 30,
  unlocked: false
}
```

### B. Add Photos
1. Place your photos in `public/assets/images/`
2. Name them: `memory1.jpg`, `memory2.jpg`, etc.
3. Recommended size: 800x600px

### C. Add Music (Optional)
1. Place an MP3 file in `public/assets/audio/`
2. Name it: `ambient.mp3`
3. Find free music at: YouTube Audio Library, Free Music Archive

### D. Update Final Message
Open `src/app/pages/final-message/final-message.component.html`

Find and update:
```html
<span class="signature-name">[Your Name]</span>
```

And customize the message paragraphs with your own words.

## Step 3: Test It 🧪

```bash
npm start
```

Visit: http://localhost:4200

**Test checklist:**
- [ ] Landing page loads with stars
- [ ] Can click "Begin the Journey"
- [ ] Stars appear on constellation page
- [ ] Clicking stars opens memory dialogs
- [ ] Images load correctly
- [ ] Music plays (click play button)
- [ ] Final message appears after all stars unlocked
- [ ] Works on mobile (test with browser dev tools)

## Step 4: Build for Production 🏗️

```bash
npm run build
```

Output will be in: `dist/constellation-of-memories/browser/`

## Step 5: Deploy 🌐

### Option A: Netlify (Easiest!)
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag and drop the `dist/constellation-of-memories/browser` folder
4. Get your URL!
5. Share with her ❤️

### Option B: Vercel
```bash
npm i -g vercel
vercel
```

### Option C: GitHub Pages
1. Push code to GitHub
2. Settings → Pages → Enable
3. Deploy `dist` folder

## 🎯 Customization Checklist

Before sharing, make sure you've:
- [ ] Updated all 6 memory titles, dates, and descriptions
- [ ] Added all 6 photos (memory1.jpg through memory6.jpg)
- [ ] Added background music (ambient.mp3)
- [ ] Updated the final message with your words
- [ ] Changed the signature name
- [ ] Tested on desktop browser
- [ ] Tested on mobile device
- [ ] Verified all images load
- [ ] Checked that music plays
- [ ] Read through all text for typos

## 💡 Pro Tips

1. **Photos**: Use photos that mean something to both of you
2. **Descriptions**: Be specific - mention details she'll remember
3. **Music**: Choose something romantic but not too distracting
4. **Timing**: Share when she has time to explore it fully
5. **Follow-up**: Be ready to talk after she sees it
6. **Backup**: Save the URL somewhere safe

## 🆘 Quick Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive!)
- Make sure images are in `public/assets/images/`

**Music not playing?**
- Click the play button (browsers block autoplay)
- Check file is named `ambient.mp3`
- Try MP3 format

**Build errors?**
- Run `npm install` again
- Check for typos in TypeScript files
- Look at terminal error messages

**Stars overlapping?**
- Adjust x and y values in `memory.service.ts`
- Keep values between 15-85 for best results

## 📞 Need More Help?

Check the detailed [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)

---

**You've got this!** Take your time, make it personal, and speak from the heart. Good luck! 💫❤️
