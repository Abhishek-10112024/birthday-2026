# ImgBB Quick Upload Guide

## Step-by-Step Instructions

### 1. Go to ImgBB
Visit: **https://imgbb.com**

### 2. Upload Your Image
- Click the big **"Start uploading"** button
- Or drag and drop your image directly onto the page
- No account required (but you can create one to manage uploads)

### 3. Get the Direct Link
After upload, you'll see several link options:
- ✅ **Copy "Direct link"** - This is what you need!
- ❌ Don't use "HTML full linked", "HTML embed", or "BBCode"

The direct link looks like:
```
https://i.ibb.co/XXXXX/your-image.jpg
```

### 4. Update Your Code
Replace the Google Drive URLs in `src/app/pages/landing/landing.component.ts`:

```typescript
private memories: Memory[] = [
  {
    id: 1,
    title: 'First Day Together',
    date: 'January 15, 2020',
    description: 'The day we met at the coffee shop...',
    imageUrl: 'https://i.ibb.co/XXXXX/first-day.jpg', // ← Paste your ImgBB link here
    x: 20,
    y: 30,
    unlocked: true
  },
  // ... more memories
];
```

## Example URLs

### ✅ Correct ImgBB URLs:
- `https://i.ibb.co/abc123/photo.jpg`
- `https://i.ibb.co/xyz789/image.png`

### ❌ Wrong URLs (won't work):
- `https://ibb.co/abc123` (missing the 'i.' subdomain)
- `https://imgbb.com/abc123` (not a direct link)

## Tips

1. **Image Size**: ImgBB supports up to 32MB per image (free)
2. **Formats**: JPG, PNG, GIF, WebP all work
3. **No Account Needed**: But creating one lets you manage/delete uploads
4. **Permanent Links**: Images stay online as long as they're accessed occasionally
5. **HTTPS**: All links are secure (HTTPS)

## Troubleshooting

**Image not showing?**
- Make sure you copied the "Direct link" (starts with `https://i.ibb.co/`)
- Check that the URL ends with an image extension (.jpg, .png, etc.)
- Verify the image uploaded successfully on ImgBB

**Need to delete an image?**
- Create a free ImgBB account
- Upload while logged in
- You can then manage/delete images from your dashboard

## Your App is Ready!

Once you paste the ImgBB URLs into your code, the images will display perfectly with:
- ✅ No CORS issues
- ✅ Fast loading
- ✅ Clean display
- ✅ No extra UI elements
