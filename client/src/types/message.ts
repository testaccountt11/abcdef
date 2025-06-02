export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  type: 'text' | 'file' | 'image';
  status?: 'sent' | 'delivered' | 'read';
  subject?: string;
  from_user?: {
    id: number;
    name: string;
    avatar?: string;
  };
  to_user?: {
    id: number;
    name: string;
    avatar?: string;
  };
  attachments?: {
    url: string;
    type: string;
    name: string;
    size?: number;
  }[];
}

export interface MessageThread {
  id: number;
  participants: {
    id: number;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface SendMessagePayload {
  receiverId: number;
  content: string;
  type?: 'text' | 'file' | 'image';
  attachments?: File[];
} 