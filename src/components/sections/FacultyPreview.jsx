import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lock, CheckCircle2, GraduationCap } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export function FacultyPreview() {
  return (
    <Section background="white" id="faculty-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            ACADEMIC LEADERSHIP · MENTORS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Our Teaching Faculty
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Spearheading education through proven training methodologies delivered by experienced faculties and industry experts.
        </p>
      </div>

      {/* Tasteful Institutional Coming Soon Card */}
      <div className="bg-surface-warm rounded-card border border-neutral-200/90 p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center mx-auto text-primary-950">
            <GraduationCap className="w-7 h-7 text-terracotta-700" aria-hidden="true" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-terracotta-200 text-terracotta-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Lock className="w-3 h-3 text-terracotta-600" aria-hidden="true" />
            <span>Faculty Profiles Coming Soon</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-primary-950 font-normal">
            Experienced Subject Mentors & Pedagogy
          </h3>

          <p className="text-sm text-neutral-600 leading-relaxed">
            Detailed mentor profiles, credentials, and subject specializations for Physics, Chemistry, Mathematics, and Biology are being compiled for the upcoming academic session.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-700">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Experienced Subject Heads</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Daily Doubt-Clearing Sessions</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Personal Student Attention</span>
            </span>
          </div>

          <div className="pt-4">
            <Button
              as={Link}
              to="/faculty"
              variant="secondary"
              size="md"
              rightIcon={ArrowRight}
            >
              Faculty Profiles Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
