import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { TestimonialCard } from '../cards/TestimonialCard';
import { CardSkeleton } from '../ui/Skeleton';
import { useTestimonials } from '../../hooks/useTestimonials';
import { Reveal } from '../ui/Reveal';

export function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { testimonials, loading } = useTestimonials(activeFilter);
  const featuredQuotes = testimonials.slice(0, 3);

  return (
    <Section background="warm" id="testimonials" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            EXPERIENCE & REFLECTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Voices of Our Academic Family
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Reflections from students and parents whose educational foundations were built in our classrooms.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredQuotes.map((item, index) => (
            <Reveal
              key={item.id}
              staggerIndex={index}
              className="bg-white p-6 sm:p-7 rounded-card border border-neutral-200/90 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-serif text-4xl text-terracotta-400 leading-none select-none block">
                  “
                </span>
                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-primary-950 font-sans">
                    {item.author}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {item.relationship || item.role} · {item.batchYear || 'Alumnus'}
                  </p>
                </div>
                {item.verified && (
                  <span className="text-[11px] text-terracotta-700 font-medium">
                    Verified
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
