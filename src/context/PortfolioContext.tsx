'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export type Project = {
  id: string;
  title: string;
  description: string;
  category: 'all' | 'web' | 'mobile' | 'design' | 'other';
  techStack: string[];
  thumbnail: string;
  githubLink: string;
  liveLink: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
};

export type Certification = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'read';
  rating: number;
  thumbnail?: string;
};

type PortfolioContextType = {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
  books: Book[];
  loading: boolean;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addExperience: (experience: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, experience: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addCertification: (certification: Omit<Certification, 'id'>) => Promise<void>;
  updateCertification: (id: string, certification: Partial<Certification>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = 'admin123';

  // Fetch all data from Supabase on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchExperiences(),
        fetchCertifications(),
        fetchBooks(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch functions
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }
    
    console.log('Fetched projects:', data);
    
    setProjects(data.map(p => ({
      ...p,
      techStack: p.tech_stack || []
    })) as Project[]);
  };

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching skills:', error);
      return;
    }
    
    console.log('Fetched skills:', data);
    setSkills(data as Skill[]);
  };

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching experiences:', error);
      return;
    }
    
    console.log('Fetched experiences:', data);
    setExperiences(data as Experience[]);
  };

  const fetchCertifications = async () => {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching certifications:', error);
      return;
    }
    
    console.log('Fetched certifications:', data);
    setCertifications(data as Certification[]);
  };

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching books:', error);
      return;
    }
    
    console.log('Fetched books:', data);
    setBooks(data.map(b => ({
      ...b,
      rating: b.rating ?? 0
    })) as Book[]);
  };

  // CRUD Operations
  const addProject = async (project: Omit<Project, 'id'>) => {
    const { error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.description,
        category: project.category,
        tech_stack: project.techStack,
        thumbnail: project.thumbnail,
        github_link: project.githubLink,
        live_link: project.liveLink,
      }]);
    
    if (error) {
      console.error('Error adding project:', error);
      throw error;
    }
    
    await fetchProjects();
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        category: project.category,
        tech_stack: project.techStack,
        thumbnail: project.thumbnail,
        github_link: project.githubLink,
        live_link: project.liveLink,
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
    
    await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
    
    await fetchProjects();
  };

  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    const { error } = await supabase
      .from('skills')
      .insert([{
        name: skill.name,
        level: skill.level,
      }]);
    
    if (error) {
      console.error('Error adding skill:', error);
      throw error;
    }
    
    await fetchSkills();
  };

  const updateSkill = async (id: string, skill: Partial<Skill>) => {
    const { error } = await supabase
      .from('skills')
      .update({
        name: skill.name,
        level: skill.level,
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
    
    await fetchSkills();
  };

  const deleteSkill = async (id: string) => {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
    
    await fetchSkills();
  };

  const addExperience = async (experience: Omit<Experience, 'id'>) => {
    const { error } = await supabase
      .from('experiences')
      .insert([{
        company: experience.company,
        position: experience.position,
        period: experience.period,
        description: experience.description,
      }]);
    
    if (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
    
    await fetchExperiences();
  };

  const updateExperience = async (id: string, experience: Partial<Experience>) => {
    const { error } = await supabase
      .from('experiences')
      .update({
        company: experience.company,
        position: experience.position,
        period: experience.period,
        description: experience.description,
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
    
    await fetchExperiences();
  };

  const deleteExperience = async (id: string) => {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
    
    await fetchExperiences();
  };

  const addCertification = async (certification: Omit<Certification, 'id'>) => {
    const { error } = await supabase
      .from('certifications')
      .insert([{
        name: certification.name,
      }]);
    
    if (error) {
      console.error('Error adding certification:', error);
      throw error;
    }
    
    await fetchCertifications();
  };

  const updateCertification = async (id: string, certification: Partial<Certification>) => {
    const { error } = await supabase
      .from('certifications')
      .update({
        name: certification.name,
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating certification:', error);
      throw error;
    }
    
    await fetchCertifications();
  };

  const deleteCertification = async (id: string) => {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting certification:', error);
      throw error;
    }
    
    await fetchCertifications();
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    const { error } = await supabase
      .from('books')
      .insert([{
        title: book.title,
        author: book.author,
        status: book.status,
        rating: book.rating,
        thumbnail: book.thumbnail,
      }]);
    
    if (error) {
      console.error('Error adding book:', error);
      throw error;
    }
    
    await fetchBooks();
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    const { error } = await supabase
      .from('books')
      .update({
        title: book.title,
        author: book.author,
        status: book.status,
        rating: book.rating,
        thumbnail: book.thumbnail,
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating book:', error);
      throw error;
    }
    
    await fetchBooks();
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
    
    await fetchBooks();
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        experiences,
        certifications,
        books,
        loading,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addCertification,
        updateCertification,
        deleteCertification,
        addBook,
        updateBook,
        deleteBook,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
