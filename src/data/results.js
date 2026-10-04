/**
 * @typedef {Object} StudentResult
 * Academic achievement record schema.
 * 
 * Shape:
 * {
 *   id: string,
 *   studentName: string,
 *   exam: string,
 *   year: number,
 *   scoreOrRank: string,
 *   rankType: 'AIR' | 'State Rank' | 'Score' | 'Percentile',
 *   courseEnrolled: string,
 *   school: string,
 *   collegeAllotted?: string,
 *   isFeatured?: boolean
 * }
 */

export const resultsStats = [
  {
    label: "Highest JEE Adv. All India Rank",
    value: "AIR 48",
    detail: "Class of 2024 (Sankalp Batch)"
  },
  {
    label: "Top NEET Score",
    value: "710 / 720",
    detail: "AIR 84, Admitted to AIIMS New Delhi"
  },
  {
    label: "Class 10 CBSE Board Topper",
    value: "99.4%",
    detail: "Centum in Mathematics & Science"
  },
  {
    label: "Students Scoring >95% in Boards",
    value: "184",
    detail: "Across 2024 CBSE & State Board batches"
  }
];

export const studentResults = [
  {
    id: "res-01",
    studentName: "Aditya V. Kashyap",
    exam: "JEE Advanced",
    year: 2024,
    scoreOrRank: "AIR 48",
    rankType: "AIR",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "National Public School, Indiranagar",
    collegeAllotted: "IIT Bombay (Computer Science & Engg.)",
    isFeatured: true
  },
  {
    id: "res-02",
    studentName: "Meghana Sundaram",
    exam: "NEET UG",
    year: 2024,
    scoreOrRank: "710/720 (AIR 84)",
    rankType: "AIR",
    courseEnrolled: "Sanjeevani: 2-Year Comprehensive NEET",
    school: "DPS South, Bengaluru",
    collegeAllotted: "AIIMS New Delhi (MBBS)",
    isFeatured: true
  },
  {
    id: "res-03",
    studentName: "Rohan Siddhartha",
    exam: "JEE Main",
    year: 2024,
    scoreOrRank: "99.94 %ile",
    rankType: "Percentile",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "Kendriya Vidyalaya, IISc Campus",
    collegeAllotted: "IIT Madras (Electrical Engg.)",
    isFeatured: true
  },
  {
    id: "res-04",
    studentName: "Pooja Krishnamurthy",
    exam: "CBSE Class 12 Boards",
    year: 2024,
    scoreOrRank: "99.2%",
    rankType: "Score",
    courseEnrolled: "Shikhar: Class 12 Board + Competitive",
    school: "Bishop Cotton Girls' School",
    collegeAllotted: "IISc Bengaluru (BS Research)",
    isFeatured: true
  },
  {
    id: "res-05",
    studentName: "Varun Teja",
    exam: "NEET UG",
    year: 2024,
    scoreOrRank: "695/720 (AIR 240)",
    rankType: "AIR",
    courseEnrolled: "Sanjeevani: 2-Year Comprehensive NEET",
    school: "Sri Kumaran Children's Home",
    collegeAllotted: "JIPMER Puducherry (MBBS)",
    isFeatured: false
  },
  {
    id: "res-06",
    studentName: "Tanvi S. Rao",
    exam: "CBSE Class 10 Boards",
    year: 2024,
    scoreOrRank: "99.4%",
    rankType: "Score",
    courseEnrolled: "Pratibha: Class 10 Board Excellence",
    school: "The Valley School, Bengaluru",
    collegeAllotted: "School Topper & NTSE Scholar",
    isFeatured: true
  },
  {
    id: "res-07",
    studentName: "Naveen Chandran",
    exam: "KCET Engineering",
    year: 2024,
    scoreOrRank: "Rank 14",
    rankType: "State Rank",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "BGS National Public School",
    collegeAllotted: "RV College of Engineering",
    isFeatured: false
  },
  {
    id: "res-08",
    studentName: "Siddharth Menon",
    exam: "JEE Advanced",
    year: 2023,
    scoreOrRank: "AIR 132",
    rankType: "AIR",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "National Public School, Koramangala",
    collegeAllotted: "IIT Delhi (Computer Science)",
    isFeatured: true
  },
  {
    id: "res-09",
    studentName: "Ananya Deshpande",
    exam: "NEET UG",
    year: 2023,
    scoreOrRank: "702/720 (AIR 165)",
    rankType: "AIR",
    courseEnrolled: "Sanjeevani: 2-Year Comprehensive NEET",
    school: "Presidency School, Bengaluru",
    collegeAllotted: "BMCRI Bengaluru (MBBS)",
    isFeatured: true
  },
  {
    id: "res-10",
    studentName: "Karthik Bharadwaj",
    exam: "CBSE Class 12 Boards",
    year: 2023,
    scoreOrRank: "98.8%",
    rankType: "Score",
    courseEnrolled: "Shikhar: Class 12 Board + Competitive",
    school: "Delhi Public School East",
    collegeAllotted: "BITS Pilani (Computer Science)",
    isFeatured: false
  },
  {
    id: "res-11",
    studentName: "Priyanka Nambiar",
    exam: "ICSE Class 10 Boards",
    year: 2023,
    scoreOrRank: "99.0%",
    rankType: "Score",
    courseEnrolled: "Pratibha: Class 10 Board Excellence",
    school: "St. Joseph's Boys' High School",
    collegeAllotted: "Centum in Mathematics & Physics",
    isFeatured: false
  },
  {
    id: "res-12",
    studentName: "Abhishek Kulkarni",
    exam: "JEE Main",
    year: 2023,
    scoreOrRank: "99.88 %ile",
    rankType: "Percentile",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "HAL Public School",
    collegeAllotted: "NIT Surathkal (CSE)",
    isFeatured: false
  },
  {
    id: "res-13",
    studentName: "Chinmayee Hegde",
    exam: "JEE Advanced",
    year: 2022,
    scoreOrRank: "AIR 210",
    rankType: "AIR",
    courseEnrolled: "Sankalp: 2-Year Integrated IIT-JEE",
    school: "Sishu Griha, Thippasandra",
    collegeAllotted: "IIT Madras (Mechanical Engg.)",
    isFeatured: true
  },
  {
    id: "res-14",
    studentName: "Kavya Shankar",
    exam: "NEET UG",
    year: 2022,
    scoreOrRank: "688/720 (AIR 312)",
    rankType: "AIR",
    courseEnrolled: "Sanjeevani: 2-Year Comprehensive NEET",
    school: "Sindhi High School",
    collegeAllotted: "Madras Medical College (MBBS)",
    isFeatured: false
  },
  {
    id: "res-15",
    studentName: "Vikram R. Shetty",
    exam: "CBSE Class 10 Boards",
    year: 2022,
    scoreOrRank: "98.6%",
    rankType: "Score",
    courseEnrolled: "Pratibha: Class 10 Board Excellence",
    school: "Clarence High School",
    collegeAllotted: "School Subject Topper",
    isFeatured: false
  }
];
