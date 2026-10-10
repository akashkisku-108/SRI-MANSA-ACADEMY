import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  ExternalLink,
  Youtube,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { FormField, Input, Textarea } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { FormSuccessPanel } from '../components/ui/FormSuccessPanel';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { createWhatsAppUrl } from '../utils/formatters';

const SOCIAL_ICONS = {
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

export default function Contact() {
  useDocumentTitle(
    "Contact & Campus Location | Srimanasa Educational Academy",
    "Get in touch with Srimanasa Educational Academy. Campus address in Jayanagar, Bengaluru, telephone helplines, WhatsApp chat, and admissions desk hours."
  );

  const { config } = useSiteConfig();
  const contact = config?.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const whatsappUrl = contact
    ? createWhatsAppUrl(contact.whatsappNumber, contact.whatsappDefaultMessage)
    : '#';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields before submitting.');
      triggerShake();
      return;
    }

    // Basic email sanity
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      triggerShake();
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrorMessage('');
    setIsSubmitted(false);
  };

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              COMMUNICATIONS & CAMPUS DESK · CHENNAI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Connect with Our Admissions Office
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Have questions regarding course structures, batch availability, or diagnostic evaluations? Our senior counsellors and faculty advisors in Ashok Nagar are here to guide you.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <Section background="warm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Campus Information & Maps (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-7 rounded-card border border-neutral-200/90 shadow-card space-y-6">
              <h2 className="font-serif font-bold text-xl text-primary-950 border-b border-neutral-100 pb-3">
                Ashok Nagar Campus Details
              </h2>

              <div className="space-y-4 text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-warm text-terracotta-700 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Ashok Nagar, Chennai</strong>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {contact?.address?.fullAddress || "No. 33/52, 53rd Street, Indira Colony, Ashok Nagar, Chennai, Tamil Nadu – 600083"}
                    </p>
                    <span className="text-[11px] text-terracotta-700 font-medium mt-1 block">Landmark: Near Ashok Pillar</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-warm text-terracotta-700 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Helplines</strong>
                    <p className="text-xs text-neutral-600">
                      Primary: <a href="tel:+917397689062" className="text-primary-800 font-semibold hover:underline">+91 73976 89062</a>
                    </p>
                    <p className="text-xs text-neutral-600">
                      Alternate: <a href="tel:+919150999611" className="text-primary-800 font-semibold hover:underline">+91 91509 99611</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-warm text-terracotta-700 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Email Inquiries</strong>
                    <p className="text-xs text-neutral-600">
                      <a href="mailto:srimanasaedu11@gmail.com" className="text-primary-800 font-semibold hover:underline">
                        srimanasaedu11@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-warm text-terracotta-700 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Visiting Hours</strong>
                    <p className="text-xs text-neutral-600">
                      Monday to Saturday: 8:30 AM – 7:30 PM
                    </p>
                    <p className="text-xs text-neutral-500">
                      Sunday: 9:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA button */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors duration-150 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>Chat with Admissions on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" aria-hidden="true" />
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-100">
                <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Connect on Social Media
                </span>
                <div className="flex items-center gap-3">
                  {config?.socials?.map((soc) => {
                    const IconComp = SOCIAL_ICONS[soc.platform] || ExternalLink;
                    return (
                      <a
                        key={soc.platform}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-button bg-neutral-100 hover:bg-primary-900 hover:text-white text-neutral-700 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                        aria-label={soc.label}
                      >
                        <IconComp className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Google Maps Embed Block */}
            <div className="bg-white rounded-card overflow-hidden border border-neutral-200/90 shadow-card">
              <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
                  Ashok Nagar, Chennai Location
                </span>
                <a
                  href="https://maps.google.com/?q=Ashok+Nagar+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-800 hover:underline flex items-center gap-1 font-medium"
                >
                  Open in Maps <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
              <div className="relative h-64 w-full bg-neutral-200">
                <iframe
                  title="Srimanasa Educational Academy Campus Map Ashok Nagar Chennai"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7291122176467!2d80.20786967507746!3d13.03383098728734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e07a683935%3A0xe54d6d6cefbbe239!2sAshok%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`bg-white p-8 rounded-card border border-neutral-200/90 shadow-card transition-all duration-300 ${isShaking ? 'animate-form-shake' : ''}`}>
              <h2 className="font-serif font-bold text-2xl text-primary-950 mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                If you have a general query or wish to request an academy prospectus, submit the form below. For admission enrollments, please use the{' '}
                <a href="/admission" className="text-accent-700 font-semibold hover:underline">
                  Admission Enquiry Form
                </a>.
              </p>

              {isSubmitted ? (
                <FormSuccessPanel
                  title="Thank you!"
                  message="We have received your details. Our team will call you shortly."
                  onReset={handleResetForm}
                  buttonText="Send another enquiry"
                  additionalInfo={
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Our administrative officer will review your query and respond within one business day.
                    </p>
                  }
                />
              ) : (
                <>
                  {errorMessage && (
                    <div
                      className="mb-4 p-3.5 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/60"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField id="contact-name" label="Your Name" required>
                        <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        required
                      />
                    </FormField>

                    <FormField id="contact-phone" label="Phone Number" required>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9845012345"
                        required
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField id="contact-email" label="Email Address" required>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                    </FormField>

                    <FormField id="contact-subject" label="Subject / Purpose" required>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Batch Timings or Syllabus Query"
                        required
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="contact-message"
                    label="Your Message / Query"
                    required
                    maxChars={500}
                    charCount={formData.message.length}
                  >
                    <Textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details about your student's current grade and your query..."
                      required
                    />
                  </FormField>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      rightIcon={Send}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        </div>
      </Section>
    </PageLayout>
  );
}
