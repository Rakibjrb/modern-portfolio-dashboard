export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  markAsRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MessageFilter = "" | "unread" | "read";
