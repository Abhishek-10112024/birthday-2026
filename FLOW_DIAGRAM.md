# 🗺️ Website Flow Diagram

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    LANDING PAGE                             │
│                                                             │
│  ✨ Starry night sky background                            │
│  ✨ "A Journey Through Time" title                         │
│  ✨ "Every star holds a memory" subtitle                   │
│  ✨ "Begin the Journey" button                             │
│                                                             │
│              [User clicks button]                           │
│                      ↓                                      │
└─────────────────────────────────────────────────────────────┘
                       ↓
                       ↓ (Fade transition)
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 CONSTELLATION PAGE                          │
│                                                             │
│  🌟 Interactive star field                                 │
│  🌟 6 clickable memory stars                               │
│  🌟 Progress bar (0/6 unlocked)                            │
│  🌟 Audio controls (play/pause/mute)                       │
│  🌟 Background stars twinkling                             │
│                                                             │
│              [User clicks a star]                           │
│                      ↓                                      │
│  ┌──────────────────────────────────────────────┐          │
│  │                                              │          │
│  │         MEMORY DIALOG (Modal)                │          │
│  │                                              │          │
│  │  📸 Photo of the memory                      │          │
│  │  ⭐ Memory title                             │          │
│  │  📅 Date                                     │          │
│  │  📝 Description                              │          │
│  │  ✨ Sparkle effects                          │          │
│  │                                              │          │
│  │         [User closes dialog]                 │          │
│  │                ↓                             │          │
│  └──────────────────────────────────────────────┘          │
│                      ↓                                      │
│  ⭐ Star now glows (unlocked)                              │
│  📊 Progress bar updates (1/6 unlocked)                    │
│  🔗 Constellation line appears                             │
│                                                             │
│  [User clicks more stars, repeats process]                 │
│                      ↓                                      │
│  ⭐⭐⭐⭐⭐⭐ All 6 stars unlocked!                          │
│  📊 Progress bar: 6/6                                      │
│  🎨 Full constellation visible                             │
│                      ↓                                      │
│         (Automatic transition after 2 seconds)             │
│                      ↓                                      │
└─────────────────────────────────────────────────────────────┘
                       ↓
                       ↓ (Fade transition)
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  FINAL MESSAGE PAGE                         │
│                                                             │
│  💫 Heart-shaped constellation (animated)                  │
│  💝 "You've Always Been My Constellation"                  │
│  💌 Your heartfelt message                                 │
│  ✍️ Your signature                                         │
│  💕 "Let's Talk" button                                    │
│  ❤️ Floating hearts animation                              │
│                                                             │
│              [Mission accomplished! 🎉]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    APP INITIALIZATION                       │
│                                                             │
│  main.ts → bootstraps AppComponent                         │
│  app.config.ts → provides routing & animations             │
│  app.routes.ts → defines page routes                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES LOADED                          │
│                                                             │
│  MemoryService:                                             │
│    - Loads 6 memories with Signal state                    │
│    - Tracks unlocked status                                │
│    - Manages constellation lines                           │
│                                                             │
│  AudioService:                                              │
│    - Loads ambient.mp3                                     │
│    - Controls playback                                     │
│    - Manages volume/mute                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   ROUTE: / (Landing)                        │
│                                                             │
│  LandingComponent:                                          │
│    - Generates 100 background stars                        │
│    - GSAP animations for title/subtitle                    │
│    - Button click → navigate to /constellation             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              ROUTE: /constellation                          │
│                                                             │
│  ConstellationComponent:                                    │
│    - Renders 6 memory stars at x,y positions              │
│    - Generates 150 background stars                        │
│    - Canvas draws constellation lines                      │
│    - Click handler:                                        │
│      1. Unlock memory in MemoryService                     │
│      2. Particle burst animation                           │
│      3. Open MemoryDialogComponent                         │
│      4. Redraw constellation lines                         │
│      5. Update progress bar                                │
│    - When all unlocked → navigate to /final-message        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│            COMPONENT: MemoryDialogComponent                 │
│                                                             │
│  Material Dialog:                                           │
│    - Receives Memory data                                  │
│    - Displays image, title, date, description              │
│    - GSAP animations for content reveal                    │
│    - Sparkle effects                                       │
│    - Close button → returns to constellation               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│             ROUTE: /final-message                           │
│                                                             │
│  FinalMessageComponent:                                     │
│    - SVG heart constellation with animation                │
│    - Displays final message                                │
│    - Floating hearts animation                             │
│    - GSAP animations for content reveal                    │
│    - "Let's Talk" button (customizable action)             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MemoryService                            │
│                                                             │
│  memories = signal<Memory[]>([...])                         │
│    ↓                                                        │
│    ├─→ LandingComponent (not used)                         │
│    ├─→ ConstellationComponent (renders stars)              │
│    └─→ MemoryDialogComponent (displays details)            │
│                                                             │
│  unlockedCount = signal<number>(0)                          │
│    ↓                                                        │
│    └─→ ConstellationComponent (progress bar)               │
│                                                             │
│  constellationLines = signal<ConstellationLine[]>([...])    │
│    ↓                                                        │
│    └─→ ConstellationComponent (canvas drawing)             │
│                                                             │
│  Methods:                                                   │
│    - unlockMemory(id) → updates memory.unlocked = true     │
│    - getMemoryById(id) → returns specific memory           │
│    - areAllMemoriesUnlocked() → checks completion          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    AudioService                             │
│                                                             │
│  isPlaying = signal<boolean>(false)                         │
│  isMuted = signal<boolean>(false)                           │
│    ↓                                                        │
│    └─→ ConstellationComponent (audio controls UI)          │
│                                                             │
│  Methods:                                                   │
│    - loadAudio(src) → loads MP3 file                       │
│    - play() → starts playback                              │
│    - pause() → stops playback                              │
│    - toggle() → play/pause                                 │
│    - toggleMute() → mute/unmute                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Animation Timeline

```
LANDING PAGE:
0.0s: Page loads
0.0s: Stars start twinkling (continuous)
0.0s: Title fades in from top (1.5s duration)
0.5s: Subtitle fades in from bottom (1.5s duration)
1.5s: Button scales in with bounce (1s duration)
[User clicks button]
→ Fade out entire page (1s)
→ Navigate to constellation

CONSTELLATION PAGE:
0.0s: Page loads
0.0s: Background stars twinkle (continuous)
0.0s: Header fades in (1s)
0.3s: Progress bar slides in (1s)
0.0s-1.6s: Memory stars appear one by one (0.2s delay each)
[User clicks star]
→ Star scales up and down (0.6s)
→ Particle burst (1s)
→ Dialog opens with animations:
  - Image scales in (0.6s)
  - Title fades in (0.5s, delay 0.2s)
  - Date fades in (0.5s, delay 0.3s)
  - Description fades in (0.5s, delay 0.4s)
→ Constellation line draws on canvas
[All stars unlocked]
→ Wait 2 seconds
→ Fade out entire page (1.5s)
→ Navigate to final message

FINAL MESSAGE PAGE:
0.0s: Page loads
0.0s: Background stars twinkle (continuous)
0.0s: Heart constellation scales in (2s)
1.0s: Title fades in (1.5s)
1.5s: Message fades in (1.5s)
2.0s: Signature fades in (1.5s)
2.5s: Button fades in (1s)
3.0s+: Hearts float up continuously
```

---

## File Dependencies

```
index.html
  └─→ main.ts
       └─→ AppComponent (app.ts)
            ├─→ app.config.ts
            │    ├─→ provideRouter
            │    └─→ provideAnimations
            └─→ app.routes.ts
                 ├─→ LandingComponent (lazy loaded)
                 │    ├─→ AudioService
                 │    └─→ GSAP
                 ├─→ ConstellationComponent (lazy loaded)
                 │    ├─→ MemoryService
                 │    ├─→ AudioService
                 │    ├─→ MemoryDialogComponent
                 │    └─→ GSAP
                 └─→ FinalMessageComponent (lazy loaded)
                      ├─→ AudioService
                      └─→ GSAP

styles.scss
  └─→ @angular/material theme
       └─→ All components inherit theme
```

---

## State Management Flow

```
Initial State:
  memories: all unlocked = false
  unlockedCount: 0
  isPlaying: false
  isMuted: false

User clicks star #1:
  MemoryService.unlockMemory(1)
    → memories[0].unlocked = true
    → unlockedCount = 1
    → Signal updates trigger UI refresh
    → ConstellationComponent re-renders
    → Progress bar updates
    → Canvas redraws lines

User clicks star #2:
  MemoryService.unlockMemory(2)
    → memories[1].unlocked = true
    → unlockedCount = 2
    → UI updates automatically

... repeat for stars 3-6 ...

User unlocks star #6:
  MemoryService.unlockMemory(6)
    → memories[5].unlocked = true
    → unlockedCount = 6
    → areAllMemoriesUnlocked() returns true
    → ConstellationComponent detects completion
    → Triggers navigation to final message
```

---

## Customization Points

```
EASY (Edit text/data):
  ├─→ memory.service.ts (memories array)
  ├─→ final-message.component.html (message text)
  └─→ landing.component.html (landing text)

MEDIUM (Add files):
  ├─→ public/assets/images/ (photos)
  └─→ public/assets/audio/ (music)

ADVANCED (Change behavior):
  ├─→ styles.scss (colors/theme)
  ├─→ *.component.scss (styling)
  ├─→ *.component.ts (logic/animations)
  └─→ memory.service.ts (constellation pattern)
```

---

This diagram shows the complete flow from landing to final message, including all technical details, animations, and state management. Use this to understand how everything connects!
