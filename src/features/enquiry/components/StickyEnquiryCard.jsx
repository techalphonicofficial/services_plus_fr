"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnquirySchema } from "../../../server/enquiry-adapter";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { RegistrationMarks } from "../../../components/ui/Card";
import { ConsultationDuotoneIcon } from "../../../components/ui/DuotoneIcons";

function StickyEnquiryCard({ serviceName }) {
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [whatsappFallback, setWhatsappFallback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      subject: serviceName,
      name: "",
      email: "",
      mobile: "",
      message: ""
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setSubmitted(true);
      setStatusMessage(
        result.message || "Thank you! Your enquiry has been safely received."
      );
      setWhatsappFallback(result.whatsappLink || "");
      reset();
    } catch {
      setSubmitted(true);
      setStatusMessage("Thank you! Your request has been recorded.");
      setWhatsappFallback(
        `https://wa.me/918800028794?text=${encodeURIComponent(
          `Hi ServicesPlus, I am interested in ${serviceName}. Name: ${data.name}, Phone: ${data.mobile}`
        )}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-sp-md border border-sp-border-strong shadow-sp-lift p-6">
      <RegistrationMarks />

      <div className="flex items-start justify-between pb-4 border-b border-sp-border mb-5 gap-3">
        <div>
          <p className="text-xs font-semibold text-sp-primary flex items-center gap-1">
            <span aria-hidden="true">+</span>
            <span>Get a quote &amp; consultation</span>
          </p>
          <h3 className="text-lg font-semibold text-sp-ink mt-1">
            Talk to a Compliance Specialist
          </h3>
        </div>
        <div className="w-10 h-10 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
          <ConsultationDuotoneIcon className="w-5 h-5" />
        </div>
      </div>

      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-sp-sm bg-sp-tint text-sp-primary flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-sp-ink text-base">Enquiry Submitted</h4>
          <p className="text-xs text-sp-slate leading-relaxed">{statusMessage}</p>
          {whatsappFallback && (
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 rounded-sp-btn bg-sp-primary text-white text-xs font-semibold hover:bg-sp-primary-600 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Connect on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-sp-primary font-semibold hover:underline block mx-auto pt-2"
          >
            Submit another query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
          <input type="hidden" {...register("subject")} value={serviceName} />

          <div>
            <label
              htmlFor="enquiry-name"
              className="block text-xs font-semibold text-sp-ink mb-1.5"
            >
              Full name *
            </label>
            <input
              id="enquiry-name"
              type="text"
              placeholder="e.g. Ramesh Kumar"
              {...register("name")}
              className="w-full h-11 px-3.5 text-sm rounded-sp-sm border border-sp-border-strong bg-sp-bg/60 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-sp-accent text-sp-ink"
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-email"
              className="block text-xs font-semibold text-sp-ink mb-1.5"
            >
              Email address *
            </label>
            <input
              id="enquiry-email"
              type="email"
              placeholder="name@company.com"
              {...register("email")}
              className="w-full h-11 px-3.5 text-sm rounded-sp-sm border border-sp-border-strong bg-sp-bg/60 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-sp-accent text-sp-ink"
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-mobile"
              className="block text-xs font-semibold text-sp-ink mb-1.5"
            >
              Mobile number * (10 digits)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 h-11 text-xs font-semibold tabular-nums text-sp-slate bg-sp-tint/45 border border-r-0 border-sp-border-strong rounded-l-sp-sm">
                +91
              </span>
              <input
                id="enquiry-mobile"
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                {...register("mobile")}
                className="w-full h-11 px-3.5 text-sm rounded-r-sp-sm border border-sp-border-strong bg-sp-bg/60 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-sp-accent text-sp-ink tabular-nums"
              />
            </div>
            {errors.mobile && (
              <p className="text-xs text-rose-600 mt-1">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-message"
              className="block text-xs font-semibold text-sp-ink mb-1.5"
            >
              Requirement details (optional)
            </label>
            <textarea
              id="enquiry-message"
              rows={2}
              placeholder="Share your business state or filing query..."
              {...register("message")}
              className="w-full p-3 text-sm rounded-sp-sm border border-sp-border-strong bg-sp-bg/60 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-sp-accent text-sp-ink resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            showPlus
          >
            {isSubmitting ? "Submitting..." : "Request Free Consultation"}
          </Button>

          <div className="pt-2">
            <a
              href={`https://wa.me/918800028794?text=${encodeURIComponent(
                `Hi ServicesPlus, I am interested in ${serviceName}. Please provide more details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-sp-btn border border-sp-border-strong bg-sp-bg hover:bg-sp-tint/40 text-sp-ink text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-sp-primary shrink-0" />
              <span className="tabular-nums">WhatsApp (+91 88000 28794)</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

export { StickyEnquiryCard };
