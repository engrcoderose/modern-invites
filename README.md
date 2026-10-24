# Modern Invites

Elegant e-invite website for any occasion - built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ Beautiful, modern UI with smooth animations (Framer Motion)
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 15
- 🎨 Styled with Tailwind CSS
- 🔤 Google Fonts integration (Playfair Display & Inter)
- 📦 Radix UI components for accessibility
- 🖼️ Optimized images with Next.js Image component
- 🎯 TypeScript for type safety

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide React
- **Animations:** Motion (Framer Motion)
- **Package Manager:** npm

## 📦 Installation

Use Node.js **22.23.4 or newer within 22.x**. This is the minimum patched version
for the October 2026 Node.js security release, including CVE-2026-111497. Check
your installation with `node --version` and restart development servers after
upgrading. The `engines.node` range in `package.json` keeps local development and
hosted deployments on Node 22 without opting into a new major version.

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
modern-invites/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (Accordion, etc.)
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── OurProducts.tsx
│   ├── FeatureSection.tsx
│   ├── OccasionsSection.tsx
│   ├── CallToAction.tsx
│   ├── FrequentlyAskedQuestions.tsx
│   ├── AboutUs.tsx
│   └── Footer.tsx
├── lib/                   # Utility functions
│   └── utils.ts
├── public/               # Static assets
│   └── images/
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Pages

- **/** - Landing page with hero, features, products, occasions, CTA, and FAQ
- **/about** - About Us page with mission and vision

## 🔧 Configuration

The project uses:
- Next.js 15 App Router for file-based routing
- TypeScript for type safety
- Tailwind CSS with custom color palette (sage & gold)
- Custom fonts: Playfair Display (elegant) and Inter (sans-serif)

## 📝 Migration Notes

This project was migrated from Vite + React Router to Next.js 15:
- ✅ All components converted to Next.js compatible format
- ✅ React Router replaced with Next.js file-based routing
- ✅ Image optimization with Next.js Image component
- ✅ Font optimization with next/font
- ✅ Client components marked with "use client" directive
- ✅ All animations and interactions preserved

## Image optimization usage

`next.config.ts` keeps stable optimized images cached for at least 31 days and
restricts optimizer quality requests to the values currently used by invitations:
40, 75 (the default), 78, 82, 85, 88, 90, 92, 94 and 95. Use an existing quality
when possible; if a new quality is required, update the allowlist deliberately.
Keep remote/public image URLs stable until the asset changes, then use a new
filename/version URL and update the matching remote allowlist when necessary.

R2 hosts the source files; photos rendered through the default `next/image`
optimizer still use Vercel image transformations and cache reads/writes. Accurate
responsive sizes, smaller optimized files, reused versions and longer caching
reduce future usage. The homepage's three-column invitation cards request image
widths matching their actual card widths. Refer to `AGENTS.md` for the repository's
image conventions. These changes require deployment and do not reset past usage.

## 🚀 Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Node.js runtime on Vercel

- `package.json` selects Node **22.x** with a minimum of **22.23.4**. Vercel uses
  the major version from this range and manages minor and patch updates; the
  range cannot force a particular hosted patch version.
- In **Project Settings → Build and Deployment → Node.js Version**, select
  **22.x** to match the repository. The `package.json` setting takes precedence.
- Deploy the updated commit. To verify the build runtime, temporarily use
  `node --version && npm run build` as the Vercel Build Command and confirm the
  logs report **22.23.4 or newer within 22.x**. If checking a Function runtime,
  log `process.version` in an existing server handler and inspect its logs.
- Check Vercel's security bulletin for the managed runtime patch rollout. WAF
  protection does not replace updating local Node installations or external
  servers. No Next.js dependency change fixes this Node.js runtime vulnerability.

References: [Node.js October 2026 security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
and [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

Alternatively, you can deploy to:
- Netlify
- AWS Amplify
- Railway
- Any platform that supports Next.js

## 📄 License

All rights reserved.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

---

Made with ❤️ for Modern Invites
