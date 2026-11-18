/**
 * @typedef {Object} GalleryItem
 * Campus gallery item schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   title: string,
 *   category: 'Digital Learning & Labs' | 'Classrooms & Lecture Halls' | 'Seminars & Institutional Visits',
 *   caption: string,
 *   year: number,
 *   aspectRatio: 'landscape' | 'portrait' | 'square',
 *   image: string,
 *   width: number,
 *   height: number,
 *   altText: string,
 *   featuredInPreview: boolean,
 *   theme: {
 *     gradient: string,
 *     accentColor: string,
 *     tag: string,
 *     iconType: 'laptop' | 'book' | 'users' | 'graduation' | 'award'
 *   }
 * }
 */

export const galleryItems = [
  {
    /* AI-written, please review */
    id: "gal-10",
    title: "Computer Lab Orientation Session", /* AI-written, please review */
    category: "Digital Learning & Labs",
    caption: "Students attending an orientation in the computer lab", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/computer-lab-front-session.jpg",
    width: 1024,
    height: 768,
    altText: "Students seated at desktop computer workstations listening to instructors standing at the front display screen", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-950 via-primary-900 to-terracotta-800",
      accentColor: "#DEB53A",
      tag: "Digital Lab",
      iconType: "laptop"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-11",
    title: "Computer Workstations and Study Terminals", /* AI-written, please review */
    category: "Digital Learning & Labs",
    caption: "Students seated at individual computer workstations", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/computer-lab-aisle-view.jpg",
    width: 1024,
    height: 768,
    altText: "Rear view down the aisle of students sitting at computer terminals facing the front presenter", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-900 via-primary-800 to-neutral-900",
      accentColor: "#94B4D8",
      tag: "IT Workstations",
      iconType: "laptop"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-12",
    title: "Interactive Screen Classroom Presentation", /* AI-written, please review */
    category: "Digital Learning & Labs",
    caption: "Instructor addressing students during a classroom session", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/interactive-session-instruction.jpg",
    width: 1024,
    height: 768,
    altText: "Instructor speaking beside a large wall display in a classroom with computer terminals", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-950 via-terracotta-900 to-primary-900",
      accentColor: "#F1E1A6",
      tag: "Smart Screen",
      iconType: "book"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-13",
    title: "Attentive Learning in Digital Room", /* AI-written, please review */
    category: "Digital Learning & Labs",
    caption: "Students listening attentively during an academic session", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/students-digital-classroom.jpg",
    width: 1024,
    height: 768,
    altText: "Group of uniform-clad students seated by computer desks attentively listening to their teacher", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-900 via-primary-950 to-neutral-800",
      accentColor: "#C59A1D",
      tag: "Digital Class",
      iconType: "users"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-14",
    title: "Classroom Lecture with Blackboard Instruction", /* AI-written, please review */
    category: "Classrooms & Lecture Halls",
    caption: "Instructor conducting a lecture before a full class", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/classroom-lecture-hall-session.jpg",
    width: 1024,
    height: 771,
    altText: "Teacher standing at the front of a classroom addressing students seated at blue desks", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-900 via-primary-950 to-terracotta-900",
      accentColor: "#DEB53A",
      tag: "Lecture Session",
      iconType: "graduation"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-15",
    title: "Students Attending Classroom Presentation", /* AI-written, please review */
    category: "Classrooms & Lecture Halls",
    caption: "Students seated in rows during class lecture", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/students-lecture-hall-view.jpg",
    width: 1024,
    height: 771,
    altText: "Classroom view of students in uniform seated at dual desks facing the blackboard and teacher", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-950 via-primary-900 to-neutral-900",
      accentColor: "#94B4D8",
      tag: "Classroom Presentation",
      iconType: "users"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-16",
    title: "Students Seated at Study Desks", /* AI-written, please review */
    category: "Classrooms & Lecture Halls",
    caption: "Students listening attentively during an academic class", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/students-desk-discussion.jpg",
    width: 1024,
    height: 771,
    altText: "Front desk view of students in polo shirts with notebooks listening to classroom instruction", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-900 via-primary-800 to-terracotta-800",
      accentColor: "#F1E1A6",
      tag: "Study Desks",
      iconType: "book"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-17",
    title: "Engaged Learning Session in Progress", /* AI-written, please review */
    category: "Classrooms & Lecture Halls",
    caption: "Students focused on learning during classroom lecture", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/engaged-students-classroom.jpg",
    width: 1024,
    height: 771,
    altText: "Side-angle perspective of students seated at study benches listening to the teacher", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-950 via-primary-800 to-neutral-800",
      accentColor: "#C59A1D",
      tag: "Academic Focus",
      iconType: "users"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-18",
    title: "Students Attentive in Study Classroom", /* AI-written, please review */
    category: "Classrooms & Lecture Halls",
    caption: "Students listening during a classroom lecture session", /* AI-written, please review */
    year: 2026,
    aspectRatio: "portrait",
    image: "/images/gallery/classroom-study-notes-session.jpg",
    width: 768,
    height: 1024,
    altText: "Students sitting at wooden classroom desks with open notebooks and pens during a lesson", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-950 via-terracotta-900 to-neutral-900",
      accentColor: "#F1E1A6",
      tag: "Study Hall",
      iconType: "book"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-19",
    title: "Student Presentation at Academic Seminar", /* AI-written, please review */
    category: "Seminars & Institutional Visits",
    caption: "Students speaking at a seminar presentation podium", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/student-seminar-presentation.jpg",
    width: 1024,
    height: 768,
    altText: "Students in uniform standing at a podium addressing the room before a projection screen", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-900 via-primary-950 to-terracotta-900",
      accentColor: "#DEB53A",
      tag: "Student Seminar",
      iconType: "award"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-20",
    title: "Students Attending Seminar Gathering", /* AI-written, please review */
    category: "Seminars & Institutional Visits",
    caption: "Students gathered taking notes during a seminar", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/students-seminar-audience.jpg",
    width: 1024,
    height: 768,
    altText: "Large group of students seated with study sheets and pens listening during an assembly session", /* AI-written, please review */
    featuredInPreview: false,
    theme: {
      gradient: "from-primary-950 via-primary-900 to-neutral-800",
      accentColor: "#94B4D8",
      tag: "Interactive Seminar",
      iconType: "users"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-21",
    title: "Academic Seminar Stage Address", /* AI-written, please review */
    category: "Seminars & Institutional Visits",
    caption: "Speaker addressing an academic gathering from the stage", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/educational-seminar-stage-address.jpg",
    width: 1024,
    height: 770,
    altText: "Speaker at a podium delivering an address on an auditorium stage with educators seated behind", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-950 via-terracotta-900 to-primary-900",
      accentColor: "#DEB53A",
      tag: "Academic Address",
      iconType: "graduation"
    }
  },
  {
    /* AI-written, please review */
    id: "gal-22",
    title: "Faculty Delegation at Institutional Visit", /* AI-written, please review */
    category: "Seminars & Institutional Visits",
    caption: "Academic faculty team during an institutional visit", /* AI-written, please review */
    year: 2026,
    aspectRatio: "landscape",
    image: "/images/gallery/faculty-institutional-visit.jpg",
    width: 1024,
    height: 768,
    altText: "Five educators standing together in a school reception lobby with awards and school banner in background", /* AI-written, please review */
    featuredInPreview: true,
    theme: {
      gradient: "from-primary-950 via-primary-900 to-terracotta-800",
      accentColor: "#DEB53A",
      tag: "Academic Delegation",
      iconType: "users"
    }
  }
];

/**
 * AI-written section content dictionary.
 * All headings, intros, and preview selections are kept here for easy editing.
 */
export const gallerySectionsContent = {
  homepagePreview: {
    /* AI-written, please review */
    eyebrow: "CAMPUS JOURNAL · ASHOK NAGAR",
    title: "Inside the Academy",
    intro: "A glimpse into our classrooms, computer lab sessions, student seminars, and academic faculty delegation."
  },
  galleryPage: {
    /* AI-written, please review */
    eyebrow: "PHOTO ARCHIVE · ASHOK NAGAR CAMPUS",
    title: "Inside Srimanasa Academy",
    intro: "Explore our digital computer laboratory, classroom lecture halls, seminars, and faculty delegation in Chennai."
  },
  aboutFacilities: {
    /* AI-written, please review */
    eyebrow: "FACILITIES & INFRASTRUCTURE",
    title: "Modern Classrooms and Digital Learning Spaces",
    intro: "Equipped with interactive display screens, dedicated computer workstations, and quiet reference reading areas."
  }
};

/**
 * Top 6 curated items featured on the homepage gallery preview (2 Digital Lab + 2 Classroom + 2 Seminar & Delegation)
 */
export const previewGalleryIds = [
  "gal-10", // Computer Lab Orientation Session (Digital Lab)
  "gal-14", // Classroom Lecture with Blackboard Instruction (Lecture Session)
  "gal-21", // Academic Seminar Stage Address (Stage Address)
  "gal-13", // Attentive Learning in Digital Room (Digital Class)
  "gal-16", // Students Seated at Study Desks (Study Desks)
  "gal-22"  // Faculty Delegation at Institutional Visit (Faculty Delegation)
];
