export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  timestamp: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note: string;
  timestamp: Date;
}