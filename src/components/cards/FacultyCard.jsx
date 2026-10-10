import React from 'react';
import { Award, GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../ui/Reveal';

/**
 * FacultyCard component displaying academic credentials, experience, and bio.
 */
export function FacultyCard({ faculty, index = 0 }) {
  const [cardRef, isRevealed] = useScrollReveal();
  const cappedIndex = Math.min(6, Math.max(0, index));
  const staggerDelay = cappedIndex * 80;

  // Map portrait images to faculty members
  const getFacultyPhoto = () => {
    if (faculty.photo) {
      return faculty.photo;
    }
    if (faculty.name.toLowerCase().includes('rishikesh')) {
      return '/faculty-rishikesh.jpg';
    }
    if (faculty.name.includes('Ramanathan')) {
      return '/faculty-ramanathan.jpg';
    }
    if (faculty.name.includes('Ananya')) {
      return '/faculty-ananya.jpg';
    }
    if (faculty.name.includes('Murali')) {
      return '/faculty-murali.jpg';
    }
    return null;
  };

  const photo = getFacultyPhoto();

  return (
    <div
      ref={cardRef}
      className={`flex flex-col h-full bg-white rounded-card border border-neutral-200/90 hover:border-neutral-400 transition-all duration-200 shadow-sm overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      {/* Portrait Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {photo ? (
          <img
            src={photo}
            alt={`${faculty.name} - ${faculty.role}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-serif text-3xl font-normal"
            style={{ backgroundColor: faculty.avatarAccent || '#122033' }}
          >
            {faculty.initials}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-accent-300 bg-primary-950/60 px-2 py-0.5 rounded-button backdrop-blur-xs mb-1">
            {faculty.subject}
          </span>
          <h3 className="text-base font-serif text-white leading-snug">
            {faculty.name}
          </h3>
          <p className="text-[11px] text-neutral-300 truncate">
            {faculty.role}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        {/* Credentials */}
        <div className="space-y-2 text-xs text-neutral-600 mb-3 bg-surface-warm p-3 rounded-card border border-neutral-200/70">
          <div className="flex items-start gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-terracotta-700 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="font-medium text-neutral-800">{faculty.qualification}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-terracotta-700 shrink-0" aria-hidden="true" />
            <span>{faculty.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-accent-600 shrink-0" aria-hidden="true" />
            <span className="text-neutral-600 truncate">{faculty.almaMater}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-neutral-600 leading-relaxed mb-4 flex-1">
          {faculty.bio}
        </p>

        {/* Specialization Tags */}
        {faculty.specializations && faculty.specializations.length > 0 && (
          <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-1">
            {faculty.specializations.map((spec) => (
              <span
                key={spec}
                className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-button font-normal border border-neutral-200/60"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
