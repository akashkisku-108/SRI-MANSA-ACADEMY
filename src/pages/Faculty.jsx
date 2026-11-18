import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FacultyCard } from '../components/cards/FacultyCard';
import { LeadershipCard } from '../components/cards/LeadershipCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { useFaculty } from '../hooks/useFaculty';

export default function Faculty() {
  useDocumentTitle(
    "Senior Faculty & Teaching Mentors | Srimanasa Educational Academy",
    "Meet our eminent leadership, academic directors, and department educators delivering disciplined coaching for School Boards, NEET-UG, and IIT-JEE in Chennai."
  );

  const { leadershipFaculty, teachingFaculty, loading, error } = useFaculty(false);

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 dark:border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              FACULTY DIRECTORY · ASHOK NAGAR, CHENNAI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 dark:text-white mb-4">
              Master Teachers, Not Mere Instructors
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              At Srimanasa, education is never outsourced. All core lectures, derivations, and daily doubt resolution hours are personally conducted by our permanent senior subject heads and academic leaders in Chennai.
            </p>
          </div>
        </Container>
      </section>

      {/* Faculty Guarantees Strip */}
      <section className="bg-surface-parchment text-neutral-900 py-5 border-b border-neutral-200/90 dark:border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Personalized Mentorship for Every Enrolled Student</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Research-Backed Study Material & Diagnostic Audits</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Daily 1-on-1 Post-Lecture Doubt Resolution</span>
          </div>
        </Container>
      </section>

      {/* 1. Senior Faculty & Leadership Section */}
      <Section background="warm" id="senior-faculty-leadership" className="border-b border-neutral-200/90 dark:border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-15 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Academic Direction & Mentorship"
            title="Senior Faculty & Leadership"
            description="Our academic directors and senior educators who establish SriManasa's pedagogical standards, guide curriculum innovation, and lead our student mentorship programs."
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {Array.from({ length: 2 }).map((_, i) => (
                <CardSkeleton key={`lead-skeleton-${i}`} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {leadershipFaculty.map((member, index) => (
                <LeadershipCard key={member.id} faculty={member} index={index} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* 2. Teaching Faculty Section */}
      <Section background="white" id="faculty-team" className="border-b border-neutral-200/90 dark:border-white/10">
        <SectionHeading
          eyebrow="Subject Matter Specialists"
          title="Our Teaching Faculty"
          description="Dedicated department educators delivering systematic conceptual clarity, rigorous problem-solving techniques, and daily doubt resolution across all batches."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={`fac-skeleton-${i}`} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachingFaculty.map((member, index) => (
              <FacultyCard key={member.id} faculty={member} index={index} />
            ))}
          </div>
        )}

        {/* Why Choose Our Training Programme? */}
        <div className="mt-16 bg-white dark:bg-[#132236] p-7 sm:p-9 rounded-card border border-neutral-200 dark:border-white/10 shadow-card">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-accent-700 dark:text-accent-400 uppercase tracking-widest block mb-1">
              Pedagogical Standards
            </span>
            <h3 className="font-serif font-bold text-2xl text-primary-950 dark:text-white mb-2">
              Why Choose Our Training Programme?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Backed by an excellent infrastructural base and a strong R&D team guided by industry experts, SRIMANASA Educational Academy adopts proven training methodologies delivered through experience and processes for optimum results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-lg bg-surface-warm dark:bg-primary-950/40 border border-neutral-200/80 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 dark:text-primary-100 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Affordable Fee Structure</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                Premium coaching with reasonable fees, special discounts, and 3-month instalment facilities.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm dark:bg-primary-950/40 border border-neutral-200/80 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 dark:text-primary-100 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exclusive Study Materials</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                Well-researched, syllabus-mapped materials covering high-yield NCERT points, tricks, and past papers.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm dark:bg-primary-950/40 border border-neutral-200/80 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 dark:text-primary-100 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Experienced Faculties</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                Senior department mentors with extensive track records in CBSE, ICSE, JEE, and NEET preparation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm dark:bg-primary-950/40 border border-neutral-200/80 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 dark:text-primary-100 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DAILY Doubt-Clearing Sessions</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                Daily interactive problem-solving clinics so no student leaves the campus with lingering doubts.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm dark:bg-primary-950/40 border border-neutral-200/80 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 dark:text-primary-100 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personal Attention to Every Student</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                Individual performance analysis, periodic reviews, and constant mentor guidance for maximum score growth.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent-50/50 dark:bg-accent-950/30 border border-accent-200/70 dark:border-accent-700/40 flex flex-col justify-center">
              <p className="text-xs font-bold text-accent-900 dark:text-accent-200 text-center">
                🚀 Boost Your Scores. Master Every Concept. Excel in Exams!
              </p>
              <p className="text-[11px] text-center text-accent-700 dark:text-accent-400 mt-1">
                Limited Seats Available • Enroll Now
              </p>
            </div>
          </div>
        </div>

        {/* Mentorship Ethos Box */}
        <div className="mt-12 bg-white dark:bg-[#132236] p-8 rounded-card border border-neutral-200 dark:border-white/10 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-xl text-primary-950 dark:text-white">
              Would You Like to Interact with Our Faculty Directly?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We arrange direct faculty consultations for prospective parents and students to discuss subject difficulty, learning readiness, and recommended batch tracks.
            </p>
          </div>
          <Button
            as={Link}
            to="/admission"
            variant="accent"
            size="lg"
            rightIcon={ArrowRight}
            className="shrink-0"
          >
            Book a Faculty Consultation
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
