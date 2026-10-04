import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, BookOpen, CheckCircle2, Shield, HeartHandshake, Award } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Container } from '../components/ui/Container';

export default function About() {
  useDocumentTitle(
    "About Us | Mission, Vision & Teaching Philosophy | Srimanasa Educational Academy",
    "Discover the foundational mission and pedagogical values of Srimanasa Educational Academy in Ashok Nagar, Chennai."
  );

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              ACADEMIC MISSION · ASHOK NAGAR, CHENNAI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Bridge to Lead — Spearheading Educational Excellence
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Providing holistic and professionally planned educational support with well-researched courses from school board examinations to competitive entrance tests in Ashok Nagar, Chennai.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Introduction & Academic Ethos */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <SectionHeading
              align="left"
              eyebrow="Academic Philosophy"
              title="Boost Your Scores. Master Every Concept. Excel in Exams!"
              className="mb-4"
            />
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Srimanasa Educational Academy is dedicated to delivering concept-focused academic mentorship for students in Chennai. We believe that lasting success in board examinations and competitive entrances like JEE and NEET begins with clarity of fundamental principles.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Our structured approach combines daily classes from Monday to Saturday, exclusive curated study materials, and daily doubt-clearing sessions to ensure every student receives personal attention and guidance.
            </p>
            <div className="p-4 bg-surface-warm rounded-lg border border-neutral-200 flex items-center gap-3 text-xs text-primary-950 font-medium">
              <Award className="w-5 h-5 text-terracotta-700 shrink-0" aria-hidden="true" />
              <span>Proven training methodologies backed by an excellent infrastructural base and guided by experienced faculties.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-warm p-8 rounded-card border border-neutral-200 shadow-card">
            <h3 className="font-serif font-normal text-2xl text-primary-950 mb-4 pb-3 border-b border-neutral-200">
              Core Academic Highlights
            </h3>
            <ol className="relative border-l border-terracotta-300 space-y-6 ml-2 text-xs">
              <li className="pl-6">
                <span className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-terracotta-600 border-2 border-white" />
                <strong className="block text-sm font-semibold text-neutral-900">Affordable Fee Structure</strong>
                <p className="text-neutral-600">Transparent pricing with flexible instalment options to make quality coaching accessible.</p>
              </li>
              <li className="pl-6">
                <span className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-primary-800 border-2 border-white" />
                <strong className="block text-sm font-semibold text-neutral-900">Exclusive Study Materials</strong>
                <p className="text-neutral-600">Well-researched, comprehensive course materials developed by our strong R&D team.</p>
              </li>
              <li className="pl-6">
                <span className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-primary-800 border-2 border-white" />
                <strong className="block text-sm font-semibold text-neutral-900">DAILY Doubt-Clearing Sessions</strong>
                <p className="text-neutral-600">Daily post-lecture doubt clinics with experienced subject faculties.</p>
              </li>
              <li className="pl-6">
                <span className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-terracotta-600 border-2 border-white" />
                <strong className="block text-sm font-semibold text-neutral-900">Personalized Student Attention</strong>
                <p className="text-neutral-600">Periodical reviews and individual attention to maximize each student's performance.</p>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* 2. Mission & Vision */}
      <Section background="warm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <Card className="p-8 border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-900 text-white flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-accent-400" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-accent-700 uppercase tracking-wider block mb-1">
                Our Purpose
              </span>
              <h2 className="text-2xl font-serif font-bold text-primary-950 mb-3">
                Academy Mission
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                To illuminate the beauty of mathematics and natural sciences for young minds by replacing passive rote memorization with active inquiry, deep conceptual clarity, and disciplined problem solving—equipping every student to lead with confidence in university and life.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Guidance grounded in patience, clarity, and uncompromising academic ethics.
            </div>
          </Card>

          {/* Vision */}
          <Card className="p-8 border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-900 text-white flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-accent-400" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-accent-700 uppercase tracking-wider block mb-1">
                Our Horizon
              </span>
              <h2 className="text-2xl font-serif font-bold text-primary-950 mb-3">
                Academy Vision
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                To stand as India's most respected center of foundational and competitive academic coaching, recognized not by commercial expansion or massive batch sizes, but by the intellectual integrity of our scholars and the consistent triumph of our students.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Excellence measured by individual transformation, not aggregate headcount.
            </div>
          </Card>
        </div>
      </Section>

      {/* 3. Teaching Philosophy (The 4 Tenets) */}
      <Section background="white">
        <SectionHeading
          eyebrow="Pedagogical Core"
          title="The Four Tenets of Srimanasa Teaching"
          description="Every lecture, mock test, and doubt-clearing session is structured around these time-tested instructional principles."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Conceptual Derivation",
              desc: "Never memorize what can be understood. Students derive fundamental theorems and formulas so they retain intuition under exam stress."
            },
            {
              num: "02",
              title: "Multi-Tier Practice",
              desc: "Assignments progress from Board Subjective (Step-marking) to Competitive Single-Choice, Multiple Correct, and Paragraph-based challenges."
            },
            {
              num: "03",
              title: "Daily Doubt Resolution",
              desc: "No question is postponed. Dedicated faculty desks are available every afternoon and evening for personalized 1-on-1 problem clinics."
            },
            {
              num: "04",
              title: "Psychological Resilience",
              desc: "Competitive tests require emotional poise. We coach students in time budgeting, skipping deceptive questions, and handling examination pressure."
            }
          ].map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-card bg-surface-warm border border-neutral-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-serif font-bold text-accent-600 block mb-2">
                  {item.num}
                </span>
                <h3 className="font-serif font-bold text-base text-primary-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Why Students Choose Us */}
      <Section background="subtle">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Student Centered"
            title="Why Students Choose Srimanasa Over Massive Coaching Brands"
            description="Our alumni frequently tell us that what made the difference wasn't the hours of study, but the environment in which they studied."
          />

          <div className="space-y-4">
            {[
              {
                title: "Personal Attention & Mentor Guidance",
                desc: "Teachers closely monitor student progress and conceptual understanding, tracking individual accuracy and doubts across periodic reviews."
              },
              {
                title: "DAILY Doubt-Clearing Sessions with Experienced Faculties",
                desc: "Dedicated daily post-lecture slots ensure students clarify every difficulty without postponement."
              },
              {
                title: "Synchronized Board & Entrance Exam Alignment",
                desc: "We coordinate syllabus coverage to provide holistic support for CBSE, ICSE, and State Boards while preparing for competitive entrance benchmarks."
              },
              {
                title: "Exclusive Study Materials & Structured Process",
                desc: "Comprehensive study materials developed by an active R&D team and guided by industry experts."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-card border border-neutral-200 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-primary-950 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Closing CTA */}
      <Section background="warm" spacing="tight">
        <div className="bg-white p-8 md:p-12 rounded-card border border-neutral-200/90 shadow-card text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block">
            VISIT OUR ACADEMIC CAMPUS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-primary-950 leading-tight">
            Experience the Srimanasa Atmosphere Firsthand
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Schedule a diagnostic academic counseling session and tour our study library and classrooms in Ashok Nagar, Chennai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              as={Link}
              to="/admission"
              variant="accent"
              size="lg"
              rightIcon={ArrowRight}
            >
              Enquire for Admission
            </Button>
            <Button
              as={Link}
              to="/courses"
              variant="secondary"
              size="lg"
            >
              Browse Programs
            </Button>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
