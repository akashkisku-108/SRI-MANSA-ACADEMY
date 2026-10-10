# Srimanasa Educational Academy — Frontend Web Application

A production-quality, responsive frontend website for **Srimanasa Educational Academy**, an academic coaching institute offering programs for Classes 8–12, CBSE/ICSE boards, NEET-UG, and IIT-JEE.

Designed with an academic, trustworthy, and modern aesthetic (using deep navy, rich warm gold accents, and warm-neutral surfaces with Playfair Display and Plus Jakarta Sans typography).

---

## Tech Stack & Architecture

- **Core**: React 18 + Vite (JavaScript)
- **Routing**: React Router DOM (v6) with lazy-loaded route code-splitting (`React.lazy` + `Suspense`)
- **Styling**: Tailwind CSS with custom design tokens for academic palette, radii, and shadows
- **Icons**: `lucide-react`
- **Data & Service Layer**: All pages consume an abstracted Promise-based service layer in `/src/services` with custom React hooks in `/src/hooks`. No page imports mock data files directly.

---

## Project Structure

```text
src/
├── assets/                  # Static media and SVGs
├── components/
│   ├── cards/               # Reusable cards: CourseCard, FacultyCard, ResultCard, TestimonialCard
│   ├── layout/              # Navbar, Footer, PageLayout (skip link), ScrollToTop
│   ├── sections/            # Home sections: Hero (custom SVG visual), StatsStrip, AboutPreview,
│   │                        # CoursesPreview, WhyChooseUs, FacultyPreview, ResultsPreview,
│   │                        # TestimonialsSection, GalleryPreview, AdmissionCTABanner, HomeContactInfo
│   └── ui/                  # Reusable UI primitives: Button, Card, Badge, Section, SectionHeading,
│                            # FormField (Input/Select/Textarea), Modal, Skeleton, EmptyState, Container
├── data/                    # Documented mock data modules (courses, faculty, results, gallery,
│                            # testimonials, siteConfig)
├── hooks/                   # Custom hooks exposing { data, loading, error }:
│                            # useCourses, useFaculty, useResults, useGallery, useTestimonials,
│                            # useSiteConfig, useDocumentTitle (SEO), useScrollToTop
├── pages/                   # 8 main pages + 404 page:
│                            # Home (/), About (/about), Courses (/courses), Faculty (/faculty),
│                            # Results (/results), Gallery (/gallery), Contact (/contact),
│                            # Admission (/admission), NotFound (*)
├── services/                # Service layer (coursesService, facultyService, resultsService,
│                            # galleryService, testimonialsService, enquiryService, siteConfigService)
├── utils/                   # Validators (Indian mobile number, email, form logic) and formatters
├── App.jsx                  # Route table with Suspense fallback
├── index.css                # Tailwind directives, font-family tokens, focus ring, reduced-motion
└── main.jsx                 # Application entry point
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` folder with zero errors or warnings.

### 5. Preview Production Build
```bash
npm run preview
```

---

## Key Features & User Flows

1. **Academic Hero Section**:
   - Compelling value proposition and dual CTAs ("Enquire Now" and "Explore Courses").
   - Original custom inline SVG academic visual (crest shield, open book, graduation mortarboard, celestial STEM orbital geometry, and floating achievement badges) without stock-photo dependence.

2. **Courses with Direct Enrolment Routing**:
   - Filter courses dynamically by class/standard (Class 8, 9, 10, 11, 12, Repeaters).
   - Clicking "Enquire Now" on any course card links to `/admission?course=<id>&standard=<class>` with the course and standard pre-selected in the enquiry form dropdown.

3. **Faculty Directory**:
   - Detailed faculty credentials (IIT Madras, IISc, BMCRI alumni, 12–19 years experience) with monogram avatars, qualifications, and specializations.

4. **Results with Year Filtering & Skeleton States**:
   - Summary statistics cards, top national rankers, and an accessible student results table.
   - Filter by year (`All`, `2024`, `2023`, `2022`) with loading skeleton placeholders and empty states.

5. **Campus Gallery with Accessible Lightbox**:
   - Filter by category (`Classrooms & Library`, `Felicitations & Awards`, `Workshops & Labs`, `Campus Life`).
   - Accessible keyboard-operable modal lightbox (Escape to close, Left/Right arrow keys to navigate images, body scroll locked, focus trapped).

6. **Admission / Enquiry Form**:
   - Strict validation: Required fields, 10-digit Indian mobile number format (optional `+91`), RFC-compliant email, character counter on notes.
   - Inline accessible error messages linked with `aria-describedby` and `role="alert"`.
   - Automatic focus movement to the first invalid field upon submission with errors.
   - Network delay simulation (loading spinner on button) followed by a clear success confirmation with an auto-generated reference number (e.g. `SMA-2025-XXXX`) and reset option.

7. **Contact & Campus Location**:
   - Full campus address, direct phone helplines, admissions desk hours, official email, Google Maps embed block, and direct WhatsApp chat link (`https://wa.me/...`).

8. **Accessibility & SEO**:
   - Dynamic document title and meta description updates per page (`useDocumentTitle`).
   - Skip to main content link for keyboard and screen reader navigation.
   - Visible gold focus rings on all interactive elements.
   - Touch targets meeting or exceeding 44px.
   - `prefers-reduced-motion` compliance.

---

## How to Replace Placeholder Content for Production

1. **Branding & Crest**:
   - Replace `/public/academy-crest.svg` and `/public/og-image.png` with official high-resolution vector logos.
2. **Contact & Social Details**:
   - Update `src/data/siteConfig.js` with your official phone numbers, WhatsApp helpline, physical address, and Google Maps embed URL.
3. **Courses, Faculty & Results**:
   - Update `src/data/courses.js`, `src/data/faculty.js`, and `src/data/results.js` with actual batch names, instructor photographs, and student scores.

---

## How to Connect a Real Backend Later

Because components strictly consume the `/src/services` layer (via custom hooks), connecting a real backend (Node.js, Express, Fastify, Django, Supabase, etc.) requires editing **only the files in `/src/services/`**:

Example `src/services/coursesService.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.srimanasa.edu.in';

export const coursesService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },
  async getByClass(classCategory) {
    const url = classCategory && classCategory !== 'All'
      ? `${API_BASE_URL}/courses?class=${encodeURIComponent(classCategory)}`
      : `${API_BASE_URL}/courses`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  }
};
```

Example `src/services/enquiryService.js`:
```javascript
export const enquiryService = {
  async submit(payload) {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to register enquiry');
    return response.json();
  }
};
```
No React components or hooks need to be touched when switching from mock data to real API endpoints.

---

## Attributions & Credits

- Click sound: Computer Mouse Click 02 by Universfield, Pixabay.

