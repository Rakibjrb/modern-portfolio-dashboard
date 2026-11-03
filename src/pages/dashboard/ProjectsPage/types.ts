import { type Meta as CommonMeta } from "../../../types/common.types";

export type Meta = CommonMeta;

export type ProjectCategory = "MERN" | "Frontend" | "Backend" | "Automation";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  technologies: string[];
  url: {
    live: string;
    githubClient?: string | undefined;
    githubServer?: string | undefined;
  };
  featured: boolean;
  order: number;
  createdAt: string;
}
