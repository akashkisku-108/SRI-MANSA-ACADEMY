import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const NAV_LINKS = [
  { name: 'Home', path: '/', isLocked: false },
  { name: 'About', path: '/about', isLocked: false },
  { name: 'Programs', path: '/courses', isLocked: true },
  { name: 'Faculty', path: '/faculty', isLocked: true },
  { name: 'Results', path: '/results', isLocked: true },
  { name: 'Gallery', path: '/gallery', isLocked: true },
  { name: 'Contact', path: '/contact', isLocked: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-primary-950 text-neutral-300 text-xs py-2 border-b border-white/10 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" aria-hidden="true" />
              <span>Admissions Open: Board Exam Training & Crash Courses for JEE / NEET 2026 (Limited Seats)</span>
              <span className="text-terracotta-400 font-tamil text-[11px] hidden lg:inline ml-1">அசோக் நகர், சென்னை</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-neutral-300">
            <a
              href="tel:+917397689062"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-accent-400" aria-hidden="true" />
              <span>Admissions Helpline: +91 73976 89062 / +91 91509 99611</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <span className="text-neutral-400">Ashok Nagar, Chennai</span>
          </div>
        </Container>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xs border-b border-neutral-300 shadow-sm py-2.5'
            : 'bg-white border-b border-neutral-200/90 py-3.5'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-900 rounded p-1"
            aria-label="Srimanasa Educational Academy Home"
          >
            <div className="h-9 sm:h-11 flex items-center">
              <img
                src="/srimanasa-logo.png"
                alt="Srimanasa Educational Academy - Bridge to Lead"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              if (link.isLocked) {
                return (
                  <div
                    key={link.name}
                    className="relative group inline-flex items-center"
                  >
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      aria-label={`${link.name} — Coming Soon`}
                      className="cursor-not-allowed text-xs uppercase tracking-wider text-neutral-600 hover:text-terracotta-700 py-1 inline-flex items-center gap-1.5 border-b-2 border-transparent transition-colors duration-150 focus-visible:outline-none"
                    >
                      <span className="font-medium">{link.name}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-terracotta-700 font-semibold lowercase tracking-normal bg-terracotta-50/90 border border-terracotta-200/70 px-1.5 py-0.5 rounded shadow-2xs">
                        <Lock className="w-2.5 h-2.5 text-terracotta-600" aria-hidden="true" />
                        <span>soon</span>
                      </span>
                    </button>

                    {/* Tooltip on Hover */}
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-950 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-elevated z-50 animate-fade-in"
                    >
                      <Lock className="w-3 h-3 text-terracotta-400" aria-hidden="true" />
                      <span>{link.name} • Coming Soon</span>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-950 rotate-45" />
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-wider transition-colors duration-150 py-1 inline-flex items-center border-b-2 ${
                      isActive
                        ? 'text-primary-950 font-bold border-terracotta-600'
                        : 'text-neutral-700 hover:text-primary-950 border-transparent hover:border-neutral-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              as={Link}
              to="/admission"
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
            >
              Admissions
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-button text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[73px] z-30 lg:hidden bg-primary-950/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-neutral-200 shadow-xl px-4 py-6 max-h-[calc(100vh-73px)] overflow-y-auto animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1.5 mb-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                if (link.isLocked) {
                  return (
                    <div
                      key={link.name}
                      aria-label={`${link.name} — Coming Soon`}
                      className="px-4 py-3 text-sm uppercase tracking-wider font-medium rounded-button min-h-[44px] flex items-center justify-between bg-neutral-50/80 border border-neutral-200/60 text-neutral-600 cursor-not-allowed select-none"
                    >
                      <span className="font-semibold text-neutral-800">{link.name}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-terracotta-800 font-medium bg-terracotta-50 border border-terracotta-200/80 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3 text-terracotta-600" aria-hidden="true" />
                        <span>Coming Soon</span>
                      </span>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-3 text-sm uppercase tracking-wider font-medium rounded-button min-h-[44px] flex items-center justify-between ${
                        isActive
                          ? 'bg-neutral-100 text-primary-950 font-bold border-l-3 border-terracotta-600'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-950'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
              <Button
                as={Link}
                to="/admission"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                rightIcon={ArrowRight}
              >
                Enquire for Admission
              </Button>
              <a
                href="tel:+917397689062"
                className="flex items-center justify-center gap-2 py-3 text-xs text-neutral-600 font-medium min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-terracotta-600" aria-hidden="true" />
                Call Admissions: +91 73976 89062
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

