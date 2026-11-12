# Bharath & Mounika — Luxury Wedding Invitation Website

A royal Indian wedding invitation website built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and an Express + SQLite persistence backend (with optional Supabase support).

## Features
- **Cinematic Envelope Entrance**: Golden floating particles, corner floral reveals, royal burgundy wax seal, and 3D envelope opening transition.
- **YouTube Wedding Audio (`Seetha Kalyanam`)**: Embedded via the official YouTube IFrame Player API (`LG6PANt6sM8`), starting gently after clicking **Open Wedding Invitation** with smooth volume fade-in/fade-out and Play/Pause controls.
- **Google Translate (English / Telugu)**: Header toggle powered by Google Translate allowing guests to switch the entire wedding website between English and Telugu (`తెలుగు`).
- **Luxury Royal Ivory & Gold Design**: Light editorial theme (`#F7F0E5`, `#FFFDF8`, `#C5A15A`, `#762D3C`, `#E8D8C5`, `#C99A9A`, `#A98950`) with calligraphy, editorial serif, and romantic typography.
- **Real-Time Wedding Countdown**: Animated Days, Hours, Minutes, and Seconds counting down to `22 November 2026`.
- **Symmetrical Family Introductions**: Dedicated ornamental cards for The Groom's Family (Kavuturu) and The Bride's Family (Kadiyala).
- **Three-Chapter Love Story**: Interactive scroll-triggered editorial timeline.
- **Celebrations & Calendar Integration**: Reception (21 Nov 2026) and Wedding Ceremony (22 Nov 2026) cards with Google Calendar, `.ics` download, and Google Maps directions.
- **Venues & Embedded Maps**: Embedded Google Maps, directions, and editable parking/travel placeholders.
- **Blessings Wall**: Guests submit blessings stored in SQLite (`server/data/wedding.db`) and displayed immediately on the blessing wall.

## Running Locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### Production Build & Server
```bash
npm run build
npm start
```

## Customizing Content & Audio
All couple names, family details, story chapters, event timings, travel placeholders, and YouTube audio configuration (`audio.youtubeVideoId`) are centralized in `src/config/weddingConfig.ts`.
