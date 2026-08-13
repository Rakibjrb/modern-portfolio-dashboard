export type MessageFilter = 'all' | 'unread' | 'starred';

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  avatarUrl?: string;
  subject: string;
  message: string;
  timestamp: string;
  relativeTime: string;
  isRead: boolean;
  isStarred: boolean;
}
