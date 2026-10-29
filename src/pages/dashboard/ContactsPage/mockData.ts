import { type ContactMessage } from './types';

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Sarah Jenkins',
    senderEmail: 'sarah.jenkins@acmecorp.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    subject: 'Senior Frontend Architect Opportunity at Acme Corp',
    message: `Hi there! I came across your portfolio dashboard and was extremely impressed by your work on scalable frontend architecture and design systems.

We are currently expanding our core engineering team at Acme Corp and looking for a Senior Frontend Architect to lead our Next.js micro-frontend migration. 

Would you be open to a 15-minute intro chat this week to discuss your availability and project goals?

Best regards,
Sarah Jenkins
Head of Technical Recruiting @ Acme Corp`,
    timestamp: '2026-08-13T10:15:00Z',
    relativeTime: '15m ago',
    isRead: false,
    isStarred: true,
  },
  {
    id: 'msg-2',
    senderName: 'Alex Rivera',
    senderEmail: 'arivera@designcraft.io',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subject: 'Freelance Design System & Dashboard Contract',
    message: `Hello! We're building a new fintech analytics platform for enterprise client management. 

Your dashboard UI components and dark mode aesthetic align perfectly with our vision. We'd love to hire you for a 6-week contract to build out our interactive charting components and slide-over drawers.

Could you share your standard hourly rate and current capacity for Q3?

Thanks,
Alex Rivera
Design Lead @ DesignCraft`,
    timestamp: '2026-08-13T08:30:00Z',
    relativeTime: '2h ago',
    isRead: false,
    isStarred: false,
  },
  {
    id: 'msg-3',
    senderName: 'Marcus Vance',
    senderEmail: 'm.vance@ventureflow.vc',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    subject: 'Consulting & Technical Advisory Inquiry',
    message: `Hi Rakib,

Loved your recent open-source portfolio template. Our portfolio startups frequently ask for advice on optimizing web vitals and React performance.

Are you available for advisory/consulting sessions on a monthly basis?

Looking forward to hearing from you.

Best,
Marcus Vance
Partner, VentureFlow VC`,
    timestamp: '2026-08-12T16:45:00Z',
    relativeTime: '1d ago',
    isRead: true,
    isStarred: true,
  },
  {
    id: 'msg-4',
    senderName: 'Elena Rostova',
    senderEmail: 'elena@techpulse.org',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subject: 'Speaking Invitation: React & Modern Web Summit 2026',
    message: `Dear Speaker,

On behalf of the TechPulse Organizing Committee, we would like to formally invite you to deliver a keynote presentation at the upcoming React & Modern Web Summit.

Your talk would focus on "Building High-Performance Web Dashboards with Tailwind CSS and Component Architecture".

Please let us know if you're interested so we can send over the formal agreement and travel arrangements.

Warmly,
Elena Rostova
Program Director`,
    timestamp: '2026-08-11T11:20:00Z',
    relativeTime: '2d ago',
    isRead: true,
    isStarred: false,
  },
  {
    id: 'msg-5',
    senderName: 'David Chen',
    senderEmail: 'dchen@innovateai.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    subject: 'Full-Stack Integration Inquiry',
    message: `Hi! We are integrating LLM capabilities into an existing web dashboard and saw your impressive work on responsive split-pane UI design.

We would love to get a quote for a custom dashboard implementation. Do you have time for a brief call tomorrow?

Regards,
David Chen`,
    timestamp: '2026-08-10T14:10:00Z',
    relativeTime: '3d ago',
    isRead: true,
    isStarred: false,
  },
  {
    id: 'msg-6',
    senderName: 'David Chen',
    senderEmail: 'dchen@innovateai.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    subject: 'Full-Stack Integration Inquiry',
    message: `Hi! We are integrating LLM capabilities into an existing web dashboard and saw your impressive work on responsive split-pane UI design.

We would love to get a quote for a custom dashboard implementation. Do you have time for a brief call tomorrow?

Regards,
David Chen`,
    timestamp: '2026-08-10T14:10:00Z',
    relativeTime: '3d ago',
    isRead: true,
    isStarred: false,
  },
  {
    id: 'msg-7',
    senderName: 'David Chen',
    senderEmail: 'dchen@innovateai.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    subject: 'Full-Stack Integration Inquiry',
    message: `Hi! We are integrating LLM capabilities into an existing web dashboard and saw your impressive work on responsive split-pane UI design.

We would love to get a quote for a custom dashboard implementation. Do you have time for a brief call tomorrow?

Regards,
David Chen`,
    timestamp: '2026-08-10T14:10:00Z',
    relativeTime: '3d ago',
    isRead: true,
    isStarred: false,
  }
];
