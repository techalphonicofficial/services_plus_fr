import crypto from "node:crypto";
const rateLimitStore = /* @__PURE__ */ new Map();
function checkRateLimit(key, maxTokens = 10, refillRatePerSec = 1) {
  const now = Date.now();
  const bucket = rateLimitStore.get(key) || { tokens: maxTokens, lastRefill: now };
  const elapsedSec = (now - bucket.lastRefill) / 1e3;
  bucket.tokens = Math.min(maxTokens, bucket.tokens + elapsedSec * refillRatePerSec);
  bucket.lastRefill = now;
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    rateLimitStore.set(key, bucket);
    return true;
  }
  rateLimitStore.set(key, bucket);
  return false;
}
function generateCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}
function sanitizeString(input) {
  return input.replace(/[<>]/g, "").trim().slice(0, 1e3);
}
function sanitizeHtml(html) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "").replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "").replace(/\son\w+="[^"]*"/gi, "").replace(/\son\w+='[^']*'/gi, "");
}
export {
  checkRateLimit,
  generateCsrfToken,
  sanitizeHtml,
  sanitizeString
};
