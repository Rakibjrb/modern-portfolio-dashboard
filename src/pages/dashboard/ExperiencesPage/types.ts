export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: EmploymentType;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities: string[];
  achievements: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  result: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  order: number;
}

export type ActiveTab = 'experience' | 'education';
