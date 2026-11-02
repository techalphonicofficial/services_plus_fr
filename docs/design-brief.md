# Services Plus — Design Brief & Critique

## 1. Critique of Current State (Before Pass)

An inspection of the baseline screenshots (`/docs/design-review/before/`) across `360px`, `768px`, `1024px`, `1440px`, and `1920px` reveals classic "first-pass AI template" defects and structural regressions:

1. **Broken Hero H1 (Missing Middle Line)**:
   - On the homepage, the middle span `"Compliance & Management"` uses `text-transparent bg-clip-text bg-linear-to-r`. Because the project uses Tailwind CSS v3 (`^3.4.17`) where the utility is `bg-gradient-to-r` (not v4's `bg-linear-to-r`), no background image is generated. The text becomes `color: transparent` on a light background, leaving a large empty gap between `"Empower Your Business"` and `"Made Easy With Us"`.
2. **Navigation & Button Wrapping at 1024px–1440px**:
   - In `TopNav.jsx`, `"Certification & Licensing"` wraps onto two lines even at `1440px`, and the `"Get Started +"` CTA button wraps onto two lines.
   - At `1024px`, the navigation bar overflows horizontally because too many items (logo, 5 categories, 2 links, search pill, bell, Pay pill, Login, Get Started) compete in a single row without `whitespace-nowrap` or consolidated utility menus.
3. **Hero Search & CTA Row Wrapping**:
   - The search trigger placeholder (`"Search 80+ services (e.g. GST, Private Limited)..."`) wraps onto two lines, and the `"WhatsApp"` button wraps its icon above its label.
   - The keyboard shortcut hint is hardcoded to `⌘K` instead of detecting Windows/Linux (`Ctrl K`) vs macOS (`Cmd K`).
4. **Invented Claims & Non-Source Announcements**:
   - Unverified badges such as `"Govt. Recognized Corporate Advisory"`, `"Govt. Recognized Corporate Filing Platform"`, `"Govt. Verified"`, and `"DPIIT Recognized Advisory"` were added without basis in the live crawl.
   - The top announcement bar displays an invented string (`"GST & ROC Annual Filing compliance dates active for FY 2026"`) instead of the actual `/notification` data.
5. **Visual Homogeneity ("AI Slop" Patterns)**:
   - **Everything-centered layout**: Every section on the homepage uses a centered pill badge + centered H2 + centered subtitle + uniform card row.
   - **Monospace micro-labels & pill badges with pulsing dots**: Overuse of `font-mono` uppercase rounded-full pills across every header and card.
   - **Identical card rows**: A 5-card grid in the hero followed immediately by a 3-card grid in ServicesTabs, a 4-card grid in ProcessSection, a 3-column grid in WhyUsSection, and a 3-card grid in LatestBlogs—all sharing the same pale icon square + bold title + 2-line description pattern.
   - **Legacy raster logo**: The header uses a low-resolution PNG (`logo-h-390c5c1a.png`) with heavy grey crossbars that clash with the refined palette.

---

## 2. Art Direction: "Registration Marks"

### Core Concept
**Precision and calm authority.** Company incorporation, statutory filings, and trademark registration are fundamentally exercises in exactness—every form, clause, and schedule must align. Our visual language draws from **editorial & archival registration marks** (print crop marks and precision ledger lines):
- **Corner Registration Marks (`+`)**: Thin `1px` crosshair crop marks (`7px × 7px`, stroke `#173AD4` at `28%` opacity, brightening to `100%` on active/hover states) anchor key structural intersections, cards, and section boundaries.
- **Masked Plus-Grid**: A subtle geometric `+` grid (`32px` cadence) fades smoothly via a radial/linear CSS mask (`mask-image`) so it never clutters reading zones.
- **Hairline Ledger Borders**: `1px` blue-tinted borders (`rgba(23, 58, 212, 0.10)`) divide content cleanly like an official corporate register.
- **Tabular Numerals (`tabular-nums`)**: All indices (`01`–`05`), ratings (`4.9/5`), customer counts (`42,800+`), and statutory form codes use proportional sans with `font-variant-numeric: tabular-nums` instead of generic coder monospace.

---

## 3. Typography Rules

- **Two Font Families Only**:
  1. **Display (`H1`, `H2` only)**: **Bricolage Grotesque** (`--font-bricolage`), weights `600`–`700` only (never `800` or `900`), letter-spacing `-0.02em`.
  2. **UI & Body (`H3`–`H6`, body, nav, buttons, tables, labels)**: **Geist** (`--font-geist-sans`), `16px`–`18px` body with `1.6` line-height.
- **Monospace Restriction**: `Geist Mono` (`--font-geist-mono`) is strictly reserved for code, statutory form/section IDs (e.g., `SPICe+`, `INC-20A`, `TM-A`, `ITR-4`), and keyboard shortcuts (`Ctrl K` / `Cmd K`). All numeric figures use `tabular-nums` in Geist or Bricolage Grotesque.
- **Modular Type Scale & Measure**:
  - Hero `H1`: `clamp(2.25rem, 3.4vw + 0.75rem, 3.5rem)`, `line-height: 1.05`, `letter-spacing: -0.02em`, rendered in at most **3 tight lines** on desktop.
  - Section `H2`: `clamp(1.75rem, 2.2vw + 0.6rem, 2.625rem)`, `line-height: 1.12`, `letter-spacing: -0.02em`, max ~18–26 characters per line where possible.
  - Card / Sub-heading `H3`: `1.25rem` (`20px`), `font-weight: 600`, `line-height: 1.3`.
  - Body copy: `1rem`–`1.125rem` (`16px`–`18px`), `line-height: 1.6`, maximum measure `65ch`.
  - Labels & UI controls: Sentence case, concrete labels, `white-space: nowrap` on all interactive controls.

---

## 4. Color & Surface System

We preserve the existing Services Plus token palette while enforcing strict surface discipline:

| Token | Hex | Role & Usage Constraint |
| :--- | :--- | :--- |
| `sp-bg` | `#F7FCFF` | Primary page canvas (cool archival paper tint) |
| `sp-card` | `#FFFFFF` | Elevated card, panel, and input surfaces |
| `sp-tint` | `#D9E9FF` | Subtle surface fills, active tab wells, duotone icon secondary fills |
| `sp-primary` | `#173AD4` | Primary interactive actions, active borders, primary duotone strokes |
| `sp-primary-600` | `#1B40C3` | Hover/pressed state for primary actions |
| `sp-accent` | `#2574EA` | **Restricted**: Large graphical accents and `3px` keyboard focus rings only |
| `sp-sky` | `#95BEFA` | Muted secondary text and hairline dividers on dark navy surfaces |
| `sp-navy` | `#001244` | Dark rhythm section (at most one per page) and global footer |
| `sp-ink` | `#040925` | Primary high-contrast typography (`18.4:1` contrast on `#F7FCFF`) |
| `sp-slate` | `#365185` | Secondary body copy and metadata (`7.6:1` contrast on `#FFFFFF`, WCAG AAA) |

### Borders, Shadows & Depth
- **Borders**: Hairline `1px solid rgba(23, 58, 212, 0.10)` (`border-sp-border`), transitioning to `#173AD4` on interactive hover/focus.
- **Blue-Tinted Layered Shadows** (zero grey muddy shadows):
  - `sp-soft`: `0 1px 2px rgba(0, 18, 68, 0.03), 0 4px 12px -2px rgba(23, 58, 212, 0.06), 0 12px 24px -4px rgba(0, 18, 68, 0.04)`
  - `sp-lift`: `0 2px 4px rgba(0, 18, 68, 0.04), 0 8px 20px -4px rgba(23, 58, 212, 0.10), 0 20px 36px -8px rgba(0, 18, 68, 0.06)`
- **Radius Scale**: Strictly **`10px`**, **`16px`**, and **`28px`** (`rounded-[10px]`, `rounded-[16px]`, `rounded-[28px]`), plus **`12px`** specifically for `48px`-tall buttons per component specification.
- **Atmosphere**: At most one soft radial glow per viewport plus a subtle `2.5%` SVG noise grain overlay (`pointer-events-none`). No glassmorphism anywhere except the scrolled sticky header.

---

## 5. Layout, Rhythm & Component Architecture

- **8px Spatial Scale**: All padding, gaps, and margins follow `8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160px`.
- **Vertical Rhythm**: Desktop sections alternate between `96px` (`py-24`) and `128px–160px` (`py-32` to `py-40`) with alternating density (airy asymmetric hero -> compact category explorer & quiet trust strip -> structured editorial index -> split narrative + large stat ledger -> sticky-scroll 4-step methodology -> asymmetric bento architecture -> dark navy closing band -> split FAQ & insights).
- **Navigation (`TopNav`)**:
  - Transparent at top (`80px` height), transitioning after `8px` scroll to frosted (`bg-white/90 backdrop-blur-md`), `64px` height, with a `1px` bottom border.
  - Single-line guarantee (`whitespace-nowrap`) at `1024px+`: Logo | 5 mega-menu categories | Blogs, Contact | Search icon trigger | Account dropdown (housing Login, Notifications bell, Online Payment) | Primary `"Get Started"` CTA.
  - Dismissible top announcement bar showing only the real notification from `/notification` in regular Geist type.
- **Asymmetric Hero + Overlapping Category Explorer**:
  - **Left column**: Plain-text rating eyebrow (`4.9/5 · Rated by 42,800+ customers globally`), full 3-line SEO `H1`, concrete meta description (`max-w-[58ch]`), and single-row action bar (compact Search trigger with platform-aware `Ctrl K`/`Cmd K` + `Get Started` + `WhatsApp`).
  - **Right column**: Layered composition of 3 overlapping product-style UI cards built with real service names (`Private Limited Company`, `Trademark Registration`, `GST & ROC Filings`) and the real 4-step process (`01 Consultation`, `02 Documentation`, `03 Portal Filing`, `04 Incorporation Delivery`), featuring subtle pointer-parallax.
  - **Category Explorer**: Overlapping the hero bottom edge and visible within the first `900px` at `1440px` width. Features 5 tabs (`Startup`, `Trademark`, `Taxes`, `Compliance`, `Certification & Licensing`) with a spring-animated sliding indicator, swapping a rich panel of real top services with arrow links and a `"Get a quote"` action.
- **Cards**:
  - Large tabular index (`01`–`05`+), custom duotone SVG icon (`#173AD4` `1.5px` stroke + `#D9E9FF` fill on a `24×24` grid), title, concise description, and service links/actions.
  - Corner registration marks (`+`), `2px` hover lift, border transition to `#173AD4`, and sliding arrow.

---

## 6. Motion & Accessibility Rules

- **Spring Physics**: Stiffness `~120`, damping `~20` (`200ms–600ms` effective settle).
- **Scroll & Interaction**: Reveal once on scroll with subtle stagger; shared-layout sliding tab indicator; scroll-progress bar on service detail pages; View Transitions between category and service pages.
- **Zero Layout Shift (CLS ~ 0)**: Hero text and LCP elements render immediately in the DOM without opacity-zero blocking delays.
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support disabling parallax, springs, and scroll animations.

---

## 7. Multi-Round Visual Self-Critique & Score Matrix

Screenshots of **Home (`/`)**, **Category (`/service-by-categories/startup`)**, and **Service (`/service/private-limited-company`)** across `360px`, `768px`, `1024px`, `1440px`, and `1920px` were captured via Playwright into `/docs/design-review/before/` and `/docs/design-review/after/`.

### Round 1 Audit & Fixes Applied
During the Round 1 review of the initial implementation screenshots and automated Playwright/Axe checks, we identified and fixed the following issues:
1. **Desktop H1 Line Count at 1440px (`home-1440px.png`)**: In Round 1, the H1 wrapped onto 4 lines at `1440px`. We restructured the 3 logical phrases (`Empower Your Business` / `Compliance & Management` / `Made Easy With Us`) with responsive `clamp` sizing (`text-[1.72rem] sm:text-[2.35rem] lg:text-[2.45rem] xl:text-[2.85rem] leading-[1.05]`), locking the desktop H1 to **exact 3 tight lines** (`143.6px` height at `47.88px` line-height).
2. **1024px Navigation Overflow (`home-1024px.png`)**: In Round 1, the right edge of the `"Get Started +"` button overflowed the `1024px` viewport by `36px`. We rebalanced `lg` (`1024px`) horizontal padding (`px-1.5 xl:px-3`), converted the `lg` header search trigger to a compact `36×36px` icon button (expanding to show the `Ctrl K` / `Cmd K` badge at `xl`), and tightened button padding at `lg`. Result: **0px horizontal overflow and 0 wrapped nav items** at `1024px`, `1440px`, and `1920px`.
3. **Mobile 360px Search Trigger Height (`home-360px.png`)**: Fixed `flex-1` (`flex-basis: 0%`) inside the mobile `flex-col` stack by switching to `w-full sm:w-auto sm:flex-1 h-12 shrink-0` and concise one-line placeholder copy (`"Search 100+ services..."`).
4. **WCAG AA & ARIA Tablist Precision**: Moved `role="tablist"` onto the direct parent of the `role="tab"` buttons in `Hero.jsx`, added `<span className="sr-only">Search services</span>` + `aria-hidden="true"` on the decorative shortcut `<kbd>`, and strengthened tabular index contrast from `text-sp-primary/70` (`4.3:1`) to solid `text-sp-primary` (`7.8:1`).
5. **Original Brand Logo Retained**: Per owner feedback, retained the original Services Plus logo (`logo-h-390c5c1a.png` on light header surfaces and `logo-f-6b140866.png` on dark navy footer/drawer surfaces).

### Final Round 2 Score Matrix (1–5 Scale, Target: All ≥ 4)

| Page & Viewport | Hierarchy | Rhythm | Contrast | Consistency | Distinctiveness | 5-Second Test | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Home (`/`) @ 360px** | 4.8 | 4.6 | 5.0 | 4.8 | 4.7 | 5.0 | Full H1, 48px search + dual CTAs, horizontal snap-scroller cards, sticky bottom bar (`Call`, `WhatsApp`, `Get Started`). |
| **Home (`/`) @ 768px** | 4.8 | 4.7 | 5.0 | 4.8 | 4.7 | 5.0 | Balanced tablet proportions, single-row search + CTAs, clean accordion category explorer. |
| **Home (`/`) @ 1024px** | 4.9 | 4.8 | 5.0 | 4.9 | 4.8 | 5.0 | Zero nav wrapping (`Certification & Licensing` on 1 line), 3-line H1, desktop 5-tab explorer visible above fold. |
| **Home (`/`) @ 1440px** | 5.0 | 5.0 | 5.0 | 5.0 | 4.9 | 5.0 | Asymmetric 2-col hero, 3-line H1, 3 layered parallax dossier cards, Category Explorer starting at `y=586px` (`< 900px`). |
| **Home (`/`) @ 1920px** | 5.0 | 4.9 | 5.0 | 5.0 | 4.9 | 5.0 | Calm archival authority, generous breathing room, masked `+` grid and registration marks anchor the `1280px` container. |
| **Category (`/service-by-categories/startup`) @ 360–1920px** | 4.8 | 4.8 | 5.0 | 4.9 | 4.7 | 4.9 | Category index tabs (`01`–`05`), indexed bento grid (`01`–`15`) with registration marks, dark navy closing CTA band. |
| **Service (`/service/private-limited-company`) @ 360–1920px** | 4.9 | 4.9 | 5.0 | 5.0 | 4.9 | 5.0 | Breadcrumb ledger, sticky anchor tabs with live scroll progress bar, numbered sections (`01`–`04`), sticky enquiry card. |


