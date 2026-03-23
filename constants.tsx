
import { Course, Grade, EducationLevel, Exam } from './types';

// Helper to generate a placeholder thumbnail based on subject
const getThumb = (subject: string) => `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&sig=${subject}`;

export const MOCK_COURSES: Course[] = [
  // --- GRADE 9-10 (13 SUBJECTS) ---
  {
    id: 'g9-math',
    title: 'Mathematics Grade 9',
    code: 'MATH9',
    grade: Grade.G9,
    level: EducationLevel.SECONDARY,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd48219d1?auto=format&fit=crop&q=80&w=400',
    description: 'Fundamental algebra, geometry, and number systems for secondary education.',
    instructor: 'Abebe Bikila',
    subject: 'Mathematics',
    lessons: [
      { id: 'm9-l1', title: 'The Real Number System', duration: '20m', content: 'Understanding rational and irrational numbers.', type: 'reading' },
      { id: 'm9-l2', title: 'Linear Equations', duration: '35m', content: 'Solving equations with one variable.', type: 'video' }
    ]
  },
  {
    id: 'g10-bio',
    title: 'Biology Grade 10',
    code: 'BIO10',
    grade: Grade.G10,
    level: EducationLevel.SECONDARY,
    thumbnail: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400',
    description: 'Study of life, human anatomy, and environmental biology.',
    instructor: 'Dr. Selamawit Tadesse',
    subject: 'Biology',
    lessons: [
      { id: 'b10-l1', title: 'Cell Biology', duration: '40m', content: 'Structure and function of animal and plant cells.', type: 'video' }
    ]
  },
  ...['Afan Oromo', 'Amharic', 'English', 'Physics', 'Chemistry', 'History', 'Geography', 'Citizenship', 'Economics', 'IT', 'HPE'].map((sub, i) => ({
    id: `g9-${sub.toLowerCase().replace(' ', '-')}`,
    title: `${sub} Grade 9`,
    code: `${sub.substring(0, 3).toUpperCase()}9`,
    grade: Grade.G9,
    level: EducationLevel.SECONDARY,
    thumbnail: getThumb(sub),
    description: `Official Ethiopian Curriculum for ${sub} Grade 9.`,
    instructor: 'Dept. Faculty',
    subject: sub,
    lessons: []
  })),

  // --- GRADE 11-12 SOCIAL SCIENCE ---
  {
    id: 'g12-hist-soc',
    title: 'History Grade 12 (Social Science)',
    code: 'HIST12-S',
    grade: Grade.G12,
    level: EducationLevel.SECONDARY,
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400',
    description: 'Comprehensive study of Ethiopian and World History.',
    instructor: 'Mulugeta Tesfaye',
    subject: 'History',
    lessons: [
      { id: 'h12-l1', title: 'The Axumite Civilization', duration: '45m', content: 'Rise and fall of the northern empire.', type: 'video' }
    ]
  },
  ...['English', 'Afan Oromo', 'Maths', 'Geography', 'Economics', 'Accounting', 'IT'].map((sub, i) => ({
    id: `g11-soc-${sub.toLowerCase()}`,
    title: `${sub} Grade 11 (Social)`,
    code: `${sub.substring(0, 3).toUpperCase()}11S`,
    grade: Grade.G11,
    level: EducationLevel.SECONDARY,
    thumbnail: getThumb(sub + 'social'),
    description: `Social Science track module for ${sub}.`,
    instructor: 'Social Science Dept',
    subject: sub,
    lessons: []
  })),

  // --- GRADE 11-12 NATURAL SCIENCE ---
  {
    id: 'g12-phys-nat',
    title: 'Physics Grade 12 (Natural Science)',
    code: 'PHYS12-N',
    grade: Grade.G12,
    level: EducationLevel.SECONDARY,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400',
    description: 'Advanced mechanics, electromagnetism, and modern physics.',
    instructor: 'Kassa Hunegnaw',
    subject: 'Physics',
    lessons: [
      { id: 'p12-l1', title: 'Quantum Mechanics Intro', duration: '50m', content: 'The nature of particles and waves.', type: 'video' }
    ]
  },
  ...['English', 'Afan Oromo', 'Maths', 'Chemistry', 'Biology', 'IT', 'Agriculture', 'Drawing'].map((sub, i) => ({
    id: `g11-nat-${sub.toLowerCase()}`,
    title: `${sub} Grade 11 (Natural)`,
    code: `${sub.substring(0, 3).toUpperCase()}11N`,
    grade: Grade.G11,
    level: EducationLevel.SECONDARY,
    thumbnail: getThumb(sub + 'natural'),
    description: `Natural Science track module for ${sub}.`,
    instructor: 'Natural Science Dept',
    subject: sub,
    lessons: []
  })),

  // --- TVET COLLEGE (LEVEL 1-4) ---
  {
    id: 'tvet-it-l1',
    title: 'Information Technology Level 1',
    code: 'TVET-IT-L1',
    grade: Grade.TVET_LEVEL_1,
    level: EducationLevel.TVET,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400',
    description: 'Foundational computer skills and software maintenance.',
    instructor: 'Yonas Getachew',
    subject: 'Information Technology',
    lessons: [
      { id: 't-it-l1', title: 'Hardware Basics', duration: '30m', content: 'Identifying computer components.', type: 'reading' }
    ]
  },
  ...['Human Resource Management', 'Economics', 'Design and Drawing', 'General English', 'General Mathematics'].map((sub, i) => ({
    id: `tvet-${sub.toLowerCase().replace(' ', '-')}-l3`,
    title: `${sub} Level 3`,
    code: `TVET-${sub.substring(0, 3).toUpperCase()}-L3`,
    grade: Grade.TVET_LEVEL_3,
    level: EducationLevel.TVET,
    thumbnail: getThumb(sub + 'tvet'),
    description: `Vocational competency module for ${sub}.`,
    instructor: 'Vocational Trainer',
    subject: sub,
    lessons: []
  }))
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'math-s1-mid',
    title: 'G12 Mathematics Mid-Term (Sem 1)',
    courseCode: 'MATH12-N',
    grade: Grade.G12,
    durationMinutes: 60,
    totalPoints: 40,
    status: 'published',
    type: 'mid',
    semester: 1,
    subject: 'Mathematics',
    questions: [{ id: 'q1', text: 'Which of the following is a prime number?', options: ['4', '6', '7', '9'], correctAnswer: 2, points: 5 }]
  }
];

export const MOCK_NEWS = [
  {
    id: 'n1',
    date: 'Oct 24, 2024',
    tag: 'National',
    title: '2024 Grade 12 National Exam Schedule Released',
    summary: 'The Ministry of Education has officially announced the registration dates and examination window for the upcoming academic year. Students are advised to verify their NID records.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400',
    content: 'Registration will take place from November 1st to November 30th. Exams are scheduled for the last week of May 2025. Ensure your biometric data is updated in the IFTU system.'
  },
  {
    id: 'n2',
    date: 'Oct 22, 2024',
    tag: 'TVET',
    title: 'New Level 4 Competency Standards for ICT',
    summary: 'Updated COC standards for Information Technology Level 4 have been published. Training providers must align their modules by January.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
    content: 'The new standards include advanced cybersecurity modules and cloud infrastructure management. Trainers can download the new assessment tools from the portal.'
  },
  {
    id: 'n3',
    date: 'Oct 20, 2024',
    tag: 'Infrastructure',
    title: '500+ Secondary Schools Connected to IFTU Hub',
    summary: 'The Digital Literacy initiative has successfully connected over 500 schools across Oromia and Amhara regions to the central LMS.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400',
    content: 'This connection allows offline access to IFTU resources through local servers, ensuring students in areas with low connectivity can still learn effectively.'
  }
];
