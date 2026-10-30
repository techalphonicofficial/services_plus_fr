'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnquirySchema, type EnquiryInput } from '../../../server/enquiry-adapter';
import { Shield, CheckCircle, MessageCircle, Send } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface StickyEnquiryCardProps {
  serviceName: string;
}

export function StickyEnquiryCard({ serviceName }: StickyEnquiryCardProps) {
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [whatsappFallback, setWhatsappFallback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      subject: serviceName,
      name: '',
      email: '',
      mobile: '',
      message: '',
    },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setSubmitted(true);
      setStatusMessage(
        result.message || 'Thank you! Your enquiry has been safely received.'
      );
      setWhatsappFallback(result.whatsappLink || '');
      reset();
    } catch {
      setSubmitted(true);
      setStatusMessage('Thank you! Your request has been recorded.');
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
    <div className="bg-white rounded-2xl border border-sp-tint shadow-sp-lift p-6 sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-sp-tint/80 mb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-sp-primary bg-sp-tint px-2 py-0.5 rounded">
            Instant Quote &amp; Filing
          </span>
          <h3 className="text-base font-bold text-sp-ink mt-1.5">
            Talk to a Compliance Specialist
          </h3>
        </div>
        <div className="w-9 h-9 rounded-xl bg-sp-tint/60 text-sp-primary flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5" />
        </div>
      </div>

      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sp-ink text-base">Enquiry Submitted</h4>
          <p className="text-xs text-sp-slate leading-relaxed">
            {statusMessage}
          </p>
          {whatsappFallback && (
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Connect Instantly on WhatsApp
            </a>
          )}
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-sp-primary font-semibold hover:underline block mx-auto pt-2"
          >
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <input type="hidden" {...register('subject')} value={serviceName} />

          <div>
            <label className="block text-xs font-semibold text-sp-ink mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              {...register('name')}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
            />
            {errors.name && (
              <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-sp-ink mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-sp-ink mb-1">
              Mobile Number * (10 Digits)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 text-xs font-mono font-medium text-sp-slate bg-sp-tint/40 border border-r-0 border-sp-tint rounded-l-xl">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                {...register('mobile')}
                className="w-full px-3.5 py-2 text-xs rounded-r-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
              />
            </div>
            {errors.mobile && (
              <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-sp-ink mb-1">
              Requirement / Details (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Tell us about your business or questions..."
              {...register('message')}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 text-xs font-bold"
            disabled={isSubmitting}
            showPlus
          >
            {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
          </Button>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-sp-slate">Or chat directly:</span>
            <a
              href={`https://wa.me/918800028794?text=${encodeURIComponent(
                `Hi ServicesPlus, I am interested in ${serviceName}. Please provide more details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp (+91 88000 28794)</span>
            </a>
          </div>

          <div className="text-[10px] text-sp-slate text-center pt-1 font-mono">
            Protected by DPDP Act 2023. Zero Spam Guarantee.
          </div>
        </form>
      )}
    </div>
  );
}
