# LGTM Deployment Checklist

Run through this EVERY time before deploying to production. No exceptions.

## Pre-Deploy Checks

### 1. Content Verification
- [ ] Article dates are correct (biweekly cadence: Feb 10, Feb 24, Mar 10, Mar 24...)
- [ ] Article order in `src/config/articles.ts` is newest-first
- [ ] All article slugs in `articles.ts` have matching components in `ArticlePageClient.tsx`
- [ ] Homepage "What You'll Get" section references valid article indexes
- [ ] No hardcoded article indexes that could break when articles are added/removed
- [ ] Author byline is correct on all articles
- [ ] "Next issue" teaser in email capture sections references the correct upcoming article

### 2. Build Verification
- [ ] `rm -rf .next` (Turbopack cache corrupts frequently — always clean build)
- [ ] `npm run build` passes with zero errors
- [ ] Check route table in build output — all expected routes present
- [ ] No unexpected routes (check for macOS " 2" duplicate files: `find src -name "* 2*"`)

### 3. Local Smoke Test
- [ ] `npm run dev` starts without errors
- [ ] Homepage loads (`/`)
- [ ] Each article loads (`/articles/{slug}`)
- [ ] Executive/Technical toggle works on article pages
- [ ] Email subscribe form submits without error
- [ ] Theme toggle (dark/light) works
- [ ] OG images render (`/articles/{slug}/opengraph-image`)
- [ ] Removed articles return 404

### 4. Environment
- [ ] `.env.local` has `BUTTONDOWN_API_KEY` set
- [ ] Vercel environment has `BUTTONDOWN_API_KEY` set
- [ ] No secrets in client-side code (check: `grep -r "BUTTONDOWN" src/` should only show `process.env` in API route)

## Deploy Steps

```bash
# 1. Clean build
rm -rf .next && npm run build

# 2. Stage and commit
git add [specific files]
git commit -m "descriptive message"

# 3. Push to GitHub
git push origin main

# 4. Deploy to Vercel
vercel --prod

# 5. Wait for "Aliased: https://lgtm.live" confirmation
```

## Post-Deploy Verification

```bash
# All routes return expected status codes
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/articles/{each-slug}
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/api/subscribe  # 405 = correct (POST only)
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/sitemap.xml
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/robots.txt

# Security headers present
curl -sI https://lgtm.live/ | grep -E "(x-frame|x-content|strict-transport|referrer)"

# OG images generate for each article
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/articles/{slug}/opengraph-image

# Removed articles 404
curl -s -o /dev/null -w "%{http_code}" https://lgtm.live/articles/{removed-slug}
```

## Common Issues

| Issue | Fix |
|---|---|
| Turbopack cache corruption (`Failed to restore task data`) | `rm -rf .next` and restart |
| Port 3000 occupied | `lsof -ti:3000 \| xargs kill -9` |
| macOS creates " 2" duplicate files | `find src -name "* 2*" -exec rm -rf {} +` |
| TypeScript window cast error | Use `(window as unknown as Record<string, unknown>)` |
| Buttondown blocks test emails | `example.com` is firewalled; use real email for testing |

## Deployment Infrastructure

- **Git remote**: `origin` → `https://github.com/bardbyte/lgtm-live-newsletter.git`
- **Vercel project**: `sahebs-projects-06b08907/lgtm-live-newsletter`
- **Production URL**: `https://lgtm.live`
- **DNS**: GoDaddy → Vercel (76.76.21.21)
- **Analytics**: Plausible (script.tagged-events.js for custom events)
- **Email**: Buttondown API (server-side only via `/api/subscribe`)
