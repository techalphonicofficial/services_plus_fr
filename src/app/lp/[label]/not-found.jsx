// 404 of a landing page address (/lp/<label>) with no published page.
import { SITE_NAME, SITE_URL as MAIN_SITE } from "@/lib/siteConfig";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function LandingNotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "48px 24px", fontFamily: "var(--font-geist-sans), system-ui, sans-serif", textAlign: "center" }}>
      <div>
        <p style={{ color: "#1C4D8D", fontWeight: 700, letterSpacing: ".08em", fontSize: 13, margin: 0 }}>404</p>
        <h1 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 30, margin: "10px 0 8px", color: "#0F2854" }}>This page isn&apos;t available</h1>
        <p style={{ color: "#4A5568", margin: "0 0 22px" }}>The page you are looking for does not exist or is no longer published.</p>
        <a href={MAIN_SITE} style={{ display: "inline-block", padding: "11px 20px", borderRadius: 10, background: "#1C4D8D", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
          Go to {SITE_NAME}
        </a>
      </div>
    </main>
  );
}
