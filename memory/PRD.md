# Kings Pride — Golden Palm City · PRD

## Original Problem Statement
A cinematic luxury real-estate experience platform for **Golden Palm City** (Kings Pride brand). Vision: *"Escape the chaos. Discover tomorrow early."* — India's first cinematic future-land luxury experience. Emotionally immerse upper-middle-class buyers, NRIs, luxury land investors and villa lifestyle buyers, converting via WhatsApp luxury concierge (NOT aggressive forms).

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Lenis smooth scroll. Editorial dark cinematic theme (Cormorant Garamond display + Outfit body). Single-page narrative scroll.
- **Backend**: FastAPI + MongoDB (motor). REST endpoints under `/api`.
- **No external integrations** in MVP. Concierge form persists in MongoDB and opens WhatsApp deep-link.

## Core Requirements (static)
- Cinematic Hero with Golden Palm City entrance gate image
- 5-Act narrative scroll (Discovery → Vision/Environment → Transformation → Ownership/Projects → Concierge)
- 4 project cards (Golden Palm City flagship, Vantage Farms, Chandan Valley, Doctor's Colony)
- Trust facts (RERA, HMDA, distance, surveillance, infrastructure, perimeter, pricing)
- Concierge lead capture (name, phone, email, interest, message) → MongoDB + WhatsApp deep-link
- Floating WhatsApp concierge CTA
- Mobile-first cinematic experience

## User Personas
1. Upper-middle-class aspirational buyer
2. NRI investor
3. Luxury land investor (early-entry)
4. Villa lifestyle buyer
5. Generational wealth family

## Implemented (2026-02 — v1 MVP)
- ✅ FastAPI backend (`/api/projects`, `/api/projects/{slug}`, `/api/concierge/inquiries` GET/POST)
- ✅ React App with Lenis smooth-scroll + cinematic motion
- ✅ Sections: Header, Hero, Discovery, Environment, Transformation, Projects, Trust+Concierge, Footer, WhatsApp Float
- ✅ Custom dark cinematic palette (#0f0d0c ink, #d99a5b sand, #f4f1eb ivory, #2c402d palm)
- ✅ Editorial typography (Cormorant Garamond + Outfit)
- ✅ MongoDB persistence for concierge inquiries
- ✅ WhatsApp deep-link (`wa.me/917997700031`)
- ✅ All interactive elements have `data-testid`

## Prioritized Backlog
- **P1**: Loading screen / cinematic intro animation; light WebGL fog/particles in hero
- **P1**: Project detail pages (deep-dive per project) with masterplan
- **P2**: Ambient sound design (opt-in audio toggle)
- **P2**: Lead admin dashboard
- **P2**: Multilingual support (Hindi/Telugu)
- **P3**: 3D scene moments (React Three Fiber) for environmental depth
- **P3**: CMS (Sanity) to manage projects
