import React from "react";
import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Services Plus",
  description:
    "Services Plus Privacy Policy regarding the collection, use and disclosure of personal information.",
  alternates: {
    canonical: "https://www.servicesplus.in/policy/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Privacy Policy</span>
        </div>
      </div>

      <header className="bg-white border-b border-sp-border py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold text-sp-primary mb-2">
            + Legal &amp; Privacy Notice
          </p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-sp-ink mb-2">
            Privacy Policy
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Card
          hoverLift={false}
          className="p-8 sm:p-12 bg-white space-y-6 text-base text-sp-slate leading-[1.6]"
        >
          <p>
            Service Plus India Private Limited that provides various Compliance and Legal services all across the globe, operates the Website &ldquo;serviceplus.com&rdquo;. This page shall be a source of information for our Website visitors regarding our Privacy Policies about the collection, use and disclosure of the Personal Information of anyone who decides to use our Service via serviceplus.com.
          </p>
          <p>
            If you choose to take our Service, then it will be implied that you agreed to the collection and use of information in relation with this policy. The Personal Information that we collect shall be used for providing and improving our Services. However, we will not use or share any information received from you with anyone except as described in this Privacy Policy.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            Information Collection and Use
          </h2>
          <p>
            For a better experience while using our Services or our website, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you. However, you may be assured that it will only be used according to this privacy statement.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            Security &amp; Data Protection
          </h2>
          <p>
            We value your trust in providing us your personal and corporate compliance information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>
          <h2 className="text-xl font-display font-semibold text-sp-ink pt-2">
            Contact Us
          </h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{" "}
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
