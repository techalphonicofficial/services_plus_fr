import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { QrCode, CheckCircle2, MessageCircle, ChevronRight, ShieldCheck, Copy } from 'lucide-react';

export const metadata = {
  title: 'Online Payment | Services Plus',
  description:
    'Pay securely online for Services Plus legal, taxation, and company registration services via UPI QR code, bank transfer, or card.',
  alternates: {
    canonical: 'https://www.servicesplus.in/payment',
  },
};

export default function PaymentPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Payment</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-tint/80 py-12 text-center relative sp-plus-grid">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5" />
            <span>Instant UPI &amp; Bank Transfer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-3">
            Online <span className="text-sp-primary">Payment</span>
          </h1>
          <p className="text-sm text-sp-slate max-w-lg mx-auto leading-relaxed">
            Scan our official merchant UPI QR code using Google Pay, PhonePe, Paytm, or any BHIM UPI mobile app.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Step by Step Guidance */}
          <div className="md:col-span-7 space-y-6">
            <Card className="p-6 bg-white space-y-6">
              <h2 className="text-lg font-bold text-sp-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                How to Pay in 3 Simple Steps
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-xl bg-sp-tint text-sp-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="font-bold text-sp-ink text-sm">
                      Scan the QR Code
                    </h3>
                    <p className="text-xs text-sp-slate mt-1 leading-relaxed">
                      Open your UPI payment app (GPay, PhonePe, Paytm, BHIM) to scan the official QR code displayed on this page.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-xl bg-sp-tint text-sp-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="font-bold text-sp-ink text-sm">
                      Select your payment mode
                    </h3>
                    <p className="text-xs text-sp-slate mt-1 leading-relaxed">
                      Select payment mode after scanning the QR code i.e. UPI, linked bank account, or debit/credit card. Enter the agreed invoice or filing fee amount.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-xl bg-sp-tint text-sp-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="font-bold text-sp-ink text-sm">
                      Payment Done &amp; Share Receipt
                    </h3>
                    <p className="text-xs text-sp-slate mt-1 leading-relaxed">
                      After selecting payment mode enter your UPI PIN. Payment will be processed automatically. Send the transaction screenshot to our billing team on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* WhatsApp Confirmation Card */}
            <div className="p-6 rounded-2xl bg-sp-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-white">Share Payment Screenshot</h3>
                <p className="text-xs text-sp-sky mt-0.5">
                  Confirm your payment instantly with your assigned legal manager.
                </p>
              </div>
              <Button
                href="https://wa.me/918800028794?text=Hi%20ServicesPlus%20Team%2C%20I%20have%20completed%20the%20payment.%20Here%20is%20my%20screenshot%20and%20service%20details."
                variant="outline"
                size="sm"
                external
                className="shrink-0 bg-[#25D366] text-white border-transparent hover:bg-emerald-600"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp (+91 88000 28794)
              </Button>
            </div>
          </div>

          {/* Right 5 Columns: Official QR Code Presentation */}
          <div className="md:col-span-5">
            <Card className="p-6 bg-white text-center border-2 border-sp-tint shadow-sp-lift sticky top-28">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-2.5 py-0.5 rounded-full mb-3">
                Official Merchant UPI
              </span>
              <h3 className="text-base font-bold text-sp-ink mb-1">
                Services Plus India Pvt Ltd
              </h3>
              <p className="text-xs text-sp-slate mb-4">
                Verified Corporate Account
              </p>

              {/* QR Image */}
              <div className="relative w-64 h-64 mx-auto rounded-xl overflow-hidden border border-sp-tint/80 p-2 bg-white shadow-2xs mb-4">
                <Image
                  src="/assets/images/qr-8c39c95e.jpeg"
                  alt="Services Plus Official UPI QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Encrypted &amp; Secure Bank Transfer</span>
              </div>
              <p className="text-[11px] text-sp-slate font-mono">
                Accepted: GPay, PhonePe, Paytm, BHIM, CRED
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
