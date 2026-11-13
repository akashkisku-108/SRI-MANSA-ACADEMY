import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, AlertCircle, CheckCircle, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-lg w-full">
          {/* Card Wrapper */}
          <div className="bg-white rounded-2xl shadow-elevated border border-neutral-200/90 p-8 sm:p-10 transition-colors">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-terracotta-50 dark:bg-terracotta-950/60 border border-terracotta-200 dark:border-terracotta-800 text-terracotta-600 dark:text-terracotta-400 mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-primary-950 font-bold tracking-tight mb-2">
                Student Registration
              </h1>
              <p className="text-sm text-neutral-600">
                Create your student account to enroll in tests and monitor your academic progress
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Full Name <span className="text-terracotta-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Email Address <span className="text-terracotta-600">*</span>
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

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Contact Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Password (min 6 characters) <span className="text-terracotta-600">*</span>
                </label>
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
                    autoComplete="new-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Confirm Password <span className="text-terracotta-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-button text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="terracotta"
                size="lg"
                isLoading={loading}
                className="w-full justify-center mt-3 shadow-md"
                rightIcon={ArrowRight}
              >
                Create Account
              </Button>
            </form>

            {/* Switch to Login */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700/80 text-center">
              <p className="text-xs text-neutral-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 underline underline-offset-2 ml-1"
                >
                  Log in instead
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
