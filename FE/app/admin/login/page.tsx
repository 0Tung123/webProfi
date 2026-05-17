'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      router.push('/admin');
    } catch (err: unknown) {
      setError((err as Error).message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--accent)] via-[var(--accent)] to-[var(--accent-deep)] items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
              <svg viewBox="0 0 40 40" className="w-12 h-12 text-white" fill="currentColor">
                <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z"/>
                <path d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-4">HAT Admin</h1>
            <p className="text-xl text-white/80">
              Manage your HATStudio website content with ease.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-semibold">Easy Content Management</p>
                <p className="text-sm text-white/70">Update projects, services & more</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Lock size={24} />
              </div>
              <div>
                <p className="font-semibold">Secure Access</p>
                <p className="text-sm text-white/70">Protected admin panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ArrowRight size={24} />
              </div>
              <div>
                <p className="font-semibold">Instant Updates</p>
                <p className="text-sm text-white/70">Real-time content sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg-0)] p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-0)]">HAT Admin</h1>
            <p className="text-[var(--text-2)] mt-2">Sign in to manage your content</p>
          </div>

          {/* Form Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-0)]">Welcome back</h2>
            <p className="text-[var(--text-2)] mt-2">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Login Failed</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-1)]">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-2)]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-0)] placeholder-[var(--text-2)]"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--text-1)]">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-2)]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-0)] placeholder-[var(--text-2)]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:from-[var(--accent-deep)] hover:to-[var(--accent)] text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/40"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-[var(--text-2)] mb-3 uppercase tracking-wide">
              Demo Credentials
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-[var(--text-1)]">
                <span className="font-medium text-[var(--text-0)]">Email:</span> admin@hatstudio.local
              </p>
              <p className="text-[var(--text-1)]">
                <span className="font-medium text-[var(--text-0)]">Password:</span> HatAdmin2024!
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-[var(--text-2)] text-sm mt-8">
            © 2026 HATStudio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}