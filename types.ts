
export enum EducationLevel {
  SECONDARY = 'Secondary (Grades 9-12)',
  TVET = 'TVET College'
}

export enum Grade {
  G9 = 'Grade 9',
  G10 = 'Grade 10',
  G11 = 'Grade 11',
  G12 = 'Grade 12',
  TVET_LEVEL_1 = 'TVET Level 1',
  TVET_LEVEL_2 = 'TVET Level 2',
  TVET_LEVEL_3 = 'TVET Level 3',
  TVET_LEVEL_4 = 'TVET Level 4'
}

export type ExamType = 'mid' | 'final';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  type: 'video' | 'reading' | 'quiz';
}

export interface Course {
  id: string;
  title: string;
  code: string;
  grade: Grade;
  level: EducationLevel;
  thumbnail: string;
  description: string;
  lessons: Lesson[];
  instructor: string;
  subject: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  courseCode: string;
  grade: Grade;
  durationMinutes: number;
  questions: Question[];
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
  type: ExamType;
  semester: 1 | 2;
  subject: string;
}

export interface ExamResult {
  examId: string;
  studentId: string;
  score: number;
  totalPoints: number;
  completedAt: string;
  answers: Record<string, number>;
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: Grade;
  level?: EducationLevel;
  points: number;
  status: 'active' | 'pending' | 'suspended';
  email: string;
  joinedDate: string;
  // Enhanced Personal Info
  nid?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  salary?: number;
  photo?: string;
  certificatesPaid?: string[]; // IDs of certificates paid for
  department?: string;
  phoneNumber?: string;
}
