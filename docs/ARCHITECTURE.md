# ServicesPlus Architecture Guide

## Overview

ServicesPlus is rebuilt as a high-performance, secure, and resilient web application using Next.js (App Router), TypeScript, Tailwind CSS, Motion, Radix primitives, and Zod. The architecture follows a **feature-based modular monolith** with strict unidirectional layering:

\`UI (Components/Views) -> Application Services (Use Cases/Actions) -> Domain (Schemas/Models) -> Infrastructure Adapters (BFF/Repositories)\`

---

## 1. System Architecture Diagram

```mermaid
graph TD
    Client["Browser / Client (Desktop & Mobile)"]
    CDN["Edge CDN / Reverse Proxy (Cache & Rate Limiting)"]
    
    subgraph NextJS["Next.js Application Layer (App Router)"]
        MW["Middleware (Security Headers, Route Guard)"]
        Routes["Routes (src/app/*)"]
        
        subgraph Features["Feature Modules (src/features/*)"]
            ServicesFeat["Services Feature"]
            BlogFeat["Blog Feature"]
            SearchFeat["Search Engine (Client-side MiniSearch)"]
            AuthFeat["Auth Feature"]
            PaymentFeat["Payment Feature"]
            EnquiryFeat["Enquiry Feature"]
            NotifFeat["Notifications Feature"]
        end
        
        DesignSystem["Design System & UI Primitives (src/components/ui/*)"]
        
        subgraph BackendForFrontend["Backend-for-Frontend (src/server/*)"]
            AuthAdapter["Auth Adapter (Laravel Session Bridge)"]
            EnquiryAdapter["Enquiry & Lead Adapter (Outbox / Email / Direct)"]
            PaymentAdapter["Payment Adapter (UPI Verification & Gateway Bridge)"]
        end
        
        subgraph ContentLayer["Typed Content Store (src/content/*)"]
            ServiceData["Services Database (80+ Validated Items)"]
            BlogData["Blog Articles (93 Validated Articles)"]
            CategoryData["Category Records (5 Main Categories)"]
            ContentValidator["Zod Build-Time Validator"]
        end
    end
    
    LegacyBackend["Legacy Laravel Backend (https://www.servicesplus.in)"]
    WhatsAppBridge["WhatsApp Business API / Direct Chat (+91 88000 28794)"]
    
    Client --> CDN
    CDN --> MW
    MW --> Routes
    Routes --> Features
    Features --> DesignSystem
    Features --> ContentLayer
    Features --> BackendForFrontend
    BackendForFrontend --> LegacyBackend
    BackendForFrontend -.-> WhatsAppBridge
```

---

## 2. Layered Architecture & Unidirectional Dependencies

```mermaid
flowchart TD
    subgraph UI_Layer["1. UI & Presentation Layer"]
        A1["src/app/* (Thin Route Segments)"]
        A2["src/components/ui/* (Tokens, Radix Primitives)"]
        A3["src/features/*/components (Domain-Specific UI)"]
    end

    subgraph App_Layer["2. Application Service Layer"]
        B1["src/features/*/actions.ts (Server Actions)"]
        B2["src/features/*/services.ts (Orchestration)"]
    end

    subgraph Domain_Layer["3. Domain & Validation Layer"]
        C1["src/features/*/schemas.ts (Zod Contracts)"]
        C2["src/features/*/types.ts (Domain Models)"]
        C3["src/content/schemas.ts (Content Schemas)"]
    end

    subgraph Infra_Layer["4. Infrastructure & Adapter Layer"]
        D1["src/server/http-client.ts (Resilient Fetch Client)"]
        D2["src/server/auth-adapter.ts (Laravel Auth Bridge)"]
        D3["src/server/enquiry-adapter.ts (Lead Submissions)"]
        D4["src/lib/security.ts (CSP, Sanitize, Rate Limiter)"]
        D5["src/lib/logger.ts (Structured Logger)"]
    end

    UI_Layer --> App_Layer
    App_Layer --> Domain_Layer
    App_Layer --> Infra_Layer
    Domain_Layer -.-> Infra_Layer
```

**Rule**: Dependencies only point downward. The browser never communicates with the legacy backend directly; all communication is handled server-to-server with strict schema validation.

---

## 3. Directory Layout

\`\`\`
servicesplus/
├── docs/                      # Architectural decisions, security threat models, notes, and inventory
│   ├── adr/                   # Architecture Decision Records
│   ├── inventory.json         # Complete 208-page crawled inventory
│   ├── ARCHITECTURE.md        # This document
│   ├── SECURITY.md            # ASVS Level 2 Threat Model & Controls
│   └── NOTES.md               # Business facts, inconsistencies, owner review items
├── public/                    # Pre-optimized local static assets (never hotlinked)
│   └── assets/
│       ├── blog/              # Blog banners and post figures
│       ├── certificates/      # Trust and accreditation certificates
│       ├── icons/             # Custom SVG and icon assets
│       └── images/            # Brand logos, hero graphics, QR codes
├── src/
│   ├── app/                   # Next.js App Router (Thin route controllers)
│   │   ├── (auth)/            # /user-login, /user-register
│   │   ├── (marketing)/       # /, /about, /contact
│   │   ├── blog/              # /blog, /blog-detail/[slug]
│   │   ├── service/           # /service/[slug] (Universal service template)
│   │   ├── service-by-categories/ # /service-by-categories/[slug]
│   │   ├── policy/            # /policy/privacy-policy, /policy/terms-and-condition
│   │   ├── payment/           # /payment (UPI QR + Step-by-step guidance)
│   │   ├── notification/      # /notification (Compliance updates table)
│   │   ├── api/               # Health (/api/health, /api/ready), search index, webhooks
│   │   ├── layout.tsx         # Root layout with fonts, providers, global nav & footer
│   │   └── error.tsx          # Resilient error boundaries
│   ├── components/
│   │   ├── layout/            # MegaMenu, TopNav, Footer, FloatingWhatsApp, CommandPalette
│   │   └── ui/                # Button, Badge, Card, Dialog, Accordion, Tabs, Input, Tooltip
│   ├── content/               # Typed data store validated at build time
│   │   ├── services/          # 80+ service profiles in structured JSON/TS
│   │   ├── categories/        # 5 core business categories
│   │   ├── blogs/             # 93 complete crawled articles
│   │   └── notifications/     # Regulatory announcements
│   ├── features/              # Feature modules (Domain logic + components + schemas)
│   │   ├── auth/              # Authentication flows and session management
│   │   ├── blog/              # Blog list, article views, related posts
│   │   ├── enquiry/           # Contact forms, lead capture, validation
│   │   ├── payment/           # UPI QR presentation, verification flow
│   │   ├── search/            # Instant command palette search (Cmd+K)
│   │   └── services/          # Service hero, tabs, FAQs, trust badges
│   ├── lib/                   # Shared utilities (env, logger, security, constants)
│   └── server/                # Backend adapters & Anti-Corruption Layer (ACL)
\`\`\`

---

## 4. Key Architectural Decisions

1. **Static Generation + Tagged Revalidation (ISR)**:
   - All 80+ service pages, 5 category landing pages, 93 blog articles, homepage, and policy pages are pre-rendered at build time via \`generateStaticParams()\`.
   - Result: Instant TTFB (<100ms), 100% uptime even if the origin backend is unreachable, and maximum SEO crawl efficiency.

2. **Client-Side Command Palette (MiniSearch / Fuse.js)**:
   - Pre-computed lightweight service catalog search index generated at build time.
   - Searches across title, tags, and category with zero server latency or database strain.

3. **Anti-Corruption Layer (Backend Adapter)**:
   - When the user submits an enquiry or initiates login, the request flows to a Server Action.
   - The action sanitizes and validates inputs with Zod, checks rate limits, and dispatches via \`src/server/backend-adapter.ts\`.
   - If the legacy Laravel API is offline, the enquiry is safely buffered in an outbox and the user receives a graceful confirmation with a 1-click WhatsApp fallback.
