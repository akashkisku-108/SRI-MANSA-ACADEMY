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
    name: "Rishikesh Anand",
    role: "Physics Faculty",
    subject: "Physics",
    qualification: "Bachelor Degree in Electrical Engineering",
    experience: "4+ Years Mentoring",
    experienceYears: 4,
    almaMater: "Government Engineering College Palamu",
    bio: "Passionate physics educator dedicated to simplifying core concepts and problem-solving techniques for competitive examinations and foundation learning.",
    specializations: ["Mechanics", "Electrodynamics", "Online Teaching & Visual Learning"],
    initials: "RA",
    avatarAccent: "#1F416D",
    photo: "/faculty-rishikesh.jpg"
  },
  {
    id: "fac-2",
    name: "Pranjal Kumar",
    role: "Chemistry Faculty",
    subject: "Chemistry",
    qualification: "B. Tech in Production engineering",
    experience: "4 years",
    experienceYears: 4,
    bio: "An engineering graduate who brings a structured and analytical approach to teaching Chemistry. Emphasises understanding chemical principles, mastering problem-solving techniques, and developing subject proficiency through focused, exam-oriented preparation for JEE, NEET, and Board examinations.",
    initials: "PK",
    avatarAccent: "#C86244",
    photo: "/faculty-pranjal.jpg"
  },
  {
    id: "fac-3",
    name: "Suraj Sharma",
    role: "Biology Faculty",
    subject: "Biology",
    qualification: "B. Pharma",
    experience: "2 years",
    experienceYears: 2,
    bio: "A pharmaceutical science graduate with a strong academic foundation in biological sciences and human physiology. Focuses on making complex biological concepts easier to grasp through clear explanations, systematic learning, and a strong emphasis on conceptual understanding and exam-oriented preparation for NEET and Board examinations.",
    initials: "SS",
    avatarAccent: "#2E7D32",
    photo: "/faculty-suraj.jpg"
  },
  {
    id: "fac-4",
    name: "Rohit Ram",
    role: "Maths Faculty",
    subject: "Maths",
    qualification: "B. Tech in Mechanical engineering",
    experience: "3 years",
    experienceYears: 3,
    bio: "A Mechanical Engineer with a strong foundation in mathematical principles and analytical reasoning. Focuses on developing logical thinking, strengthening problem-solving abilities, and building mathematical proficiency through structured learning and targeted preparation for JEE and Board examinations.",
    initials: "RR",
    avatarAccent: "#122033"
  },
  {
    id: "fac-5",
    name: "SHUBHAM ROY",
    role: "Senior Faculty & Academic Director",
    subject: "Engineering & Sciences",
    qualification: "B. Tech in Mechanical Engineering",
    experience: "10 years",
    experienceYears: 10,
    bio: "A dynamic education professional with a B.Tech in Mechanical Engineering and over 10 years of teaching experience. Experienced in academic coordination, curriculum and content development, and leading a team of 20+ faculty members. Founder of a successfully established coaching institute, with expertise in teaching multiple subjects, academic management, and building result-oriented educational programmes. Passionate about innovative teaching methodologies, team development, and delivering academic excellence.",
    initials: "SR",
    avatarAccent: "#1E3A8A",
    photo: "/faculty-shubham.jpg"
  }
];

