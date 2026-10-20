# ClearGround — Radon Testing & Mitigation

## Premium Multipurpose Environmental Health & Real Estate Inspection Platform

A production-ready, multi-page HTML5/CSS3/Vanilla JS platform engineered for environmental safety, radon measurement, and active soil depressurization (ASD) mitigation contractors. ClearGround adheres strictly to the **Dark Royal Purple + Soft Pastel Lavender** design system, combining evidence-based radon building physics with high-conversion UI/UX workflows.

---

## 🌟 Key Architecture & Enhancements

1. **Brand Identity & Evidence-Based Content:**
   - **ClearGround (`ClearGround`)** branding across all 14 multi-page files.
   - Scientifically verified physics based on EPA protocols (40 CFR Part 141, ANSI/AARST standards) and WHO indoor air guidelines.
   - Strict elimination of duplicate text, repetitive headings, or cross-page description cloning. Every page and section has a unique, purposeful narrative.

2. **Dedicated Niche Real Estate Landing (`home-2.html`):**
   - Engineered specifically for **Homebuyers, Home Sellers, Real Estate Agents, and Commercial Property Managers**.
   - Split-screen hero with certified due diligence messaging: *"Confident Property Decisions Begin With Better Radon Information"*.
   - Specialized 4-audience guidance cards with actionable steps for buyers, sellers, realtors, and commercial managers.
   - 5-step escrow inspection process detailing contingency timelines, lockbox access, and same-day closing PDF delivery.
   - Annotated sample radon inspection report visual walkthrough and closing contingency contract negotiation guidance.

3. **Unique Topic-Specific Image Architecture (Zero Reused Assets):**
   Organized under clean, dedicated subdirectories:
   - `assets/images/home/` — General residential diagnostic and real estate inspection photography (`general-radon-testing.jpg`, `real-estate-inspection.jpg`).
   - `assets/images/services/` — 6 distinct service images (`residential-testing.jpg`, `commercial-testing.jpg`, `short-term-testing.jpg`, `long-term-monitoring.jpg`, `mitigation-installation.jpg`, `verification-testing.jpg`).
   - `assets/images/about/` — Professional consultation and technical team specialists (`professional-consultation.jpg`, `team-specialists.jpg`).
   - `assets/images/blog/` — Distinct educational photography for every article (`radon-entry-pathways.jpg`, `testing-methods.jpg`, `home-purchase-testing.jpg`, `mitigation-systems.jpg`, `radon-report.jpg`, `follow-up-testing.jpg`).
   - `assets/images/real-estate/` — Homebuyer due diligence and sample report analysis (`homebuyer-due-diligence.jpg`, `sample-radon-report.jpg`).
   - `assets/images/contact/` — Field technician consultation setup (`booking-consultation.jpg`).

4. **Dynamic Individual Service Details (`service-details.html`):**
   - Interactive service selector bar and URL query parameter parser (`?service=residential|commercial|short-term|long-term|mitigation|verification`).
   - Dynamically loads specific technical scopes, foundation preparation rules, 5-step workflows, deliverables, and service-specific FAQs without page reload.

5. **Transparent Pricing & Foundation Physics (`pricing.html`):**
   - 4 clear tiers: Certified Screening Kit ($49), 48-Hour Digital Continuous Test ($149), Turnkey Active Mitigation (starting at $1,450), and Commercial Multi-Facility Scope (Custom RFP).
   - Foundation Type Cost Transparency breakdown explaining price drivers across Slab-on-Grade, Poured Basements, Crawlspace Encapsulation, and Mixed/Split-Level structures.
   - Detailed Comparison Matrix comparing measurement methods, tamper detection, and legal closing validity.

6. **Comprehensive 5-Category Knowledge Base (`faq.html`):**
   - 20 authoritative questions organized into 5 categories: *Radon Basics*, *Radon Testing*, *Mitigation Systems*, *Property Transactions*, and *Booking & Preparation*.
   - Live real-time search filtering and interactive category tabs.

7. **Premium Single-Row Navbar Redesign & Simplified Hierarchy:**
   - **Exact Desktop Navigation Order:** 1. Logo (ClearGround) → 2. Home (Dropdown ONLY) → 3. About Us (Direct Link) → 4. Services (Direct Link) → 5. Blog (Direct Link) → 6. FAQ (Direct Link) → 7. Pricing (Direct Link) → 8. Contact (Direct Link) → 9. RTL/LTR Toggle → 10. Dark/Light Mode Toggle → 11. Book a Service (Direct Booking Button).
   - **Strict Elimination of Obsolete Menus:** Removed `Pages`, `Components`, and `Portal` dropdowns/arrows.
   - **Exclusive Home Dropdown:** Only Home has a dropdown containing *Home 1 — General Radon Services* (`index.html`) and *Home 2 — Real Estate Radon Testing* (`home-2.html`).
   - **Direct Navigation Links:** All other menu items (`about.html`, `services.html`, `blog.html`, `faq.html`, `pricing.html`, `contact.html`) are direct links with no arrows or nested dropdowns.
   - **Premium Book a Service Button:** 44px purple gradient pill CTA leading directly to `contact.html#booking-form` on desktop and mobile.
   - **No Public Authentication:** Sign In/Sign Up pages, fake login flows and profile UI were removed. The template remains a public booking-first site.

8. **Complete Mobile, Tablet, Laptop & Desktop Responsiveness (All 13 Breakpoints):**
   - **Reference-tested Breakpoints (prior project versions):** 320px, 360px, 375px, 390px, 414px, 425px (Mobile), 768px, 820px (Tablet), 1024px (Laptop), 1280px, 1366px, 1440px, 1920px (Desktop & Ultrawide).
   - **Responsive layout QA:** This version preserves previous fixes; browser automation could not be rerun in the current environment.
   - **Compact 1024px Laptop Navbar:** Custom compact scaling (4px link gaps, 13.5px font, 16px button padding) allows the entire desktop navigation hierarchy to fit seamlessly without clipping, wrapping, or prematurely falling back to a hamburger menu.
   - **Premium Mobile Navigation Drawer (4 Distinct Structured Groups):**
     - *Group 1 — Drawer Header:* ClearGround brand logo, glowing shield icon, and accessible rounded close button.
     - *Group 2 — Primary Navigation:* Full vertical link list with matching SVG icons, active indicator, and smooth accordion for the Home dropdown (*Home 1* and *Home 2*).
     - *Group 3 — Preferences Controls:* Side-by-side, equal-height toggle controls for Dark/Light Mode and RTL/LTR Layout with active state indicators.
     - *Group 4 — Booking CTA:* Full-width purple gradient Book a Service button that navigates to the Contact inspection form.
   - **Uncluttered Mobile Header (58px height):** Features brand logo on the left and theme icon + elevated purple hamburger button (42px, 12px radius, subtle lavender border) on the right.
   - **Accessible Drawer Interactions:** Full ARIA state management (`aria-expanded`, `aria-controls`), backdrop blur (20px), focus trapping, Escape key support, outside click-to-close, and background body scroll-locking.

---

## 🎨 Visual Design System

- **Dark Mode Primary Palette:**
  - Background Base: `#0B0618` (Deep Black-Purple)
  - Surface Cards: `#170B2C` (Deep Violet) & `#24113F` (Midnight Purple Glass)
  - Radiant Accents: `#A855F7` (Vibrant Purple), `#C084FC` (Luminous Lilac), `#6C22A9` (Royal Violet)
  - Typography: `#FFFFFF` (Primary Text), `#D8B4FE` (Soft Pastel Lavender), `#9E8BB8` (Muted Lavender)
  - Borders: `rgba(216, 180, 254, 0.16)` with subtle ambient glow shadows
- **Light Mode Palette:**
  - Background Base: Soft pastel gradient (`#FFF0DA` peach, `#FFD9E9` pink, `#F1D9FA` lavender, `#DAE9F7` powder blue)
  - Surfaces: `#FFF9FC` and `#FAF2FF` with `#241333` plum typography
- **Diagnostic Semantic Colors:**
  - `#10B981` Safe Target (`< 2.0 pCi/L`)
  - `#F59E0B` Elevated Warning (`2.0 – 3.9 pCi/L`)
  - `#EF4444` EPA Action Level (`≥ 4.0 pCi/L`)
- **Typography:**
  - Headings & Buttons: **Outfit** (Google Fonts)
  - Body Text, Data & Forms: **Inter** (Google Fonts)
- **Bidirectional Support:** Full LTR and RTL compatibility with dedicated toggle.

---

## 📁 File Structure

```text
Radon Testing & Mitigation Company/
│
├── index.html                   # Home 1 - General Residential & Health Risk Landing
├── home-2.html                  # Home 2 - Real Estate & Homebuyer Due Diligence Landing
├── about.html                   # About ClearGround - Mission, Standards & Operations
├── services.html                # Services - Complete Catalogue & Foundation Science
├── service-details.html         # Dynamic Service Details (Interactive & Deep-Linkable)
├── pricing.html                 # Pricing - Upfront Packages & Foundation Cost Breakdown
├── faq.html                     # FAQ - 5 Categorized Sections with Live Search Filtering
├── blog.html                    # Knowledge Base - Filterable Research Articles
├── blog-details.html            # Article Deep-Dive - Architectural Cross-Section Diagram
├── contact.html                 # Contact & Schedule - Multi-Service Intake & Property Fields
├── radon-guide.html             # The Complete Homeowner's Radon Action Handbook
├── privacy.html                 # Client Data & Inspection Confidentiality Policy
├── terms.html                   # Testing Protocols, Warranty & Escrow Terms
├── maintenance.html             # Radon Fan Replacement & Biennial System Diagnostic
├── coming-soon.html             # IoT Sensor Network Upgrade Countdown
├── 404.html                     # Custom Branded 404 Error Page
│
├── css/
│   ├── theme.css                # Dark Purple + Pastel Lavender Variables, Tokens, RTL
│   ├── components.css           # Glass Cards, Buttons, Inputs, Tables, Gauges, Badges, Drawer
│   └── layout.css               # Containers, Navigation Header, Hero Grids, Footers
│
├── js/
│   ├── theme.js                 # Dark/Light Theme Switching & RTL Support
│   ├── navigation.js            # Sticky Glass Navbar, Mobile Drawer & Active Links
│   ├── booking-calendar.js      # Accessible native date-picker trigger for Contact page
│   ├── forms.js                 # Interactive Form Validation & Radon Risk Gauge
│   └── main.js                  # Blog Filters, FAQ Accordions, Dynamic Pricing Toggles
│
├── assets/
│   └── images/                  # 100% Unique Photographic & Technical Diagrams
│       ├── home/                # General residential & real estate hero visuals
│       ├── services/            # 6 unique service card photographs
│       ├── about/               # Consultation & technical team specialist imagery
│       ├── blog/                # 6 distinct article headers & entry pathways
│       ├── real-estate/         # Homebuyer inspection & sample radon report
│       └── contact/             # Technician consultation & scheduling
│
└── README.md                    # Platform Documentation & Overview
```

---

## 🚀 Quick Start

ClearGround is completely standalone with zero external dependencies, bundlers, or frameworks.

1. **Direct Preview:** Open `index.html` or `home-2.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. **Local HTTP Server:**
   ```bash
   # Using Node.js npx
   npx serve .
   
   # Using Python
   python -m http.server 8080
   ```
3. **Interactive Features:**
   - Test dark/light mode toggle in the top-right header.
   - Test RTL mode for bidirectional Arabic/Hebrew evaluation.
   - On `services.html`, click any service to navigate seamlessly into `service-details.html?service=...` with full dynamic content rendering.
   - On `faq.html`, filter by category or type in the real-time search box.
   - On `contact.html`, fill out the property-specific booking form and see instant interactive confirmation.

## October 20 update — Book a Service and calendar

All public page headers (and existing mobile drawers and footer shortcuts) link to `contact.html#booking-form`. The Sign In and registration pages and their demo login JS have been removed. The Contact **Preferred Date** input is a native date field with a real, keyboard-accessible calendar button. The small standalone dashboard is demonstration-only: it is not linked from the public website, has no access-control backend, and must not be deployed with sensitive data.

The Contact inspection form validates entries locally only. It does **not** transmit or confirm an appointment without a backend/API integration.
