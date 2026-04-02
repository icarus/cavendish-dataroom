# Open Dataroom

A password-protected investor dataroom with engagement tracking. Visitors enter an access code, identify themselves via Google SSO or email, then browse your documents and slide deck. Every session is tracked — you get an email summary showing which slides they viewed, how long they spent, and their engagement score.

**Stack:** Plain HTML/CSS/JS + Supabase (auth, database, edge functions) + Resend (email notifications).

## Quick Start

```bash
# 1. Clone
git clone <your-repo-url> && cd open-dataroom

# 2. Set up environment
cp .env.example .env
# Fill in your Supabase and Resend credentials (see Supabase Setup below)

# 3. Serve locally
cd dataroom
python3 -m http.server 8888
# Open http://localhost:8888/dataroom/
```

## Supabase Setup

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project. Note your:
- **Project URL** (e.g., `https://abcdefghijk.supabase.co`)
- **Anon key** (public, safe for frontend)
- **Service role key** (secret, for edge functions only)

Find these at: Project Settings → API

### 2. Run the Database Migration

In the Supabase SQL Editor, paste and run the contents of `supabase/migrations/00000000000000_init.sql`. This creates the `investor_sessions` and `investor_events` tables with row-level security policies.

### 3. Deploy Edge Functions

Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then:

```bash
# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Set secrets
supabase secrets set INVESTOR_PASSWORD_HASH="$(echo -n 'your-access-code' | shasum -a 256 | cut -d' ' -f1)"
supabase secrets set RESEND_API_KEY="re_your_key"
supabase secrets set NOTIFY_EMAIL="you@yourcompany.com"

# Deploy all functions
supabase functions deploy verify-password
supabase functions deploy track-investor
supabase functions deploy send-session-summary
```

### 4. Update Frontend Config

Edit `dataroom/auth.js` and replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 5. Enable Google OAuth (Optional)

If you want Google SSO login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create an OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → Google, enable it and paste your Client ID and Secret

Without Google OAuth, visitors can still sign in with just their email.

## Customization

### Branding

All branding is controlled by CSS custom properties in `dataroom/dataroom.css`:

```css
:root {
  --color-brand: #2563EB;        /* Primary accent — change this */
  --color-brand-hover: #1D4ED8;  /* Hover state */
  --color-brand-light: rgba(37, 99, 235, 0.08);  /* Light tint */
}
```

Search for `<!-- CUSTOMIZE -->` comments in HTML files for all branding touchpoints:
- Company name in logos, titles, and watermarks
- Taglines and descriptions
- Footer links

### Documents

Edit `dataroom/dataroom.html` to add or remove documents from the index. Each document is a `<div class="dataroom-item">` block — copy the template and update the name, description, and link.

### Slides

Edit `dataroom/presentation.html` to add slides. Each slide is a `<section class="slide">` block. The template includes 3 placeholder slides. To add more:

1. Copy a `<section class="slide">` block
2. Update `data-slide` to the next number (0-indexed)
3. Choose a theme: `slide--dark` or `slide--cream`
4. Update the slide footer count and the `#slideCounter` text
5. Use `.reveal` and `.reveal-d1` through `.reveal-d6` for staggered entrance animations

### Slide Names in Email Reports

Update the `SLIDE_NAMES` array in `supabase/functions/send-session-summary/index.ts` to match your actual slide titles. These names appear in the email summary sent after each session.

## Deployment

This is a static site — deploy the `dataroom/` folder to any static host:

- **Vercel:** `npx vercel --cwd dataroom`
- **Netlify:** Drag-and-drop the `dataroom/` folder
- **GitHub Pages:** Push to a `gh-pages` branch
- **Any web server:** Serve the `dataroom/` directory

After deploying:
1. Add your production domain to the `ALLOWED_ORIGINS` array in all three Edge Functions
2. Redeploy the Edge Functions
3. Update the Supabase Auth redirect URLs in your project settings

## Architecture

```
Visitor → Password Gate → Email/Google Login → Data Room
                                                   ↓
                                            View Documents
                                            View Slide Deck
                                                   ↓
                                          Tracking (per-slide timing)
                                                   ↓
                                          Session End → Email Summary
```

**Auth flow:**
1. Visitor enters access code → verified via `verify-password` Edge Function (SHA-256 hash comparison)
2. Visitor identifies via Google SSO or email entry
3. Session token stored in localStorage (24h expiry for password, 30min inactivity timeout)

**Tracking flow:**
1. Each page view / slide transition → event sent to `track-investor` Edge Function
2. On session end (logout, timeout, tab close) → session summary computed
3. `send-session-summary` Edge Function builds an HTML email with per-slide analytics and sends via Resend

**Standalone deck:**
Run `python3 dataroom/build-standalone.py` to generate `standalone-deck.html` — a self-contained version of the presentation with all CSS/JS inlined and auth/tracking stripped. Useful for sharing directly or opening from `file://`.

## File Structure

```
open-dataroom/
├── README.md                          # This file
├── CLAUDE.md                          # Instructions for Claude Code
├── .env.example                       # Environment variable template
├── .gitignore
├── dataroom/
│   ├── index.html                     # Password gate
│   ├── login.html                     # Google SSO + email login
│   ├── dataroom.html                  # Document index
│   ├── presentation.html              # Slide deck (3 placeholder slides)
│   ├── dataroom.css                   # All styles
│   ├── presentation.js                # Slide navigation engine
│   ├── auth.js                        # Auth module (Supabase)
│   ├── tracking.js                    # Engagement tracking
│   ├── build-standalone.py            # Standalone deck builder
│   └── images/                        # Your images go here
├── supabase/
│   ├── config.toml                    # Supabase project config
│   ├── migrations/
│   │   └── 00000000000000_init.sql    # Database schema + RLS
│   └── functions/
│       ├── verify-password/index.ts   # Password verification
│       ├── track-investor/index.ts    # Session & event tracking
│       └── send-session-summary/index.ts  # Email notification
```
