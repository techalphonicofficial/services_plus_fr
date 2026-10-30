# ADR 0003: Zero-Server-Load Client-Side Command Palette Search

## Status
Accepted

## Context
Users frequently search across 80+ compliance services (e.g. "GST", "FSSAI", "Private Limited", "Trademark"). Sending server requests on every keystroke causes latency, backend load, and poor mobile UX.

## Decision
We pre-compute a lightweight search index of all services at build time and execute fuzzy indexing on the client using a fast in-memory matcher. 

## Consequences
- 0ms network latency for instant search modal (Cmd+K / Ctrl+K).
- Zero server queries or database load from typing.
- Graceful offline search support.
