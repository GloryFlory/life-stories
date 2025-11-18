'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('nodemailer', {
        email,
        redirect: false,
        callbackUrl: '/',
      });
      
      if (result?.error) {
        setError('Failed to send email. Please try again.');
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const layout = (
    <div className="relative min-h-screen bg-[#0e0b07] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-amber-500/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[30rem] h-[30rem] bg-orange-400/10 blur-[160px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-white/70 mb-10">
          <span className="opacity-60">←</span> Back to home
        </Link>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white/[0.08] border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
            <Image
              src="/life-stories-logo.png"
              alt="Life Stories"
              width={150}
              height={150}
              className="drop-shadow"
              priority
            />
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-white/60 mb-4">Secure access</p>
              <h1 className="text-4xl font-handwriting leading-tight">Sign in with ease</h1>
              <p className="text-white/70 mt-4">
                We send a single-use magic link straight to your inbox. No passwords, just a private doorway back to your family book.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Encrypted sessions handled by NextAuth
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                Magic links expire in 24 hours
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-900">
            {isSubmitted ? (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-handwriting text-gray-900 mb-2">Check your inbox</h2>
                  <p className="text-gray-600">We sent a secure link to:</p>
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="font-semibold text-gray-900">{email}</p>
                    <p className="text-sm text-gray-500">The link expires in 24 hours.</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsSubmitted(false); setEmail(''); }}
                  className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-500">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl p-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-semibold shadow-lg hover:bg-black transition disabled:opacity-40"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending magic link
                    </span>
                  ) : (
                    'Send magic link'
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  We'll email you a one-click sign in link. No password required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return layout;
}
