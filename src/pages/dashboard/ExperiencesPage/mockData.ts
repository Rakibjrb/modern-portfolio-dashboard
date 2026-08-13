import { type Experience, type Education } from './types';

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Senior Full Stack Engineer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    startDate: '2023-01',
    isCurrent: true,
    responsibilities: [
      'Architected micro-frontend architecture using Next.js 14, Tailwind CSS, and Module Federation.',
      'Engineered high-throughput GraphQL APIs handling over 2M daily requests with Sub-50ms latency.',
      'Mentored a team of 6 junior and mid-level software engineers on best practices, code reviews, and CI/CD pipelines.'
    ],
    achievements: [
      'Reduced initial web app bundle size by 42% through smart code-splitting and asset optimization.',
      'Spearheaded automated E2E testing strategy with Playwright, raising release reliability to 99.8%.'
    ],
    order: 1,
  },
  {
    id: 'exp-2',
    title: 'Lead Frontend Developer',
    company: 'Innovate Studio',
    location: 'New York, NY (Remote)',
    type: 'Contract',
    startDate: '2021-06',
    endDate: '2022-12',
    isCurrent: false,
    responsibilities: [
      'Designed and built dynamic design systems used across 5 core client SaaS applications.',
      'Integrated WebSockets and Server-Sent Events (SSE) for real-time collaborative dashboard analytics.',
      'Partnered closely with UX designers to ensure pixel-perfect accessibility (WCAG 2.1 AA standards).'
    ],
    achievements: [
      'Delivered 3 major client portals ahead of schedule, generating over $1.2M in annual recurring revenue.',
      'Won Internal Innovation Award for building interactive canvas data visualization widgets.'
    ],
    order: 2,
  },
  {
    id: 'exp-3',
    title: 'UI/UX & Frontend Engineer',
    company: 'Nexus Digital',
    location: 'Austin, TX (On-site)',
    type: 'Full-time',
    startDate: '2019-08',
    endDate: '2021-05',
    isCurrent: false,
    responsibilities: [
      'Developed responsive UI components using React, Redux Toolkit, and Styled Components.',
      'Optimized web vitals (LCP, CLS, FID) across high-traffic landing pages.',
      'Maintained legacy Vue.js applications and migrated them to modern React TS stacks.'
    ],
    achievements: [
      'Improved lighthouse performance score from 64 to 98 on primary product dashboard.',
      'Standardized component library documentation using Storybook.'
    ],
    order: 3,
  }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'Master of Science',
    fieldOfStudy: 'Software Engineering & Cloud Computing',
    institution: 'Stanford University',
    result: 'GPA: 3.92 / 4.00',
    location: 'Stanford, CA',
    startDate: '2017-09',
    endDate: '2019-06',
    isCurrent: false,
    description: 'Specialized in Distributed Systems, Distributed Storage Systems, and Advanced Web Security.',
    order: 1,
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science & Engineering',
    institution: 'University of California, Berkeley',
    result: 'First Class Honors (GPA 3.88)',
    location: 'Berkeley, CA',
    startDate: '2013-08',
    endDate: '2017-05',
    isCurrent: false,
    description: 'President of Computer Science Society, published research paper on client-side state optimization.',
    order: 2,
  }
];
