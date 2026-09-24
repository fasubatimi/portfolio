# Fasuba Olukunle — Editorial Portfolio Website

A production-grade, multi-page personal portfolio website for **Fasuba Olukunle (Kunle)**, Computer Science student and software developer based in Lagos, Nigeria.

Designed and engineered strictly following the **Editorial direction** specified in [Kunle_Editorial_Portfolio_Build_Brief.md](file:///c:/Users/timi/Desktop/my%20portfolio/Kunle_Editorial_Portfolio_Build_Brief.md).

---

## 1. Multi-Page Architecture

Each primary navigation destination is a dedicated, beautifully formatted HTML page sharing the unified editorial header, footer, design system tokens, and typography:

```
my portfolio/
├── index.html                               # Home: Editorial hero with 3D phone, quick highlights, and routing teasers
├── work.html                                # Selected Work: Archive grid of all 3 projects with status badges and matrix
├── case-studies.html                        # Case Studies: Full in-depth engineering breakdowns (SafeAlert, Library Control, Dansamdolly)
├── about.html                               # About Kunle: Bio, education, location, factsheet, and engineering principles
├── skills.html                              # Technical Toolkit: 4 Project-backed skill domains with verifiable evidence
├── contact.html                             # Contact: Direct email card, copy-to-clipboard, GitHub link, and direct message composer
├── css/
│   └── style.css                            # Clean, single-copy editorial stylesheet with zero gradients
├── js/
│   └── main.js                              # Modular scripts for 3D tilt, mobile menu drawer, copy-to-clipboard, mailto composer
├── README.md                                # Project documentation & run guide
└── Kunle_Editorial_Portfolio_Build_Brief.md # Original build brief
```

---

## 2. Design System & Constraints

- **Strict Zero-Gradients Rule**: Built exclusively with solid, flat colors, crisp borders, and typographic rhythm. Absolutely zero `linear-gradient`, `radial-gradient`, blurred color glows, or gradient image overlays.
- **Palette**:
  - Main Background (Warm Editorial Paper): `#F0EEE8` / `#F8F7F3`
  - Primary Ink Text & Controls: `#203238` / `#142226`
  - Secondary / Captions: `#5D6967`
  - Editorial Accent (Teal): `#2D625F`
  - Structural Dividers: `#C9CFCA`
  - Soft Surface Panels: `#DDE5DC`
  - SafeAlert Red: `#B6544A` (Strictly scoped to the SafeAlert phone and case study, never as a general portfolio brand accent).
- **Typography**:
  - Headings: `Newsreader` (Editorial serif)
  - Navigation, Body & UI: `Plus Jakarta Sans` (Humanist sans-serif)
  - Metadata, Tags & Code: `JetBrains Mono` (Monospaced)

---

## 3. Features by Page

1. **Home (`index.html`)**:
   - Perspective-accurate 3D CSS SafeAlert device chassis with realistic notch, speaker, status bar, and flat vector OSMDroid street grid simulation with red emergency incident marker.
   - Desktop mousemove physics: subtle, restrained 3D tilt that gently springs back to rest pose on pointer leave.
   - Keyboard accessible (`Enter` or `Space` on phone jumps to SafeAlert case study).
   - Direct link teasers to `work.html`, `case-studies.html`, `about.html`, `skills.html`, and `contact.html`.
2. **Selected Work (`work.html`)**:
   - 3 Curated cards: SafeAlert, Library Control, Dansamdolly.
   - Clear status labels (`Functional Android Application`, `System Design & Prototype`, `School Project`).
   - Project Comparison Matrix detailing stacks, roles, and stages.
3. **Comprehensive Case Studies (`case-studies.html`)**:
   - Quick jump anchor bar to `#safealert`, `#library-control`, `#dansamdolly`.
   - SafeAlert: Problem space, architecture breakdown, Firebase Realtime Database vs Firestore rationale, OSMDroid vs Google Maps SDK, privacy geohashing, and what was learned.
   - Library Control: University library workstation problem, dual-tier architecture (web console + Windows background daemon), LAN security protocol, librarian UX.
   - Dansamdolly: Formal requirements engineering, separation of concerns, collaborative git workflows.
4. **About Kunle (`about.html`)**:
   - Authentic narrative of a Computer Science student in Lagos.
   - Factsheet sidebar with location, education, availability, and contact links.
   - Core engineering philosophy: *Clarity over cleverness*, *Dependability under stress*, and *Honest engineering*.
5. **Skills & Toolkit (`skills.html`)**:
   - Categorized into 4 functional domains tied to verifiable project evidence (no arbitrary percentage meters): Mobile Development, Cloud & Backend, Systems & Prototyping, CS Core & Practice.
6. **Contact (`contact.html`)**:
   - One-click copy email `fasubatimi@gmail.com` with real clipboard copy and live feedback.
   - Direct link to GitHub: `https://github.com/fasubatimi`.
   - Direct Email Composer: honest `mailto:` protocol generator that opens the user's local email client with pre-filled subject and body (zero fake forms).

---

## 4. How to Run Locally

Because the site uses standard, zero-dependency modern HTML5, CSS3, and ES6 JavaScript, you can run it with any local HTTP server:

```bash
# Option A: Python
py -3 -m http.server 8080

# Option B: Node.js
npx serve .
```
Then visit `http://localhost:8080/index.html`.

---

## 5. Deployment Guide

### Deploying to GitHub Pages
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete multi-page editorial portfolio"
   ```
2. Push to your GitHub repository `https://github.com/fasubatimi/portfolio`.
3. Go to **Settings** → **Pages** → Source: `Deploy from a branch` (`main` / root).
4. Your site will be live at `https://fasubatimi.github.io/portfolio/`.
