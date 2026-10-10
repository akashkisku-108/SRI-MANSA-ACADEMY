import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  CreditCard, 
  FileText, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CourseCard } from '../components/cards/CourseCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { useCourses } from '../hooks/useCourses';

const CLASS_FILTERS = [
  { label: 'All Programs', value: 'All' },
  { label: 'Crash Course 2027', value: 'Class 12' },
];

export default function Courses() {
  useDocumentTitle(
    "Courses & Fee Structure | Srimanasa Educational Academy",
    "Explore our complete curriculum: JEE / NEET Crash Course 2027 for Class XII with fee breakdown, discounts, integrated 2-year programs, and foundation batches."
  );

  const [selectedFilter, setSelectedFilter] = useState('All');
  const { courses, loading, error } = useCourses(selectedFilter);

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              ACADEMIC PROSPECTUS · CHENNAI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Programs of Study & Syllabus
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Explore our disciplined entrance coaching programs, transparent fee structure, and dedicated Class XII Crash Courses for JEE & NEET 2026–2027 in Ashok Nagar.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Notification Banner: Crash Course 2027 */}
      <section className="bg-accent-500/10 border-b border-accent-500/20 py-4">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-primary-950">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-accent-600 text-white font-bold text-xs uppercase tracking-wider">
              Special Discount
            </span>
            <span>
              <strong>JEE/NEET Crash Course 2027 for Class XII:</strong> Flat Rs. 2,500 Special Discount + 3 Months Instalment Options.
            </span>
          </div>
          <Link
            to="/admission"
            className="text-xs font-bold text-primary-900 hover:text-accent-800 underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Register Now (Rs. 500)</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      {/* Filter Tabs & Courses Grid */}
      <Section background="warm">
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CLASS_FILTERS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2 rounded-button text-xs sm:text-sm font-medium transition-all duration-150 min-h-[42px] ${
                selectedFilter === tab.value
                  ? 'bg-primary-900 text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Listing */}
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
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {/* 2025–2026 High Quality Training Schedule Card */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-card border border-neutral-200 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-xs font-bold text-accent-700 uppercase tracking-widest block mb-1">
                From Board Exams to Entrance Exams – 2026
              </span>
              <h3 className="font-serif font-bold text-2xl text-primary-950">
                Academic Board & Crash Course Schedule (2025–2026)
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Subjects Covered: <strong>Physics • Chemistry • Biology / Mathematics</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                Limited Seats Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Programme 1 */}
            <div className="p-5 rounded-card bg-primary-50/50 border border-primary-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-primary-800 uppercase tracking-wider block mb-1">Programme 1</span>
                <h4 className="font-serif font-bold text-base text-primary-950 mb-2">
                  Academic Board Exam Training
                </h4>
                <p className="text-xs text-neutral-600 mb-4">
                  For CBSE / ICSE / State Boards
                </p>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> November 2025 to January 2026</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                    <span><strong>Schedule:</strong> DAILY Mon to Sat (1.5 hrs/subject)</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-primary-200/50">
                <Button as={Link} to="/admission" variant="primary" size="sm" className="w-full justify-center">
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Programme 2 */}
            <div className="p-5 rounded-card bg-accent-50/40 border border-accent-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-accent-900 uppercase tracking-wider block mb-1">Programme 2</span>
                <h4 className="font-serif font-bold text-base text-primary-950 mb-2">
                  Crash Course for JEE – 2026
                </h4>
                <p className="text-xs text-neutral-600 mb-4">
                  Engineering Entrances (Main & Advanced)
                </p>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> November 2025 to March 2026</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                    <span><strong>Schedule:</strong> DAILY Mon to Sat (2 hrs/subject)</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-accent-200/60">
                <Button as={Link} to="/admission" variant="accent" size="sm" className="w-full justify-center">
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Programme 3 */}
            <div className="p-5 rounded-card bg-emerald-50/40 border border-emerald-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block mb-1">Programme 3</span>
                <h4 className="font-serif font-bold text-base text-primary-950 mb-2">
                  Crash Course for NEET – 2026
                </h4>
                <p className="text-xs text-neutral-600 mb-4">
                  Medical Entrances (NEET-UG / AIIMS)
                </p>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> November 2025 to April 2026</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                    <span><strong>Schedule:</strong> DAILY Mon to Sat (2 hrs/subject)</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-emerald-200/60">
                <Button as={Link} to="/admission" variant="primary" size="sm" className="w-full justify-center">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>

          {/* Why Choose Our Training Programme Strip */}
          <div className="p-5 rounded-lg bg-surface-warm border border-neutral-200">
            <h4 className="font-serif font-bold text-sm text-primary-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-600" />
              <span>Why Choose Our Training Programme?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Affordable Fee Structure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exclusive Study Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Experienced Faculties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DAILY Doubt-Clearing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personal Attention</span>
              </div>
            </div>
            <p className="mt-3 pt-3 border-t border-neutral-200/70 text-center font-bold text-xs text-primary-900">
              🎯 Boost Your Scores. Master Every Concept. Excel in Exams! Limited Seats Available! Enroll Now!
            </p>
          </div>
        </div>

        {/* Crash Course 2027 Fee Schedule & Policy Table */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-card border border-neutral-200 shadow-card">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-100">
            <CreditCard className="w-6 h-6 text-accent-600" aria-hidden="true" />
            <div>
              <h3 className="font-serif font-bold text-xl text-primary-950">
                JEE / NEET Crash Course - 2027 (Class XII) Fee Schedule
              </h3>
              <p className="text-xs text-neutral-500">
                Transparent fee details and special discount structure
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-primary-50/80 text-primary-950 border-b border-primary-200 font-serif">
                  <th className="py-3 px-4 font-bold">Sl. No.</th>
                  <th className="py-3 px-4 font-bold">Course Stream</th>
                  <th className="py-3 px-4 font-bold">Original Course Fee</th>
                  <th className="py-3 px-4 font-bold text-accent-700">Special Discount</th>
                  <th className="py-3 px-4 font-bold text-primary-950">Fees After Discount (Incl. Tax)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr className="hover:bg-neutral-50/60">
                  <td className="py-3.5 px-4 font-semibold">1</td>
                  <td className="py-3.5 px-4 font-medium text-neutral-900">
                    Engineering <span className="text-neutral-500">OR</span> Medical
                  </td>
                  <td className="py-3.5 px-4 line-through text-neutral-500">Rs. 27,000</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">Rs. 2,500</td>
                  <td className="py-3.5 px-4 font-bold text-primary-950 text-base">Rs. 24,500</td>
                </tr>
                <tr className="hover:bg-neutral-50/60 bg-neutral-50/30">
                  <td className="py-3.5 px-4 font-semibold">2</td>
                  <td className="py-3.5 px-4 font-medium text-neutral-900">
                    Engineering <span className="text-accent-600 font-bold">&</span> Medical (Dual Target)
                  </td>
                  <td className="py-3.5 px-4 line-through text-neutral-500">Rs. 33,500</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">Rs. 2,500</td>
                  <td className="py-3.5 px-4 font-bold text-primary-950 text-base">Rs. 31,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms & Conditions List from client flyer */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <h4 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-3">
              Terms & Conditions:
            </h4>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-700">
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span><strong>Rs. 500/-</strong> to be paid for <strong>REGISTRATION</strong>.</span>
              </li>
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span>Course fee <strong>includes complete study material</strong>.</span>
              </li>
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span><strong>THREE MONTHS INSTALMENTS</strong> are offered from the date of joining (Post Dated Cheques to be given during admission).</span>
              </li>
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <span>Course fees to be paid in full at the time of admission.</span>
              </li>
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">5</span>
                <span><strong>Periodical and personalized attention</strong> to each student for their success.</span>
              </li>
              <li className="flex items-start gap-2 bg-surface-warm p-3 rounded-lg border border-neutral-200/70">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-900 font-bold flex items-center justify-center shrink-0 text-[11px]">6</span>
                <span>Fees can be paid by <strong>cash / cheque</strong> in favor of <strong>"Srimanasa Educational Academy"</strong>.</span>
              </li>
            </ol>
          </div>

          {/* Admission Desk Footer */}
          <div className="mt-8 p-4 rounded-lg bg-primary-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-serif font-bold text-base text-white">
                Ready to Join or Have Questions?
              </div>
              <div className="text-xs text-neutral-300">
                Visit Ashok Nagar, Chennai campus or contact our admission line at 7397689062 / 9150999611.
              </div>
            </div>
            <Button
              as={Link}
              to="/admission"
              variant="accent"
              size="md"
              rightIcon={ArrowRight}
              className="shrink-0"
            >
              Enrol Online
            </Button>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
