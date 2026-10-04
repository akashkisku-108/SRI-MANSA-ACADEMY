/**
 * @typedef {Object} SiteConfig
 * Academy global metadata, contact details, social links, and key numerical metrics.
 * Field schema uses camelCase for modern JS / JSON REST API compatibility.
 * 
 * Shape:
 * {
 *   academyName: string,
 *   tagline: string,
 *   subTagline: string,
 *   foundedYear: number,
 *   contact: {
 *     phone: string,
 *     phoneDisplay: string,
 *     altPhone: string,
 *     email: string,
 *     address: {
 *       street: string,
 *       landmark: string,
 *       area: string,
 *       city: string,
 *       state: string,
 *       pincode: string,
 *       fullAddress: string
 *     },
 *     officeHours: string,
 *     mapsEmbedUrl: string,
 *     whatsappNumber: string,
 *     whatsappDefaultMessage: string
 *   },
 *   socials: Array<{ platform: string, label: string, url: string }>,
 *   stats: Array<{ id: string, label: string, value: string, suffix: string, description: string }>
 * }
 */

export const siteConfig = {
  academyName: "Srimanasa Educational Academy",
  shortName: "Srimanasa",
  tagline: "Bridge to Lead — Spearheading Educational Excellence",
  subTagline: "Providing holistic and professionally planned educational support with well-researched courses from Board Exams to Entrance Exams 2026 (CBSE / ICSE / State Boards, JEE & NEET).",
  motto: "Boost Your Scores. Master Every Concept. Excel in Exams!",
  foundedYear: 2011,

  contact: {
    phone: "+917397689062",
    phoneDisplay: "+91 73976 89062",
    altPhone: "+91 91509 99611",
    email: "srimanasaedu11@gmail.com",
    supportEmail: "srimanasaedu11@gmail.com",
    address: {
      building: "No. 33/52, 53rd Street",
      street: "Indira Colony",
      landmark: "Near Ashok Pillar",
      area: "Ashok Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600083",
      fullAddress: "No. 33/52, 53rd Street, Indira Colony, Ashok Nagar, Chennai, Tamil Nadu – 600083"
    },
    officeHours: "Monday – Saturday: 8:30 AM – 7:30 PM | Sunday: 9:00 AM – 2:00 PM",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7291122176467!2d80.20786967507746!3d13.03383098728734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e07a683935%3A0xe54d6d6cefbbe239!2sAshok%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    whatsappNumber: "917397689062",
    whatsappDefaultMessage: "Hello Srimanasa Educational Academy, I would like to enquire about the JEE/NEET Crash Course 2027 for Class XII and admission details."
  },

  socials: [
    { platform: "youtube", label: "YouTube Lectures", url: "https://youtube.com" },
    { platform: "facebook", label: "Facebook Community", url: "https://facebook.com" },
    { platform: "instagram", label: "Instagram Campus Life", url: "https://instagram.com" },
    { platform: "linkedin", label: "LinkedIn Official", url: "https://linkedin.com" }
  ],

  stats: [
    {
      id: "stat-1",
      label: "Academic Focus",
      value: "Boards & Entrances",
      suffix: "",
      description: "CBSE, ICSE, State Board & JEE / NEET crash batches"
    },
    {
      id: "stat-2",
      label: "Classroom Attention",
      value: "Personalized",
      suffix: " Care",
      description: "Periodical review and individual student guidance"
    },
    {
      id: "stat-3",
      label: "Doubt Resolution",
      value: "Daily",
      suffix: " Slots",
      description: "Dedicated daily doubt-clearing sessions with faculties"
    },
    {
      id: "stat-4",
      label: "Curriculum Material",
      value: "Exclusive",
      suffix: " Sets",
      description: "Well-researched, comprehensive course materials"
    }
  ]
};
