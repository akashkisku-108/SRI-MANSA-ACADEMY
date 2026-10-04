import React from 'react';
import { Star, Quote, GraduationCap, HeartHandshake } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

/**
 * TestimonialCard showcasing real student and parent reviews.
 */
export function TestimonialCard({ testimonial }) {
  const isStudent = testimonial.role === 'student';

  return (
    <Card className="flex flex-col justify-between h-full relative border-neutral-200 hover:border-primary-300">
      <div>
        {/* Header with Role Badge and Star Rating */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={isStudent ? 'primary' : 'gold'} size="sm" className="gap-1">
            {isStudent ? (
              <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span className="capitalize">{testimonial.role}</span>
          </Badge>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'text-accent-500 fill-accent-500'
                    : 'text-neutral-200'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative mb-6">
          <Quote className="w-8 h-8 text-neutral-200 -top-3 -left-1 absolute -z-0 opacity-60" aria-hidden="true" />
          <p className="relative z-10 text-sm text-neutral-700 italic leading-relaxed">
            "{testimonial.quote}"
          </p>
        </div>
      </div>

      {/* Author and Result Footer */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-serif font-bold text-primary-950">
            {testimonial.authorName}
          </h4>
          <p className="text-xs text-neutral-500">
            {testimonial.designationOrRelation}
          </p>
        </div>

        {testimonial.achievementBadge && (
          <Badge variant="outline" size="sm" className="text-[11px] font-medium max-w-[130px] truncate text-accent-800 border-accent-300 bg-accent-50/50">
            {testimonial.achievementBadge}
          </Badge>
        )}
      </div>
    </Card>
  );
}
