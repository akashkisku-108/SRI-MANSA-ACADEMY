import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Award, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';

export function Hero() {
  return (
    <section className="relative bg-surface-warm text-neutral-900 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200/90 overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-kolam-subtle opacity-40 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Typography & Intentional Hierarchy (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-terracotta-700">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600" aria-hidden="true" />
              <span>SRIMANASA EDUCATIONAL ACADEMY · CHENNAI</span>
            </div>

            {/* Editorial Headline with intentional line breaks */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-serif text-primary-950 font-normal leading-[1.14] tracking-tight">
              Building Strong Foundations.<br />
              <span className="text-terracotta-700 italic font-serif">Creating Confident Achievers.</span>
            </h1>

            {/* Tamil Regional Kicker */}
            <p className="text-xs text-neutral-500 font-tamil tracking-wide">
              அசோக் நகர், சென்னை • தரமான கல்வி & தனிப்பயிற்சி
            </p>

            {/* Concise Human Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
              Concept-focused learning for school students, board examinations, and competitive entrance preparation. Holistic coaching, dedicated faculties, and daily personalized doubt clearance in Ashok Nagar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                as={Link}
                to="/courses"
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Explore Programs
              </Button>
              <Button
                as={Link}
                to="/admission"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Talk to Admissions
              </Button>
            </div>

            {/* Clean Institutional Footnote with verified flyer pillars */}
            <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-lg sm:text-xl text-primary-950">Daily Batches</span>
                <span className="text-[11px] text-neutral-500 leading-tight block">Mon to Sat Schedule</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl text-primary-950">Personal</span>
                <span className="text-[11px] text-neutral-500 leading-tight block">Student Attention</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl text-primary-950">Daily</span>
                <span className="text-[11px] text-neutral-500 leading-tight block">Doubt Clearance</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Large Photograph (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Crisp editorial photo frame */}
              <div className="rounded-card overflow-hidden border border-neutral-300 shadow-card bg-neutral-100">
                <img
                  src="/hero-classroom.jpg"
                  alt="Modern classroom learning atmosphere at Srimanasa Educational Academy in Chennai"
                  className="w-full h-auto object-cover aspect-[4/3] block"
                  loading="eager"
                />

                {/* Single subtle editorial caption strip */}
                <div className="bg-primary-950 text-white px-5 py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" aria-hidden="true" />
                    <span className="font-medium text-neutral-200">Ashok Nagar Campus · Chennai</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-sans">Academic Session 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
