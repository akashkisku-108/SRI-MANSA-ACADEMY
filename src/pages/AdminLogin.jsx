import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function AdminLogin() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as admin, redirect to admin home / tests
  if (user && user.role === 'admin') {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide administrator email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.user?.role !== 'admin') {
        setError('Access denied: this account does not have administrative privileges.');
        return;
      }
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Wrong email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-elevated border-2 border-primary-900/10 dark:border-primary-700/30 p-8 sm:p-10 transition-colors">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-950 text-accent-400 border border-primary-800 shadow-md mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-accent-100 dark:bg-accent-950/60 text-accent-800 dark:text-accent-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                Restricted Access
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-primary-950 font-bold tracking-tight mb-2">
                Faculty & Admin Portal
              </h1>
              <p className="text-xs text-neutral-600">
                Authorized examination staff only. Credentials are created exclusively via administrative CLI.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs flex items-start gap-2.5 animate-form-shake"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@srimanasa.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full justify-center mt-2 shadow-md bg-primary-950 hover:bg-primary-900"
                rightIcon={KeyRound}
              >
                Authenticate as Admin
              </Button>
            </form>

            {/* Back to student login */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700/80 text-center">
              <Link
                to="/login"
                className="text-xs font-semibold text-neutral-600 hover:text-terracotta-600 underline underline-offset-2"
              >
                &larr; Return to Student Login
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
