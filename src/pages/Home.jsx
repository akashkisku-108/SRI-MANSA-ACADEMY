import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Hero } from '../components/sections/Hero';
import { StatsStrip } from '../components/sections/StatsStrip';
import { AboutPreview } from '../components/sections/AboutPreview';
import { CoursesPreview } from '../components/sections/CoursesPreview';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { FacultyPreview } from '../components/sections/FacultyPreview';
import { ResultsPreview } from '../components/sections/ResultsPreview';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { GalleryPreview } from '../components/sections/GalleryPreview';
import { AdmissionCTABanner } from '../components/sections/AdmissionCTABanner';
import { HomeContactInfo } from '../components/sections/HomeContactInfo';

export default function Home() {
  useDocumentTitle(
    "Premier Coaching for IIT-JEE, NEET & CBSE/ICSE | Ashok Nagar, Chennai",
    "Srimanasa Educational Academy offers disciplined academic coaching for school board examinations, NEET-UG, and IIT-JEE in Ashok Nagar, Chennai. Proven faculty, personalized attention."
  );

  return (
    <PageLayout>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Key stats strip */}
      <StatsStrip />

      {/* 3. About preview */}
      <AboutPreview />

      {/* 4. Courses preview */}
      <CoursesPreview />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Faculty preview (Details Coming Soon) */}
      <FacultyPreview />

      {/* 7. Results preview (Details Coming Soon) */}
      <ResultsPreview />

      {/* 8. Gallery preview */}
      <GalleryPreview />

      {/* 10. Admission CTA banner */}
      <AdmissionCTABanner />

      {/* 11. Contact info */}
      <HomeContactInfo />
    </PageLayout>
  );
}
