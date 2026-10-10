import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-neutral-300 pt-16 pb-12 border-t border-primary-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <Container>
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded border border-neutral-300 inline-block shadow-sm">
                <img
                  src="/srimanasa-logo.png"
                  alt="Srimanasa Educational Academy"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Srimanasa Educational Academy is an educational coaching institution in Ashok Nagar, Chennai, dedicated to foundational conceptual clarity, structured curriculum schedules, and daily doubt clearance.
            </p>

            <div className="text-xs text-neutral-400 space-y-0.5 pt-2">
              <p className="text-white font-medium">Ashok Nagar Campus:</p>
              <p>No. 33/52, 53rd Street, Indira Colony, Chennai, TN – 600083</p>
              <p>Helpline: +91 73976 89062 / +91 91509 99611</p>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Institutional Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home', path: '/', isLocked: false },
                { name: 'Academic Philosophy', path: '/about', isLocked: false },
                { name: 'Programs & Syllabus', path: '/courses', isLocked: true },
                { name: 'Teaching Faculty', path: '/faculty', isLocked: false },
                { name: 'Examination Results', path: '/results', isLocked: true },
                { name: 'Campus Life & Gallery', path: '/gallery', isLocked: true },
                { name: 'Campus Contact', path: '/contact', isLocked: false },
                { name: 'Admissions Enquiry', path: '/admission', isLocked: false },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 py-0.5"
                  >
                    <span>{link.name}</span>
                    {link.isLocked && (
                      <span className="text-[10px] text-terracotta-400 font-mono">
                        (Soon)
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Courses (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Academic Tracks
            </h3>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Board Exam Training (CBSE / ICSE / State)</li>
              <li>Crash Course for JEE 2026</li>
              <li>Crash Course for NEET 2026</li>
              <li>JEE / NEET Crash Course 2027 (Class XII)</li>
              <li>DAILY Doubt-Clearing Sessions with Faculties</li>
            </ul>
          </div>

          {/* Column 4: Identity (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Identity
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-tamil">
              கல்வியே முதன்மை. அசோக் நகர், சென்னை.
            </p>
            <p className="text-[11px] text-neutral-400">
              Board Exams · NEET · IIT-JEE
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div>
            &copy; {currentYear} Srimanasa Educational Academy. All rights reserved.
          </div>
          <div className="text-neutral-400">
            Ashok Nagar, Chennai, Tamil Nadu
          </div>
        </div>
      </Container>
    </footer>
  );
}
