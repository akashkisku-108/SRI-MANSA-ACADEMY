import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FacultyCard } from '../components/cards/FacultyCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { useFaculty } from '../hooks/useFaculty';

export default function Faculty() {
  useDocumentTitle(
    "Distinguished Faculty & Mentors | Srimanasa Educational Academy",
    "Meet our eminent educators from IIT Madras, IISc, BMCRI, and central universities with over a decade of dedicated coaching experience."
  );

  const { faculty, loading, error } = useFaculty(false);

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              FACULTY DIRECTORY · ASHOK NAGAR
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Master Teachers, Not Mere Instructors
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              At Srimanasa, education is never outsourced. All core lectures, derivations, and daily doubt resolution hours are personally conducted by our permanent senior subject heads in Chennai.
            </p>
          </div>
        </Container>
      </section>

      {/* Faculty Guarantees Strip */}
      <section className="bg-surface-parchment text-neutral-900 py-5 border-b border-neutral-200/90">
        <Container className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800">Personalized Mentorship for Every Enrolled Student</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800">Research-Backed Study Material & Diagnostic Audits</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            <span className="font-medium text-neutral-800">Daily 1-on-1 Post-Lecture Doubt Resolution</span>
          </div>
        </Container>
      </section>

      {/* Main Faculty Listing */}
      <Section background="warm">
        <SectionHeading
          eyebrow="Subject Matter Specialists"
          title="Meet Our Department Heads & Senior Educators"
          description="Click any educator profile to discover their academic background, research alumni credentials, and pedagogical specializations."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member) => (
              <FacultyCard key={member.id} faculty={member} />
            ))}
          </div>
        )}

        {/* Why Choose Our Faculty & Training Programme (From Official Document) */}
        <div className="mt-16 bg-white p-7 sm:p-9 rounded-card border border-neutral-200 shadow-card">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-accent-700 uppercase tracking-widest block mb-1">
              Pedagogical Standards
            </span>
            <h3 className="font-serif font-bold text-2xl text-primary-950 mb-2">
              Why Choose Our Training Programme?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Backed by an excellent infrastructural base and a strong R&D team guided by industry experts, SRIMANASA Educational Academy adopts proven training methodologies delivered through experience and processes for optimum results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-lg bg-surface-warm border border-neutral-200/80 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Affordable Fee Structure</span>
              </div>
              <p className="text-xs text-neutral-600 pl-6">
                Premium coaching with reasonable fees, special discounts, and 3-month instalment facilities.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm border border-neutral-200/80 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exclusive Study Materials</span>
              </div>
              <p className="text-xs text-neutral-600 pl-6">
                Well-researched, syllabus-mapped materials covering high-yield NCERT points, tricks, and past papers.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm border border-neutral-200/80 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Experienced Faculties</span>
              </div>
              <p className="text-xs text-neutral-600 pl-6">
                Senior department mentors with extensive track records in CBSE, ICSE, JEE, and NEET preparation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm border border-neutral-200/80 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DAILY Doubt-Clearing Sessions</span>
              </div>
              <p className="text-xs text-neutral-600 pl-6">
                Daily interactive problem-solving clinics so no student leaves the campus with lingering doubts.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-warm border border-neutral-200/80 space-y-1">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personal Attention to Every Student</span>
              </div>
              <p className="text-xs text-neutral-600 pl-6">
                Individual performance analysis, periodic reviews, and constant mentor guidance for maximum score growth.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent-50/50 border border-accent-200/70 flex flex-col justify-center">
              <p className="text-xs font-bold text-accent-900 text-center">
                🚀 Boost Your Scores. Master Every Concept. Excel in Exams!
              </p>
              <p className="text-[11px] text-center text-accent-700 mt-1">
                Limited Seats Available • Enroll Now
              </p>
            </div>
          </div>
        </div>

        {/* Mentorship Ethos Box */}
        <div className="mt-12 bg-white p-8 rounded-card border border-neutral-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-xl text-primary-950">
              Would You Like to Interact with Our Faculty Directly?
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
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
