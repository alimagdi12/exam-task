import { ReactNode } from "react";

export interface INavbar {
    showSidebar: () => void;
  }

export interface ISidebar {
    show: boolean;
  }

export interface Announcement {
    _id: string;
    name: string;
    subject: string;
    avatar: string;
    message: string;
    createdAt: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface AnnouncementContextType {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  fetchAnnouncements: () => Promise<void>;
  addAnnouncement: (announcement: Omit<Announcement, '_id' | 'createdAt'>) => Promise<void>;
  updateAnnouncement: (id: string, updatedAnnouncement: Omit<Announcement, '_id' | 'createdAt'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  deleteAllAnnouncements: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface Quiz {
  _id: string;
  name: string;
  course: string;
  topic: string;
  dueDate: string;
  createdAt: string;
}

export interface QuizContextType {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  fetchQuizzes: () => Promise<void>;
  addQuiz: (quiz: Omit<Quiz, '_id' | 'createdAt'>) => Promise<void>;
  updateQuiz: (id: string, updatedQuiz: Omit<Quiz, '_id' | 'createdAt'>) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
}