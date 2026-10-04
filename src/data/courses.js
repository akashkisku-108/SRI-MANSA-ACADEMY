/**
 * @typedef {Object} Course
 * Educational course offering schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   name: string,
 *   code: string,
 *   classCategory: 'Class 8' | 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Repeaters',
 *   standardLabel: string,
 *   targetExams: string[],
 *   shortDescription: string,
 *   fullDescription: string,
 *   subjects: string[],
 *   duration: string,
 *   batchTiming: string,
 *   batchSize: string,
 *   keyFeatures: string[],
 *   isFeatured: boolean,
 *   badgeText?: string
 * }
 */

export const courses = [
  {
    id: "course-board-training-2026",
    name: "Academic Board Exam Training (CBSE / ICSE / State Boards)",
    code: "BOARD-2026",
    classCategory: "Class 12",
    standardLabel: "Class 10 & 12 (Board Exam 2026)",
    targetExams: ["CBSE Board", "ICSE / ISC Board", "State Board Exams 2026"],
    shortDescription: "Targeted intensive board exam preparation covering Physics, Chemistry, Biology and Mathematics with daily structured schedule.",
    fullDescription: "Holistic and professionally planned board exam coaching designed to master every concept and boost exam scores. Adopts proven training methodologies backed by an excellent infrastructural base and strong R&D team guided by industry experts.",
    subjects: ["Physics", "Chemistry", "Biology / Mathematics"],
    duration: "November 2025 to January 2026",
    batchTiming: "DAILY Monday to Saturday – 1.5 hours per subject",
    batchSize: "Personal Attention Cohort (Limited Seats)",
    keyFeatures: [
      "Daily Monday to Saturday schedule (1.5 hours per subject)",
      "Affordable fee structure with exclusive study materials",
      "DAILY doubt-clearing sessions with experienced faculties",
      "Personal attention to every student for optimum results"
    ],
    isFeatured: true,
    badgeText: "Nov 2025 – Jan 2026"
  },
  {
    id: "course-jee-crash-2026",
    name: "Crash Course for JEE – 2026",
    code: "JEE-CRASH-2026",
    classCategory: "Class 12",
    standardLabel: "Class 12 (JEE Crash 2026)",
    targetExams: ["JEE Main 2026", "JEE Advanced 2026", "State Engineering Entrances"],
    shortDescription: "Rigorous fast-track engineering entrance training covering Physics, Chemistry, and Mathematics with 2 hours daily per subject.",
    fullDescription: "Engineered specifically for JEE 2026 aspirants. Delivers high quality concept mastery, rapid problem-solving workshops, formula retention strategies, and extensive mock testing delivered through experience and structured processes.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    duration: "November 2025 to March 2026",
    batchTiming: "DAILY Monday to Saturday – 2 hours per subject",
    batchSize: "Personal Attention Cohort (Limited Seats)",
    keyFeatures: [
      "Daily Monday to Saturday schedule (2 hours per subject)",
      "Daily doubt-clearing sessions & formula booster drills",
      "Experienced IITian and senior faculties",
      "Exclusive curated question banks and study materials"
    ],
    isFeatured: true,
    badgeText: "Nov 2025 – Mar 2026"
  },
  {
    id: "course-neet-crash-2026",
    name: "Crash Course for NEET – 2026",
    code: "NEET-CRASH-2026",
    classCategory: "Class 12",
    standardLabel: "Class 12 (NEET Crash 2026)",
    targetExams: ["NEET-UG 2026", "AIIMS Standard", "JIPMER Pattern"],
    shortDescription: "Comprehensive medical entrance crash program covering Physics, Chemistry, and Biology with 2 hours daily per subject.",
    fullDescription: "Specialized crash training for NEET 2026 medical candidates. Focuses on in-depth NCERT mastery, high-yield biology diagram drills, physics numerical shortcuts, and daily timed OMR practice simulations.",
    subjects: ["Physics", "Chemistry", "Biology (Botany & Zoology)"],
    duration: "November 2025 to April 2026",
    batchTiming: "DAILY Monday to Saturday – 2 hours per subject",
    batchSize: "Personal Attention Cohort (Limited Seats)",
    keyFeatures: [
      "Daily Monday to Saturday schedule (2 hours per subject)",
      "Complete line-by-line NCERT Biology & Chemistry drills",
      "Daily doubt-clearing clinics by senior medical faculty",
      "Personalized attention to each student for score acceleration"
    ],
    isFeatured: true,
    badgeText: "Nov 2025 – Apr 2026"
  },
  {
    id: "course-crash-engg-or-med",
    name: "JEE / NEET Crash Course 2027 (Engineering OR Medical)",
    code: "CRASH-2027-SINGLE",
    classCategory: "Class 12",
    standardLabel: "Class 12 (Crash Course 2027)",
    targetExams: ["JEE Main", "NEET-UG"],
    shortDescription: "Specialized high-impact Class XII crash batch focusing on high-weightage chapters, time management drills, and full test series.",
    fullDescription: "Targeted crash preparation for Class XII students preparing for either Engineering (JEE) OR Medical (NEET) 2027. Includes comprehensive study material, periodical 1-on-1 performance monitoring, and rapid mock test clinics.",
    subjects: ["Physics", "Chemistry", "Mathematics OR Biology"],
    duration: "Fast-Track",
    batchTiming: "Daily / Flexible Batches",
    batchSize: "Personal Attention Cohort",
    feeDetails: {
      originalFee: "Rs. 27,000",
      discount: "Rs. 2,500",
      discountedFee: "Rs. 24,500",
      taxNote: "Incl. Tax",
      registrationFee: "Rs. 500",
      installments: "3 Months Instalments offered (PDC required)",
      paymentModes: "Cash / Cheque in favor of Srimanasa Educational Academy"
    },
    keyFeatures: [
      "Registration Fee: Rs. 500/- only",
      "Comprehensive printed study material included",
      "Three months instalment options available (PDC at admission)",
      "Periodical & personalized attention to each student"
    ],
    isFeatured: true,
    badgeText: "Crash Course 2027"
  },
  {
    id: "course-crash-engg-and-med",
    name: "Dual Target Crash Course 2027 (Engineering & Medical)",
    code: "CRASH-2027-DUAL",
    classCategory: "Class 12",
    standardLabel: "Class 12 (Crash Course 2027 - Dual)",
    targetExams: ["JEE Main", "NEET-UG", "State Entrances"],
    shortDescription: "Comprehensive combined crash program covering PCMB for students aiming for both Engineering and Medical entrance examinations.",
    fullDescription: "All-in-one intensive preparation covering Physics, Chemistry, Mathematics, and Biology. Ideal for Class XII students keeping all premier medical and engineering options open with daily problem sheets and mock exams.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    duration: "Fast-Track (PCMB)",
    batchTiming: "Daily / Flexible Batches",
    batchSize: "Personal Attention Cohort",
    feeDetails: {
      originalFee: "Rs. 33,500",
      discount: "Rs. 2,500",
      discountedFee: "Rs. 31,000",
      taxNote: "Incl. Tax",
      registrationFee: "Rs. 500",
      installments: "3 Months Instalments offered (PDC required)",
      paymentModes: "Cash / Cheque in favor of Srimanasa Educational Academy"
    },
    keyFeatures: [
      "Registration Fee: Rs. 500/- only",
      "Full PCMB curriculum & study material included",
      "3-Month instalments offered with post-dated cheques",
      "Periodical error-analysis and faculty doubt clearing"
    ],
    isFeatured: true,
    badgeText: "Dual Stream Booster"
  }
];
