"use client";
import { useEffect } from "react";
export default function ErrorBoundary({
  error,
  reset
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);
  return <div className="min-h-[70vh] flex items-center justify-center px-4 bg-sp-bg">
      <div className="max-w-md w-full text-center py-16 px-6 bg-white rounded-2xl shadow-sp-lift border border-sp-tint">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-mono text-xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-sp-ink mb-3">
          Something went wrong
        </h2>
        <p className="text-sp-slate text-sm mb-8 leading-relaxed">
          We encountered an unexpected issue while loading this page. You can try refreshing or reach out directly to our support team on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
    onClick={() => reset()}
    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sp-primary hover:bg-sp-primary-600 text-white font-medium text-sm transition-all"
  >
            Try Again
          </button>
          <a
    href="https://wa.me/918800028794?text=Hi%2C%20I%20encountered%20an%20error%20on%20the%20website%20and%20need%20assistance."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-sp-tint bg-white hover:bg-sp-bg text-sp-primary font-medium text-sm transition-all"
  >
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>;
}
