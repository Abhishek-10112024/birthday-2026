# ✨ Constellation of Memories

A romantic, interactive Angular 21 website that tells your love story through an enchanting constellation of memories. Each star represents a special moment, and together they form a beautiful journey through time.

## 🌟 Features

- **Interactive Star Map**: Click stars to unlock memories
- **Smooth Animations**: GSAP-powered animations for magical transitions
- **Ambient Music**: Background music support with controls
- **Responsive Design**: Works beautifully on desktop and mobile
- **Angular Material**: Modern, polished UI components
- **Signal-based State**: Latest Angular 21 features
- **Progressive Reveal**: Memories unlock one by one, building anticipation
- **Final Message**: Heartfelt conclusion when all memories are discovered

## 🎨 Pages

1. **Landing Page**: Mysterious introduction with starry background
2. **Constellation Map**: Interactive star field with clickable memories
3. **Memory Dialogs**: Beautiful modals showing each memory in detail
4. **Final Message**: Emotional conclusion with heart constellation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` in your browser.

## 📝 Customization

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for detailed instructions on:
- Adding your own memories
- Uploading photos
- Adding background music
- Customizing the final message
- Adjusting colors and themes
- Deploying the website

## 🛠️ Tech Stack

- **Angular 21**: Latest version with standalone components
- **Angular Material 19**: UI components and theming
- **GSAP**: Advanced animations
- **TypeScript**: Type-safe development
- **SCSS**: Powerful styling
- **Signals**: Reactive state management

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── memory-dialog/          # Memory detail modal
│   ├── models/
│   │   └── memory.model.ts         # Data models
│   ├── pages/
│   │   ├── landing/                # Landing page
│   │   ├── constellation/          # Main star map
│   │   └── final-message/          # Final message page
│   ├── services/
│   │   ├── memory.service.ts       # Memory management
│   │   └── audio.service.ts        # Audio controls
│   └── app.routes.ts               # Routing configuration
└── public/
    └── assets/
        ├── images/                 # Memory photos
        └── audio/                  # Background music
```

## 🎯 Key Features Explained

### Memory System
- Each memory has a title, date, description, and optional image
- Memories are positioned as stars on a canvas
- Clicking unlocks memories and reveals content
- Progress bar shows completion status

### Constellation Lines
- Lines connect unlocked memories
- Creates a visual constellation pattern
- Drawn dynamically on HTML canvas
- Can form shapes (heart, initials, etc.)

### Animations
- GSAP for smooth, professional animations
- Particle effects when unlocking memories
- Floating hearts and twinkling stars
- Smooth page transitions

### Audio Support
- Background ambient music
- Play/pause controls
- Mute/unmute toggle
- Auto-loop functionality

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be in `dist/constellation-of-memories/browser/`.

### Deploy to Netlify
1. Build the project
2. Drag and drop the `dist/constellation-of-memories/browser` folder to Netlify
3. Share your URL!

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 💡 Tips for Success

1. **Choose meaningful memories**: Pick 6-10 special moments
2. **Quality photos**: Use clear, high-quality images
3. **Heartfelt descriptions**: Write genuine, personal messages
4. **Test thoroughly**: Check on multiple devices
5. **Perfect timing**: Share at the right moment
6. **Add personal touches**: Include inside jokes and references

## 🎨 Customization Examples

### Change Theme Colors
Edit `src/styles.scss`:
```scss
$primary-palette: mat.define-palette(mat.$purple-palette);
$accent-palette: mat.define-palette(mat.$amber-palette);
```

### Add More Memories
Edit `src/app/services/memory.service.ts`:
```typescript
{
  id: 7,
  title: 'New Memory',
  date: 'Date',
  description: 'Description...',
  imageUrl: 'assets/images/memory7.jpg',
  x: 45,
  y: 65,
  unlocked: false
}
```

### Modify Final Message
Edit `src/app/pages/final-message/final-message.component.html`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Audio autoplay may be blocked by some browsers (requires user interaction)
- Canvas rendering may vary slightly between browsers
- Some animations may be reduced on low-performance devices

## 📄 License

This project is open source and available for personal use.

## 💖 Made with Love

Created to help you express your feelings in a unique and memorable way. Good luck! ✨

---

**Remember**: The most important part isn't the code—it's the genuine feelings and memories you share. Use this as a canvas to express what's in your heart. 💫
