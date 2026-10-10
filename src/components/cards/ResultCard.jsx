import React from 'react';
import { Trophy, Award, Building } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../ui/Reveal';

/**
 * ResultCard component for high-achieving student rank cards.
 */
export function ResultCard({ result, index = 0 }) {
  const [cardRef, isRevealed] = useScrollReveal();
  const cappedIndex = Math.min(6, Math.max(0, index));
  const staggerDelay = cappedIndex * 80;

  // Map portrait to student record
  const getStudentPhoto = () => {
    if (result.studentName.includes('Aditya') || result.id === 'res-01') {
      return '/student-aditya.jpg';
    }
    if (result.studentName.includes('Meghana') || result.id === 'res-02') {
      return '/student-meghana.jpg';
    }
    if (result.studentName.includes('Kavitha') || result.id === 'res-03') {
      return '/student-kavitha.jpg';
    }
    return null;
  };

  const photo = getStudentPhoto();

  return (
    <div
      ref={cardRef}
      className={`flex flex-col justify-between h-full bg-white rounded-card border border-neutral-200/90 hover:border-neutral-400 transition-all duration-200 shadow-sm overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      <div>
        {/* Student Image & Exam Header */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          {photo ? (
            <img
              src={photo}
              alt={`${result.studentName} - ${result.scoreOrRank}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-primary-900 text-white flex items-center justify-center font-serif text-3xl">
              {result.studentName.charAt(0)}
            </div>
          )}

          {/* Exam Strip */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-900 bg-white/95 px-2.5 py-0.5 rounded-button shadow-xs border border-neutral-200/60">
              {result.exam}
            </span>
            <span className="font-bold text-white bg-primary-950/80 px-2 py-0.5 rounded-button backdrop-blur-xs">
              {result.year}
            </span>
          </div>

          {/* Bottom Rank Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent p-3 pt-6 flex items-baseline justify-between text-white">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-accent-300 font-medium block">
                {result.rankType}
              </span>
              <div className="text-xl font-serif font-bold text-white leading-tight">
                {result.scoreOrRank}
              </div>
            </div>
          </div>
        </div>

        {/* Student Name & Academic Details */}
        <div className="p-4">
          <h4 className="text-base font-serif text-primary-950 mb-1 leading-snug">
            {result.studentName}
          </h4>
          <p className="text-xs text-neutral-600 truncate mb-3" title={result.school}>
            {result.school}
          </p>

          <div className="pt-2.5 border-t border-neutral-100 text-xs">
            <p className="text-neutral-500 truncate mb-1">
              <span className="font-medium text-neutral-800">Program:</span> {result.courseEnrolled}
            </p>
            {result.collegeAllotted && (
              <p className="text-terracotta-700 font-medium flex items-center gap-1 mt-1 text-[11px]">
                <Building className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{result.collegeAllotted}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
