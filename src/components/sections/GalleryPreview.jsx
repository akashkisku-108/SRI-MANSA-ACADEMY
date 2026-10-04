import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Microscope, Users, GraduationCap, BarChart3 } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { useGallery } from '../../hooks/useGallery';

const ICON_MAP = {
  book: BookOpen,
  award: Award,
  microscope: Microscope,
  users: Users,
  graduation: GraduationCap,
  chart: BarChart3,
};

export function GalleryPreview() {
  return (
    <Section background="white" id="gallery-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            CAMPUS JOURNAL · ASHOK NAGAR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Inside the Academy
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Daily academic life: focused laboratory experiments, intimate doubt resolution circles, and master lecture series.
        </p>
      </div>

      {/* Asymmetric Photo Journal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Main Feature: Seminar Hall (7 cols) */}
        <div className="md:col-span-7 rounded-card overflow-hidden border border-neutral-300 shadow-card bg-neutral-100 flex flex-col justify-between">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src="/campus-lecture.jpg"
              alt="Advanced academic physics lecture in progress"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-5 bg-white border-t border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block mb-1">
              Interactive Masterclasses
            </span>
            <p className="text-xs sm:text-sm text-neutral-700">
              Senior guest lectures and concept derivations where students actively dissect challenging entrance problems together.
            </p>
          </div>
        </div>

        {/* Right Stack: Mentoring & Reading Hall (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Card 1: Mentoring */}
          <div className="rounded-card overflow-hidden border border-neutral-200 shadow-card bg-neutral-100 flex-1 flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src="/campus-mentoring.jpg"
                alt="1-on-1 personalized doubt clearing session"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white border-t border-neutral-200">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-950 block mb-1">
                Daily 1-on-1 Doubt Clinics
              </span>
              <p className="text-xs text-neutral-600">
                Post-lecture desk-side tutoring ensures no conceptual doubt carries over into the next day.
              </p>
            </div>
          </div>

          {/* Card 2: Subject Lab Work */}
          <div className="rounded-card overflow-hidden border border-neutral-200 shadow-card bg-neutral-100 flex-1 flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src="/course-physics.jpg"
                alt="Physics apparatus and optics experiments"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white border-t border-neutral-200">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-950 block mb-1">
                Applied STEM Laboratory
              </span>
              <p className="text-xs text-neutral-600">
                Observing theoretical laws in physical practice to foster lasting intuition.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button
          as={Link}
          to="/gallery"
          variant="secondary"
          size="md"
          rightIcon={ArrowRight}
        >
          View Full Campus Photo Archive
        </Button>
      </div>
    </Section>
  );
}
