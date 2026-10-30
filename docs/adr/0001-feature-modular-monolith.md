# ADR 0001: Feature-Based Modular Monolith Architecture

## Status
Accepted

## Context
ServicesPlus has a complex domain consisting of 80+ regulatory and legal services, 93 blog articles, category hubs, an interactive command-palette search, authentication, and enquiry captures. A flat folder structure or microservices architecture would introduce either unmaintainable file sprawl or excessive distributed operational overhead.

## Decision
We adopt a **feature-based modular monolith** inside Next.js App Router:
- `src/features/*`: Independent vertical slices (`services`, `blog`, `enquiry`, `auth`, `payment`, `search`, `notifications`) containing their own components, server actions, schemas, and domain types.
- `src/app/*`: Thin routing layer that delegates immediately to feature components.
- `src/components/ui/*`: Reusable design-system atoms and Radix primitives.
- `src/server/*`: Anti-Corruption Layer (adapters) communicating with external or legacy systems.

## Consequences
- Clean separation of concerns with domain cohesion.
- Feature teams can modify service details or enquiry logic without touching route files.
- Enforced unidirectional dependencies prevent spaghetti imports.
