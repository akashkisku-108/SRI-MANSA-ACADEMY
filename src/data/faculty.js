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
  }
];

