# ServicesPlus Security Specification (OWASP ASVS Level 2)

## 1. Executive Summary & Security Objectives
ServicesPlus handles business formation, taxation, regulatory compliance, and confidential corporate records (including PAN, Aadhaar, GSTIN, DIN, Certificates of Incorporation, and bank statements). Security must comply with **OWASP Application Security Verification Standard (ASVS) Level 2** and the **Digital Personal Data Protection (DPDP) Act, 2023** of India.

---

## 2. STRIDE Threat Model

| Threat | Vulnerability Target | Risk Level | Mitigation Control |
|---|---|---|---|
| **Spoofing** | Form submission, user login, session tokens | High | Strict `httpOnly; Secure; SameSite=Lax` cookies, origin check on state-changing actions, encrypted session storage, rate limiting per IP/subnet. |
| **Tampering** | Enquiry payloads, payment amount tampering, query parameters | High | Server-side price calculation only, Zod validation on every field, payload size limits (<100KB), CSP with nonces preventing script injection. |
| **Repudiation** | Client enquiry submission, payment confirmation, auth changes | Medium | Structured audit logging with UUID request IDs (pino), correlation tracking, timestamped event store. |
| **Information Disclosure** | PII leak in logs or client bundles, directory traversal, SSRF | Critical | Pre-render static pages, allowlist outbound hostnames, scrub PII (PAN/Aadhaar/Phone) from structured logs, serve only pre-optimized static assets from `/public`. |
| **Denial of Service** | Search endpoint flooding, heavy bot form spam | High | In-memory token bucket rate limiting on `/api/*` and Server Actions, client-side pre-indexed search (zero server load), bot honeypot fields. |
| **Elevation of Privilege** | Route bypass via middleware misconfiguration | Critical | Authorization enforced in server-side Data Access Layer (DAL) and Server Actions; middleware used solely for routing UX. |

---

## 3. Defense-in-Depth Security Controls

### A. Strict Content Security Policy (CSP) & Security Headers
All responses are sent with strict security headers:
- `Content-Security-Policy`:
  `default-src 'self'; script-src 'self' 'nonce-{RANDOM}' 'strict-dynamic' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://img.icons8.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://www.servicesplus.in;`
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Cross-Origin-Opener-Policy`: `same-origin`
- `Cross-Origin-Resource-Policy`: `same-origin`

### B. Input Validation & Output Sanitization
- Every form, action, and route handler parses data using strict Zod schemas with `.strip()` to reject unknown fields.
- Rich text content from blog posts and service descriptions is strictly sanitized through an allowlisted HTML sanitizer before rendering to eliminate stored XSS.
- Direct use of `dangerouslySetInnerHTML` is prohibited unless wrapped by `sanitizeContent()`.

### C. Sensitive Data & India DPDP Act 2023 Compliance
- Customers submitting compliance documents may share sensitive identity documents (Aadhaar, PAN, GST).
- All transit is strictly TLS 1.3/1.2 only.
- In-flight PII is never stored in unencrypted client localStorage or plain logs.
- Forms include explicit consent checkboxes acknowledging the DPDP Act 2023 privacy policy.
- Right to erasure and data minimization procedures are documented in `/docs/NOTES.md`.

### D. Multi-Stage Hardened Dockerfile
- Minimal Alpine Linux base image (`node:22-alpine` or `node:20-alpine`).
- Unprivileged user `nextjs` (UID 10001).
- Read-only root filesystem with explicit ephemeral scratch space in `/tmp`.
- No root capabilities (`cap_drop: ALL`).
- No secrets or API keys baked into container images.
