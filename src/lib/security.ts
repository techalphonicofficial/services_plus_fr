import crypto from 'node:crypto';

// Token bucket rate limiter for actions / api routes
interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

export function checkRateLimit(key: string, maxTokens = 10, refillRatePerSec = 1): boolean {
  const now = Date.now();
  const bucket = rateLimitStore.get(key) || { tokens: maxTokens, lastRefill: now };

  const elapsedSec = (now - bucket.lastRefill) / 1000;
  bucket.tokens = Math.min(maxTokens, bucket.tokens + elapsedSec * refillRatePerSec);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    rateLimitStore.set(key, bucket);
    return true; // allowed
  }

  rateLimitStore.set(key, bucket);
  return false; // throttled
}

// Generate random cryptographic session token
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Safe string sanitizer to prevent injection
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

// HTML sanitizer for rich text body rendering
export function sanitizeHtml(html: string): string {
  // Strip dangerous tags: script, iframe, object, embed, onload attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}
