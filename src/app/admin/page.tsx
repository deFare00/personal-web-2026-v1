'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio, Project, Skill, Experience, Certification, Book } from '@/context/PortfolioContext';
import { 
  Github, 
  ExternalLink, 
  Moon, 
  Sun, 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Lock,
  Award,
  Briefcase,
  BookOpen,
  Code
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type TabType = 'projects' | 'skills' | 'experience' | 'certifications' | 'books';

export default function AdminPage() {
  const router = useRouter();
  const { 
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
    logout 
  } = usePortfolio();
  
  const [darkMode, setDarkMode] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'web',
    techStack: [],
    thumbnail: '',
    githubLink: '',
    liveLink: '',
  });

  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: '',
    level: 50,
  });

  const [experienceForm, setExperienceForm] = useState<Partial<Experience>>({
    company: '',
    position: '',
    period: '',
    description: '',
  });

  const [certificationForm, setCertificationForm] = useState<Partial<Certification>>({
    name: '',
  });

  const [bookForm, setBookForm] = useState<Partial<Book>>({
    title: '',
    author: '',
    status: 'reading',
    rating: 0,
    thumbnail: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Password salah!');
    } else {
      setError('');
      setPassword('');
    }
  };

  const resetForm = () => {
    setProjectForm({
      title: '',
      description: '',
      category: 'web',
      techStack: [],
      thumbnail: '',
      githubLink: '',
      liveLink: '',
    });
    setSkillForm({ name: '', level: 50 });
    setExperienceForm({
      company: '',
      position: '',
      period: '',
      description: '',
    });
    setCertificationForm({ name: '' });
    setBookForm({
      title: '',
      author: '',
      status: 'reading',
      rating: 0,
      thumbnail: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      switch (activeTab) {
        case 'projects':
          if (isEditing && editingId) {
            await updateProject(editingId, projectForm as Project);
          } else {
            await addProject({
              title: projectForm.title || 'Untitled',
              description: projectForm.description || '',
              category: projectForm.category as any || 'other',
              techStack: projectForm.techStack || [],
              thumbnail: projectForm.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
              githubLink: projectForm.githubLink || '',
              liveLink: projectForm.liveLink || '',
            });
          }
          break;
        case 'skills':
          if (isEditing && editingId) {
            await updateSkill(editingId, skillForm as Skill);
          } else {
            await addSkill({
              name: skillForm.name || 'Untitled',
              level: skillForm.level || 50,
            });
          }
          break;
        case 'experience':
          if (isEditing && editingId) {
            await updateExperience(editingId, experienceForm as Experience);
          } else {
            await addExperience({
              company: experienceForm.company || 'Company',
              position: experienceForm.position || 'Position',
              period: experienceForm.period || 'Period',
              description: experienceForm.description || '',
            });
          }
          break;
        case 'certifications':
          if (isEditing && editingId) {
            await updateCertification(editingId, certificationForm as Certification);
          } else {
            await addCertification({
              name: certificationForm.name || 'Untitled',
            });
          }
          break;
        case 'books':
          if (isEditing && editingId) {
            await updateBook(editingId, bookForm as Book);
          } else {
            await addBook({
              title: bookForm.title || 'Untitled',
              author: bookForm.author || 'Author',
              status: bookForm.status as any || 'reading',
              rating: bookForm.rating || 0,
              thumbnail: bookForm.thumbnail || '',
            });
          }
          break;
      }
      
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat menyimpan data!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditForm = (item: any) => {
    setEditingId(item.id);
    setIsEditing(true);
    
    switch (activeTab) {
      case 'projects':
        setProjectForm(item);
        break;
      case 'skills':
        setSkillForm(item);
        break;
      case 'experience':
        setExperienceForm(item);
        break;
      case 'certifications':
        setCertificationForm(item);
        break;
      case 'books':
        setBookForm(item);
        break;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      switch (activeTab) {
        case 'projects':
          await deleteProject(id);
          break;
        case 'skills':
          await deleteSkill(id);
          break;
        case 'experience':
          await deleteExperience(id);
          break;
        case 'certifications':
          await deleteCertification(id);
          break;
        case 'books':
          await deleteBook(id);
          break;
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Terjadi kesalahan saat menghapus data!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'projects': return projects;
      case 'skills': return skills;
      case 'experience': return experiences;
      case 'certifications': return certifications;
      case 'books': return books;
      default: return [];
    }
  };

  if (loading) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center px-4 transition-colors duration-500',
        darkMode ? 'bg-black' : 'bg-white'
      )}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center px-4 transition-colors duration-500',
        darkMode ? 'bg-black' : 'bg-white'
      )}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className={cn(
            'absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse',
            darkMode ? 'bg-purple-600' : 'bg-purple-400'
          )} />
          <div className={cn(
            'absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse',
            darkMode ? 'bg-blue-600' : 'bg-blue-400',
            'delay-1000'
          )} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            'relative z-10 w-full max-w-md p-8 rounded-3xl border',
            darkMode 
              ? 'bg-black/60 border-white/20' 
              : 'bg-white/80 border-black/10'
          )}
        >
          <div className="text-center mb-8">
            <div className={cn(
              'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4',
              darkMode ? 'bg-white/10' : 'bg-black/10'
            )}>
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className={cn(
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Masukkan password untuk mengakses dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={cn(
                  'w-full px-4 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-center',
                  darkMode 
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-black/5 border-black/10 text-black placeholder-gray-500'
                )}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-500 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className={cn(
                'w-full py-4 rounded-2xl font-semibold transition-all hover:scale-105',
                darkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              )}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className={cn(
                'text-sm hover:opacity-70 transition-opacity',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}
            >
              ← Kembali ke Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-500',
      darkMode ? 'bg-black text-white' : 'bg-white text-black'
    )}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={cn(
          'absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse',
          darkMode ? 'bg-purple-600' : 'bg-purple-400'
        )} />
        <div className={cn(
          'absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse',
          darkMode ? 'bg-blue-600' : 'bg-blue-400',
          'delay-1000'
        )} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className={cn(
          'mx-4 mt-4 rounded-3xl border backdrop-blur-xl transition-all duration-300',
          darkMode 
            ? 'bg-black/40 border-white/10' 
            : 'bg-white/60 border-black/10'
        )}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
              >
                ← Portfolio
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={cn(
                    'p-2 rounded-full transition-all hover:scale-110',
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  )}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={logout}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 border',
                    darkMode 
                      ? 'border-white/20 hover:bg-white/10' 
                      : 'border-black/20 hover:bg-black/10'
                  )}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Admin Dashboard</h1>
            <p className={cn(
              'text-lg',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Kelola semua konten portfolio Anda
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {[
              { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
              { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
              { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
              { id: 'books', label: 'Books', icon: <BookOpen className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  resetForm();
                }}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                    : (darkMode 
                        ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                        : 'bg-black/5 border border-black/10 hover:bg-black/10')
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={cn(
                'p-6 rounded-3xl border',
                darkMode 
                  ? 'bg-black/40 border-white/10' 
                  : 'bg-white/60 border-black/10'
              )}>
                <h2 className="text-2xl font-bold mb-6">
                  Daftar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {getCurrentItems().map((item: any) => (
                    <div
                      key={item.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-2xl border',
                        darkMode 
                          ? 'bg-white/5 border-white/10' 
                          : 'bg-black/5 border-black/10'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {activeTab === 'projects' && item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-xl"
                          />
                        )}
                        {activeTab === 'books' && item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded-xl"
                          />
                        )}
                        <div>
                          <div className="font-semibold">
                            {item.title || item.name || item.company}
                          </div>
                          <div className={cn(
                            'text-sm',
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          )}>
                            {activeTab === 'skills' && `${item.level}%`}
                            {activeTab === 'experience' && item.position}
                            {activeTab === 'books' && `${item.author} · ${item.status}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className={cn(
                            'p-2 rounded-xl transition-all hover:scale-110',
                            darkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                          )}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={cn(
                            'p-2 rounded-xl transition-all hover:scale-110 text-red-500',
                            darkMode ? 'hover:bg-red-500/20' : 'hover:bg-red-500/20'
                          )}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {getCurrentItems().length === 0 && (
                    <div className="text-center py-10">
                      <p className={cn('text-lg', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                        Belum ada data
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={cn(
                'p-6 rounded-3xl border',
                darkMode 
                  ? 'bg-black/40 border-white/10' 
                  : 'bg-white/60 border-black/10'
              )}>
                <h2 className="text-2xl font-bold mb-6">
                  {isEditing ? 'Edit' : 'Tambah Baru'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeTab === 'projects' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Project title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          rows={3}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Project description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                        >
                          <option value="web">Web</option>
                          <option value="mobile">Mobile</option>
                          <option value="design">Design</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={projectForm.techStack?.join(', ') || ''}
                          onChange={(e) => setProjectForm({ 
                            ...projectForm, 
                            techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="React, Next.js, Tailwind"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                        <input
                          type="text"
                          value={projectForm.thumbnail}
                          onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">GitHub Link</label>
                        <input
                          type="text"
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Live Demo Link</label>
                        <input
                          type="text"
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="https://example.com"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'skills' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Skill name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Level: {skillForm.level}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skillForm.level}
                          onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'experience' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Position</label>
                        <input
                          type="text"
                          value={experienceForm.position}
                          onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Position"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Period</label>
                        <input
                          type="text"
                          value={experienceForm.period}
                          onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Jan 2024 – Dec 2024"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          rows={4}
                          value={experienceForm.description}
                          onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Description"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'certifications' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Certification Name</label>
                      <input
                        type="text"
                        value={certificationForm.name}
                        onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })}
                        className={cn(
                          'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                          darkMode 
                            ? 'bg-white/5 border-white/10 text-white' 
                            : 'bg-black/5 border-black/10 text-black'
                        )}
                        placeholder="Certification name"
                      />
                    </div>
                  )}

                  {activeTab === 'books' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={bookForm.title}
                          onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Book title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Author</label>
                        <input
                          type="text"
                          value={bookForm.author}
                          onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="Author"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                          value={bookForm.status}
                          onChange={(e) => setBookForm({ ...bookForm, status: e.target.value as any })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                        >
                          <option value="reading">Reading</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Rating: {bookForm.rating} / 5
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          value={bookForm.rating}
                          onChange={(e) => setBookForm({ ...bookForm, rating: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Thumbnail URL (optional)</label>
                        <input
                          type="text"
                          value={bookForm.thumbnail}
                          onChange={(e) => setBookForm({ ...bookForm, thumbnail: e.target.value })}
                          className={cn(
                            'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                            darkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-black/5 border-black/10 text-black'
                          )}
                          placeholder="https://example.com/book.jpg"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'flex-1 py-4 rounded-2xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                        darkMode 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-black text-white hover:bg-gray-800'
                      )}
                    >
                      {isSubmitting ? 'Menyimpan...' : isEditing ? 'Update' : 'Tambah'}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isSubmitting}
                        className={cn(
                          'px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105 border disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                          darkMode 
                            ? 'border-white/20 hover:bg-white/10' 
                            : 'border-black/20 hover:bg-black/10'
                        )}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
