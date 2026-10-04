import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { 
  GraduationCap, 
  Users2, 
  HelpCircle, 
  BookOpen, 
  BadgePercent, 
  Target,
  Award
} from 'lucide-react';

const PILLARS = [
  {
    icon: BadgePercent,
    title: "Affordable Fee Structure",
    description: "Quality education made accessible with transparent pricing, special fee discounts, and flexible instalment options.",
    tag: "Affordable Education"
  },
  {
    icon: BookOpen,
    title: "Exclusive Study Materials",
    description: "Well-researched, comprehensive study materials developed by our strong R&D team and guided by industry experts.",
    tag: "High-Yield Content"
  },
  {
    icon: GraduationCap,
    title: "Experienced Faculties",
    description: "Spearheading education through proven training methodologies delivered by senior educators with decades of subject mastery.",
    tag: "Faculty Pedagogy"
  },
  {
    icon: HelpCircle,
    title: "DAILY Doubt-Clearing Sessions",
    description: "Dedicated daily post-lecture slots ensure no concept remains unresolved before students step into the next chapter.",
    tag: "Daily Resolution"
  },
  {
    icon: Users2,
    title: "Personal Attention to Every Student",
    description: "Periodical performance evaluation and personalized attention tailored to each student for optimum success.",
    tag: "Personal Mentoring"
  },
  {
    icon: Target,
    title: "From Board Exams to Entrance Exams 2026",
    description: "Synchronized dual preparation bridging CBSE, ICSE, and State Boards directly to JEE & NEET competitive standards.",
    tag: "Comprehensive Track"
  }
];

export function WhyChooseUs() {
  return (
    <Section background="subtle" id="why-choose-us" spacing="normal">
      <SectionHeading
        eyebrow="Pedagogical Methodology"
        title="Disciplined Study Framework. Daily Conceptual Resolution."
        description="Centered in Ashok Nagar, Chennai, Srimanasa blends structured syllabus schedules with continuous individualized doubt clearance and comprehensive study materials."
      />

      {/* 6 Core Pedagogical Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-card border border-neutral-200/90 hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-button bg-surface-parchment text-terracotta-700 border border-neutral-200/80 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-terracotta-700" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-primary-950 mb-2 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center text-xs font-medium text-terracotta-700">
                <span>{pillar.tag}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Educational Assurance Banner */}
      <div className="mt-12 bg-primary-950 text-white rounded-card p-6 sm:p-8 border border-primary-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-button bg-terracotta-600/20 text-terracotta-400 border border-terracotta-500/40 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-white font-normal">
              Bridge to Lead — Spearheading Educational Excellence
            </h4>
            <p className="text-xs text-neutral-300 max-w-xl leading-relaxed mt-0.5">
              Boost Your Scores. Master Every Concept. Excel in Exams! Holistic support and well-researched courses in Ashok Nagar, Chennai.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="inline-block text-xs font-medium text-accent-300 px-3.5 py-1.5 rounded-button bg-primary-900 border border-white/10">
            Ashok Nagar, Chennai
          </span>
        </div>
      </div>
    </Section>
  );
}
