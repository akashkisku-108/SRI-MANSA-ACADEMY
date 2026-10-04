import React, { useState } from 'react';
import { Trophy, Award, Filter, GraduationCap, Building } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ResultCard } from '../components/cards/ResultCard';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { TableRowSkeleton, CardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Container } from '../components/ui/Container';
import { useResults } from '../hooks/useResults';

const YEARS = ['All', '2024', '2023', '2022'];

export default function Results() {
  useDocumentTitle(
    "Examination Results & Roll of Honour | Srimanasa Academy",
    "Discover the achievements of Srimanasa students in JEE Advanced, NEET-UG, CBSE 10 & 12 boards, and Olympiads. Verifiable results with year filters."
  );

  const [selectedYear, setSelectedYear] = useState('All');
  const { stats, results, loading, error } = useResults(selectedYear);

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              EXAMINATION MERIT LIST · ASHOK NAGAR
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Academic Results & Rank Milestones
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Every score represents months of disciplined conceptual application, error diagnosis, and quiet perseverance. We celebrate the dedication of every single student across Tamil Nadu.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Statistics Section */}
      <Section background="warm" spacing="tight">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-card border border-neutral-200 animate-pulse h-32" />
            ))
          ) : (
            stats.map((stat, idx) => (
              <Card key={idx} className="p-6 border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-primary-950 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent-600 shrink-0" aria-hidden="true" />
                    <span>{stat.value}</span>
                  </div>
                </div>
                <p className="text-xs text-accent-800 font-medium mt-3 pt-3 border-t border-neutral-100">
                  {stat.detail}
                </p>
              </Card>
            ))
          )}
        </div>
      </Section>

      {/* 2. Featured Achievement Cards */}
      <Section background="white">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="Top National Rankers & State Toppers"
          description="A selection of standout performers from our classroom batches who transformed their foundational concepts into All-India triumphs."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results
              .filter((r) => r.isFeatured)
              .slice(0, 4)
              .map((res) => (
                <ResultCard key={res.id} result={res} />
              ))}
          </div>
        )}
      </Section>

      {/* 3. Comprehensive Student Results Table / Grid with Year Filter */}
      <Section background="subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary-950">
              Student Results Roll
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Complete verifiable student scores across boards and competitive entrance exams.
            </p>
          </div>

          {/* Year Filter Tabs */}
          <div className="inline-flex p-1 bg-white rounded-button border border-neutral-200 self-start md:self-auto shadow-sm" role="tablist" aria-label="Filter results by examination year">
            {YEARS.map((yr) => {
              const isActive = selectedYear === yr;
              return (
                <button
                  key={yr}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-button transition-all duration-150 min-h-[44px] ${
                    isActive
                      ? 'bg-primary-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {yr === 'All' ? 'All Years' : `Class of ${yr}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-card border border-neutral-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm" aria-label="Student Results Table">
              <thead>
                <tr className="bg-primary-950 text-white text-xs uppercase tracking-wider font-semibold border-b border-primary-900">
                  <th scope="col" className="py-4 px-6">Student Name & School</th>
                  <th scope="col" className="py-4 px-4">Exam</th>
                  <th scope="col" className="py-4 px-4">Score / Rank</th>
                  <th scope="col" className="py-4 px-4">Year</th>
                  <th scope="col" className="py-4 px-4 hidden md:table-cell">Enrolled Course</th>
                  <th scope="col" className="py-4 px-6 hidden lg:table-cell">Allotted Seat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRowSkeleton key={i} cols={6} />
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12">
                      <EmptyState
                        icon={Award}
                        title={`No results found for year ${selectedYear}`}
                        description="There are currently no listed records for this filter. Please choose another year."
                        actionText="View All Records"
                        onAction={() => setSelectedYear('All')}
                      />
                    </td>
                  </tr>
                ) : (
                  results.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-neutral-50/80 transition-colors duration-150"
                    >
                      {/* Name & School */}
                      <td className="py-4 px-6">
                        <div className="font-serif font-bold text-neutral-900 text-sm">
                          {student.studentName}
                        </div>
                        <div className="text-xs text-neutral-500 truncate max-w-xs" title={student.school}>
                          {student.school}
                        </div>
                      </td>

                      {/* Exam */}
                      <td className="py-4 px-4">
                        <Badge variant="primary" size="sm">
                          {student.exam}
                        </Badge>
                      </td>

                      {/* Score or Rank */}
                      <td className="py-4 px-4 font-semibold text-primary-900">
                        <span className="inline-flex items-center gap-1.5 font-bold text-sm bg-accent-50 text-accent-900 px-2 py-0.5 rounded border border-accent-200">
                          {student.scoreOrRank}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="py-4 px-4 text-xs font-semibold text-neutral-600">
                        {student.year}
                      </td>

                      {/* Course */}
                      <td className="py-4 px-4 text-xs text-neutral-600 hidden md:table-cell max-w-xs truncate" title={student.courseEnrolled}>
                        {student.courseEnrolled}
                      </td>

                      {/* College Allotted */}
                      <td className="py-4 px-6 text-xs text-neutral-700 hidden lg:table-cell">
                        {student.collegeAllotted ? (
                          <span className="flex items-center gap-1 font-medium text-emerald-800">
                            <Building className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            {student.collegeAllotted}
                          </span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
