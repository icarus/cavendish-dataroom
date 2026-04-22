# Open Dataroom

A password-protected investor dataroom with engagement tracking. Plain HTML/CSS/JS + Supabase backend.

## Project Structure

```
open-dataroom/
├── dataroom/           # Frontend — static HTML/CSS/JS
│   ├── index.html      # Password gate (first page visitors see)
│   ├── login.html      # Google SSO + email identification
│   ├── dataroom.html   # Document index (list of materials)
│   ├── presentation.html  # Slide deck (the main presentation)
│   ├── dataroom.css    # All styles (CSS custom properties for theming)
│   ├── auth.js         # Authentication: password gate, Google SSO, session timeout
│   ├── tracking.js     # Engagement tracking: per-slide timing, session lifecycle
│   ├── presentation.js # Slide navigation: keyboard, touch, dot nav
│   ├── build-standalone.py  # Builds auth-free standalone deck
│   └── images/         # Put your images here
├── supabase/           # Backend — Supabase Edge Functions + DB
│   ├── config.toml
│   ├── migrations/     # Database schema (run once via SQL Editor)
│   └── functions/      # Three Edge Functions (deploy via Supabase CLI)
```

## How Things Connect

```
auth.js → verify-password (Edge Function) → checks INVESTOR_PASSWORD_HASH
auth.js → Supabase Auth (Google SSO)
tracking.js → track-investor (Edge Function) → investor_sessions + investor_events tables
tracking.js → send-session-summary (Edge Function) → Resend email API
```

## Customization Markers

All places that need customization are marked with `<!-- CUSTOMIZE -->` comments in HTML or `// CUSTOMIZE` in JS/TS. Quick grep:

```bash
grep -rn "CUSTOMIZE" dataroom/ supabase/
```

## Common Tasks

### Add a document to the dataroom

Edit `dataroom/dataroom.html`. Copy an existing `<div class="dataroom-item">` block and update the name, description, and link.

### Add a slide to the presentation

Edit `dataroom/presentation.html`:

1. Copy a `<section class="slide">` block
2. Set `data-slide` to the next index (0-based)
3. Choose theme: `data-theme="dark"` with `slide--dark`, or `data-theme="light"` with `slide--cream`
4. Update the footer slide count (e.g., "4 / 4")
5. Update the `#slideCounter` default text at the bottom of the file
6. Use CSS classes for animation: `.reveal`, `.reveal-d1` through `.reveal-d6`

After adding slides, update `SLIDE_NAMES` in `supabase/functions/send-session-summary/index.ts` so email reports show the correct slide names.

### Change branding colors

Edit `dataroom/dataroom.css` — the top of the file has all design tokens:

```css
--color-brand: #2563EB;           /* Primary accent */
--color-brand-hover: #1D4ED8;     /* Hover state */
--color-brand-light: rgba(37, 99, 235, 0.08);  /* Tint */
```

### Change the access code password

```bash
# Generate SHA-256 hash of your new password
echo -n "new-password" | shasum -a 256

# Set it as a Supabase secret
supabase secrets set INVESTOR_PASSWORD_HASH="the-hash-output"
```

### Build standalone deck (no auth)

```bash
python3 dataroom/build-standalone.py
# Output: dataroom/standalone-deck.html
```

### Deploy Edge Functions

```bash
supabase functions deploy verify-password
supabase functions deploy track-investor
supabase functions deploy send-session-summary
```

After deploying to production, add your domain to `ALLOWED_ORIGINS` in all three function files.

## Supabase Setup (from scratch)

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/00000000000000_init.sql` in the SQL Editor
3. Set secrets: `INVESTOR_PASSWORD_HASH`, `RESEND_API_KEY`, `NOTIFY_EMAIL`
4. Deploy edge functions (see above)
5. Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `dataroom/auth.js`
6. (Optional) Enable Google OAuth in Supabase Auth settings

## Tech Stack

- **Frontend:** Plain HTML/CSS/JS (no framework, no build step)
- **Fonts:** Instrument Serif (display) + DM Sans (body) via Google Fonts
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Email:** Resend API
- **Hosting:** Any static file server

## Commands

```bash
# Serve locally
python3 -m http.server 8888    # from project root, visit http://localhost:8888/dataroom/

# Build standalone deck
python3 dataroom/build-standalone.py

# Deploy Supabase functions
supabase functions deploy verify-password
supabase functions deploy track-investor
supabase functions deploy send-session-summary
```

## Auth Flow

1. **Password gate** (`index.html`): Visitor enters access code → hashed and compared server-side
2. **Login** (`login.html`): Google SSO or email entry (email is stored in sessionStorage, no verification)
3. **Protected pages**: `auth.js` guards every page — redirects to password gate if not authenticated
4. **Timeout**: 30-minute inactivity timeout, configurable in `auth.js` (`SESSION_TIMEOUT_MS`)

## Tracking

Every visitor session records:
- Which slides were viewed and for how long
- Navigation method (keyboard, swipe, dot click)
- Session duration and end reason (logout, timeout, tab close)
- Engagement score (0-100 based on coverage, depth, and time)

Session summaries are emailed to `NOTIFY_EMAIL` via Resend when a session ends.

## Slide Design Rules

- Never use opacity on text. Text is either white or highlighted in yellow.
- Use consistent font size within a slide (unless a deliberate hierarchy is needed).
- Yellow highlight uses `WordReveal` with `highlight` prop so the bg animates per-word. Never use a static `<mark>` wrapping a `WordReveal`.
- WordReveal animation reveals words one by one with staggered delays for cinematic feel.
- All avatars/images are square (no rounded corners).
- font-medium for all text in slides.

## Deck Structure

Current slide order and status:

| # | Slide | Component | Status |
|---|-------|-----------|--------|
| 1 | Forging Latin American... | `Slide2` | done |
| 2 | Founder Quote (Natan) | `SlideFounderQuote` | done |
| 3 | Risk-Averse Mentality | `SlideRiskAverse` | done |
| 4 | Liberation Capital (yellow bg) | `SlideLiberation` | done |
| 5 | Clearing the Fog (mentors) | `SlideClearingFog` | done |
| 6 | Community | — | pending (need Figma text) |
| 7 | Events | `Slide8` | existing |
| 8 | Banana House | `Slide7` | existing |
| 9 | Fund Strategy (return table) | `SlideFundStrategy` | done |
| 10 | Elegir al equipo correcto | — | pending (need Figma text) |
| 11 | How We Win | `Slide6` | existing |
| 12 | Track Record (fund carousels) | `SlideTrackRecord` | done |
| 13 | Team | `Slide10` | existing |
| 14 | Fund Terms | `Slide12` | existing |
| 15 | Social Proof (testimonials) | `SlideSocialProof` | done |

Data source of truth: `src/lib/deck-data.ts` (mentors, portfolio companies, funds, testimonials, fund stats, team).
