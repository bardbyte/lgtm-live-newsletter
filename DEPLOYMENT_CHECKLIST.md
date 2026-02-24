# LGTM Deployment Checklist

Run through this EVERY time before deploying to production. No exceptions.

## Pre-Deploy Checks

### 1. Content Verification
- [ ] Article dates are correct (biweekly cadence: Feb 10, Feb 24, Mar 10, Mar 24...)
- [ ] Article order in `src/config/articles.ts` is newest-first
- [ ] All article slugs in `articles.ts` have matching components in `ArticlePageClient.tsx`
- [ ] Homepage "What You'll Get" section lists current article titles (not stale/removed ones)
- [ ] No hardcoded article indexes that could break when articles are added/removed
- [ ] Author byline is correct on all articles

### 1b. Cross-Reference Sanity Check (CRITICAL — do this for EVERY deploy with new articles)

Every article has a mid-article "Next issue" CTA that teases the next article. These are **hardcoded strings** inside each article `.tsx` file. When you add/remove articles, ALL of these must be updated.

**Files to check:**
- Each article in `src/articles/*.tsx` — find the "Next issue" `<section>` and verify the title + subtitle match a real, live article
- `src/components/EmailCapture.tsx` — the `getNextTuesday()` date auto-calculates, but the success message references subscriber count (update as it grows)
- `src/app/page.tsx` — "What You'll Get" section lists article titles; verify they match `articles.ts`

**The check:**
```
grep -n "Next issue" src/articles/*.tsx   # Find all "next issue" teasers
```
For each match, verify:
- [ ] The teased article title matches a real article in `articles.ts`
- [ ] The teased article subtitle/description is accurate
- [ ] The teased article actually comes AFTER the current one chronologically
- [ ] If an article was removed, its teaser in other articles was updated

**Current cross-reference map (update when articles change):**
| Article | "Next issue" teases | File:Line |
|---|---|---|
| `agentic-quality-crisis` | (update to next article when published) | `src/articles/agentic-quality-crisis.tsx:~72` |
| `ai-agents-vs-copilots` | The Agentic AI Quality Crisis | `src/articles/ai-agents-vs-copilots.tsx:~69` |

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
