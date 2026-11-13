import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, BookOpen, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from || '/';

  // If already logged in, redirect
  if (user) {
    navigate(redirectPath, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Wrong email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-md w-full">
          {/* Card Wrapper */}
          <div className="bg-white rounded-2xl shadow-elevated border border-neutral-200/90 p-8 sm:p-10 transition-colors">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-900 mb-4">
                <BookOpen className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-primary-950 font-bold tracking-tight mb-2">
                Student Login
              </h1>
              <p className="text-sm text-neutral-600">
                Log in to access online mock tests, practice papers & results
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full justify-center mt-2 shadow-md"
                rightIcon={ArrowRight}
              >
                Sign In
              </Button>
            </form>

            {/* Switch to Register */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700/80 text-center">
              <p className="text-xs text-neutral-600">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-bold text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 underline underline-offset-2 ml-1"
                >
                  Register here
                </Link>
              </p>

              <div className="mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
                <span>Institute Faculty or Admin?</span>
                <Link
                  to="/admin/login"
                  className="font-semibold text-primary-950 dark:text-neutral-200 hover:underline"
                >
                  Admin Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
