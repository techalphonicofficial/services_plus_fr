import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Bell, ChevronRight, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Notifications & Compliance Updates | Services Plus',
  description:
    'Official regulatory notifications, GST circulars, income tax updates, and corporate compliance notifications by Services Plus.',
  alternates: {
    canonical: 'https://www.servicesplus.in/notification',
  },
};

const NOTIFICATIONS = [
  {
    sn: 1,
    subject: 'GST Annual Return & Reconciliation',
    description:
      'The Goods and Services Tax (GST) is a tax on goods and services sold domestically for consumption. Businesses must ensure accurate reconciliation of Input Tax Credit (ITC) before annual filing.',
    category: 'GST',
    actionText: 'View Filing Guide',
    href: '/service/gst-annual-return-filing',
  },
  {
    sn: 2,
    subject: 'ROC Annual Compliance for Private Limited Companies',
    description:
      'Mandatory annual filings including AOC-4 (Financial Statements) and MGT-7 (Annual Return) with the Ministry of Corporate Affairs (MCA) to avoid director disqualification.',
    category: 'ROC / MCA',
    actionText: 'Check ROC Deadlines',
    href: '/service/private-limited-company-compliance',
  },
  {
    sn: 3,
    subject: 'Trademark Renewal & Protection Window',
    description:
      'Registered trademarks require renewal every 10 years. File form TM-R within the statutory renewal window to preserve exclusive brand protection and avoid trademark abandonment.',
    category: 'Trademark',
    actionText: 'Renew Trademark',
    href: '/service/trademark-renewal',
  },
  {
    sn: 4,
    subject: 'MSME / UDYAM Reclassification & Benefits',
    description:
      'Updated investment and turnover thresholds for Micro, Small, and Medium Enterprises. Verify your enterprise classification to avail collateral-free credit and government tender preferences.',
    category: 'MSME',
    actionText: 'UDYAM Service',
    href: '/service/udyam-registration',
  },
  {
    sn: 5,
    subject: 'TDS Quarterly Return Filing Deadlines',
    description:
      'Deductors must file Form 24Q (Salary) and Form 26Q (Non-salary) within the prescribed due dates to prevent daily late fees under Section 234E.',
    category: 'Income Tax',
    actionText: 'File TDS Return',
    href: '/service/tds-return-filing',
  },
];

export default function NotificationPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Notifications</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-tint/80 py-12 text-center relative sp-plus-grid">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5" />
            <span>Regulatory Bulletin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-2">
            Compliance Notifications
          </h1>
          <p className="text-xs sm:text-sm text-sp-slate max-w-lg mx-auto">
            Stay informed on statutory tax dates, MCA corporate filings, and regulatory guidelines.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card className="bg-white overflow-hidden border border-sp-tint shadow-sp-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-sp-bg border-b border-sp-tint font-mono text-sp-slate uppercase text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Sn.</th>
                  <th className="py-3.5 px-4 w-48">Subject</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-4 w-36 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sp-tint/60">
                {NOTIFICATIONS.map(item => (
                  <tr key={item.sn} className="hover:bg-sp-bg/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-center text-sp-primary bg-sp-tint/20">
                      {item.sn}
                    </td>
                    <td className="py-4 px-4 font-semibold text-sp-ink">
                      <div>{item.subject}</div>
                      <span className="inline-block mt-1 text-[10px] font-mono text-sp-primary bg-sp-tint px-2 py-0.5 rounded font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-sp-slate leading-relaxed">
                      {item.description}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sp-tint text-sp-primary hover:bg-sp-primary hover:text-white transition-all text-xs font-semibold font-mono"
                      >
                        <span>{item.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
