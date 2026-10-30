import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | Services Plus',
  description:
    'Terms and Conditions for accessing Services Plus legal, taxation, and business compliance advisory services.',
  alternates: {
    canonical: 'https://www.servicesplus.in/policy/terms-and-condition',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-tint/80 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-2">
            Terms and Conditions
          </h1>
          <p className="text-xs text-sp-slate font-mono">Last updated: 2026</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card className="p-8 sm:p-12 bg-white space-y-6 text-sm text-sp-slate leading-relaxed">
          <p>
            Service Plus India Private Limited that provides various Compliance and Legal services all across the globe, operates the Website &ldquo;serviceplus.com&rdquo;. By accessing or using our services, you agree to be bound by these Terms and Conditions.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">Scope of Professional Services</h2>
          <p>
            Services Plus provides technology-enabled facilitation for business formation, intellectual property filings, tax advisory, and compliance management. All government fees are disbursed strictly in accordance with official department tariffs.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">User Responsibilities</h2>
          <p>
            Clients must furnish true, authentic, and accurate corporate documents, identity cards, and address proofs. The client is solely liable for the authenticity of the information provided for regulatory submissions.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">Contact &amp; Grievances</h2>
          <p>
            For any queries or formal notices regarding these terms, please contact{' '}
            <a href="mailto:info@servicesplus.in" className="text-sp-primary font-semibold hover:underline">
              info@servicesplus.in
            </a>
            .
          </p>
        </Card>
      </main>
    </div>
  );
}
