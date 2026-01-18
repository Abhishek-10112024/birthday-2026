import { Injectable, signal } from '@angular/core';
import { Memory, ConstellationLine, MediaItem } from '../models/memory.model';
import { SupabaseService } from './supabase.service';

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
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/first%20date.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9maXJzdCBkYXRlLmpwZyIsImlhdCI6MTc2ODc0Nzk1MiwiZXhwIjoxODMxODE5OTUyfQ.O3ZyMuILfInr1wWnNAEcESyFcRWjooI2fcb3xrkubb8',
          type: 'image',
          caption: 'The moment we first met at the coffee shop'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/first%20data%20-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9maXJzdCBkYXRhIC0yLmpwZyIsImlhdCI6MTc2ODc0ODA4OSwiZXhwIjoxODMxODIwMDg5fQ.IKsZxTjhE1VQYvRhbaP1JVasrQPsa1mBMabcbghpYss',
          type: 'image',
          caption: 'Your beautiful smile that captured my heart'
        },
      ],
      x: 15,
      y: 25,
      unlocked: false
    },
    {
      id: 2,
      title: 'Coffee Date Adventures',
      date: 'February 2024',
      description: 'Our first coffee together. You ordered that complicated drink and we talked for hours. Every moment was magical.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1xZwof_AiRI8sp-5FclnV6_q0JcIvofPf/view?usp=drive_link',
          type: 'image',
          caption: 'Our favorite coffee shop (Google Drive)'
        },
        {
          url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'That complicated drink you ordered'
        },
        {
          url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Hours of conversation over coffee'
        },
        {
          url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The barista who knew our order by heart'
        },
        {
          url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Walking home together after coffee'
        }
      ],
      x: 30,
      y: 50,
      unlocked: false
    },
    {
      id: 3,
      title: 'The Park Walk',
      date: 'March 2024',
      description: 'Walking through the park, sharing dreams and stories. The sunset was beautiful, but not as beautiful as you.',
      media: [
        {
          // url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
          url:'https://drive.google.com/file/d/1WTy_cg1zQ2mx8Vdet0-OmWavBNYyCUW9/view?usp=drive_link',
          type: 'image',
          caption: 'Walking through the park hand in hand'
        },
        {
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The beautiful sunset we watched together'
        },
        {
          url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Sharing dreams under the trees'
        }
      ],
      x: 50,
      y: 20,
      unlocked: false
    },
    {
      id: 4,
      title: 'Our Journey Document',
      date: 'April 2024',
      description: 'A special document capturing all our adventures together. Every page tells a story of us.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1Pr4ZDKq6D0_aR0iOGwwCamFVbruE5yo-/view?usp=sharing',
          type: 'pdf',
          caption: 'Our journey together - PDF scrapbook (Google Drive)'
        },
        {
          url: 'https://drive.google.com/file/d/1FR_lWl9d6pND28mgdBdR_wtSwPUz0gQp/view?usp=drive_link',
          type: 'image',
          caption: 'Cover page of our memories (Google Drive)'
        },
        {
          url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Writing our story together'
        }
      ],
      x: 70,
      y: 30,
      unlocked: false
    },
    {
      id: 5,
      title: 'Inside Joke Collection',
      date: 'May 2024',
      description: 'Remember when we couldn\'t stop laughing? That moment when everything felt perfect. Our silly moments together.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'That hilarious moment we couldn\'t stop laughing'
        },
        {
          url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Your contagious laughter'
        },
        {
          url: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Making silly faces at each other'
        },
        {
          url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The joke that started it all'
        },
        {
          url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Laughing until our stomachs hurt'
        },
        {
          url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Creating memories through laughter'
        }
      ],
      x: 85,
      y: 40,
      unlocked: false
    },
    {
      id: 6,
      title: 'Special Moments Gallery',
      date: 'June 2024',
      description: 'The moment I knew you were special. Your kindness, your laugh, everything about you. A collection of our best times.',
      media: [
        {
          url: 'https://drive.google.com/file/d/1FR_lWl9d6pND28mgdBdR_wtSwPUz0gQp/view?usp=drive_link',
          type: 'image',
          caption: 'You are special to me (Google Drive)'
        },
        {
          url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Your beautiful smile that lights up my world'
        },
        {
          url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Everything about you is perfect'
        }
      ],
      x: 90,
      y: 60,
      unlocked: false
    },
    {
      id: 7,
      title: 'Stargazing Night',
      date: 'July 2024',
      description: 'Lying under the stars, talking about the universe and our place in it. You made infinity feel intimate.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Under the stars together'
        },
        {
          url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'The night sky above us'
        }
      ],
      x: 75,
      y: 70,
      unlocked: false
    },
    {
      id: 8,
      title: 'Rainy Day Comfort',
      date: 'August 2024',
      description: 'Dancing in the rain, laughing at how silly we looked. Sometimes the best moments are unplanned.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Dancing in the rain'
        },
        {
          url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Raindrops and smiles'
        }
      ],
      x: 55,
      y: 75,
      unlocked: false
    },
    {
      id: 9,
      title: 'Cooking Together',
      date: 'September 2024',
      description: 'Our first attempt at cooking together. We burned the pasta but made perfect memories.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Cooking adventures'
        },
        {
          url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Kitchen chaos and laughter'
        }
      ],
      x: 35,
      y: 80,
      unlocked: false
    },
    {
      id: 10,
      title: 'Road Trip Adventure',
      date: 'October 2024',
      description: 'Miles of open road, terrible singing, and the best company. Getting lost never felt so right.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'On the open road'
        },
        {
          url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Scenic stops along the way'
        }
      ],
      x: 15,
      y: 70,
      unlocked: false
    },
    {
      id: 11,
      title: 'Bookstore Date',
      date: 'November 2024',
      description: 'Hours lost in the bookstore, recommending our favorite stories to each other. You picked the perfect book for me.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Lost in books together'
        },
        {
          url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Finding treasures'
        }
      ],
      x: 10,
      y: 45,
      unlocked: false
    },
    {
      id: 12,
      title: 'Holiday Lights',
      date: 'December 2024',
      description: 'Walking through the city, admiring holiday lights. Everything sparkled, but not as much as your eyes.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Holiday magic'
        },
        {
          url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Lights and wonder'
        }
      ],
      x: 45,
      y: 35,
      unlocked: false
    },
    {
      id: 13,
      title: 'New Year Together',
      date: 'January 2025',
      description: 'Counting down to midnight, making wishes for the future. Every year with you is a gift.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'New year, new memories'
        },
        {
          url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Celebration and joy'
        }
      ],
      x: 60,
      y: 55,
      unlocked: false
    },
    {
      id: 14,
      title: 'Art Museum Visit',
      date: 'February 2025',
      description: 'Wandering through galleries, discussing art and life. You are my favorite masterpiece.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Art and culture'
        },
        {
          url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Beauty everywhere'
        }
      ],
      x: 25,
      y: 60,
      unlocked: false
    },
    {
      id: 15,
      title: 'Forever Moments',
      date: 'March 2025',
      description: 'Every day with you is a new adventure. Here is to all the memories we have yet to make.',
      media: [
        {
          url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Our future together'
        },
        {
          url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
          type: 'image',
          caption: 'Forever and always'
        }
      ],
      x: 80,
      y: 80,
      unlocked: false
    }
  ]);

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
    { from: 14, to: 15 }
  ]);

  unlockedCount = signal<number>(0); // Start with 0 unlocked

  unlockMemory(id: number): void {
    const memory = this.memories().find(m => m.id === id);
    // Only unlock if not already unlocked
    if (memory && !memory.unlocked) {
      this.memories.update(memories =>
        memories.map(m => m.id === id ? { ...m, unlocked: true } : m)
      );
      this.unlockedCount.update(count => count + 1);
    }
  }

  getMemoryById(id: number): Memory | undefined {
    return this.memories().find(m => m.id === id);
  }

  areAllMemoriesUnlocked(): boolean {
    return this.memories().every(m => m.unlocked);
  }

  // Get the actual count of unlocked memories
  getUnlockedCount(): number {
    return this.memories().filter(m => m.unlocked).length;
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
