import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';
import { ChevronRight, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Services Plus',
  description:
    'Services Plus Privacy Policy regarding the collection, use and disclosure of personal information in compliance with Indian regulations and DPDP Act 2023.',
  alternates: {
    canonical: 'https://www.servicesplus.in/policy/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Privacy Policy</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-tint/80 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-sp-slate font-mono">Last updated: 2026</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card className="p-8 sm:p-12 bg-white space-y-6 text-sm text-sp-slate leading-relaxed">
          <p>
            Service Plus India Private Limited that provides various Compliance and Legal services all across the globe, operates the Website &ldquo;serviceplus.com&rdquo;. This page shall be a source of information for our Website visitors regarding our Privacy Policies about the collection, use and disclosure of the Personal Information of anyone who decides to use our Service via serviceplus.com.
          </p>
          <p>
            If you choose to take our Service, then it will be implied that you agreed to the collection and use of information in relation with this policy. The Personal Information that we collect shall be used for providing and improving our Services. However, we will not use or share any information received from you with anyone except as described in this Privacy Policy.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">Information Collection and Use</h2>
          <p>
            For a better experience while using our Services or our website, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you. However, you may be assured that it will only be used according to this privacy statement.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">Security &amp; Data Protection</h2>
          <p>
            We value your trust in providing us your personal and corporate compliance information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>
          <h2 className="text-lg font-bold text-sp-ink pt-2">Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{' '}
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
