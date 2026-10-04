/**
 * @typedef {Object} FacultyMember
 * Academic faculty profile schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   name: string,
 *   role: string,
 *   subject: string,
 *   qualification: string,
 *   experience: string,
 *   experienceYears: number,
 *   almaMater: string,
 *   bio: string,
 *   specializations: string[],
 *   initials: string,
 *   avatarAccent: string
 * }
 */

export const faculty = [
  {
    id: "fac-1",
    name: "Dr. K. S. Ramanathan",
    role: "Academic Director & Head of Physics",
    subject: "Physics",
    qualification: "Ph.D. in Applied Physics, M.Sc. (Physics, IIT Madras)",
    experience: "19+ Years Mentoring",
    experienceYears: 19,
    almaMater: "IIT Madras & IISc Bengaluru",
    bio: "Renowned across South India for making Electrodynamics and Rotational Mechanics intuitive through live physical demos. Has personally guided over 140 students into top 500 ranks in JEE Advanced.",
    specializations: ["Mechanics", "Electromagnetism", "Modern Physics"],
    initials: "KR",
    avatarAccent: "#1F416D"
  },
  {
    id: "fac-2",
    name: "Prof. Ananya Sen",
    role: "Senior Faculty & Head of Mathematics",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics (Gold Medalist), B.Ed.",
    experience: "15+ Years Mentoring",
    experienceYears: 15,
    almaMater: "Calcutta University & ISI Visiting Fellow",
    bio: "Passionate mathematician known for transforming student fear of Calculus and Coordinate Geometry into their highest scoring sections through systematic visual proofs.",
    specializations: ["Differential Calculus", "Coordinate Geometry", "Probability"],
    initials: "AS",
    avatarAccent: "#A77D13"
  },
  {
    id: "fac-3",
    name: "Dr. Murali Mohan Reddy",
    role: "Head of Chemistry & Medical Program Dean",
    subject: "Chemistry",
    qualification: "Ph.D. in Organic Chemistry, CSIR-NET JRF",
    experience: "17+ Years Mentoring",
    experienceYears: 17,
    almaMater: "Osmania University & NCL Pune Postdoc",
    bio: "Pioneer of reaction mechanism flowcharts. His unique mnemonics and mechanistic breakdowns have enabled NEET aspirants to consistently score 170+ out of 180 in Chemistry.",
    specializations: ["Organic Reaction Mechanisms", "Coordination Compounds", "Thermodynamics"],
    initials: "MR",
    avatarAccent: "#183355"
  },
  {
    id: "fac-4",
    name: "Dr. Deepa Raghavan",
    role: "Senior Faculty, Biology & Medical Life Sciences",
    subject: "Biology (Botany & Zoology)",
    qualification: "MBBS, M.S. (Clinical Anatomy)",
    experience: "12+ Years Mentoring",
    experienceYears: 12,
    almaMater: "BMCRI (Bangalore Medical College)",
    bio: "Brings clinical clarity to Human Physiology and Genetics. Author of high-yield NCERT diagram guides used by hundreds of successful medical students.",
    specializations: ["Human Physiology", "Genetics & Molecular Biology", "Ecology"],
    initials: "DR",
    avatarAccent: "#2A558B"
  },
  {
    id: "fac-5",
    name: "Er. Arvind Narayanan",
    role: "Faculty, Physical & Inorganic Chemistry",
    subject: "Physical Chemistry",
    qualification: "B.Tech (Chemical Engineering, NIT Trichy)",
    experience: "11+ Years Mentoring",
    experienceYears: 11,
    almaMater: "NIT Trichy",
    bio: "Specialist in high-speed numerical calculation methods and chemical equilibrium simulations. Loved by students for his engaging problem clinics and patience.",
    specializations: ["Electrochemistry", "Chemical Equilibrium", "Solid State"],
    initials: "AN",
    avatarAccent: "#3D70A9"
  },
  {
    id: "fac-6",
    name: "Mrs. Gayatri Swaminathan",
    role: "Head of Junior Foundation (Classes 8–10)",
    subject: "Foundation Science & Mathematics",
    qualification: "M.Sc. Physics, B.Ed. (State Rank 1)",
    experience: "14+ Years Mentoring",
    experienceYears: 14,
    almaMater: "Madras University",
    bio: "Expert in pedagogy for middle schoolers. She inspires genuine curiosity in scientific experimentation and builds unflinching mathematical fundamentals.",
    specializations: ["NTSE Mental Ability", "Junior Physics", "Algebraic Foundations"],
    initials: "GS",
    avatarAccent: "#7E5B10"
  }
];
