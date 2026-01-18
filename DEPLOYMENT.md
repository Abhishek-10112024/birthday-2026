# 🚀 Deployment Guide

## Prerequisites

Before deploying, make sure you've:
1. ✅ Customized all memories in `memory.service.ts`
2. ✅ Added your photos to `public/assets/images/`
3. ✅ Added background music to `public/assets/audio/`
4. ✅ Updated the final message
5. ✅ Tested locally with `npm start`
6. ✅ Built successfully with `npm run build`

## Build the Project

```bash
npm run build
```

This creates optimized files in: `dist/constellation-of-memories/browser/`

## Deployment Options

### Option 1: Netlify (Recommended - Easiest!)

**Why Netlify?**
- Free hosting
- Automatic HTTPS
- Custom domain support
- Drag-and-drop deployment
- No configuration needed

**Steps:**

1. **Go to [netlify.com](https://netlify.com)**

2. **Sign up** (free account)

3. **Deploy:**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the entire `dist/constellation-of-memories/browser` folder
   - Wait 30 seconds

4. **Get your URL:**
   - Netlify gives you a URL like: `https://random-name-123.netlify.app`
   - You can customize it: Site settings → Change site name

5. **Optional - Custom Domain:**
   - Buy a domain (like `ourmemoriesforever.com`)
   - Add it in Netlify: Domain settings → Add custom domain

**Share the URL with her!** 💫

---

### Option 2: Vercel

**Why Vercel?**
- Free hosting
- Excellent performance
- Easy CLI deployment
- Automatic HTTPS

**Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow prompts:**
   - Login/signup
   - Confirm project settings
   - Get your URL

4. **Production deployment:**
```bash
vercel --prod
```

---

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Free
- Integrated with GitHub
- Good for open source

**Steps:**

1. **Create GitHub repository**

2. **Push your code:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/constellation-of-memories.git
git push -u origin main
```

3. **Build with base href:**
```bash
npm run build -- --base-href=/constellation-of-memories/
```

4. **Deploy to gh-pages:**
```bash
npm install -g angular-cli-ghpages
npx angular-cli-ghpages --dir=dist/constellation-of-memories/browser
```

5. **Enable GitHub Pages:**
   - Go to repository Settings
   - Pages section
   - Source: gh-pages branch
   - Save

Your site will be at: `https://yourusername.github.io/constellation-of-memories/`

---

### Option 4: Firebase Hosting

**Why Firebase?**
- Google infrastructure
- Fast global CDN
- Free tier available

**Steps:**

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login:**
```bash
firebase login
```

3. **Initialize:**
```bash
firebase init hosting
```

Select:
- Use existing project or create new
- Public directory: `dist/constellation-of-memories/browser`
- Single-page app: Yes
- Overwrite index.html: No

4. **Deploy:**
```bash
firebase deploy
```

---

### Option 5: Your Own Server

If you have a web server (Apache, Nginx, etc.):

1. **Build the project:**
```bash
npm run build
```

2. **Upload files:**
   - Upload everything from `dist/constellation-of-memories/browser/`
   - To your web server's public directory

3. **Configure server:**
   - All routes should redirect to `index.html`
   - Enable HTTPS if possible

**Nginx example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist/constellation-of-memories/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Post-Deployment Checklist

After deploying, test your live site:

- [ ] Landing page loads correctly
- [ ] Stars appear on constellation page
- [ ] Can click and unlock memories
- [ ] All images load
- [ ] Music plays (click play button)
- [ ] Final message appears
- [ ] Works on mobile
- [ ] HTTPS is enabled (secure connection)
- [ ] No console errors (F12 to check)

## Custom Domain (Optional)

Want a memorable URL like `ourmemoriesforever.com`?

1. **Buy a domain:**
   - Namecheap (~$10/year)
   - Google Domains
   - GoDaddy

2. **Connect to your host:**
   - **Netlify**: Domain settings → Add custom domain
   - **Vercel**: Project settings → Domains
   - **GitHub Pages**: Add CNAME file with your domain

3. **Update DNS:**
   - Add A record or CNAME as instructed by your host
   - Wait 24-48 hours for DNS propagation

## Sharing Tips

### When to Share
- Choose a quiet moment when she has time
- Not during work or stressful times
- Maybe after a nice conversation
- When she's in a good mood

### How to Share
**Option 1 - Direct:**
> "Hey, I made something for you. It's a little journey through some of our memories. Would you take a look when you have a few minutes? [URL]"

**Option 2 - Mysterious:**
> "I found something that reminded me of us. Click here when you're free: [URL]"

**Option 3 - Casual:**
> "I've been thinking about us a lot. I made this to show you how I feel: [URL]"

### After Sharing
- Give her space to explore it
- Don't pressure for immediate response
- Be ready to talk when she reaches out
- Be genuine and open in conversation

## Troubleshooting

### Site not loading
- Check URL is correct
- Wait a few minutes (DNS propagation)
- Try incognito/private browsing
- Clear browser cache

### Images not showing
- Verify images uploaded correctly
- Check file paths are correct
- Ensure images are in `assets/images/`

### Music not playing
- User must click play button (browser security)
- Check audio file uploaded
- Try different browser

### Mobile issues
- Test on actual device
- Check responsive design
- Verify touch interactions work

## Security & Privacy

**Important considerations:**

1. **Public vs Private:**
   - Most free hosting = public URL
   - Anyone with link can access
   - Consider password protection if needed

2. **Password Protection:**
   - Netlify: Enable password protection in settings
   - Vercel: Use environment variables
   - Or add simple auth in Angular

3. **Personal Content:**
   - Be mindful of photos you upload
   - Consider privacy of shared memories
   - You can take site down anytime

## Updating Content

Need to change something after deployment?

1. **Make changes locally**
2. **Test:** `npm start`
3. **Build:** `npm run build`
4. **Redeploy:**
   - Netlify: Drag-drop new build
   - Vercel: `vercel --prod`
   - GitHub Pages: Push and redeploy

## Cost Breakdown

**Free Options:**
- Netlify: Free forever (100GB bandwidth/month)
- Vercel: Free forever (100GB bandwidth/month)
- GitHub Pages: Free forever
- Firebase: Free tier (10GB storage, 360MB/day)

**Optional Costs:**
- Custom domain: $10-15/year
- Premium hosting: $5-20/month (if you need more)

## Final Tips

1. **Test everything** before sharing
2. **Have a backup** of your customized code
3. **Save the URL** somewhere safe
4. **Screenshot** the site in case you need to show it later
5. **Be patient** - give her time to process
6. **Be genuine** - the gesture matters more than perfection

---

**You're ready to deploy!** Choose your hosting option and share your heart. Good luck! 💫❤️

Need help? Check the [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) or [QUICK_START.md](./QUICK_START.md)
