# ADR 0004: Anti-Corruption Layer (ACL) for Legacy Laravel Backend

## Status
Accepted

## Context
The existing backend is a legacy Laravel PHP application with CSRF session tokens, form POST routes, and potential schema evolution. Directly coupling Next.js components to legacy endpoints creates fragile client code and security vulnerabilities.

## Decision
We implement a typed Backend-for-Frontend (BFF) and Anti-Corruption Layer in `src/server/*`:
- Client components submit exclusively to Next.js Server Actions.
- Server Actions sanitize and validate data with Zod schemas.
- The ACL handles session translation, CSRF token acquisition, timeouts, retry backoff with jitter, and error normalization.
- In case of backend outage, lead enquiries are buffered in an outbox and user receives an instant WhatsApp direct chat fallback.

## Consequences
- Clean boundary between modern React UI and legacy infrastructure.
- Zero client exposure of backend endpoints or session internals.
- Ability to swap or migrate the backend without modifying any UI component.
