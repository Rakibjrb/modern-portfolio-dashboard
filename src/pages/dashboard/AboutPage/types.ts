export interface IAbout {
  contacts: {
    phone: string;
    email: string;
  };
  image: string;
  name: string;
  designation: string;
  experience: number;
  techstack: string;
  completedProjects: number;
  currentRole: string;
  description: string;
  quote: string;
  cvlink: string;
  socialsLinks: {
    iconUrl: string;
    name: string;
    url: string;
  }[];
  createdAt: string | Date;
  updatedAt: string | Date;
  skills: {
    iconUrl: string;
    name: string;
  }[];
}
