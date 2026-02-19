import { Injectable, signal } from '@angular/core';
import { Memory, ConstellationLine } from '../models/memory.model';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private readonly STORAGE_KEY = 'constellation_unlocked_memories';

  constructor() {
    // Load unlocked state from localStorage on initialization
    this.loadUnlockedState();
  }

  // Signal-based state management
 memories = signal<Memory[]>([
  {
    id: 1,
    title: 'My Peaceful Girl 🥹',
    description: 'Even when you sleep, you look so peaceful and cute. Watching you makes my heart so soft. I’m sorry I was late today… but loving you is always on time ❤️',
    media: [{ url: '/assets/images/memory-1.jpg', type: 'image', caption: 'When you\'re this adorable while sleeping, even my heart can\'t resist' }],
    x: 36,
    y: 12,
    unlocked: false
  },
  {
    id: 2,
    title: 'Your Commencement 🎓',
    description: 'Our college days became special because of you. Every small moment felt big with you. You became my comfort. Sorry for being late today, my love ❤️',
    media: [{ url: '/assets/images/memory-2.jpg', type: 'image', caption: 'Our college days – where we celebrated new beginnings together' }],
    x: 53,
    y: 5,
    unlocked: false
  },
  {
    id: 3,
    title: 'Your Smile, My Happiness 😊',
    description: 'Your smile is my favorite thing in this world. When you smile, everything feels right. I’m really sorry I didn’t wish you at midnight 🥺',
    media: [{ url: '/assets/images/memory-3.jpg', type: 'image', caption: 'Your smile is my favorite reason to smile back' }],
    x: 67,
    y: 8,
    unlocked: false
  },
  {
    id: 4,
    title: 'Matching Hearts ❤️',
    description: 'Matching outfits, matching hearts. Holding your hand feels like holding my whole world. I’m sorry I was late… but you are never late in my heart.',
    media: [{ url: '/assets/images/memory-4.jpg', type: 'image', caption: 'Matching colors, matching hearts – us in perfect sync' }],
    x: 68,
    y: 23,
    unlocked: false
  },
  {
    id: 5,
    title: 'Blessed With You 🙏',
    description: 'That temple birthday felt so pure and special. Standing beside you felt like a blessing. I’m sorry for today… I’ll always try to deserve you ❤️',
    media: [{ url: '/assets/images/memory-5.jpg', type: 'image', caption: 'Our first birthday together at the temple – a day blessed by love (Feb 19, 2024)' }],
    x: 68,
    y: 43,
    unlocked: false
  },
  {
    id: 6,
    title: 'Your Healing Touch 🤍',
    description: 'Your hands have magic in them. When you smile, my day becomes better. I’m sorry if I hurt you even a little today 🥺',
    media: [{ url: '/assets/images/memory-6.jpg', type: 'image', caption: 'The healing touch of your hands – home in your care' }],
    x: 55,
    y: 34,
    unlocked: false
  },
  {
    id: 7,
    title: 'The Way You Look At Me ❤️',
    description: 'The way we look at each other says everything. You are my biggest strength. I’m sorry for my mistake… but I will always choose you.',
    media: [{ url: '/assets/images/memory-7.jpg', type: 'image', caption: 'The way we look at each other – pure, undeniable love' }],
    x: 56,
    y: 46,
    unlocked: false
  },
  {
    id: 8,
    title: 'Future In Every Selfie 📸',
    description: 'Every selfie with you feels like our future. I see you in all my dreams. Sorry for being late today… you mean everything to me ❤️',
    media: [{ url: '/assets/images/memory-8.jpg', type: 'image', caption: 'Catching moments of joy, one selfie at a time' }],
    x: 78,
    y: 55,
    unlocked: false
  },
  {
    id: 9,
    title: 'Perfect Fit 🤍',
    description: 'Your head on my shoulder feels perfect. With you, I feel stronger. Forgive me for today… I never want to disappoint you.',
    media: [{ url: '/assets/images/memory-9.jpg', type: 'image', caption: 'Your head on my shoulder – where you fit perfectly' }],
    x: 65,
    y: 96,
    unlocked: false
  },
  {
    id: 10,
    title: 'Starlit Nights With You 🌙',
    description: 'Those terrace nights are my favorite. Just sitting beside you feels magical. Even if I was late… my love is always on time ❤️',
    media: [{ url: '/assets/images/memory-10.jpg', type: 'image', caption: 'Starlit nights and your warmth – terrace memories that last forever' }],
    x: 35,
    y: 96,
    unlocked: false
  },
  {
    id: 11,
    title: 'My Warrior, My Pride 💕',
    description: 'Seeing you confident makes me proud. You are my safe place and peace. I’m sorry if today made you feel less special.',
    media: [{ url: '/assets/images/memory-11.jpg', type: 'image', caption: 'You, suited up and ready – my warrior, my pride' }],
    x: 25,
    y: 54,
    unlocked: false
  },
  {
    id: 12,
    title: 'Going Places Together 🚆',
    description: 'That train journey was more than travel. It was us building memories. Let me celebrate you properly now 🥺❤️',
    media: [{ url: '/assets/images/memory-12.jpg', type: 'image', caption: 'Journey by train, forever by heart – going places together' }],
    x: 45,
    y: 46,
    unlocked: false
  },
  {
    id: 13,
    title: 'Our Story Is My Favorite 🏰',
    description: 'Even ancient places can’t match our story. I fall for you again and again. Forgive your imperfect but very loving Abhishek ❤️',
    media: [{ url: '/assets/images/memory-13.jpg', type: 'image', caption: 'Qutub Minar and us – ancient history can\'t compare to our story' }],
    x: 44,
    y: 34,
    unlocked: false
  },
  {
    id: 14,
    title: 'Tea & You ☕❤️',
    description: 'Tea tastes better when you’re with me. Talking to you feels peaceful. I’m sorry I didn’t say Happy Birthday on time 🥺',
    media: [{ url: '/assets/images/memory-14.jpg', type: 'image', caption: 'Tea and you – the perfect recipe for happiness' }],
    x: 35,
    y: 36,
    unlocked: false
  },
  {
    id: 15,
    title: 'My Forever Girl ✨',
    description: 'When I look at you, I see my forever. You are my today and my future. I’m sorry I was late… but I will love you forever. Happy Birthday, Sakshi ❤️',
    media: [{ url: '/assets/images/memory-15.jpg', type: 'image', caption: 'Draped in grace, dressed in love – my most beautiful sight' }],
    x: 33,
    y: 28,
    unlocked: false
  }
]);

  // Sequential constellation lines: 1→2→3→4→...→15→1 (closed loop)
  constellationLines = signal<ConstellationLine[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 9, to: 10 },
    { from: 10, to: 11 },
    { from: 11, to: 12 },
    { from: 12, to: 13 },
    { from: 13, to: 14 },
    { from: 14, to: 15 },
    { from: 15, to: 1 }
  ]);

  unlockedCount = signal<number>(0);

  private loadUnlockedState(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const unlockedIds: number[] = JSON.parse(stored);
        this.memories.update(memories =>
          memories.map(m => ({
            ...m,
            unlocked: unlockedIds.includes(m.id)
          }))
        );
        this.unlockedCount.set(unlockedIds.length);
      }
    } catch (error) {
      console.error('Error loading unlocked state from localStorage:', error);
    }
  }

  private saveUnlockedState(): void {
    try {
      const unlockedIds = this.memories()
        .filter(m => m.unlocked)
        .map(m => m.id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(unlockedIds));
    } catch (error) {
      console.error('Error saving unlocked state to localStorage:', error);
    }
  }

  unlockMemory(id: number): void {
    const memory = this.memories().find(m => m.id === id);
    if (memory && !memory.unlocked && this.canUnlockMemory(id)) {
      this.memories.update(memories =>
        memories.map(m => m.id === id ? { ...m, unlocked: true } : m)
      );
      this.unlockedCount.update(count => count + 1);
      this.saveUnlockedState();
    }
  }

  canUnlockMemory(id: number): boolean {
    if (id === 1) return true;
    const previousMemory = this.memories().find(m => m.id === id - 1);
    return previousMemory?.unlocked === true;
  }

  getMemoryById(id: number): Memory | undefined {
    return this.memories().find(m => m.id === id);
  }

  areAllMemoriesUnlocked(): boolean {
    return this.memories().every(m => m.unlocked);
  }

  getUnlockedCount(): number {
    return this.memories().filter(m => m.unlocked).length;
  }

  
  convertDriveUrl(url: string): string {
    // Convert Google Drive sharing URL to direct link format
    // Example: https://drive.google.com/file/d/FILE_ID/view
    // Convert to: https://drive.google.com/thumbnail?id=FILE_ID&sz=s4000
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=s4000`;
    }
    return url;
  }
}
