import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { FormField, Input, Select, Textarea } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { FormSuccessPanel } from '../components/ui/FormSuccessPanel';
import { useCourses } from '../hooks/useCourses';
import { enquiryService } from '../services/enquiryService';
import { validateEnquiryForm, validateSingleField } from '../utils/validators';

const STANDARDS = [
  { value: '', label: 'Select Student Standard / Class' },
  { value: 'Class 8', label: 'Class 8 (CBSE / ICSE Foundation)' },
  { value: 'Class 9', label: 'Class 9 (Integrated Pre-Foundation)' },
  { value: 'Class 10', label: 'Class 10 (Board Excellence & NTSE)' },
  { value: 'Class 11', label: 'Class 11 (2-Yr Integrated JEE / NEET)' },
  { value: 'Class 12', label: 'Class 12 (Board + Competitive Booster)' },
  { value: 'Repeaters', label: '12th Passed / Repeaters Batch' },
];

export default function Admission() {
  useDocumentTitle(
    "Admission Enquiry & Registration | Srimanasa Academy",
    "Submit an admission enquiry for Class 8–12, NEET-UG, and IIT-JEE programs at Srimanasa Educational Academy. Limited batch sizes of 30."
  );

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryCourseId = searchParams.get('course') || location.state?.courseId || '';
  const queryStandard = searchParams.get('standard') || location.state?.standard || '';

  const { courses, loading: coursesLoading } = useCourses('All');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    standard: queryStandard,
    courseId: queryCourseId,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // Field refs for moving focus to first invalid field
  const fieldRefs = {
    studentName: useRef(null),
    parentName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    standard: useRef(null),
    courseId: useRef(null),
    message: useRef(null),
  };

  // Pre-populate course if query param arrives or courses load
  useEffect(() => {
    if (queryCourseId && !formData.courseId) {
      setFormData((prev) => ({ ...prev, courseId: queryCourseId }));
    }
    if (queryStandard && !formData.standard) {
      setFormData((prev) => ({ ...prev, standard: queryStandard }));
    }
  }, [queryCourseId, queryStandard]);

  // Synchronize standard if course has explicit class category
  useEffect(() => {
    if (formData.courseId && courses.length > 0) {
      const selectedCourse = courses.find((c) => c.id === formData.courseId);
      if (selectedCourse && !formData.standard) {
        setFormData((prev) => ({ ...prev, standard: selectedCourse.classCategory }));
      }
    }
  }, [formData.courseId, courses]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time clearance of error if touched
    if (touched[name]) {
      const fieldError = validateSingleField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  // Handle Field Blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateSingleField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Filter courses based on standard if selected
  const availableCourses = formData.standard
    ? courses.filter((c) => c.classCategory === formData.standard || c.standardLabel?.includes(formData.standard))
    : courses;

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const validationErrors = validateEnquiryForm(formData);
    setErrors(validationErrors);

    // If there are errors, focus the first invalid field and shake
    const errorKeys = Object.keys(validationErrors);
    if (errorKeys.length > 0) {
      triggerShake();
      const firstErrorField = errorKeys[0];
      const targetRef = fieldRefs[firstErrorField]?.current;
      if (targetRef) {
        targetRef.focus();
        targetRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Submit payload via service layer
    setIsSubmitting(true);
    try {
      const courseObj = courses.find((c) => c.id === formData.courseId);
      const payload = {
        ...formData,
        courseName: courseObj ? courseObj.name : formData.courseId
      };

      const result = await enquiryService.submit(payload);
      setSubmissionResult(result);
    } catch (err) {
      triggerShake();
      setErrors((prev) => ({ ...prev, submit: err.message || 'Submission failed. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      standard: '',
      courseId: '',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmissionResult(null);
  };

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              ACADEMIC ADMISSIONS 2026–2027 · CHENNAI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Enrolment & Admission Enquiry
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Take the first step toward disciplined academic mentorship. Fill in your details below to schedule an assessment and secure placement in our focused academic cohorts in Ashok Nagar.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Admission Section */}
      <Section background="warm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form or Success Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`bg-white p-7 sm:p-9 rounded-card border border-neutral-200/90 shadow-card transition-all duration-300 ${isShaking ? 'animate-form-shake' : ''}`}>
              {submissionResult ? (
                /* Smooth Animated Success Panel */
                <FormSuccessPanel
                  title="Thank you!"
                  message="We have received your details. Our team will call you shortly."
                  referenceId={submissionResult.referenceId}
                  onReset={handleResetForm}
                  buttonText="Send another enquiry"
                  additionalInfo={
                    <div className="pt-2">
                      <a
                        href="tel:+917397689062"
                        className="text-xs text-primary-800 dark:text-accent-400 font-semibold hover:underline inline-flex items-center gap-1.5 py-1 px-3"
                      >
                        <PhoneCall className="w-4 h-4 text-terracotta-700 dark:text-terracotta-400" aria-hidden="true" />
                        Immediate Admissions Assistance: +91 73976 89062
                      </a>
                    </div>
                  }
                />
              ) : (
                /* Enquiry Form */
                <>
                  <div className="mb-6 border-b border-neutral-100 pb-4">
                    <h2 className="text-2xl font-serif font-bold text-primary-950 mb-1">
                      Candidate & Guardian Details
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600">
                      Please provide accurate contact details so we can send the course handbook and entrance assessment guidelines.
                    </p>
                  </div>

                  {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200" role="alert">
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Student Name */}
                    <FormField
                      id="studentName"
                      label="Student's Full Name"
                      required
                      error={touched.studentName ? errors.studentName : undefined}
                    >
                      <Input
                        ref={fieldRefs.studentName}
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Aarav Sharma"
                        hasError={Boolean(touched.studentName && errors.studentName)}
                      />
                    </FormField>

                    {/* Parent Name */}
                    <FormField
                      id="parentName"
                      label="Parent / Guardian Name"
                      required
                      error={touched.parentName ? errors.parentName : undefined}
                    >
                      <Input
                        ref={fieldRefs.parentName}
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        hasError={Boolean(touched.parentName && errors.parentName)}
                      />
                    </FormField>

                    {/* Phone & Email Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <FormField
                        id="phone"
                        label="Mobile Number (10-Digit)"
                        required
                        helpText="Indian mobile number (accepts +91)"
                        error={touched.phone ? errors.phone : undefined}
                      >
                        <Input
                          ref={fieldRefs.phone}
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. 9845012345"
                          hasError={Boolean(touched.phone && errors.phone)}
                        />
                      </FormField>

                      {/* Email */}
                      <FormField
                        id="email"
                        label="Email Address"
                        required
                        error={touched.email ? errors.email : undefined}
                      >
                        <Input
                          ref={fieldRefs.email}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="parent@example.com"
                          hasError={Boolean(touched.email && errors.email)}
                        />
                      </FormField>
                    </div>

                    {/* Standard / Class */}
                    <FormField
                      id="standard"
                      label="Current Academic Standard / Class"
                      required
                      error={touched.standard ? errors.standard : undefined}
                    >
                      <Select
                        ref={fieldRefs.standard}
                        name="standard"
                        value={formData.standard}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        hasError={Boolean(touched.standard && errors.standard)}
                      >
                        {STANDARDS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    {/* Course Interested In */}
                    <FormField
                      id="courseId"
                      label="Program Interested In"
                      required
                      error={touched.courseId ? errors.courseId : undefined}
                      helpText={
                        formData.standard
                          ? `Showing programs for ${formData.standard}`
                          : "Select standard above to filter matching courses"
                      }
                    >
                      <Select
                        ref={fieldRefs.courseId}
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        hasError={Boolean(touched.courseId && errors.courseId)}
                        disabled={coursesLoading}
                      >
                        <option value="">Select a Course Offering</option>
                        {availableCourses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.standardLabel})
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    {/* Message Textarea */}
                    <FormField
                      id="message"
                      label="Additional Notes / Questions (Optional)"
                      charCount={formData.message.length}
                      maxChars={500}
                      error={touched.message ? errors.message : undefined}
                      helpText="Mention current school, previous scores, or preferred morning/evening batch"
                    >
                      <Textarea
                        ref={fieldRefs.message}
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Please share any specific requirements or past competitive exam background..."
                        hasError={Boolean(touched.message && errors.message)}
                      />
                    </FormField>

                    <div className="pt-3">
                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        isLoading={isSubmitting}
                        className="w-full text-base font-bold shadow-md"
                      >
                        Submit Admission Enquiry
                      </Button>
                      <p className="text-center text-[11px] text-neutral-500 mt-2">
                        🔒 Your details are strictly confidential and used solely for admission communication.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Admission Policy & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Batch Intake Notice */}
            <div className="bg-white p-7 rounded-card border border-neutral-200/90 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-terracotta-700 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Upcoming Batches (2026–2027)</span>
              </div>
              <h3 className="font-serif font-normal text-2xl text-primary-950">
                Board & Entrance Batches
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Holistic and professionally planned educational support. Daily Monday to Saturday batches covering Physics, Chemistry, Biology & Mathematics in Ashok Nagar.
              </p>
              
              <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700">
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">1. Board Exam (CBSE/ICSE/State):</span>
                  <span className="text-terracotta-700 font-semibold">Nov – Jan (1.5h/sub)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">2. Crash Course for JEE 2026:</span>
                  <span className="text-terracotta-700 font-semibold">Nov – Mar (2h/sub)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">3. Crash Course for NEET 2026:</span>
                  <span className="text-terracotta-700 font-semibold">Nov – Apr (2h/sub)</span>
                </div>
                <div className="flex justify-between py-2 bg-surface-warm p-2.5 rounded border border-neutral-200">
                  <span className="font-semibold text-primary-950">Class XII Crash Course 2027:</span>
                  <span className="text-terracotta-700 font-bold">Special Rs. 2,500 Discount</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Limited Seats Available • Personal Attention Cohort • Daily Doubt Clinic</span>
              </div>
            </div>

            {/* Admission Process Steps */}
            <div className="bg-white p-7 rounded-card border border-neutral-200/90 shadow-card space-y-4">
              <h3 className="font-serif font-normal text-xl text-primary-950 border-b border-neutral-100 pb-3">
                Admission Procedure
              </h3>

              <ol className="space-y-4 text-xs text-neutral-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-warm text-terracotta-700 border border-neutral-200 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Enquiry Submission</strong>
                    <p className="text-neutral-600">Submit student details online or at our Ashok Nagar, Chennai campus desk.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-warm text-terracotta-700 border border-neutral-200 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Diagnostic Evaluation</strong>
                    <p className="text-neutral-600">A 60-minute conceptual assessment to identify strengths and foundational bridge areas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-warm text-terracotta-700 border border-neutral-200 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Faculty Counseling</strong>
                    <p className="text-neutral-600">1-on-1 counseling with the senior faculty head to recommend the ideal batch rhythm.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-warm text-terracotta-700 border border-neutral-200 font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-semibold mb-0.5">Seat Confirmation</strong>
                    <p className="text-neutral-600">Completion of enrolment formalities and issuance of complete study material.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Direct Helpline Card */}
            <div className="p-5 rounded-card bg-surface-warm border border-neutral-200 text-xs text-neutral-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <HelpCircle className="w-4 h-4 text-terracotta-700" aria-hidden="true" />
                <span>Prefer to Enquire in Person?</span>
              </div>
              <p className="leading-relaxed text-neutral-600">
                Parents are welcome to walk in to our Ashok Nagar campus (Near Ashok Pillar) between 8:30 AM and 7:30 PM. Prior appointment recommended for direct faculty consultations.
              </p>
            </div>
          </div>

        </div>
      </Section>
    </PageLayout>
  );
}
