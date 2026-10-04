import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Lock, Award, BookCheck } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export function ResultsPreview() {
  return (
    <Section background="warm" id="results-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            ACADEMIC EXCELLENCE · MERIT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Results & Achievements
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Spearheading educational excellence for school board examinations, JEE, and NEET candidates in Chennai.
        </p>
      </div>

      {/* Tasteful Institutional Results Placeholder Card */}
      <div className="bg-white rounded-card border border-neutral-200/90 p-8 sm:p-12 relative overflow-hidden shadow-xs">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-surface-parchment border border-neutral-200 shadow-sm flex items-center justify-center mx-auto text-primary-950">
            <Trophy className="w-7 h-7 text-terracotta-700" aria-hidden="true" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-parchment border border-terracotta-200 text-terracotta-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Lock className="w-3 h-3 text-terracotta-600" aria-hidden="true" />
            <span>Results & Achievements Coming Soon</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-primary-950 font-normal">
            Board & Entrance Examination Records
          </h3>

          <p className="text-sm text-neutral-600 leading-relaxed">
            Official student score sheets, board merit lists, and entrance exam qualification records are being audited and verified for official publication.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-700">
            <span className="inline-flex items-center gap-1.5">
              <BookCheck className="w-4 h-4 text-emerald-600" />
              <span>CBSE / ICSE / State Board Records</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>JEE & NEET Score Audits</span>
            </span>
          </div>

          <div className="pt-4">
            <Button
              as={Link}
              to="/results"
              variant="secondary"
              size="md"
              rightIcon={ArrowRight}
            >
              Results Details Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
