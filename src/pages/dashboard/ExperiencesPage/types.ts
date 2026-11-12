export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";

export interface Experience {
  title: string;
  organization: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  responsibilities: string[];
  achievements: string[];
  location: string;
  type: string;
  _id: string;
}

export interface Education {
  title: string;
  organization: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  degree: string;
  fieldOfStudy: string;
  result: string;
  location: string;
  _id: string;
}

export type ActiveTab = "experience" | "education";
