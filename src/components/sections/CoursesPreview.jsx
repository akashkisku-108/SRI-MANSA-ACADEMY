import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CourseCard } from '../cards/CourseCard';
import { CardSkeleton } from '../ui/Skeleton';
import { useCourses } from '../../hooks/useCourses';

export function CoursesPreview() {
  const { courses, loading } = useCourses('All');
  const previewCourses = courses.filter((c) => c.isFeatured).slice(0, 3);

  return (
    <Section background="white" id="courses-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            ACADEMIC CURRICULUM · 2026–2027
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Programs of Study
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Structured academic tracks bridging foundational CBSE/ICSE syllabus directly to JEE Advanced and NEET competitive benchmarks.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {previewCourses.map((course, idx) => {
            const isFeatured = idx === 0;
            const programNum = `0${idx + 1}`;
            const photo = idx === 0 ? '/course-physics.jpg' : idx === 1 ? '/course-math.jpg' : '/course-neet.jpg';

            return (
              <div
                key={course.id}
                className={`rounded-card border transition-all duration-200 overflow-hidden ${
                  isFeatured
                    ? 'border-neutral-300 bg-surface-warm'
                    : 'border-neutral-200/90 bg-white hover:border-neutral-400'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 items-center">
                  
                  {/* Number & Academic Stage (3 cols) */}
                  <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-neutral-200/80 pb-4 lg:pb-0 lg:pr-6">
                    <span className="font-serif text-3xl sm:text-4xl text-neutral-400 font-normal block mb-1">
                      {programNum}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block mb-1">
                      {course.standardLabel || course.classCategory}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      Cohort Size: {course.batchSize}
                    </span>
                  </div>

                  {/* Core Description & Subjects (6 cols) */}
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-serif text-primary-950 font-normal">
                      {course.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {course.subjects.map((subj) => (
                        <span
                          key={subj}
                          className="text-[11px] bg-white text-neutral-800 px-2.5 py-0.5 rounded-button border border-neutral-200/80 font-medium"
                        >
                          {subj}
                        </span>
                      ))}
                      <span className="text-xs text-neutral-500 ml-2">
                        · {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Program Action & Syllabus (3 cols) */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3">
                    <Button
                      as={Link}
                      to={`/admission?course=${course.id}`}
                      variant={isFeatured ? 'primary' : 'secondary'}
                      size="md"
                      rightIcon={ArrowRight}
                      className="w-full sm:w-auto text-xs"
                    >
                      Enquire Program
                    </Button>
                    <Link
                      to="/courses"
                      className="text-xs text-neutral-600 hover:text-primary-950 text-center font-medium underline underline-offset-4"
                    >
                      View Detailed Syllabus
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between pt-6 border-t border-neutral-200/80">
        <span className="text-xs text-neutral-500">
          Showing 3 featured academic tracks from our complete 8–12 curriculum.
        </span>
        <Button
          as={Link}
          to="/courses"
          variant="secondary"
          size="md"
          rightIcon={ArrowRight}
        >
          View Full Academic Prospectus
        </Button>
      </div>
    </Section>
  );
}
