import React from "react";
import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Services Plus",
  description:
    "Terms and Conditions for accessing Services Plus legal, taxation, and business compliance advisory services.",
  alternates: {
    canonical: "https://www.servicesplus.in/policy/terms-and-condition"
  }
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-border py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold text-sp-primary mb-2">
            + Service Agreement
          </p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-sp-ink mb-2">
            Terms and Conditions
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card
          hoverLift={false}
          className="p-8 sm:p-12 bg-white space-y-6 text-base text-sp-slate leading-[1.6]"
        >
          <p>
            Service Plus India Private Limited that provides various Compliance and Legal services all across the globe, operates the Website &ldquo;serviceplus.com&rdquo;. By accessing or using our services, you agree to be bound by these Terms and Conditions.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            Scope of Professional Services
          </h2>
          <p>
            Services Plus provides technology-enabled facilitation for business formation, intellectual property filings, tax advisory, and compliance management. All government fees are disbursed strictly in accordance with official department tariffs.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            User Responsibilities
          </h2>
          <p>
            Clients must furnish true, authentic, and accurate corporate documents, identity cards, and address proofs. The client is solely liable for the authenticity of the information provided for regulatory submissions.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            Contact &amp; Grievances
          </h2>
          <p>
            For any queries or formal notices regarding these terms, please contact{" "}
            <a
              href="mailto:info@servicesplus.in"
              className="text-sp-primary font-semibold hover:underline"
            >
              info@servicesplus.in
            </a>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
