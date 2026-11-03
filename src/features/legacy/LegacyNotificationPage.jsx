import React from "react";
import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { ChevronRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Notifications & Compliance Updates | Services Plus",
  description:
    "Official regulatory notifications, GST circulars, income tax updates, and corporate compliance notifications by Services Plus.",
  alternates: {
    canonical: "https://www.servicesplus.in/notification"
  }
};

// Authentic notification data from the crawled /notification page only
const NOTIFICATIONS = [
  {
    sn: 1,
    subject: "GST",
    description:
      "The goods and services tax (GST) is a tax on goods and services sold domestically for consumption. The business adds the GST to the price of the product, and a customer who buys the product pays the sales price inclusive of the GST.",
    actionText: "View GST Services",
    href: "/service/gst-registration"
  }
];

export default function NotificationPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Notifications</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <p className="text-xs font-semibold text-sp-primary mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>Regulatory Bulletin</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] mb-3">
            Compliance Notifications
          </h1>
          <p className="text-base text-sp-slate max-w-[60ch]">
            Official statutory tax and corporate filing updates published by Services Plus.
          </p>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-10">
        <Card hoverLift={false} className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sp-bg border-b border-sp-border text-sp-slate text-xs font-semibold">
                <tr>
                  <th className="py-3.5 px-5 w-16 text-center">Sn.</th>
                  <th className="py-3.5 px-5 w-48">Subject</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-5 w-44 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sp-border">
                {NOTIFICATIONS.map((item) => (
                  <tr
                    key={item.sn}
                    className="hover:bg-sp-bg/50 transition-colors"
                  >
                    <td className="py-5 px-5 font-semibold text-center text-sp-primary tabular-nums bg-sp-tint/20">
                      0{item.sn}
                    </td>
                    <td className="py-5 px-5 font-semibold text-sp-ink">
                      {item.subject}
                    </td>
                    <td className="py-5 px-6 text-sm text-sp-slate leading-relaxed max-w-[65ch]">
                      {item.description}
                    </td>
                    <td className="py-5 px-5 text-right">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sp-btn bg-sp-tint/70 text-sp-primary hover:bg-sp-primary hover:text-white transition-colors text-xs font-semibold whitespace-nowrap"
                      >
                        <span>{item.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
