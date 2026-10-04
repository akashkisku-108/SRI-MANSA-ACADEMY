import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function AdmissionCTABanner() {
  return (
    <section className="bg-surface-warm py-16 lg:py-20 border-t border-b border-neutral-200/90 relative overflow-hidden" aria-label="Admission Call to Action">
      <div className="absolute inset-0 bg-kolam-subtle opacity-40 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block">
            ADMISSIONS 2026–2027 · ASHOK NAGAR, CHENNAI
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight leading-tight">
            Your Journey Starts With the Right Foundation.
          </h2>

          <p className="text-base text-neutral-700 leading-relaxed max-w-xl mx-auto">
            Schedule an academic consultation with our senior educators to discuss board syllabus mapping, competitive targets, and small cohort batch availability.
          </p>

          {/* Action CTAs: Enquire Now, Call, WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              as={Link}
              to="/admission"
              variant="primary"
              size="lg"
              rightIcon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Enquire for Admission
            </Button>
            <Button
              as="a"
              href="tel:+917397689062"
              variant="secondary"
              size="lg"
              leftIcon={Phone}
              className="w-full sm:w-auto"
            >
              Call: +91 73976 89062
            </Button>
            <Button
              as="a"
              href="https://wa.me/917397689062?text=Hello%20Srimanasa%20Educational%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              WhatsApp Us
            </Button>
          </div>

          <p className="text-xs text-neutral-500 pt-4">
            Ashok Nagar Campus: No. 33/52, 53rd Street, Indira Colony, Chennai – 600083
          </p>
        </div>
      </Container>
    </section>
  );
}
