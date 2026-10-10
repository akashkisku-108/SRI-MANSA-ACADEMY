import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FacultyCard } from '../cards/FacultyCard';
import { useFaculty } from '../../hooks/useFaculty';
import { CardSkeleton } from '../ui/Skeleton';

export function FacultyPreview() {
  const { faculty, loading, error } = useFaculty(true);

  return (
    <Section background="white" id="faculty-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            ACADEMIC LEADERSHIP · MENTORS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Our Teaching Faculty
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Spearheading education through proven training methodologies delivered by experienced faculties and industry experts.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.slice(0, 3).map((member) => (
            <FacultyCard key={member.id} faculty={member} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Button
          as={Link}
          to="/faculty"
          variant="primary"
          size="lg"
          rightIcon={ArrowRight}
        >
          View Complete Faculty Directory
        </Button>
      </div>
    </Section>
  );
}
