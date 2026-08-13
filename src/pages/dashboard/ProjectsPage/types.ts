export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Backend' | 'Automation';

export type ViewMode = 'grid' | 'table';

export type SortOption = 'latest' | 'order' | 'title-asc' | 'title-desc';

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
