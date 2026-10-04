import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { createWhatsAppUrl } from '../../utils/formatters';

export function HomeContactInfo() {
  const { config } = useSiteConfig();
  const contact = config?.contact;

  return (
    <Section background="white" id="contact-info" spacing="normal">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            CAMPUS & COUNSELLING · ASHOK NAGAR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            Visit the Academy
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          Parents and students are welcome to inspect our classrooms, browse course study material, and meet subject heads in person.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Location */}
        <div className="bg-surface-warm p-6 sm:p-7 rounded-card border border-neutral-200/90 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-button bg-white text-terracotta-700 border border-neutral-200 flex items-center justify-center mb-4">
              <MapPin className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg text-primary-950 mb-2">
              Ashok Nagar Campus
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No. 33/52, 53rd Street, Indira Colony, Near Ashok Pillar, Ashok Nagar, Chennai, Tamil Nadu – 600083
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-200/80">
            <Link
              to="/contact"
              className="text-xs font-semibold text-terracotta-700 hover:text-terracotta-800 inline-flex items-center gap-1 group"
            >
              <span>View Map & Campus Directions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Card 2: Phone */}
        <div className="bg-surface-warm p-6 sm:p-7 rounded-card border border-neutral-200/90 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-button bg-white text-terracotta-700 border border-neutral-200 flex items-center justify-center mb-4">
              <Phone className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg text-primary-950 mb-2">
              Admissions Helpline
            </h3>
            <p className="text-xs text-neutral-600 mb-2">
              Direct faculty enquiry desk:
            </p>
            <div className="space-y-1">
              <a href="tel:+917397689062" className="block text-sm font-semibold text-primary-950 hover:text-terracotta-700">
                +91 73976 89062
              </a>
              <a href="tel:+919150999611" className="block text-sm font-semibold text-primary-950 hover:text-terracotta-700">
                +91 91509 99611
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-200/80">
            <a
              href="mailto:srimanasaedu11@gmail.com"
              className="text-xs font-semibold text-terracotta-700 hover:text-terracotta-800"
            >
              srimanasaedu11@gmail.com
            </a>
          </div>
        </div>

        {/* Card 3: Timings */}
        <div className="bg-surface-warm p-6 sm:p-7 rounded-card border border-neutral-200/90 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-button bg-white text-terracotta-700 border border-neutral-200 flex items-center justify-center mb-4">
              <Clock className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg text-primary-950 mb-2">
              Academic Office Hours
            </h3>
            <div className="space-y-2 text-xs text-neutral-600">
              <p>
                <strong className="text-neutral-900 block">Mon – Sat:</strong>
                8:30 AM – 7:30 PM (Daily Doubt Clinics: 4:30 PM – 7:00 PM)
              </p>
              <p>
                <strong className="text-neutral-900 block">Sunday:</strong>
                9:00 AM – 2:00 PM (Weekly Mock Tests)
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-200/80">
            <span className="text-xs text-neutral-500">
              Walk-in counseling available without appointment
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
