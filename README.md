# SeoKiller

Cloneable Next.js repository for quickly deploying SEO-optimized content portals with automatic content generation.

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env` file with your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   UNSPLASH_ACCESS_KEY=your_unsplash_key_here
   ```

4. Run development server:
   ```bash
   pnpm dev
   ```

5. Open admin panel: `http://localhost:3000/admin`

## Configuration

Edit `site.config.json` to customize your portal:

- **siteName, domain, niche** - basic site info
- **seedKeywords** - keywords for topic generation
- **layout** - choose homepage/article/list layouts
- **branding** - colors, logo, favicon
- **admin.enabled** - enable/disable admin panel

## Workflow for Production

1. **Generate content locally:**
   - Set `"admin": { "enabled": true }` in `site.config.json`
   - Run `pnpm dev`
   - Open `/admin` and generate topics and articles
   - Generate links between articles

2. **Deploy to production:**
   - Set `"admin": { "enabled": false }` in `site.config.json`
   - Commit changes: `git commit -am "feat: generated content for [niche]"`
   - Push to GitHub
   - Deploy to Vercel

3. **Result:**
   - Portal is live with generated content
   - Admin panel is disabled and inaccessible

## Available Layouts

### Homepage
- **portal** - classic news portal with hero
- **magazine** - magazine-style with featured sections
- **blog** - minimalist single-column blog

### Article Page
- **standard** - classic article with sidebar
- **wide** - full-width modern layout
- **minimal** - distraction-free reading

### List/Tag Pages
- **grid** - card-based grid
- **list** - vertical list with horizontal cards
- **masonry** - Pinterest-style masonry

## Performance Optimizations

### Image Optimization

All images use Next.js Image Component with automatic optimization:

- **Format conversion**: AVIF → WebP → JPEG (automatic)
- **Responsive sizing**: Different sizes for different devices
- **Lazy loading**: Images load only when visible
- **Priority loading**: Hero images load immediately
- **CDN caching**: Optimized images on Vercel Edge Network

**Results:**
- 80-90% bandwidth reduction
- 10-50ms image load time
- Automatic WebP/AVIF support
- Perfect Lighthouse scores

### Incremental Static Regeneration (ISR)

The project uses **ISR** for optimal page performance:

### How it works:

- **Article pages** - Static, never auto-revalidate, only on-demand after edit
- **Homepage** - Revalidates every 5 minutes (shows fresh content)
- **Articles list** - Revalidates every 5 minutes
- **Admin panel** - Always dynamic (never cached)

### Benefits:

- First load: 10-50ms (served from CDN)
- Global Edge Network (75+ locations)
- Zero server load for repeat visits
- Instant updates with on-demand revalidation

### On-Demand Revalidation:

When you generate/delete/link articles, the system automatically invalidates cache for:
- Homepage
- Articles list page
- Specific article pages

This means changes are reflected immediately without waiting for revalidation interval.

## Tech Stack

- Next.js 14+ (App Router with ISR)
- TypeScript
- Tailwind CSS
- Gemini AI (content generation)
- Unsplash API (images)

## License

MIT

---

Built with ❤️ by ITMakeovers



