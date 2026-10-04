import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Lock, Sparkles, BookOpen, Users, Trophy, Image as ImageIcon } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';

const SECTION_CONFIG = {
  programs: {
    title: 'Programs & Curriculum',
    subtitle: 'Academic Syllabi & Course Prospectus',
    icon: BookOpen,
    description: 'We are curating comprehensive academic syllabi, batch timings, and fee structures for our upcoming academic session in Ashok Nagar, Chennai.',
  },
  faculty: {
    title: 'Teaching Faculty',
    subtitle: 'Senior Mentors & Subject Leads',
    icon: Users,
    description: 'Our senior educators profile directory is currently being updated with credentials, teaching backgrounds, and academic achievements.',
  },
  results: {
    title: 'Examination Results',
    subtitle: 'Roll of Honour & Merit Records',
    icon: Trophy,
    description: 'We are compiling our latest student scorecards, All-India rank distributions, and board distinctions for public viewing.',
  },
  gallery: {
    title: 'Campus Life & Gallery',
    subtitle: 'Inside Srimanasa Academy',
    icon: ImageIcon,
    description: 'Photographs from our recent science workshops, seminar felicitations, and Chennai campus facilities are being added to our visual archive.',
  },
};

export default function ComingSoon({ sectionKey = 'programs' }) {
  const currentKey = sectionKey.toLowerCase();
  const config = SECTION_CONFIG[currentKey] || {
    title: 'Programs / Faculty / Results / Gallery',
    subtitle: 'Section Under Curation',
    icon: BookOpen,
    description: 'This section is currently being prepared by our academic editorial desk.',
  };

  const IconComponent = config.icon;

  useDocumentTitle(
    `${config.title} • Coming Soon | Srimanasa Educational Academy`,
    `The ${config.title} section of Srimanasa Educational Academy is coming soon.`
  );

  return (
    <PageLayout>
      <section className="py-20 md:py-28 bg-surface-warm text-center relative overflow-hidden">
        {/* Subtle Kolam Background Pattern */}
        <div className="absolute inset-0 bg-kolam-subtle opacity-35 pointer-events-none" aria-hidden="true" />

        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Lock Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-parchment border border-terracotta-200/80 text-terracotta-800 text-xs font-semibold uppercase tracking-widest mb-6 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-terracotta-600" aria-hidden="true" />
              <span>Section Temporarily Locked</span>
            </div>

            {/* Icon Graphic */}
            <div className="w-16 h-16 rounded-full bg-white border border-neutral-200/90 shadow-card flex items-center justify-center mx-auto mb-6 text-primary-950">
              <IconComponent className="w-8 h-8 text-terracotta-700" aria-hidden="true" />
            </div>

            {/* Eyebrow and Headline */}
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2 font-mono">
              SRIMANASA EDUCATIONAL ACADEMY · CHENNAI
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Coming Soon
            </h1>

            <div className="text-lg sm:text-xl font-serif text-neutral-800 italic mb-4">
              {config.title}
            </div>

            {/* Primary Required Statement */}
            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-card border border-neutral-200/90 shadow-xs mb-8 text-left sm:text-center space-y-3">
              <p className="text-base text-neutral-800 font-medium leading-relaxed">
                "We're preparing something special for you. This section will be available soon."
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {config.description}
              </p>
            </div>

            {/* Quick Links to other available sections */}
            <div className="text-xs text-neutral-600 mb-8 flex flex-wrap items-center justify-center gap-4">
              <span className="font-semibold text-neutral-800">Available Sections:</span>
              <Link to="/about" className="text-primary-900 hover:text-terracotta-700 underline font-medium">
                About Academy
              </Link>
              <span className="text-neutral-300">•</span>
              <Link to="/contact" className="text-primary-900 hover:text-terracotta-700 underline font-medium">
                Campus Location
              </Link>
              <span className="text-neutral-300">•</span>
              <Link to="/admission" className="text-primary-900 hover:text-terracotta-700 underline font-medium">
                Admissions Enquiry
              </Link>
            </div>

            {/* Back to Home CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="md"
                leftIcon={Home}
                className="w-full sm:w-auto"
              >
                Back to Home
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                Contact Admissions Office
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
