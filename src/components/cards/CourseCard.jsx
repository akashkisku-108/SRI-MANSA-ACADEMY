import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useScrollReveal } from '../ui/Reveal';

/**
 * CourseCard component showcasing course details and direct enrolment action.
 */
export function CourseCard({ course, index = 0 }) {
  const [cardRef, isRevealed] = useScrollReveal();
  const cappedIndex = Math.min(6, Math.max(0, index));
  const staggerDelay = cappedIndex * 80;
  const enquiryUrl = `/admission?course=${course.id}&standard=${encodeURIComponent(course.classCategory)}`;

  // Contextual subject image matching program
  const getCourseImage = () => {
    if (course.id.includes('neet') || course.name.toLowerCase().includes('neet') || course.name.toLowerCase().includes('medical')) {
      return '/course-neet.jpg';
    }
    if (course.id.includes('math') || course.name.toLowerCase().includes('mathematics')) {
      return '/course-math.jpg';
    }
    return '/course-physics.jpg';
  };

  return (
    <div
      ref={cardRef}
      className={`flex flex-col justify-between h-full bg-white rounded-card border border-neutral-200/90 hover:border-neutral-400 transition-all duration-200 shadow-sm overflow-hidden group reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      <div>
        {/* Course Image Header with Institutional Category Strip */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          <img
            src={getCourseImage()}
            alt={course.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="font-semibold tracking-wide text-accent-300 bg-primary-950/60 px-2 py-0.5 rounded-button backdrop-blur-xs">
              {course.standardLabel || course.classCategory}
            </span>
            {course.badgeText && (
              <span className="text-[11px] font-medium text-neutral-200 bg-white/20 px-2 py-0.5 rounded-button backdrop-blur-xs">
                {course.badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-serif text-primary-950 group-hover:text-terracotta-700 transition-colors mb-2 leading-snug">
            {course.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Subjects Tag List */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.subjects.map((subj) => (
              <span
                key={subj}
                className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-button font-medium border border-neutral-200/70"
              >
                {subj}
              </span>
            ))}
          </div>

          {/* Key Pedagogy Checklist */}
          <ul className="space-y-1.5 mb-4 border-t border-neutral-100 pt-3" aria-label="Course features">
            {course.keyFeatures.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-xs text-neutral-600 leading-snug">
                <CheckCircle2 className="w-3.5 h-3.5 text-terracotta-600 shrink-0 mr-2 mt-0.5" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 font-medium text-neutral-700">
            <Users className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            {course.batchSize}
          </span>
        </div>

        <Button
          as={Link}
          to={enquiryUrl}
          variant="secondary"
          size="sm"
          rightIcon={ArrowRight}
          className="w-full text-xs font-semibold hover:border-terracotta-500 hover:text-terracotta-700"
        >
          Curriculum & Admission Details
        </Button>
      </div>
    </div>
  );
}
