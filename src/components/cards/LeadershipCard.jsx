import React, { useState } from 'react';
import { Award, GraduationCap, Briefcase, Crown, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../ui/Reveal';
import { useInteractiveCard } from '../../hooks/useInteractiveCard';

/**
 * LeadershipCard component displaying senior faculty and leadership profiles
 * with distinguished presentation, prominent portraits, and academic credentials.
 */
export function LeadershipCard({ faculty, index = 0 }) {
  const [revealRef, isRevealed] = useScrollReveal();
  const tiltRef = useInteractiveCard();
  const [imageError, setImageError] = useState(false);
  const cappedIndex = Math.min(6, Math.max(0, index));
  const staggerDelay = cappedIndex * 90;

  const photo = faculty.photo || 
    (faculty.name.toLowerCase().includes('rishikesh') ? '/faculty-rishikesh.jpg' : null) ||
    (faculty.name.toLowerCase().includes('sujatha') ? '/faculty-sujatha.jpg' : null);
  const isDirector = faculty.leadershipTitle === 'Director' || faculty.leadershipTitle === 'Academic Director' || faculty.role.toLowerCase().includes('director');

  return (
    <div
      ref={revealRef}
      className={`h-full reveal-init ${isRevealed ? 'reveal-visible' : ''}`}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      <div
        ref={tiltRef}
        className="interactive-card-wrapper h-full"
      >
        <div className="interactive-card-surface flex flex-col h-full bg-white dark:bg-[#132236] rounded-card border border-neutral-200/90 dark:border-white/10 hover:border-accent-400 dark:hover:border-accent-500/60 transition-all duration-300 shadow-card hover:shadow-card-hover overflow-hidden relative group">
          <div className="interactive-card-spotlight pointer-events-none" aria-hidden="true" />

          {/* Distinguished Top Accent Bar */}
          <div
            className={`w-full h-1.5 shrink-0 ${
              isDirector
                ? 'bg-gradient-to-r from-amber-600 via-accent-400 to-amber-600'
                : 'bg-gradient-to-r from-primary-900 via-terracotta-500 to-accent-600'
            }`}
            aria-hidden="true"
          />

          {/* Prominent Portrait Header */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-950">
            {photo && !imageError ? (
              <img
                src={photo}
                alt={`${faculty.name} - ${faculty.role || 'Senior Faculty & Leadership'}`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden"
                style={{ backgroundColor: faculty.avatarAccent || '#0F766E' }}
                aria-label={faculty.name}
              >
                <div className="absolute inset-0 bg-kolam-subtle opacity-20 pointer-events-none" aria-hidden="true" />
                <div className="w-20 h-20 rounded-full border-2 border-accent-300/60 flex items-center justify-center bg-black/20 mb-2 shadow-inner">
                  <span className="font-serif text-3xl font-normal tracking-wider text-accent-100">
                    {faculty.initials || faculty.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-200/90">
                  {faculty.subject || 'Faculty'} Mentor
                </span>
              </div>
            )}

            {/* Dark Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/40 to-transparent" />

            {/* Executive Badge */}
            <div className="absolute top-3 right-3 z-10">
              {isDirector ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-950 bg-amber-300/95 dark:bg-amber-400 dark:text-neutral-950 px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs">
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  {faculty.leadershipTitle || 'Director'}
                </span>
              ) : faculty.leadershipTitle === 'Senior Faculty & Mentor' ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-950 bg-primary-100/95 dark:bg-primary-900/90 dark:text-primary-100 px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs">
                  <Award className="w-3.5 h-3.5 text-accent-600" />
                  Senior Mentor
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-950 bg-teal-100/95 dark:bg-teal-900/90 dark:text-teal-100 px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Senior Faculty
                </span>
              )}
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-3 left-4 right-4 text-white z-10">
              {faculty.subject && (
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-accent-300 bg-primary-950/80 border border-accent-500/30 px-2 py-0.5 rounded-button backdrop-blur-xs mb-1.5">
                  {faculty.subject}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-serif text-white leading-snug font-normal tracking-tight">
                {faculty.name}
              </h3>
              {faculty.role && (
                <p className="text-xs sm:text-sm text-neutral-300 font-sans font-medium mt-0.5 truncate">
                  {faculty.role}
                </p>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
            {/* Academic Credentials Box */}
            {(faculty.qualification || faculty.experience || faculty.almaMater) && (
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 mb-4 bg-surface-warm dark:bg-primary-950/40 p-3.5 rounded-card border border-neutral-200/80 dark:border-white/10">
                {faculty.experience && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-terracotta-700 dark:text-terracotta-400 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{faculty.experience} Experience</span>
                  </div>
                )}
                {faculty.qualification && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-primary-700 dark:text-primary-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{faculty.qualification}</span>
                  </div>
                )}
                {faculty.almaMater && (
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400 shrink-0" aria-hidden="true" />
                    <span className="text-neutral-600 dark:text-neutral-400 truncate">{faculty.almaMater}</span>
                  </div>
                )}
              </div>
            )}

            {/* Bio / Pedagogical Statement */}
            {faculty.bio && (
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4 flex-1">
                {faculty.bio}
              </p>
            )}

            {/* Specialization Tags */}
            {faculty.specializations && faculty.specializations.length > 0 && (
              <div className="pt-3 border-t border-neutral-100 dark:border-white/10 flex flex-wrap gap-1.5">
                {faculty.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="text-[11px] bg-neutral-100 dark:bg-primary-900/60 text-neutral-700 dark:text-neutral-300 px-2.5 py-0.5 rounded-button font-normal border border-neutral-200/60 dark:border-white/10"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
