/**
 * @typedef {Object} GalleryItem
 * Campus gallery item schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   title: string,
 *   category: 'Classrooms & Library' | 'Felicitations & Awards' | 'Workshops & Labs' | 'Campus Life',
 *   caption: string,
 *   year: number,
 *   aspectRatio: 'landscape' | 'portrait' | 'square',
 *   altText: string,
 *   theme: {
 *     gradient: string,
 *     accentColor: string,
 *     tag: string,
 *     iconType: 'book' | 'award' | 'microscope' | 'users' | 'graduation' | 'chart'
 *   }
 * }
 */

export const galleryItems = [
  {
    id: "gal-01",
    title: "Annual Rankers' Felicitation Ceremony",
    category: "Felicitations & Awards",
    caption: "Honoring our 2024 IIT-JEE and NEET achievers alongside their proud parents in the Main Auditorium.",
    year: 2024,
    aspectRatio: "landscape",
    image: "/gallery-seminar.jpg",
    altText: "Top ranking students receiving trophies and certificates on stage from academic directors",
    theme: {
      gradient: "from-primary-900 via-primary-800 to-terracotta-700",
      accentColor: "#DEB53A",
      tag: "Annual Convocation",
      iconType: "award"
    }
  },
  {
    id: "gal-02",
    title: "Acoustically Treated Amphitheater Classroom",
    category: "Classrooms & Library",
    caption: "Ergonomic tiered lecture hall equipped with interactive smart boards and high-clarity projection.",
    year: 2024,
    aspectRatio: "square",
    image: "/campus-lecture.jpg",
    altText: "Spacious modern lecture hall with comfortable seating and multi-panel teaching boards",
    theme: {
      gradient: "from-primary-950 via-primary-900 to-neutral-800",
      accentColor: "#94B4D8",
      tag: "Lecture Hall A",
      iconType: "book"
    }
  },
  {
    id: "gal-03",
    title: "Physics Mechanics & Optics Lab Demonstration",
    category: "Workshops & Labs",
    caption: "Students exploring laser diffraction and rotational inertia during an experimental weekend session.",
    year: 2024,
    aspectRatio: "landscape",
    image: "/course-physics.jpg",
    altText: "Faculty demonstrating laser ray optics and refraction in the high-school physics laboratory",
    theme: {
      gradient: "from-primary-900 via-primary-700 to-primary-600",
      accentColor: "#F1E1A6",
      tag: "STEM Innovation Lab",
      iconType: "microscope"
    }
  },
  {
    id: "gal-04",
    title: "Dedicated Reference Library & Reading Pods",
    category: "Classrooms & Library",
    caption: "Over 5,000 reference volumes, past 20 years question banks, and silent cubicles for deep focus study.",
    year: 2023,
    aspectRatio: "portrait",
    image: "/about-campus.jpg",
    altText: "Quiet student study library with organized bookshelves and individual study partitions",
    theme: {
      gradient: "from-neutral-900 via-primary-900 to-neutral-800",
      accentColor: "#C59A1D",
      tag: "Knowledge Resource Center",
      iconType: "book"
    }
  },
  {
    id: "gal-05",
    title: "Interactive Doubt-Resolution Hub",
    category: "Campus Life",
    caption: "1-on-1 peer mentoring and faculty interaction tables active throughout evening study hours.",
    year: 2024,
    aspectRatio: "landscape",
    image: "/gallery-mentoring.jpg",
    altText: "Teacher explaining problem solving steps to two attentive students on a collaborative whiteboard",
    theme: {
      gradient: "from-primary-800 via-primary-900 to-primary-950",
      accentColor: "#E7CC6E",
      tag: "Daily Mentorship Hub",
      iconType: "users"
    }
  },
  {
    id: "gal-06",
    title: "Classroom Interactive Mathematics Session",
    category: "Workshops & Labs",
    caption: "Foundation students working through geometric theorems and calculus problem-solving sets.",
    year: 2024,
    aspectRatio: "square",
    image: "/course-math.jpg",
    altText: "Students working through mathematical problem sets in class",
    theme: {
      gradient: "from-primary-900 via-terracotta-800 to-primary-900",
      accentColor: "#DEB53A",
      tag: "Problem Solving Clinic",
      iconType: "chart"
    }
  },
  {
    id: "gal-07",
    title: "Parent-Teacher Academic Review Summit",
    category: "Campus Life",
    caption: "Individualized progress review meetings ensuring alignment between home support and classroom goals.",
    year: 2023,
    aspectRatio: "landscape",
    image: "/campus-mentoring.jpg",
    altText: "Parents consulting academic counsellors regarding student performance diagnostics and test charts",
    theme: {
      gradient: "from-primary-950 via-primary-800 to-neutral-900",
      accentColor: "#94B4D8",
      tag: "Parent Collaboration",
      iconType: "users"
    }
  },
  {
    id: "gal-08",
    title: "NEET Medical Biology Specimen Workshop",
    category: "Workshops & Labs",
    caption: "Hands-on microscopic observation of botanical specimens and anatomical diagrams for Class 11 and 12.",
    year: 2023,
    aspectRatio: "portrait",
    image: "/course-neet.jpg",
    altText: "Students using compound microscopes to study plant cellular structures in the biology lab",
    theme: {
      gradient: "from-primary-900 via-primary-800 to-primary-700",
      accentColor: "#C59A1D",
      tag: "Medical Biology Wing",
      iconType: "microscope"
    }
  },
  {
    id: "gal-09",
    title: "Morning Classroom Lecture in Session",
    category: "Classrooms & Library",
    caption: "Morning batch students engaged in physics derivations with senior Chennai faculty.",
    year: 2024,
    aspectRatio: "landscape",
    image: "/hero-classroom.jpg",
    altText: "Chennai classroom in session with engaged students",
    theme: {
      gradient: "from-primary-900 via-primary-950 to-terracotta-900",
      accentColor: "#F1E1A6",
      tag: "Chennai Classroom",
      iconType: "graduation"
    }
  }
];
