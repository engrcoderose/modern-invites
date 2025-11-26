# Quick Start Guide - Classic Wedding Template

## 🎉 Your Classic Wedding Website is Ready!

The template is now running at: **http://localhost:3000/templates/classic**

## 📝 Customization Checklist

### Step 1: Update Wedding Information
Open `app/templates/classic/data/wedding-data.ts` and update:

- [ ] Bride and groom names
- [ ] Wedding date (format: `new Date("2026-06-20T16:00:00")`)
- [ ] Ceremony venue name and address
- [ ] Reception venue name and address
- [ ] Map URLs (get from Google Maps)

### Step 2: Customize Your Story
In the same file (`wedding-data.ts`):

- [ ] Update "How We Met" story
- [ ] Update "First Date" story
- [ ] Update "The Proposal" story
- [ ] Add or remove story events as needed

### Step 3: Update Wedding Program
- [ ] Adjust times for each event
- [ ] Add or remove timeline events
- [ ] Update event descriptions

### Step 4: Modify Entourage
- [ ] Update bridal party names and roles
- [ ] Update groomsmen names and roles
- [ ] Add or remove members as needed

### Step 5: Customize Attire & Colors
- [ ] Update dress code
- [ ] Change wedding colors
- [ ] Modify attire description

### Step 6: Update FAQ
- [ ] Review and edit FAQ questions
- [ ] Add venue-specific information
- [ ] Update policies (plus ones, children, etc.)

### Step 7: Update Useful Information
- [ ] Hotel recommendations
- [ ] Transportation details
- [ ] Gift registry information
- [ ] Photography preferences

## 🎨 Design Customization

### Change Color Scheme
The template uses rose and blue gradients. To change colors:

1. Search for `rose-` in all component files
2. Replace with your preferred color (e.g., `purple-`, `emerald-`, etc.)
3. Do the same for `blue-`

### Common Color Replacements:
```
from-rose-500 to-blue-500  →  from-purple-500 to-pink-500
bg-rose-400  →  bg-emerald-400
text-rose-600  →  text-indigo-600
```

### Adjust Animations
To speed up or slow down animations, edit the `duration` value in motion components:

```tsx
// Slower animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}  // Changed from 0.8
>
```

## 📸 Adding Photos

1. Add your photos to `app/templates/classic/assets/`
2. Import in components:
```tsx
import Image from "next/image";
import heroImage from "../assets/your-photo.jpg";

<Image src={heroImage} alt="Description" width={800} height={600} />
```

## 📱 Testing Responsive Design

The website is fully responsive. Test on:
- Mobile: Resize browser to < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Going Live

### Option 1: Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with one click
4. Get a custom domain (e.g., emily-and-james.com)

### Option 2: Deploy to Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Deploy automatically

### Option 3: Other Platforms
- AWS Amplify
- Cloudflare Pages
- Railway

## 🔧 RSVP Integration

The RSVP form currently logs to console. To make it functional:

### Option A: Email Service (Simple)
Use services like:
- Formspree
- EmailJS
- SendGrid

### Option B: Database Storage (Advanced)
1. Set up a database (e.g., Supabase, Firebase)
2. Create an API endpoint in `app/api/rsvp/route.ts`
3. Update RSVPForm.tsx to call your API

Example API endpoint:
```typescript
// app/api/rsvp/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Save to database
  // Send confirmation email
  return Response.json({ success: true });
}
```

## 📋 Content Tips

### Writing Your Story
- Keep it personal but concise
- Include specific details that guests will enjoy
- Aim for 2-3 paragraphs per section

### FAQ Questions
Include answers for:
- Timing and arrival
- Parking information
- Dress code details
- Plus one policy
- Children policy
- Weather considerations
- Accessibility options
- Food and drinks

## 🎯 SEO & Sharing

### Add metadata to page.tsx:
```typescript
export const metadata = {
  title: "Emily & James Wedding",
  description: "Join us for our wedding celebration on June 20, 2026",
  openGraph: {
    images: ['/og-image.jpg'],
  },
};
```

## 📞 Need Help?

- Check the README.md for technical details
- Review component files for customization options
- Tailwind CSS docs: https://tailwindcss.com
- Next.js docs: https://nextjs.org
- Framer Motion docs: https://www.framer.com/motion

## ✅ Launch Checklist

Before sharing your website:

- [ ] All personal information updated
- [ ] Wedding date and time correct
- [ ] Venue addresses accurate
- [ ] Map links working
- [ ] RSVP form tested
- [ ] Mobile responsive checked
- [ ] All sections reviewed
- [ ] Images optimized (if added)
- [ ] Spelling and grammar checked
- [ ] Tested on multiple devices
- [ ] Shared with close family for review

## 🎊 Congratulations!

Your beautiful classic wedding website is ready to share with your guests!

**Share URL**: http://localhost:3000/templates/classic (when deployed, use your custom domain)

---

Made with ❤️ for your special day!

