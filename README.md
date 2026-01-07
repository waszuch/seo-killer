# SeoKiller

AI-powered SEO content generation platform with automatic topic creation, article writing, and intelligent internal linking. Built with Next.js 16, TypeScript, Gemini AI, and Tailwind CSS.

## Features

- **AI Content Generation** - Generate high-quality articles using Google Gemini AI
- **Smart Topic System** - Automatically generate relevant topics from seed keywords
- **Intelligent Internal Linking** - Automatic linking between related articles with contextual anchors
- **Multiple Layout Options** - Portal, Magazine, and Blog homepage styles
- **Flexible Article Layouts** - Standard, Wide, and Minimal reading experiences
- **Image Integration** - Automatic image fetching from Unsplash with AI-powered descriptions
- **SEO Optimized** - Auto-generated meta tags, sitemaps, and robots.txt
- **Tag System** - Automatic tagging and tag-based article filtering
- **Admin Panel** - Intuitive dashboard for content management
- **ISR & Edge Caching** - Lightning-fast page loads with Incremental Static Regeneration
- **Fully Responsive** - Beautiful design across all devices
- **Dark Theme** - Modern Elegant Midnight Emerald color scheme

## Development

Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```

Install and run:
```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
pnpm build
pnpm start
```

## Configuration

Edit `site.config.json` to customize your portal:

```json
{
  "siteName": "Your Site Name",
  "niche": "Your Niche",
  "seedKeywords": ["keyword1", "keyword2"],
  "layout": {
    "homepage": "magazine",
    "article": "standard",
    "list": "grid"
  },
  "admin": {
    "enabled": true
  }
}
```

## Workflow

### 1. Generate Content
- Enable admin panel in `site.config.json`
- Visit `/admin` and generate topics
- Generate articles from topics
- Create internal links between articles

### 2. Deploy
- Disable admin panel for production
- Push to GitHub
- Deploy to Vercel

### 3. Result
- SEO-optimized portal with AI-generated content
- Automatic sitemaps and meta tags
- Fast loading with edge caching

## Available Layouts

### Homepage
- **Portal** - Classic news portal with hero section
- **Magazine** - Featured articles with grid layout
- **Blog** - Minimalist single-column design

### Article Page
- **Standard** - Classic layout with sidebar
- **Wide** - Full-width modern layout
- **Minimal** - Distraction-free reading

### List/Tag Pages
- **Grid** - Card-based responsive grid
- **List** - Horizontal cards layout
- **Masonry** - Pinterest-style layout

## Tech Stack

- **Next.js 16** (App Router, ISR, Edge Runtime)
- **TypeScript**
- **Tailwind CSS 4**
- **Google Gemini AI** (Content generation)
- **Unsplash API** (Image sourcing)
- **React 19**

---

**Built by [ITMakeovers](https://github.com/waszuch) & Marcin Waszewski**



