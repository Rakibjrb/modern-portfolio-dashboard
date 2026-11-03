export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ProjectCategory =
  | ""
  | "MERN"
  | "Frontend"
  | "Backend"
  | "Automation";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  techStack: string[];
  liveUrl?: string;
  githubClientUrl?: string;
  githubServerUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}
