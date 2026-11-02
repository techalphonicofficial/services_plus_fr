import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
// CMS block stylesheets + the Services Plus theme on top (same order as the admin Live Preview).
import "../components/tax-alphonic/siteStyles";
import { TopNav } from "../components/layout/TopNav";
import { Footer } from "../components/layout/Footer";
import { FloatingWhatsApp } from "../components/layout/FloatingWhatsApp";
import { SmoothScroll } from "../components/providers/SmoothScroll";
import FormPopupHost from "@/components/tax-alphonic/forms/FormPopupHost";
import { getHeaderNavigation } from "@/service/headerService";
import { getFooterNavigation } from "@/service/footerService";
import { getSiteSettings } from "@/service/siteSettingsService";
import { LANDING_HEADER } from "@/lib/landingHost.mjs";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

const siteMetadata = {
  metadataBase: new URL("https://www.servicesplus.in"),
  title: {
    default: "Servicesplus - Company registration, GST, Trademark filing, Tax Services",
    template: "%s | Services Plus"
  },
  description:
    "Servicesplus is an online platform that provides business registration, Trademark Registration, GST, Tax services & other legal compliance for small businesses.",
  // No site-wide canonical: every page sets its own (a root one made every page point at the homepage).
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.servicesplus.in",
    siteName: "Services Plus",
    title: "Servicesplus - Company registration, GST, Trademark filing, Tax Services",
    description:
      "Servicesplus is an online platform that provides business registration, Trademark Registration, GST, Tax services & other legal compliance for small businesses.",
    images: [
      {
        url: "/assets/images/logo-h-390c5c1a.png",
        width: 1200,
        height: 630,
        alt: "Services Plus Legal and Business Advisory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@servicesplusin",
    creator: "@servicesplusin"
  },
  robots: {
    index: true,
    follow: true
  }
};

// Favicon / Apple touch icon from the CMS (Settings → Organization) when set, else the bundled icon.
// Every page is rendered per request from the CMS (a publish shows at once; nothing is baked into the build).
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { branding } = await getSiteSettings();
  return {
    ...siteMetadata,
    icons: {
      icon: branding.favicon || "/assets/images/service-plus-icon.ico",
      ...(branding.appleTouchIcon ? { apple: branding.appleTouchIcon } : {})
    }
  };
}

const fontClasses = `${bricolage.variable} ${geistSans.variable} ${geistMono.variable}`;

export default async function RootLayout({ children }) {
  // Landing pages (/lp/<label>, proxy.js sets this header; it can't come from the browser) render
  // their own header and footer regions (components/tax-alphonic/landing/LandingPage.jsx).
  if ((await headers()).get(LANDING_HEADER)) {
    return (
      <html lang="en" className={fontClasses}>
        <body className="min-h-screen font-sans antialiased bg-sp-bg text-sp-ink">{children}</body>
      </html>
    );
  }

  const [navigation, footerMenu] = await Promise.all([getHeaderNavigation(), getFooterNavigation()]);

  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-sp-bg text-sp-ink selection:bg-sp-tint selection:text-sp-primary">
        <div className="sp-grain-overlay" aria-hidden="true" />
        {/* Google Tag Manager (GTM-KS8X8MJ5) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KS8X8MJ5');`
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS8X8MJ5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SmoothScroll>
          <TopNav navigation={navigation} />
          <main className="flex-1">{children}</main>
          <Footer menu={footerMenu} />
          <FloatingWhatsApp />
          {/* "#form-<id>" buttons open that CMS form in a popup (landing pages mount their own). */}
          <FormPopupHost />
        </SmoothScroll>
      </body>
    </html>
  );
}
