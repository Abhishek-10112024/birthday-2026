# Supabase Setup Guide for Constellation of Memories

This guide will help you set up Supabase as the backend for storing images and memory data.

## Why Supabase?

- **Free Tier**: 1GB storage, 2GB bandwidth/month
- **Built-in CDN**: Fast image delivery worldwide
- **PostgreSQL Database**: Store memory metadata
- **Storage Buckets**: Organize and serve images/PDFs
- **Easy Authentication**: Optional user auth if needed later
- **No Credit Card Required**: Free tier doesn't require payment info

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Create an account (GitHub, Google, or email)
4. Click "New Project"
5. Fill in:
   - **Project Name**: `constellation-of-memories` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
6. Click "Create new project"
7. Wait 2-3 minutes for project setup

## Step 2: Get API Credentials

1. In your Supabase dashboard, click on your project
2. Go to **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   https://lcoggykjjrgyiwxcjksc.supabase.co
   - **anon public key**: Long string starting with `eyJ...`
   sb_publishable_MG0rztWD1uUit6RcVvzJng_VtHbCk56

## Step 3: Update Environment Files

Replace the placeholder values in your Angular app:

### File: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://YOUR_PROJECT_ID.supabase.co',  // Paste your Project URL
    anonKey: 'eyJhbGc...'  // Paste your anon public key
  }
};
```

### File: `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  supabase: {
    url: 'https://YOUR_PROJECT_ID.supabase.co',  // Same as above
    anonKey: 'eyJhbGc...'  // Same as above
  }
};
```

## Step 4: Create Storage Bucket

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click "Create a new bucket"
3. Fill in:
   - **Name**: `memories`
   - **Public bucket**: ✅ **Check this** (allows public access to images)
4. Click "Create bucket"

### Configure Bucket Policies

1. Click on the `memories` bucket
2. Go to **Policies** tab
3. Click "New Policy" → "For full customization"
4. Create a policy for **SELECT** (read access):
   - **Policy name**: `Public read access`
   - **Allowed operation**: SELECT
   - **Target roles**: `public`
   - **Policy definition**: 
   ```sql
   true
   ```
5. Click "Review" → "Save policy"

6. Create another policy for **INSERT** (upload):
   - **Policy name**: `Public upload access`
   - **Allowed operation**: INSERT
   - **Target roles**: `public`
   - **Policy definition**: 
   ```sql
   true
   ```
7. Click "Review" → "Save policy"

## Step 5: Create Database Table

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Paste this SQL:

```sql
-- Create memories table
CREATE TABLE memories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  media JSONB NOT NULL DEFAULT '[]',
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_memories_unlocked ON memories(unlocked);

-- Enable Row Level Security (RLS)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON memories
  FOR SELECT
  TO public
  USING (true);

-- Create policy for public insert access
CREATE POLICY "Public insert access" ON memories
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for public update access
CREATE POLICY "Public update access" ON memories
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create constellation_lines table
CREATE TABLE constellation_lines (
  id SERIAL PRIMARY KEY,
  from_memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  to_memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create policy for public read access on constellation_lines
CREATE POLICY "Public read access" ON constellation_lines
  FOR SELECT
  TO public
  USING (true);
```

4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 6: Test the Setup

Run your Angular app:
```bash
cd constellation-of-memories
npm start
```

The app should now work with the existing dummy data. Next steps will involve:
1. Migrating existing memories to Supabase
2. Adding image upload functionality
3. Loading memories from Supabase instead of hardcoded data

## Step 7: Upload Sample Images (Optional)

To test image storage:

1. Go to **Storage** → `memories` bucket
2. Click "Upload file"
3. Upload a test image
4. Click on the uploaded file
5. Copy the public URL
6. Use this URL format in your memory data:
   ```typescript
   {
     url: 'https://xxxxx.supabase.co/storage/v1/object/public/memories/filename.jpg',
     type: 'image',
     caption: 'Test image'
   }
   ```

## Troubleshooting

### Images not loading?
- Check bucket is set to **Public**
- Verify storage policies allow SELECT
- Check browser console for CORS errors

### Database queries failing?
- Verify RLS policies are created
- Check API credentials are correct
- Ensure table exists (check SQL Editor → Tables)

### Connection errors?
- Verify Project URL and anon key are correct
- Check internet connection
- Ensure Supabase project is active (not paused)

## Next Steps

Once setup is complete, you can:
1. **Migrate Data**: Move existing memories to Supabase database
2. **Add Upload UI**: Create form to upload images and create memories
3. **Optimize**: Add image compression, thumbnails, lazy loading
4. **Deploy**: Host on Vercel/Netlify with Supabase backend

## Cost Considerations

**Free Tier Limits:**
- 500MB database space
- 1GB file storage
- 2GB bandwidth/month
- 50,000 monthly active users

For a personal memory app, this should be more than enough!

## Security Notes

Current setup allows **public access** for simplicity. For production:
- Enable authentication
- Restrict uploads to authenticated users
- Add file size/type validation
- Implement rate limiting
