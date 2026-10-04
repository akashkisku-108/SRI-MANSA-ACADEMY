/**
 * @typedef {Object} Testimonial
 * Student and parent testimonial schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   authorName: string,
 *   role: 'student' | 'parent',
 *   designationOrRelation: string,
 *   studentClass: string,
 *   courseTaken: string,
 *   quote: string,
 *   achievementBadge: string,
 *   rating: number,
 *   year: number
 * }
 */

export const testimonials = [
  {
    id: "test-01",
    authorName: "Aditya V. Kashyap",
    role: "student",
    designationOrRelation: "JEE Advanced 2024 AIR 48",
    studentClass: "Class 12 Alumnus",
    courseTaken: "Sankalp: 2-Year Integrated IIT-JEE",
    quote: "What sets Srimanasa apart is how deeply the faculty care about conceptual clarity. Dr. Ramanathan never allowed us to memorize formulas blindly. When the exam threw unconventional questions in Paper 2, that foundational intuition was what saved me. I owe my IIT Bombay seat to the daily doubt sessions here.",
    achievementBadge: "IIT Bombay (CSE)",
    rating: 5,
    year: 2024
  },
  {
    id: "test-02",
    authorName: "Dr. K. Sundaram & Radhika Sundaram",
    role: "parent",
    designationOrRelation: "Parents of Meghana Sundaram (NEET 2024 AIR 84)",
    studentClass: "Class 12 Medical Batch",
    courseTaken: "Sanjeevani: 2-Year Comprehensive NEET",
    quote: "As physicians ourselves, we were very particular about avoiding hyper-commercial factory coaching centers. Srimanasa offered the disciplined, warm academic environment our daughter needed. The faculty's transparency during parent conferences and the calm, exam-temperament coaching made all the difference.",
    achievementBadge: "AIIMS New Delhi Admission",
    rating: 5,
    year: 2024
  },
  {
    id: "test-03",
    authorName: "Tanvi S. Rao",
    role: "student",
    designationOrRelation: "CBSE Class 10 Topper (99.4%)",
    studentClass: "Class 10 Alumna",
    courseTaken: "Pratibha: Class 10 Board Excellence",
    quote: "Before joining Srimanasa, I was terrified of Class 10 Mathematics. Mrs. Gayatri's patience and the structured answer-writing workshops completely changed my perspective. By January, I had completed three mock board cycles and walked into the real examination hall without any anxiety.",
    achievementBadge: "99.4% Board Aggregate",
    rating: 5,
    year: 2024
  },
  {
    id: "test-04",
    authorName: "Sanjay & Meera Deshpande",
    role: "parent",
    designationOrRelation: "Parents of Ananya Deshpande (NEET 2023 AIR 165)",
    studentClass: "Class 12 Medical Batch",
    courseTaken: "Sanjeevani: 2-Year Comprehensive NEET",
    quote: "The batch sizes at Srimanasa are kept strictly under 30 students. Whenever Ananya faced a drop in mock scores, Dr. Murali Reddy called her in for a personalized error analysis instead of scolding. That emotional and academic mentorship is rare to find today.",
    achievementBadge: "BMCRI Bengaluru Admission",
    rating: 5,
    year: 2023
  },
  {
    id: "test-05",
    authorName: "Rohan Siddhartha",
    role: "student",
    designationOrRelation: "JEE Main 99.94 %ile",
    studentClass: "Class 12 Alumnus",
    courseTaken: "Sankalp: 2-Year Integrated IIT-JEE",
    quote: "The Daily Practice Problem (DPP) sets at Srimanasa are unmatched. Rather than handing out 500 random problems, each test curated 20 high-yield multi-concept problems that genuinely tested analytical speed. Prof. Ananya's calculus tips shaved minutes off my exam time.",
    achievementBadge: "IIT Madras (Electrical)",
    rating: 5,
    year: 2024
  },
  {
    id: "test-06",
    authorName: "Rajeshwari Venkat",
    role: "parent",
    designationOrRelation: "Mother of Pranav (Class 9 Foundation)",
    studentClass: "Class 9 Junior Foundation",
    courseTaken: "Udaan: Class 9 Pre-Foundation",
    quote: "We enrolled our son in Udaan to build science curiosity rather than rote learning. The hands-on problem solving and interactive quizzes have given him tremendous confidence. He now voluntarily reads advanced science books without being pushed!",
    achievementBadge: "Junior Olympiad Qualifier",
    rating: 5,
    year: 2024
  }
];
