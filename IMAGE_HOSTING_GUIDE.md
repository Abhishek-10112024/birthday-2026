# Image Hosting Guide

## Why Not Google Drive?
Google Drive has strict CORS (Cross-Origin Resource Sharing) policies that prevent images from being embedded in web applications. While Drive links work when opened directly, they won't display in `<img>` tags.

## Recommended Free & Secure Services

### 1. Imgur (Recommended)
**Best for:** Quick uploads, no account needed
- **Website:** https://imgur.com
- **Free:** Yes
- **Account Required:** No (but recommended)
- **Security:** HTTPS, trusted by millions
- **Steps:**
  1. Go to https://imgur.com
  2. Click "New post"
  3. Upload your image
  4. Right-click image → "Copy image address"
  5. URL format: `https://i.imgur.com/XXXXX.jpg`

### 2. ImgBB
**Best for:** Simple interface, direct links
- **Website:** https://imgbb.com
- **Free:** Yes (up to 32MB per image)
- **Account Required:** No (but recommended for management)
- **Security:** HTTPS, reliable
- **Steps:**
  1. Go to https://imgbb.com
  2. Click "Start uploading"
  3. Upload your image
  4. Copy the "Direct link"
  5. URL format: `https://i.ibb.co/XXXXX/image.jpg`

### 3. GitHub (For Developers)
**Best for:** Version control, free hosting
- **Website:** https://github.com
- **Free:** Yes
- **Account Required:** Yes
- **Security:** Very secure, owned by Microsoft
- **Steps:**
  1. Create a public repository
  2. Upload images to the repo
  3. Click on the image → "Download" button
  4. Copy the URL (should contain `raw.githubusercontent.com`)
  5. URL format: `https://raw.githubusercontent.com/user/repo/main/image.jpg`

## How to Use in Your App

Once you have your image URL from any of these services, simply replace the Google Drive URLs in your code:

```typescript
{
  id: 1,
  title: 'First Day Together',
  date: 'January 15, 2020',
  description: 'The day we met...',
  imageUrl: 'https://i.imgur.com/XXXXX.jpg', // Replace with your Imgur URL
  x: 20,
  y: 30,
  unlocked: true
}
```

## Security Notes

✅ **All recommended services are secure:**
- Use HTTPS encryption
- Trusted by millions of users
- No malware or tracking (when used properly)
- Images are publicly accessible (don't upload sensitive content)

⚠️ **Important:**
- Don't upload private/sensitive photos to public image hosts
- For private images, consider paid services with authentication
- Keep backup copies of your images

## Current Service Support

Your app now supports:
- ✅ Imgur URLs
- ✅ ImgBB URLs
- ✅ GitHub raw URLs
- ✅ Cloudinary URLs
- ✅ Any direct image URL (.jpg, .png, .gif, .webp)
- ⚠️ Google Drive (limited, not recommended)
