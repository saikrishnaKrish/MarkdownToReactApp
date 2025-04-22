export interface Chapter {
  id: string;
  title: string;
  slug: string;
  duration: string;
  content: string;
  order: number;
  badge?: string;
  completed?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  progress: number;
  chaptersCompleted: number;
  totalChapters: number;
}