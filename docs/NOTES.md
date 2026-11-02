# ServicesPlus Audit & Parity Report

Date: 2026-10-30T09:44:16.768Z

---

## 1. Inventory Summary

- **Total Live URLs Discovered**: 228
- **Successfully Crawled (200 OK)**: 208
- **Broken / 500 Server Errors on Live Laravel Site**: 20
- **Downloaded Local Assets in /public**: 258

### Category Breakdown
- **Homepage**: 1 (`/`)
- **About**: 1 (`/about`)
- **Contact**: 1 (`/contact`)
- **Blog Index**: 1 (`/blog`)
- **Blog Articles**: 93 (`/blog-detail/*`)
- **Services (200 OK)**: 100
- **Categories (200 OK)**: 5
- **Policies**: 2 (`/policy/privacy-policy`, `/policy/terms-and-condition`)
- **Auth Routes**: 2 (`/user-login`, `/user-register`)
- **Utility Routes**: 2 (`/payment`, `/notification`)

---

## 2. Inconsistencies & Business Facts (Preserved As-Is, Needing Owner Input)

The following conflicts were detected on the live website. In accordance with the prompt non-negotiables, all original content is preserved in the typed content store and highlighted here for business owner decision:

### A. Company Age / Years of Experience
- **Conflict 1**: Homepage and several service pages claim **"13 years of experience"**.
- **Conflict 2**: About page and trust sections state **"Since 2017"** (which equals 9 years as of 2026, or 7 years from 2024).
- *Action*: Preserved original text on respective pages. Owner must confirm canonical founding date (2017 vs 2013).

### B. Conflicting Contact Phone Numbers Across Pages
The live site displays multiple disparate phone numbers:
1. `+91 88000 28794` — Primary sales & WhatsApp floating widget (`wa.me/918800028794`).
2. `(+91) - 9899184918` — Support hotline in header/footer.
3. `+91-7942790587` — IndiaMART / alternate helpline in contact blocks.
4. `+91 9988776655` — Dummy/placeholder phone number appearing in several template footers.
- *Action*: Maintained active support and sales numbers in contact and floating widgets. Marked dummy number `+91 9988776655` as an inconsistency needing removal.

### C. Conflicting Email Addresses
1. `operations@servicesplus.in` — Service operations & processing.
2. `info@servicesplus.in` — General enquiries.
- *Action*: Preserved both with clear context (General Enquiry vs Operations).

### D. Office Addresses
1. **Noida / Head Office**:
   - `Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301`
2. **Delhi / Branch Office**:
   - Mentioned on Contact page and GMB citations.
- *Action*: Preserved full structured address details in Contact and Footer schema.

### E. Stray / Placeholder Strings
- Stray string `"Service don't exist"` was observed in several empty product query states on Laravel.
- Duplicated "12k Happy Users" block was observed stacked twice on the live homepage.
- *Action*: Logged here for owner review; clean presentation provided in new design.

---

## 3. Form Endpoints & Backend Adapter Architecture

### A. Enquiry Forms (Service Detail & Contact Pages)
- **Live Endpoint**: `POST https://www.servicesplus.in/contact`
- **Form Fields**:
  - `name`: string (required)
  - `email`: string (required, email)
  - `mobile`: string (required, 10-digit Indian mobile)
  - `subject`: string (service name / topic)
  - `message`: string (optional query details)
  - `capcha_code`: string (legacy captcha)
  - `_token`: Laravel CSRF session token
- **New Architecture**:
  - Server Action `submitEnquiryAction` validates with Zod (`EnquirySchema`).
  - Calls Next.js API route or backend adapter with graceful fallback to email outbox / WhatsApp direct fallback (`wa.me/918800028794`).
  - Zero downtime if legacy Laravel server is unreachable.

### B. User Authentication (/user-login, /user-register)
- **Live Endpoints**:
  - `POST https://www.servicesplus.in/user-login` (`email`, `password`, `_token`)
  - `POST https://www.servicesplus.in/user-register` (`first_name`, `last_name`, `email`, `mobile`, `company_name`, `password`, `password_confirmation`, `_token`)
- **Status**: The live backend runs Laravel 8 session cookies (`servicesplus_session`, `XSRF-TOKEN`).
- **New Architecture**:
  - Typed Backend Adapter in `src/server/auth-adapter.ts`.
  - Proxies credentials securely to backend, validates responses with Zod, sets `httpOnly; Secure; SameSite=Lax` session cookie.
  - If backend is offline or endpoint returns error, user is notified cleanly with option to contact support on WhatsApp.

### C. Payment Flow (/payment)
- **Live Implementation**:
  - Static UPI QR Code payment flow!
  - Users scan UPI QR Code (`qr.jpeg`), pay via UPI / Bank / Card, and send screenshot/confirmation to WhatsApp (`+91 88000 28794`).
- **New Architecture**:
  - Retain the exact UPI QR Code, UPI ID, and step-by-step instructions.
  - Add interactive "Click to copy UPI ID" and "Share Payment Receipt on WhatsApp" one-click action.
  - Future-proofed for Razorpay / Cashfree integration via adapter without touching UI.

### D. Notification Flow (/notification)
- **Live Implementation**:
  - Regulatory updates table (Sn, Subject, Description, Action).
- **New Architecture**:
  - Pre-rendered static notification list with search and filter.
  - Feeds the homepage top hero announcement strip.

---

## 4. Broken URLs on Live Laravel Site (500 Server Errors)

The following 20 URLs exist in `sitemap.xml` or menus on the live site but throw HTTP 500 (`ErrorException: Attempt to read property "id" on null`):

- `https://www.servicesplus.in/service-by-categories/certification-and-licensing` (HTTP 500)
- `https://www.servicesplus.in/service/Google Adwords Services` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-for-blogs` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-for-pr` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-for-products` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-for-seo-services` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-for-website` (HTTP 500)
- `https://www.servicesplus.in/service/content-writing-services` (HTTP 500)
- `https://www.servicesplus.in/service/custom-erp-software-2311071006-714` (HTTP 500)
- `https://www.servicesplus.in/service/digital-marketing` (HTTP 500)
- `https://www.servicesplus.in/service/email-marketing-services` (HTTP 500)
- `https://www.servicesplus.in/service/lead-generation-services` (HTTP 500)
- `https://www.servicesplus.in/service/multi-e-commerce-website-development` (HTTP 500)
- `https://www.servicesplus.in/service/portal-website-development` (HTTP 500)
- `https://www.servicesplus.in/service/seo-services` (HTTP 500)
- `https://www.servicesplus.in/service/single-vendor-e-commerce-website-development` (HTTP 500)
- `https://www.servicesplus.in/service/social-media-marketing-services` (HTTP 500)
- `https://www.servicesplus.in/service/software-development` (HTTP 500)
- `https://www.servicesplus.in/service/website-development-services` (HTTP 500)
- `https://www.servicesplus.in/service/wordpress-website-development` (HTTP 500)

**Resolution Strategy in New Next.js App**:
1. For `/service-by-categories/certification-and-licensing`, set 301 redirect to `/service-by-categories/certification-licensing`.
2. For `/service/Google Adwords Services`, set 301 redirect to `/service/google-adwords-services`.
3. For the 18 software/marketing service slugs, create typed content records with the exact original slugs so that search engine crawlers and users land on a beautiful, functional page instead of a 500 crash!

---

## 5. Google Tag Manager & Verification Keys
- **GTM Container ID**: `GTM-KS8X8MJ5`
- **WhatsApp Floating Link**: `https://wa.me/918800028794`
- **Office Location**: Sector-18, Ocean Plaza, Noida


---

## 6. Design-Quality Pass: Removed Invented Claims & Non-Source Text

In strict compliance with Defect #4 (*"Remove invented claims: 'Govt. Recognized...' and any announcement text not coming from the real /notification data. Do not add any claim that is not on the current site. List removals in /docs/NOTES.md"*), the following unverified or invented claims were removed from the UI:

1. **`"Govt. Recognized Corporate Advisory"`** — Removed from the top announcement bar in `src/components/layout/TopNav.jsx`.
2. **`"GST & ROC Annual Filing compliance dates active for FY 2026."`** — Removed from the top announcement bar in `src/components/layout/TopNav.jsx` and replaced with the exact real notification record from `/notification` (`"GST: The goods and services tax (GST) is a tax on goods and services sold domestically for consumption."`).
3. **`"Govt. Recognized Corporate Filing Platform"`** — Removed from the hero eyebrow pill in `src/features/home/components/Hero.jsx`.
4. **`"Govt. Verified"`** — Removed from the category eyebrow badge on service detail pages (`src/app/service/[slug]/page.jsx`).
5. **`"DPIIT Recognized Advisory"` & `"Quality Management Assured"`** — Removed invented text claims in `src/features/home/components/TrustStrip.jsx` and `src/components/layout/Footer.jsx`; replaced with the actual monochrome certificate images (`certificate1-57e45752.png` and `certificate2-fd4642f9.png`) from the live site.
6. **Invented Notification Rows (`#2 ROC Annual Compliance`, `#3 Trademark Renewal`, `#4 MSME / UDYAM Reclassification`, `#5 TDS Quarterly Return`)** — Removed from `src/app/notification/page.jsx` so `/notification` displays only the authentic notification entry present on the live site (`Sn 1: GST`).
7. **`"99.8% On-Time Filing Rate"`** — Removed from `src/features/home/components/AboutSection.jsx` and replaced with the real site's `"12,000+ Happy Users"` metric.
8. **`"Services Plus Corporate Desk, Connaught Place / Barakhamba Road, New Delhi — 110001"`** — Removed invented Delhi address from `src/components/layout/Footer.jsx` and `src/app/contact/page.jsx`; replaced with the real second office from the live site crawl (`Alphonic India Private Limited (India) — Plot No C-203, C Block Rd, Block C, Sector 63, Noida, Uttar Pradesh 201301`).
9. **`"DPDP Act 2023 Compliant"` & `"Protected by DPDP Act 2023. Zero Spam Guarantee."`** — Removed invented compliance badges/captions from `src/app/policy/privacy-policy/page.jsx` and `src/features/enquiry/components/StickyEnquiryCard.jsx`.

---

## 7. Brand Logo & Legacy Archival (Owner Decision Recorded)

- **Active Logo (Per Owner Direction)**: Retained the original Services Plus logos (`/assets/images/logo-h-390c5c1a.png` for light header surfaces and `/assets/images/logo-f-6b140866.png` for dark navy footer/drawer surfaces) in `src/components/ui/Logo.jsx`.
- **Legacy Archival & Optional SVG Wordmark**: Copies of the original raster logos are also archived in `/brand/legacy/` and `/public/brand/legacy/`, and the vector SVG wordmark draft remains available in `/public/brand/services-plus-wordmark.svg` if ever needed.

---

## 8. Marked Photo Slots for Real Team / Office Photography

No stock illustrations or AI-generated people are used. Where real photography is appropriate, clearly marked architectural/editorial slots are provided using existing site assets or structured placeholders:
1. **Homepage About Section (`src/features/home/components/AboutSection.jsx`)**: Currently displays the existing crawled asset `/assets/images/about-us_avif-8aa54286.png` within a registration-marked frame, annotated with a slot caption for a verified Noida Sector-18 office / leadership team photograph.
2. **About Us Page (`src/app/about/page.jsx`) & Contact Page (`src/app/contact/page.jsx`)**: Includes marked office verification slots for **Head Office (Ocean Plaza, Sector-18, Noida)** and **Alphonic India Private Limited (Sector-63, Noida)** awaiting owner-supplied high-resolution architectural photography.
