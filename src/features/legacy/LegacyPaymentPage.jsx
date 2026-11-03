import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { MessageCircle, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Online Payment | Services Plus",
  description:
    "Pay securely online for Services Plus legal, taxation, and company registration services via UPI QR code, bank transfer, or card.",
  alternates: {
    canonical: "https://www.servicesplus.in/payment"
  }
};

export default function PaymentPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Payment</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-xs font-semibold text-sp-primary mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>UPI &amp; Bank Settlement</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] mb-3">
            Online Payment
          </h1>
          <p className="text-base text-sp-slate max-w-[56ch]">
            Scan our merchant UPI QR code using Google Pay, PhonePe, Paytm, or any BHIM UPI mobile app.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Step by Step Guidance */}
          <div className="md:col-span-7 space-y-6">
            <Card hoverLift={false} className="p-6 sm:p-8 bg-white space-y-6">
              <h2 className="text-xl font-display font-semibold text-sp-ink">
                How to Pay in 3 Steps
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-sp-sm bg-sp-tint/70 text-sp-primary font-semibold tabular-nums text-xs flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="font-semibold text-sp-ink text-base">
                      Scan the QR Code
                    </h3>
                    <p className="text-sm text-sp-slate mt-1 leading-relaxed">
                      Open your UPI payment app (GPay, PhonePe, Paytm, BHIM) to scan the official QR code displayed on this page.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-sp-sm bg-sp-tint/70 text-sp-primary font-semibold tabular-nums text-xs flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="font-semibold text-sp-ink text-base">
                      Select your payment mode
                    </h3>
                    <p className="text-sm text-sp-slate mt-1 leading-relaxed">
                      Select payment mode after scanning the QR code i.e. UPI, linked bank account, or debit/credit card. Enter the agreed invoice or filing fee amount.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-sp-sm bg-sp-tint/70 text-sp-primary font-semibold tabular-nums text-xs flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="font-semibold text-sp-ink text-base">
                      Payment Done &amp; Share Receipt
                    </h3>
                    <p className="text-sm text-sp-slate mt-1 leading-relaxed">
                      After selecting payment mode enter your UPI PIN. Payment will be processed automatically. Send the transaction screenshot to our billing team on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* WhatsApp Confirmation Card */}
            <Card
              hoverLift={false}
              variant="tint"
              className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-base text-sp-ink">
                  Share Payment Screenshot
                </h3>
                <p className="text-xs text-sp-slate mt-0.5">
                  Confirm your payment directly with your assigned advisor.
                </p>
              </div>
              <Button
                href="https://wa.me/918800028794?text=Hi%20ServicesPlus%20Team%2C%20I%20have%20completed%20the%20payment.%20Here%20is%20my%20screenshot%20and%20service%20details."
                size="sm"
                external
                showPlus
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+91 88000 28794)</span>
              </Button>
            </Card>
          </div>

          {/* Right 5 Columns: Official QR Code Presentation */}
          <div className="md:col-span-5">
            <Card hoverLift={false} className="p-6 bg-white text-center sticky top-28">
              <p className="text-xs font-semibold text-sp-primary mb-1">
                + Merchant UPI QR
              </p>
              <h3 className="text-base font-semibold text-sp-ink mb-4">
                Services Plus
              </h3>

              {/* QR Image */}
              <div className="relative w-64 h-64 mx-auto rounded-sp-sm overflow-hidden border border-sp-border-strong p-2 bg-white mb-4">
                <Image
                  src="/assets/images/qr-8c39c95e.jpeg"
                  alt="Services Plus Official UPI QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <p className="text-xs text-sp-slate">
                Accepted: GPay, PhonePe, Paytm, BHIM
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
