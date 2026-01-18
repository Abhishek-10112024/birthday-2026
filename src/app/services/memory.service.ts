import { Injectable, signal } from '@angular/core';
import { Memory, ConstellationLine } from '../models/memory.model';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  // Signal-based state management
  memories = signal<Memory[]>([
    {
      id: 1,
      title: 'First Meeting',
      date: 'January 2024',
      description: 'The day our paths crossed and everything changed. I remember your smile lighting up the room.',
      imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The moment we first met'
        },
        {
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Your beautiful smile'
        }
      ],
      x: 20,
      y: 30,
      unlocked: false
    },
    {
      id: 2,
      title: 'Coffee Date',
      date: 'February 2024',
      description: 'Our first coffee together. You ordered that complicated drink and we talked for hours.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1xZwof_AiRI8sp-5FclnV6_q0JcIvofPf/view?usp=drive_link',
          type: 'image',
          caption: 'Our favorite coffee shop'
        },
        {
          url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'That complicated drink you ordered'
        },
        {
          url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Hours of conversation'
        }
      ],
      x: 35,
      y: 45,
      unlocked: false
    },
    {
      id: 3,
      title: 'The Park Walk',
      date: 'March 2024',
      description: 'Walking through the park, sharing dreams and stories. The sunset was beautiful, but not as beautiful as you.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Walking through the park'
        },
        {
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The beautiful sunset'
        }
      ],
      x: 50,
      y: 25,
      unlocked: false
    },
    {
      id: 4,
      title: 'Our Journey Document',
      date: 'April 2024',
      description: 'A special document capturing all our adventures together. Every page tells a story.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1Pr4ZDKq6D0_aR0iOGwwCamFVbruE5yo-/view?usp=sharing',
          type: 'pdf',
          caption: 'Our journey together - PDF document'
        },
        {
          url: 'https://drive.google.com/file/d/1FR_lWl9d6pND28mgdBdR_wtSwPUz0gQp/view?usp=drive_link',
          type: 'image',
          caption: 'Cover page of our memories'
        }
      ],
      x: 65,
      y: 55,
      unlocked: false
    },
    {
      id: 5,
      title: 'Inside Joke',
      date: 'May 2024',
      description: 'Remember when we couldn\'t stop laughing? That moment when everything felt perfect.',
      imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'That hilarious moment'
        }
      ],
      x: 75,
      y: 35,
      unlocked: false
    },
    {
      id: 6,
      title: 'Special Moment',
      date: 'June 2024',
      description: 'The moment I knew you were special. Your kindness, your laugh, everything about you.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1FR_lWl9d6pND28mgdBdR_wtSwPUz0gQp/view?usp=drive_link',
          type: 'image',
          caption: 'You are special'
        },
        {
          url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Your beautiful smile'
        },
        {
          url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Everything about you'
        }
      ],
      x: 85,
      y: 50,
      unlocked: false
    }
  ]);

  constellationLines = signal<ConstellationLine[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 }
  ]);

  unlockedCount = signal<number>(0);

  unlockMemory(id: number): void {
    this.memories.update(memories => 
      memories.map(m => m.id === id ? { ...m, unlocked: true } : m)
    );
    this.unlockedCount.update(count => count + 1);
  }

  getMemoryById(id: number): Memory | undefined {
    return this.memories().find(m => m.id === id);
  }

  areAllMemoriesUnlocked(): boolean {
    return this.memories().every(m => m.unlocked);
  }

  // Helper method to convert Google Drive sharing URL to direct image URL
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

  // Helper method to convert Google Drive sharing URL to PDF preview URL
  convertDrivePdfUrl(url: string): string {
    // Convert Google Drive sharing URL to embeddable format
    // Example: https://drive.google.com/file/d/FILE_ID/view
    // Convert to: https://drive.google.com/file/d/FILE_ID/preview
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }
}
