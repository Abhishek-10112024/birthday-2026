# Audio Implementation Plan - Constellation of Memories

## 🎯 Goal
Implement a hybrid audio system with:
1. Background ambient music
2. Memory-specific audio clips
3. Subtle UI sound effects
4. User controls (mute, volume)

---

## 📋 Implementation Steps

### **Step 1: Create Audio Service**
Create a centralized service to manage all audio playback.

**File**: `src/app/services/audio.service.ts`

**Features**:
- Play/pause/stop background music
- Play sound effects
- Play memory audio
- Volume control
- Mute functionality
- Fade in/out
- Respect user preferences

---

### **Step 2: Update Data Models**
Add audio support to existing models.

**File**: `src/app/models/memory.model.ts`

```typescript
export interface MediaItem {
  url: string;
  type: 'image' | 'pdf' | 'audio';  // Add audio
  caption?: string;
  duration?: number;  // For audio files
}

export interface Memory {
  // ... existing fields
  audioUrl?: string;  // Optional background audio for this memory
}
```

---

### **Step 3: Add Audio Assets**
Create folder structure for audio files.

**Structure**:
```
public/assets/audio/
├── background/
│   └── ambient-space.mp3       # Main background music
├── effects/
│   ├── star-click.mp3          # Star click sound
│   ├── memory-unlock.mp3       # Memory unlock sound
│   ├── gallery-open.mp3        # Gallery open sound
│   └── all-unlocked.mp3        # All memories unlocked
└── memories/
    ├── memory-1-audio.mp3      # Memory-specific audio
    └── memory-2-audio.mp3
```

---

### **Step 4: Background Music Component**
Add background music to landing page with controls.

**Features**:
- Auto-play on page load (with user interaction)
- Loop continuously
- Fade out when memory dialog opens
- Fade in when dialog closes
- Mute button in corner
- Volume control (optional)

---

### **Step 5: Memory Audio Player**
Add audio player to memory dialog for memory-specific audio.

**Features**:
- Play/pause button
- Progress bar
- Time display
- Auto-pause background music
- Resume background when closed

---

### **Step 6: Sound Effects**
Add subtle sound effects for UI interactions.

**Interactions**:
- Star click → Soft twinkle (0.3s)
- Memory unlock → Gentle chime (0.5s)
- Gallery open → Soft whoosh (0.2s)
- Gallery navigate → Subtle click (0.1s)
- All unlocked → Celebration (1s)

---

### **Step 7: Audio in Gallery**
Support audio files in the lightbox gallery.

**Features**:
- Audio player UI in lightbox
- Play/pause controls
- Waveform visualization (optional)
- Auto-pause when navigating away

---

## 🎨 UI Components Needed

### **1. Mute Button (Global)**
**Location**: Top-right corner of landing page
**Design**: 
- Icon: volume_up / volume_off
- Floating button
- Persists across page
- Saves preference to localStorage

### **2. Audio Player (Memory Dialog)**
**Location**: Below memory description
**Design**:
- Play/pause button
- Progress bar
- Time: 0:00 / 2:30
- Volume slider (optional)
- Minimal, elegant design

### **3. Audio Player (Gallery)**
**Location**: Bottom of lightbox
**Design**:
- Similar to memory dialog player
- Waveform visualization (optional)
- Auto-hide controls after 3s

---

## 🔧 Technical Implementation

### **AudioService Methods**

```typescript
class AudioService {
  // Background Music
  playBackgroundMusic(url: string, volume?: number): void
  pauseBackgroundMusic(): void
  resumeBackgroundMusic(): void
  fadeOutBackground(duration: number): void
  fadeInBackground(duration: number): void
  
  // Sound Effects
  playSoundEffect(effectName: string): void
  
  // Memory Audio
  playMemoryAudio(url: string): void
  pauseMemoryAudio(): void
  stopMemoryAudio(): void
  
  // Controls
  setVolume(volume: number): void
  toggleMute(): void
  isMuted(): boolean
  
  // Cleanup
  stopAll(): void
}
```

---

## 📦 Audio File Requirements

### **Background Music**
- **Format**: MP3 (best compatibility)
- **Duration**: 2-5 minutes (loopable)
- **Size**: <2MB
- **Bitrate**: 128kbps
- **Style**: Ambient, ethereal, calm
- **Volume**: Mixed at -20dB (quiet)

### **Sound Effects**
- **Format**: MP3 or OGG
- **Duration**: 0.1-1s
- **Size**: <50KB each
- **Bitrate**: 64kbps
- **Volume**: Mixed at -15dB

### **Memory Audio**
- **Format**: MP3
- **Duration**: 30s - 2min
- **Size**: <1MB
- **Bitrate**: 128kbps
- **Type**: Voice memos, music clips, ambient sounds

---

## 🎵 Recommended Audio Sources

### **Free Ambient Music**
1. **Pixabay Music** - https://pixabay.com/music/
2. **Free Music Archive** - https://freemusicarchive.org/
3. **YouTube Audio Library** - https://studio.youtube.com/
4. **Incompetech** - https://incompetech.com/

### **Sound Effects**
1. **Freesound** - https://freesound.org/
2. **Zapsplat** - https://www.zapsplat.com/
3. **Mixkit** - https://mixkit.co/free-sound-effects/

### **Search Terms**
- "ambient space music"
- "ethereal piano"
- "calm electronic"
- "soft chime sound"
- "gentle whoosh"
- "twinkle sound effect"

---

## 🚀 Implementation Order

### **Phase 1: Core Audio Service** (30 min)
- [ ] Create AudioService
- [ ] Implement basic play/pause/stop
- [ ] Add volume control
- [ ] Add mute functionality

### **Phase 2: Background Music** (45 min)
- [ ] Add background music to landing page
- [ ] Create mute button component
- [ ] Implement fade in/out
- [ ] Save mute preference to localStorage
- [ ] Test on different browsers

### **Phase 3: Memory Audio** (1 hour)
- [ ] Update MediaItem model
- [ ] Create audio player component
- [ ] Add to memory dialog
- [ ] Implement pause background when playing
- [ ] Add to gallery lightbox

### **Phase 4: Sound Effects** (30 min)
- [ ] Add sound effect files
- [ ] Implement star click sound
- [ ] Implement unlock sound
- [ ] Implement gallery sounds
- [ ] Test volume levels

### **Phase 5: Polish** (30 min)
- [ ] Add loading states
- [ ] Handle errors gracefully
- [ ] Test on mobile
- [ ] Optimize file sizes
- [ ] Add accessibility features

**Total Time**: ~3 hours

---

## ⚠️ Important Considerations

### **Browser Autoplay Policy**
- Modern browsers block autoplay with sound
- Require user interaction first
- Show "Click to enable sound" message
- Or start muted and let user unmute

### **Mobile Considerations**
- Audio files can be large on mobile data
- Provide option to disable on mobile
- Use lower bitrate for mobile
- Respect battery saver mode

### **Performance**
- Lazy load audio files
- Preload only background music
- Use Web Audio API for better control
- Implement audio sprite for sound effects (optional)

### **Accessibility**
- Provide visual indicators when audio plays
- Allow keyboard control (spacebar)
- Respect prefers-reduced-motion
- Provide transcripts for voice memos

---

## 🧪 Testing Checklist

- [ ] Background music plays on page load
- [ ] Mute button works correctly
- [ ] Background fades out when dialog opens
- [ ] Background fades in when dialog closes
- [ ] Memory audio plays correctly
- [ ] Memory audio pauses background
- [ ] Sound effects play at correct times
- [ ] Volume control works
- [ ] Mute preference persists
- [ ] Works on Chrome, Firefox, Safari
- [ ] Works on mobile devices
- [ ] No audio conflicts
- [ ] Graceful error handling

---

## 📝 User Guide Content

After implementation, create a guide for users:

### **Audio Controls**
- **Mute Button**: Click the speaker icon to mute/unmute all audio
- **Memory Audio**: Click play button in memory dialog to hear audio
- **Volume**: Adjust volume using the slider (if implemented)
- **Keyboard**: Press spacebar to pause/play memory audio

### **Audio Features**
- **Background Music**: Soft ambient music plays on the landing page
- **Memory Audio**: Some memories have special audio clips (voice memos, songs)
- **Sound Effects**: Subtle sounds enhance interactions
- **Auto-Pause**: Background music automatically pauses when playing memory audio

---

## 🎯 Success Criteria

Audio implementation is successful when:

1. ✅ Background music enhances atmosphere without being intrusive
2. ✅ User can easily mute/unmute audio
3. ✅ Memory audio adds emotional depth
4. ✅ Sound effects feel natural and subtle
5. ✅ No audio conflicts or overlaps
6. ✅ Works across all major browsers
7. ✅ Performance remains smooth
8. ✅ User preferences are respected

---

## 🔮 Future Enhancements

### **Phase 2 Features**
- Audio visualization (waveforms)
- Playlist for background music
- Custom audio upload
- Audio recording in-app
- Spatial audio effects
- Audio crossfade between memories
- Equalizer controls

### **Advanced Features**
- AI-generated ambient sounds based on memory
- Voice-to-text for audio memos
- Audio sharing
- Collaborative playlists
- Audio themes (different moods)

---

Ready to start implementation! 🚀
