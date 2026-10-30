# ADR 0002: Static Generation with Tagged ISR for High Availability

## Status
Accepted

## Context
ServicesPlus operates in a competitive legal/tax compliance landscape where Google organic search rankings (Core Web Vitals, LCP < 2.5s) and 99.9% availability are critical. The legacy backend experienced periodic 500 errors and slow database responses.

## Decision
All public marketing, service catalog, category hubs, and blog pages are pre-rendered at build time using static generation (`output: 'standalone'` or ISR with `generateStaticParams`). Dynamic server rendering is strictly limited to authenticated user dashboards and live transaction verification.

## Consequences
- 100% uptime for public pages, completely decoupled from legacy backend stability.
- Sub-100ms Time-to-First-Byte (TTFB) globally via edge CDN caching.
- Near-zero origin server compute costs for marketing and SEO traffic.
