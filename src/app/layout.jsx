import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TopNav } from "../components/layout/TopNav";
import { Footer } from "../components/layout/Footer";
import { FloatingWhatsApp } from "../components/layout/FloatingWhatsApp";
import { SmoothScroll } from "../components/providers/SmoothScroll";

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

export const metadata = {
  metadataBase: new URL("https://www.servicesplus.in"),
  title: {
    default: "Servicesplus - Company registration, GST, Trademark filing, Tax Services",
    template: "%s | Services Plus"
  },
  description:
    "Servicesplus is an online platform that provides business registration, Trademark Registration, GST, Tax services & other legal compliance for small businesses.",
  alternates: {
    canonical: "https://www.servicesplus.in"
  },
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/assets/images/service-plus-icon.ico" sizes="any" />
      </head>
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
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScroll>
      </body>
    </html>
  );
}
