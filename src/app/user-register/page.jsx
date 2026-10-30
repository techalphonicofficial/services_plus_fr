'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Shield, MessageCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    company_name: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(
          data.error || 'Registration server unavailable. Connect with support on WhatsApp.'
        );
      } else {
        setSuccess(true);
      }
    } catch {
      setErrorMsg('Network error. Connect with support on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sp-bg min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative w-44 h-11 mb-4">
            <Image
              src="/assets/images/logo-h-390c5c1a.png"
              alt="Services Plus"
              fill
              className="object-contain"
            />
          </Link>
          <h1 className="text-2xl font-bold text-sp-ink">Create Client Account</h1>
          <p className="text-xs text-sp-slate mt-1">
            Join 42,800+ businesses powered by Services Plus
          </p>
        </div>

        <Card className="p-8 bg-white border border-sp-tint shadow-sp-lift">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h2 className="text-lg font-bold text-sp-ink">Registration Submitted</h2>
              <p className="text-xs text-sp-slate leading-relaxed">
                Your account request has been received. Our team will verify and activate your dashboard access.
              </p>
              <Link
                href="/user-login"
                className="inline-block px-5 py-2 rounded-xl bg-sp-primary text-white text-xs font-bold"
              >
                Go to Login &rarr;
              </Link>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  <p>{errorMsg}</p>
                  <a
                    href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20having%20trouble%20registering%20on%20ServicesPlus."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-semibold text-rose-800 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Register via WhatsApp &rarr;
                  </a>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-sp-ink mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh"
                      value={formData.first_name}
                      onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sp-ink mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kumar"
                      value={formData.last_name}
                      onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sp-ink mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sp-ink mb-1">
                    Mobile Number * (10 digits)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sp-ink mb-1">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Your enterprise or startup name"
                    value={formData.company_name}
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-sp-ink mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sp-ink mb-1">
                      Confirm *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password_confirmation}
                      onChange={e =>
                        setFormData({ ...formData, password_confirmation: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold mt-2"
                  disabled={loading}
                  showPlus
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-sp-tint/60 text-center">
                <p className="text-xs text-sp-slate">
                  Already registered?{' '}
                  <Link href="/user-login" className="text-sp-primary font-bold hover:underline">
                    Login to your account &rarr;
                  </Link>
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
