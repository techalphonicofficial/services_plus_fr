// Origin of a URL from .env, or "" (e.g. "http://192.168.0.166:5000/uploads" → "http://192.168.0.166:5000").
const originOf = (value) => {
  try {
    return value ? new URL(value).origin : "";
  } catch {
    return "";
  }
};

// CMS media (IMAGE_BASE_URL / BASE_URL) can be the backend's own uploads/ (http in development) or
// any cloud storage provider chosen in the admin (Media → Media Settings), so images allow https:.
// In development the backend serves media over http (e.g. http://192.168.0.166:5000/uploads), so any
// http image is allowed there; in production only https and the configured media origins.
const CMS_MEDIA_ORIGIN = [
  ...new Set([originOf(process.env.IMAGE_BASE_URL), originOf(process.env.BASE_URL)].filter(Boolean)),
  ...(process.env.NODE_ENV === "production" ? [] : ["http:"])
].join(" ");

// The admin's Live Preview frames /cms-preview (CMS_ADMIN_ORIGIN, comma-separated).
const CMS_ADMIN_ORIGINS = String(process.env.CMS_ADMIN_ORIGIN || "http://localhost:5173").split(",").map((o) => o.trim()).filter(Boolean);

// Hosts allowed to post Server Actions (CMS form submit, captcha) besides the request's own host:
// the public hosts behind a proxy, landing pages on services.servicesplus.in, and any extra ones
// (comma-separated) in SERVER_ACTION_ORIGINS.
const SERVER_ACTION_ORIGINS = [
  "servicesplus.in",
  "www.servicesplus.in",
  "*.servicesplus.in",
  ...String(process.env.SERVER_ACTION_ORIGINS || "").split(",").map((host) => host.trim()).filter(Boolean)
];

const csp = (frameAncestors) => [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' data: blob: https: ${CMS_MEDIA_ORIGIN}`.trim(),
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://www.servicesplus.in",
  // CMS Video / Embed blocks (YouTube, maps, forms, ...).
  "frame-src 'self' https:",
  "media-src 'self' https:",
  `frame-ancestors ${frameAncestors}`,
  "object-src 'none'",
  "base-uri 'self'"
].join("; ") + ";";

const securityHeaders = (frameAncestors) => [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: csp(frameAncestors) }
];

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    trustHostHeader: true,
    serverActions: {
      allowedOrigins: SERVER_ACTION_ORIGINS
    }
  },
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.servicesplus.in"
      },
      {
        protocol: "https",
        hostname: "servicesplus.in"
      },
      {
        protocol: "https",
        hostname: "img.icons8.com"
      }
    ],
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/service-by-categories/certification-and-licensing",
        destination: "/service-by-categories/certification-licensing",
        permanent: true
      },
      {
        source: "/service/Google%20Adwords%20Services",
        destination: "/service/google-adwords-services",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!cms-preview).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          ...securityHeaders("'none'")
        ]
      },
      {
        // Only the admin may frame the Live Preview.
        source: "/cms-preview",
        headers: securityHeaders(CMS_ADMIN_ORIGINS.join(" "))
      }
    ];
  }
};

export default nextConfig;
