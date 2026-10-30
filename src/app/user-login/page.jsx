'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Shield, Lock, Mail, ArrowRight, MessageCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(
          data.error || 'Authentication server unavailable. Connect with support on WhatsApp.'
        );
      } else {
        window.location.href = '/';
      }
    } catch {
      setErrorMsg('Network error. Connect with support on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sp-bg min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
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
          <h1 className="text-2xl font-bold text-sp-ink">Client Login</h1>
          <p className="text-xs text-sp-slate mt-1">
            Access your filings, invoices, and compliance tracker
          </p>
        </div>

        <Card className="p-8 bg-white border border-sp-tint shadow-sp-lift">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <p>{errorMsg}</p>
              <a
                href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20having%20trouble%20logging%20in%20to%20my%20ServicesPlus%20account."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-semibold text-rose-800 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Contact Login Support on WhatsApp &rarr;
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sp-ink mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sp-slate absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-sp-ink">
                  Password
                </label>
                <a
                  href="https://wa.me/918800028794?text=Hi%2C%20I%20need%20to%20reset%20my%20ServicesPlus%20password."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sp-primary hover:underline font-mono"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-sp-slate absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-sp-tint bg-sp-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sp-accent text-sp-ink"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-3.5 h-3.5 rounded text-sp-primary focus:ring-sp-accent border-sp-tint"
              />
              <label htmlFor="remember" className="text-xs text-sp-slate select-none">
                Remember me on this browser
              </label>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 text-xs font-bold"
              disabled={loading}
              showPlus
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-sp-tint/60 text-center">
            <p className="text-xs text-sp-slate">
              Don&apos;t have an account yet?{' '}
              <Link href="/user-register" className="text-sp-primary font-bold hover:underline">
                Register now &rarr;
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
