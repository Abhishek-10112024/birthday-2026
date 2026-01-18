# Migrating to Supabase - Step by Step

This guide shows how to migrate from hardcoded memory data to Supabase storage.

## Current State

Right now, your app has:
- ✅ Supabase service created (`supabase.service.ts`)
- ✅ Environment configuration files
- ✅ Hardcoded memory data in `memory.service.ts`
- ✅ Google Drive and Unsplash URLs for images

## Migration Options

### Option 1: Quick Start (Keep External URLs)

Keep using Google Drive/Unsplash URLs but store memory metadata in Supabase.

**Pros:**
- No need to upload images
- Quick to implement
- Works immediately

**Cons:**
- Still dependent on external services
- Google Drive links may break
- No control over images

### Option 2: Full Migration (Upload to Supabase)

Upload all images to Supabase storage and store everything there.

**Pros:**
- Complete control over data
- No external dependencies
- Better performance with CDN
- More reliable

**Cons:**
- Need to download and re-upload images
- Takes more time initially
- Uses storage quota

## Recommended: Option 2 (Full Migration)

Let's do this properly and own your data!

## Step 1: Prepare Image Files

### Download Images from Current URLs

Create a folder to store images temporarily:
```bash
mkdir -p constellation-of-memories/temp-images
```

For each memory, download the images:
- Google Drive images: Download manually from Drive
- Unsplash images: Download from the URLs or use similar images

Organize them like:
```
temp-images/
  memory-1-1.jpg
  memory-1-2.jpg
  memory-2-1.jpg
  memory-2-2.jpg
  ...
```

## Step 2: Upload Images to Supabase

You have two options:

### Option A: Manual Upload (Simple)

1. Go to Supabase Dashboard → Storage → `memories` bucket
2. Create folders for organization (optional):
   - `memories/memory-1/`
   - `memories/memory-2/`
   - etc.
3. Upload images for each memory
4. Copy the public URLs

### Option B: Programmatic Upload (Recommended)

Create a migration script to upload all images at once.

Create file: `constellation-of-memories/scripts/upload-images.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Replace with your actual credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadImage(filePath: string, storagePath: string) {
  const fileBuffer = fs.readFileSync(filePath);
  const file = new File([fileBuffer], path.basename(filePath));
  
  const { data, error } = await supabase.storage
    .from('memories')
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error(`Error uploading ${filePath}:`, error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from('memories')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

async function main() {
  const imagesDir = './temp-images';
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const storagePath = `uploads/${file}`;
    
    console.log(`Uploading ${file}...`);
    const url = await uploadImage(filePath, storagePath);
    
    if (url) {
      console.log(`✓ Uploaded: ${url}`);
    }
  }
}

main();
```

Run it:
```bash
npx ts-node scripts/upload-images.ts
```

## Step 3: Update Memory Data with Supabase URLs

After uploading, update your memory data with the new Supabase URLs.

Example:
```typescript
// OLD (Google Drive)
url: 'https://drive.google.com/file/d/1xZwof_AiRI8sp-5FclnV6_q0JcIvofPf/view'

// NEW (Supabase)
url: 'https://xxxxx.supabase.co/storage/v1/object/public/memories/uploads/memory-2-1.jpg'
```

## Step 4: Insert Memories into Supabase Database

Create a migration script to insert all memories:

Create file: `constellation-of-memories/scripts/migrate-memories.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const memories = [
  {
    id: 1,
    title: 'First Meeting',
    date: 'January 2024',
    description: 'The day our paths crossed...',
    media: [
      {
        url: 'https://xxxxx.supabase.co/storage/v1/object/public/memories/memory-1-1.jpg',
        type: 'image',
        caption: 'The moment we first met'
      }
    ],
    x: 15,
    y: 25,
    unlocked: false
  },
  // ... add all your memories here
];

async function migrateMemories() {
  console.log('Starting migration...');
  
  for (const memory of memories) {
    const { data, error } = await supabase
      .from('memories')
      .insert([memory]);

    if (error) {
      console.error(`Error inserting memory ${memory.id}:`, error);
    } else {
      console.log(`✓ Inserted memory ${memory.id}: ${memory.title}`);
    }
  }
  
  console.log('Migration complete!');
}

migrateMemories();
```

Run it:
```bash
npx ts-node scripts/migrate-memories.ts
```

## Step 5: Update MemoryService to Load from Supabase

Modify `memory.service.ts` to load from Supabase instead of hardcoded data:

```typescript
import { Injectable, signal } from '@angular/core';
import { Memory, ConstellationLine } from '../models/memory.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  memories = signal<Memory[]>([]);
  constellationLines = signal<ConstellationLine[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    // ... keep your constellation lines
  ]);
  unlockedCount = signal<number>(0);

  constructor(private supabaseService: SupabaseService) {
    this.loadMemories();
  }

  async loadMemories() {
    try {
      const data = await this.supabaseService.getMemories();
      this.memories.set(data);
      this.updateUnlockedCount();
    } catch (error) {
      console.error('Error loading memories:', error);
      // Fallback to empty array or show error
    }
  }

  private updateUnlockedCount() {
    const count = this.memories().filter(m => m.unlocked).length;
    this.unlockedCount.set(count);
  }

  async unlockMemory(id: number): Promise<void> {
    const memory = this.memories().find(m => m.id === id);
    
    if (memory && !memory.unlocked) {
      try {
        // Update in Supabase
        await this.supabaseService.updateMemory(id, { unlocked: true });
        
        // Update local state
        this.memories.update(memories =>
          memories.map(m => m.id === id ? { ...m, unlocked: true } : m)
        );
        this.unlockedCount.update(count => count + 1);
      } catch (error) {
        console.error('Error unlocking memory:', error);
      }
    }
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
}
```

## Step 6: Test Everything

1. Start your app:
```bash
npm start
```

2. Check browser console for errors
3. Click on stars to unlock memories
4. Verify images load from Supabase
5. Check Supabase dashboard to see unlocked status updates

## Step 7: Add Image Upload Feature (Future)

Once migration is complete, you can add a UI to upload new memories:

```typescript
// In a new component or service
async uploadMemoryWithImages(
  memoryData: Partial<Memory>,
  imageFiles: File[]
): Promise<void> {
  // Upload images
  const mediaItems = [];
  for (const file of imageFiles) {
    const url = await this.supabaseService.uploadFile(file, 'memories');
    mediaItems.push({
      url,
      type: 'image',
      caption: ''
    });
  }

  // Create memory with uploaded images
  const memory = {
    ...memoryData,
    media: mediaItems
  };

  await this.supabaseService.createMemory(memory);
  await this.loadMemories(); // Refresh
}
```

## Rollback Plan

If something goes wrong, you can easily rollback:

1. Keep the hardcoded data in a backup file
2. Comment out Supabase loading
3. Restore original `memory.service.ts`

## Performance Tips

1. **Image Optimization**: Compress images before uploading (use tools like TinyPNG)
2. **Lazy Loading**: Load images only when needed
3. **Thumbnails**: Create smaller versions for the constellation view
4. **Caching**: Browser will cache Supabase CDN images automatically

## Monitoring Usage

Check your Supabase dashboard regularly:
- **Storage**: Monitor how much space you're using
- **Bandwidth**: Track monthly bandwidth usage
- **Database**: Check query performance

Free tier limits:
- 1GB storage
- 2GB bandwidth/month

For a personal app with ~15 memories and a few images each, you'll be well within limits!
