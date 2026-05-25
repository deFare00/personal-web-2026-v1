'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Search, 
  Code2, 
  Layout, 
  Smartphone, 
  Database, 
  Layers,
  Award,
  BookOpen
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePortfolio } from '@/context/PortfolioContext';
import Link from 'next/link';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { projects, skills, experiences, certifications, books, loading } = usePortfolio();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'mobile' | 'design' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  };

  useEffect(() => {
    let result = [...projects];
    
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

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

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-500',
      darkMode ? 'bg-black text-white' : 'bg-white text-black'
    )}>
      {/* Background */}
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
              <div className="text-2xl font-bold tracking-tighter">
                Portfolio
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <button 
                  onClick={() => handleSmoothScroll('hero')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleSmoothScroll('about')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  About
                </button>
                <button 
                  onClick={() => handleSmoothScroll('skills')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Skills
                </button>
                <button 
                  onClick={() => handleSmoothScroll('certifications')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Certifications
                </button>
                <button 
                  onClick={() => handleSmoothScroll('books')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Books
                </button>
                <button 
                  onClick={() => handleSmoothScroll('portfolio')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => handleSmoothScroll('contact')}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  Contact
                </button>
              </div>

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
                
                <Link
                  href="/admin"
                  className={cn(
                    'hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105',
                    darkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  )}
                >
                  Admin
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                'mx-4 mt-2 rounded-3xl border backdrop-blur-xl md:hidden',
                darkMode 
                  ? 'bg-black/80 border-white/10' 
                  : 'bg-white/80 border-black/10'
              )}
            >
              <div className="p-6 flex flex-col gap-4">
                <button 
                  onClick={() => {
                    handleSmoothScroll('hero');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('about');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('skills');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Skills
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('certifications');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Certifications
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('books');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Books
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('portfolio');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => {
                    handleSmoothScroll('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:opacity-70 text-left"
                >
                  Contact
                </button>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'mt-2 py-3 rounded-full font-medium text-center',
                    darkMode 
                      ? 'bg-white text-black' 
                      : 'bg-black text-white'
                  )}
                >
                  Admin Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className={cn(
                  'inline-block px-4 py-2 rounded-full text-sm font-medium',
                  darkMode 
                    ? 'bg-white/10 border border-white/20' 
                    : 'bg-black/5 border border-black/10'
                )}>
                  ✨ Available for hire
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Defarhan
                </span>
              </h1>
              
              <p className={cn(
                'text-xl mb-8 leading-relaxed',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                Computer Science Graduate passionate in Web Development, Data Analytics, and Android Development.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleSmoothScroll('portfolio')}
                  className={cn(
                    'px-8 py-4 rounded-full font-semibold transition-all hover:scale-105',
                    darkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  )}
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => handleSmoothScroll('contact')}
                  className={cn(
                    'px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 border',
                    darkMode 
                      ? 'border-white/20 hover:bg-white/10' 
                      : 'border-black/20 hover:bg-black/5'
                  )}
                >
                  Get in Touch
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <a href="https://github.com/defarhannugraha" target="_blank" rel="noopener noreferrer" className={cn('hover:opacity-70 transition-opacity', darkMode ? 'text-gray-400' : 'text-gray-600')}><Github className="w-6 h-6" /></a>
                <a href="https://linkedin.com/in/defarhan-nugraha-fadhali" target="_blank" rel="noopener noreferrer" className={cn('hover:opacity-70 transition-opacity', darkMode ? 'text-gray-400' : 'text-gray-600')}><Linkedin className="w-6 h-6" /></a>
                <a href="mailto:defarhannugraha1@gmail.com" className={cn('hover:opacity-70 transition-opacity', darkMode ? 'text-gray-400' : 'text-gray-600')}><Mail className="w-6 h-6" /></a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className={cn(
                  'rounded-3xl overflow-hidden border shadow-2xl',
                  darkMode ? 'border-white/20' : 'border-black/10'
                )}>
                  <img
                    src="/personal_photo.jpeg"
                    alt="Profile"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  'absolute -top-8 -left-8 p-6 rounded-2xl border shadow-xl z-20',
                  darkMode 
                    ? 'bg-black/60 border-white/20' 
                    : 'bg-white/80 border-black/10'
                )}
              >
                <div className="text-3xl font-bold">3+</div>
                <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>Certifications</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className={cn(
                  'absolute -bottom-8 -right-8 p-6 rounded-2xl border shadow-xl z-20',
                  darkMode 
                    ? 'bg-black/60 border-white/20' 
                    : 'bg-white/80 border-black/10'
                )}
              >
                <div className="text-3xl font-bold">4</div>
                <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>Projects</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Me</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={cn(
                'rounded-3xl overflow-hidden border',
                darkMode ? 'border-white/20' : 'border-black/10'
              )}>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                  alt="Working"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6">About Me</h3>
              <p className={cn(
                'text-lg mb-6 leading-relaxed',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                I am a Computer Science graduate with a strong interest in technology, software development, and data analytics. I enjoy building modern web and mobile applications while continuously learning new technologies and improving my problem-solving skills.
              </p>
              <p className={cn(
                'text-lg mb-8 leading-relaxed',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                I have experience in Frontend Development using React.js and Tailwind CSS, Android Development with Kotlin, and Data Analytics using SQL, Excel, and visualization tools. I am highly motivated to grow professionally through real-world projects, collaboration, and continuous learning.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className={cn(
                  'p-6 rounded-2xl border',
                  darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10'
                )}>
                  <div className="text-3xl font-bold mb-2">3+</div>
                  <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>Certifications</div>
                </div>
                <div className={cn(
                  'p-6 rounded-2xl border',
                  darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10'
                )}>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const icons = [<Layout className="w-5 h-5" />, <Code2 className="w-5 h-5" />, <Smartphone className="w-5 h-5" />, <Database className="w-5 h-5" />, <Layers className="w-5 h-5" />];
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    'p-8 rounded-3xl border transition-all hover:scale-105',
                    darkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-black/5 border-black/10 hover:bg-black/10'
                  )}
                >
                  <div className={cn(
                    'mb-6 p-4 rounded-2xl inline-block',
                    darkMode ? 'bg-white/10' : 'bg-black/10'
                  )}>
                    {icons[index % icons.length]}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={cn(darkMode ? 'text-gray-400' : 'text-gray-600')}>Proficiency</span>
                      <span className="font-semibold">{skill.level}%</span>
                    </div>
                    <div className={cn(
                      'h-2 rounded-full overflow-hidden',
                      darkMode ? 'bg-white/10' : 'bg-black/10'
                    )}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          <div className="relative">
            <div className={cn(
              'absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full rounded-full',
              darkMode ? 'bg-white/20' : 'bg-black/20'
            )} />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={cn(
                  'relative mb-12 md:mb-20',
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                )}
              >
                <div className={cn(
                  'absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4',
                  darkMode 
                    ? 'bg-black border-purple-500' 
                    : 'bg-white border-purple-500',
                  'top-8'
                )} />

                <div className={cn(
                  'ml-8 md:ml-0 p-8 rounded-3xl border',
                  darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10',
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                )}>
                  <div className={cn(
                    'text-sm font-semibold mb-2',
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  )}>
                    {exp.period}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                  <div className={cn(
                    'text-lg mb-4',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    {exp.company}
                  </div>
                  <p className={cn(
                    'leading-relaxed',
                    darkMode ? 'text-gray-500' : 'text-gray-700'
                  )}>
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Certifications</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  'p-6 rounded-3xl border flex items-center gap-4 transition-all',
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10'
                )}
              >
                <div className={cn(
                  'p-3 rounded-2xl',
                  darkMode ? 'bg-white/10' : 'bg-black/10'
                )}>
                  <Award className="w-6 h-6" />
                </div>
                <div className="font-semibold">{cert.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Books</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={cn(
                  'p-6 rounded-3xl border transition-all',
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/50 border-black/10 hover:bg-white/70'
                )}
              >
                <div className="flex gap-4">
                  {book.thumbnail ? (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-24 h-36 object-cover rounded-2xl"
                    />
                  ) : (
                    <div className={cn(
                      'w-24 h-36 rounded-2xl flex items-center justify-center',
                      darkMode ? 'bg-white/10' : 'bg-black/10'
                    )}>
                      <BookOpen className="w-10 h-10 opacity-50" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={cn(
                      'inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2',
                      book.status === 'reading'
                        ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600')
                        : (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600')
                    )}>
                      {book.status === 'reading' ? 'Currently Reading' : 'Read'}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{book.title}</h3>
                    <p className={cn(
                      'text-sm mb-3',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}>
                      {book.author}
                    </p>
                    {book.rating && book.rating > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              'text-lg',
                              i < book.rating
                                ? (darkMode ? 'text-yellow-400' : 'text-yellow-500')
                                : (darkMode ? 'text-gray-600' : 'text-gray-300')
                            )}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Portfolio</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className={cn(
                'absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              )} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pl-12 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                  darkMode 
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-black/5 border-black/10 text-black placeholder-gray-500'
                )}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(['all', 'web', 'mobile', 'design', 'other'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-6 py-2 rounded-full text-sm font-medium transition-all',
                    activeCategory === category
                      ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                      : (darkMode 
                          ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                          : 'bg-black/5 border border-black/10 hover:bg-black/10')
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  'rounded-3xl overflow-hidden border cursor-pointer group',
                  darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/10'
                )}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className={cn(
                    'inline-block px-3 py-1 rounded-full text-xs font-medium mb-3',
                    darkMode ? 'bg-white/10' : 'bg-black/10'
                  )}>
                    {project.category}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={cn(
                    'text-sm mb-4 line-clamp-2',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs',
                          darkMode ? 'bg-white/5' : 'bg-black/5'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={cn('text-xl', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                No projects found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get In Touch</h2>
            <div className={cn(
              'h-1 w-24 mx-auto rounded-full',
              darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-400' : 'bg-gradient-to-r from-purple-500 to-blue-500'
            )} />
            <p className={cn(
              'mt-4 text-lg',
              darkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Have a project in mind? Let's work together!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              'p-8 md:p-12 rounded-3xl border',
              darkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            )}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-2xl',
                      darkMode ? 'bg-white/10' : 'bg-black/10'
                    )}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>Email</div>
                      <div className="font-semibold">defarhannugraha1@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-2xl',
                      darkMode ? 'bg-white/10' : 'bg-black/10'
                    )}>
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>LinkedIn</div>
                      <div className="font-semibold">linkedin.com/in/defarhan-nugraha-fadhali</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-2xl',
                      darkMode ? 'bg-white/10' : 'bg-black/10'
                    )}>
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={cn('text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>GitHub</div>
                      <div className="font-semibold">github.com/defarhannugraha</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <a href="https://github.com/defarhannugraha" target="_blank" rel="noopener noreferrer" className={cn(
                    'p-3 rounded-2xl transition-all hover:scale-110',
                    darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  )}>
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/defarhan-nugraha-fadhali" target="_blank" rel="noopener noreferrer" className={cn(
                    'p-3 rounded-2xl transition-all hover:scale-110',
                    darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  )}>
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className={cn(
                      'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-black/5 border-black/10 text-black'
                    )}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className={cn(
                      'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500',
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-black/5 border-black/10 text-black'
                    )}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none',
                      darkMode 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-black/5 border-black/10 text-black'
                    )}
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className={cn(
                    'w-full py-4 rounded-2xl font-semibold transition-all hover:scale-105',
                    darkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  )}
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        'py-12 px-4 border-t',
        darkMode ? 'border-white/10' : 'border-black/10'
      )}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={cn(
            'text-sm',
            darkMode ? 'text-gray-500' : 'text-gray-600'
          )}>
            © 2026 Defarhan Nugraha Fadhali. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className={cn(
                'relative z-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border',
                darkMode 
                  ? 'bg-black border-white/20' 
                  : 'bg-white border-black/20'
              )}
            >
              <div className="relative">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className={cn(
                    'absolute top-4 right-4 p-3 rounded-full',
                    darkMode ? 'bg-black/60 hover:bg-black/80' : 'bg-white/60 hover:bg-white/80'
                  )}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium',
                    darkMode ? 'bg-white/10' : 'bg-black/10'
                  )}>
                    {selectedProject.category}
                  </span>
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm',
                        darkMode ? 'bg-white/5' : 'bg-black/5'
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedProject.title}</h2>
                <p className={cn(
                  'text-lg mb-8 leading-relaxed',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all hover:scale-105 border',
                        darkMode 
                          ? 'border-white/20 hover:bg-white/10' 
                          : 'border-black/20 hover:bg-black/10'
                      )}
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all hover:scale-105',
                        darkMode 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-black text-white hover:bg-gray-800'
                      )}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
