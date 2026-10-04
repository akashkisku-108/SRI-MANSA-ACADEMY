import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Sparkles, BookMarked, Shield } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export function AboutPreview() {
  return (
    <Section background="warm" id="about-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="space-y-12">
        {/* Top Editorial Split: Institutional Statement + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block">
              THE SRIMANASA APPROACH
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal leading-tight tracking-tight">
              Strong fundamentals.<br />
              Clear concepts.<br />
              <span className="text-terracotta-700 italic font-serif">Confident learners.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Located in Ashok Nagar, Chennai, Srimanasa Educational Academy is dedicated to providing holistic and professionally planned educational support. Through structured daily classes, exclusive study materials, and dedicated daily doubt clearance, we mentor students to master fundamentals from school board examinations to competitive entrance tests.
            </p>

            <div className="pt-2">
              <Button
                as={Link}
                to="/about"
                variant="secondary"
                size="md"
                rightIcon={ArrowRight}
              >
                Read Our Academic Philosophy
              </Button>
            </div>
          </div>

          {/* Right Photograph Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-card overflow-hidden border border-neutral-300 shadow-card bg-neutral-100">
              <img
                src="/about-campus.jpg"
                alt="Students studying inside the Srimanasa reference library in Chennai"
                className="w-full h-auto object-cover aspect-[4/3] block"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-neutral-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 block">
                  Ashok Nagar Reference Hall
                </span>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Quiet study environments with senior educators present for immediate conceptual clarity.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom 3 Typography-Driven Pillars */}
        <div className="pt-10 border-t border-neutral-200/90 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-primary-950 font-normal">
              Holistic
            </div>
            <div className="text-sm font-semibold text-neutral-900">
              Concept-Focused Learning
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Curriculum structured to master core concepts thoroughly before advancing to rigorous examination problem sets.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-primary-950 font-normal">
              Daily
            </div>
            <div className="text-sm font-semibold text-neutral-900">
              Doubt Clearing Sessions
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dedicated daily post-lecture sessions ensuring every student's queries are addressed promptly by faculties.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-primary-950 font-normal">
              Personal
            </div>
            <div className="text-sm font-semibold text-neutral-900">
              Individual Attention
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Periodical performance reviews and individualized attention tailored to each student for optimum results.
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
}
