# 전주 심야 풍류록 — Design Brief (for all implementers)

## 1. What we are building
A single-page **promotional MVP site** for *전주 심야 풍류록 (Jeonju Midnight Pungryu-rok)* — a premium
small-group (6–8 seats) Saturday local tour in Jeonju, Korea:

> 15:30 완판본문화관 golden-hour walk & snaps → 17:00 삼양다방 Korean dinner + 전통주 3-pairing
> → 19:00 에이커북스토어 after-hours private salon where everyone writes an 8-page accordion zine.

Positioning: **not** a flashy "왕홍 체험" photo tour. It is about becoming a *writer for a day* in Korea's
historic publishing city (완판본). Photos = the "author bio photo" for your own book. Tone: poetic, calm,
literary, premium-but-warm. Target: women in late 20s–30s from 전북 (익산/김제/완주/전주).

Main copy line: **"토요일 밤 7시, 문 닫은 전주의 독립서점이 당신만을 위해 열립니다."**

## 2. Quality bar
Target **Awwwards Site-of-the-Day** craft. That means:
- Big, confident editorial typography; generous whitespace; asymmetric grids; intentional rhythm.
- Every section has *one* memorable interaction or motion idea — not ten mediocre ones.
- Motion is smooth, eased (`EASE = [0.22,1,0.36,1]`), purposeful; never janky. Prefer transform/opacity.
- Pixel-polish: consistent spacing, hover states, focus states, perfect alignment, no overflow on mobile.
- **Colorful pastel** atmosphere is mandatory. The global `<PastelBackground/>` (fixed mesh blobs that
  shift day→dusk→night pastel with scroll) is already in place — sections should mostly be **transparent**
  so it shows through, using frosted `.glass` cards and pastel tints on top.

## 3. Art direction
- **Palette** (see `src/styles/tokens.css`): ink `--ink #1f1a2e` on pastels `--peach --apricot --butter
  --mint --jade --sky --lilac --rose`. Accent `--seal #e8553a` (낙관/seal-stamp red) — use **sparingly**
  (tiny dots, seal stamps, one highlight word). Never dark section backgrounds — "night" is lavender pastel.
- **Type**: Korean headlines `var(--font-serif-kr)` (Noto Serif KR, weight 400–600, tight tracking -0.03em).
  Latin display / numerals / italics `var(--font-display)` (Instrument Serif — gorgeous in italic).
  UI/body `var(--font-sans)` (Pretendard). Mixing a huge italic Instrument Serif English word with a
  Korean serif headline is our signature move. Hanja (錄 風 夜 全州) can be used as big decorative glyphs.
- **Motifs**: hanji paper texture feel, seal stamps (`.seal`), woodblock frames (thin double rules),
  accordion folds, film-photo frames with white borders & slight rotation, washi-tape strips, vertical
  Korean/Hanja text (`writing-mode: vertical-rl`), times like `15:30` set in display italic.
- **Images** in `/public/images/`: `hero-alley.jpg` (16:9), `dabang-dinner.jpg` (4:3),
  `bookstore-night.jpg` (3:4), `woodblock.jpg` (1:1), `zine-table.jpg` (4:3), `hanbok-detail.jpg` (3:4).
  Dreamy pastel film photography. Use `loading="lazy"` (except hero), `alt` in Korean, `object-fit: cover`.
  Rounded corners `var(--r-lg)` or film-frame treatment; subtle parallax / scale-on-scroll welcome.

## 4. Tech rules (must follow)
- React 18 + Vite. Deps available: **framer-motion**, **lenis** (already wired in `App.jsx`, instance at
  `window.__lenis`). **Do not add new npm dependencies.** No Tailwind. Plain CSS files.
- **All copy comes from `src/content.js`** — import what you need. You may *add* fields to content.js
  only inside your own section's export object if truly needed (tell the orchestrator).
- Reuse: global classes in `src/styles/global.css` (`.container .section .eyebrow .h1 .h2 .h3 .lead
  .muted .glass .btn .btn--ghost .btn-arrow .seal .display .italic .serif`) and motion primitives in
  `src/components/motion.jsx` (`Reveal`, `SplitLines`, `Arrow`, `EASE`).
- Booking: `import { useBooking } from '../booking.jsx'` → `openBooking(tierId?)` opens the reservation
  sheet. Every primary CTA should call it.
- **CSS scoping**: each component has its own `Component.css` imported at top of `Component.jsx`.
  Prefix *every* class with the component's short name (e.g. `.hero__title`, `.course-stop`) to avoid
  collisions. Never style bare element selectors globally. Don't edit `global.css`/`tokens.css` —
  if you need a new shared token, tell the orchestrator.
- Each section root: `<section id="..." className="section ...">` using ids from `content.nav`
  (`story`, `course`, `zine`, `tickets`, `info`).
- **Responsive**: must look designed (not just stacked) at 375px, 768px, 1440px, 1920px. No horizontal
  overflow. Touch-friendly (≥44px targets). Custom hover effects must degrade on touch.
- **A11y**: semantic HTML, alt text, `aria-*` for interactive widgets, keyboard operable, respect
  `prefers-reduced-motion` (framer-motion: `useReducedMotion()`).
- **Only edit the files you own** (listed in your task). Others are being edited concurrently.

## 5. QA loop (do this before reporting done)
1. `npx vite build` in the project root must succeed with no errors.
2. Dev server runs at `http://localhost:5173` (already running — do not start another on 5173).
3. Screenshot helper (headless Chrome):
   `node /Users/chungheegyeong/.gemini/antigravity/brain/b09cabe7-0cf6-4876-b751-858daff1fb2c/scratch/shot.mjs http://localhost:5173 <outPrefix> <width> <height> [cssSelector]`
   - with a selector (e.g. `#course`) it scrolls there and saves `<outPrefix>-el.png`
   - without, it saves every screen `<outPrefix>-00.png …`
   - it prints console errors. Save shots under
     `/Users/chungheegyeong/.gemini/antigravity/brain/b09cabe7-0cf6-4876-b751-858daff1fb2c/scratch/shots/`.
   View the PNGs, critique like an Awwwards juror, iterate. Check 1440×900 **and** 390×844.
