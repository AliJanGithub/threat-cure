"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, Calendar, Clock, ArrowRight, FileText, BookOpen, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PDFCard from '../../components/PDFCard';

// Particle animation class (copied from demo file)
class Particle {
  constructor(x, y, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 150, 53, 0.8)";
    this.maxConnections = 50;
    this.connectionDistance = 10;
    this.vx = 0;
    this.vy = 0;
    this.inertia = 0.85;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.1 + Math.random() * 0.1;
  }

  update(mouseX, mouseY, mouseRadius = 150) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouseRadius && mouseX > 0 && mouseY > 0) {
      const angle = Math.atan2(dy, dx);
      const force = (mouseRadius - distance) / mouseRadius;
      const pushStrength = 12;
      this.vx += Math.cos(angle) * force * pushStrength;
      this.vy += Math.sin(angle) * force * pushStrength;
      this.vx += (Math.random() - 0.5) * force * 6;
      this.vy += (Math.random() - 0.5) * force * 6;
    }

    const time = Date.now() * 0.002;
    const waveX = Math.sin(time * 0.8 + this.x * 0.005) * 0.8;
    const waveY = Math.cos(time * 0.6 + this.y * 0.005) * 0.8;
    this.vx += (waveX + this.speedX * 0.5) * 0.2;
    this.vy += (waveY + this.speedY * 0.5) * 0.2;

    this.vx *= this.inertia;
    this.vy *= this.inertia;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > this.canvas.width + 50) this.x = -50;
    if (this.x < -50) this.x = this.canvas.width + 50;
    if (this.y > this.canvas.height + 50) this.y = -50;
    if (this.y < -50) this.y = this.canvas.height + 50;

    this.pulse += this.pulseSpeed;
    if (this.pulse > Math.PI * 2) this.pulse -= Math.PI * 2;
  }

  draw() {
    const pulseSize = Math.sin(this.pulse) * 0.3 + 0.8;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize * 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color.replace('0.8)', '0.2)');
    this.ctx.fill();
  }
}

export default function BlogListingClient({ initialBlogs, initialPDFs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('blogs');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Animation refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Default categories
  const categories = ['All', 'Security', 'Cloud', 'AI', 'Threats', 'Compliance', 'Technology'];
  
  // Format blogs using useMemo to avoid re-renders
  const blogs = useMemo(() => {
    if (!initialBlogs || initialBlogs.length === 0) return [];
    
    return initialBlogs.map(blog => ({
      slug: blog.slug || '',
      title: blog.title || 'Untitled Article',
      description: blog.description || blog.excerpt || 'No description available',
      date: blog.date || new Date().toISOString(),
      image: blog.image || '/blogs/default-blog.jpg',
      content: blog.content || '',
      contentWords: blog.contentWords || 0,
      category: blog.category || 'Security'
    }));
  }, [initialBlogs]);

  // Format PDFs
  const pdfs = useMemo(() => {
    if (!initialPDFs || initialPDFs.length === 0) return [];
    return initialPDFs;
  }, [initialPDFs]);

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const title = blog?.title || '';
    const description = blog?.description || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           blog.category === selectedCategory ||
                           (blog.description && blog.description.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  // Filter PDFs
  const filteredPDFs = pdfs.filter(pdf => {
    const title = pdf?.title || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           (pdf.category && pdf.category.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  // Animation setup (copied from demo file)
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);

    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseVelocityRef.current = {
        x: (x - lastMouseRef.current.x) * 2,
        y: (y - lastMouseRef.current.y) * 2
      };
      lastMouseRef.current = { x, y };
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      mouseVelocityRef.current = { x: 0, y: 0 };
    };

    const initCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: 300 }, () =>
        new Particle(Math.random() * canvas.width, Math.random() * canvas.height, canvas)
      );
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    initCanvas();
    window.addEventListener("resize", initCanvas);

    const animate = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const enhancedMouseX = mouseX + mouseVelocityRef.current.x * 0.5;
        const enhancedMouseY = mouseY + mouseVelocityRef.current.y * 0.5;
        p.update(enhancedMouseX, enhancedMouseY);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) {
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / 100) * 0.3;
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000) {
            const distance = Math.sqrt(distSq);
            const opacity = 0.6 - (distance / 300);
            ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
        p.draw();
      }

      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
        gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.1)");
        gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        const pulse = Math.sin(Date.now() * 0.02) * 0.3 + 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 53, 0.9)";
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Calculate reading time
  const calculateReadingTime = (blog) => {
    if (blog.contentWords) {
      const wordsPerMinute = 200;
      return Math.ceil(blog.contentWords / wordsPerMinute) || 5;
    }
    const text = blog.description || blog.excerpt || ''; 
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length * 2;
    return Math.ceil(wordCount / wordsPerMinute) || 5;
  };

  // Handle blog click
  const handleBlogClick = (slug) => {
    if (slug) {
      router.push(`/blogs/${slug}`);
    } else {
      console.error('No slug provided for blog');
    }
  };

  // Handle image error
  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.src = '/blogs/default-blog.jpg';
    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-gray-300', 'to-gray-400');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'none' }}
      />

      {/* Hero Section with white overlay */}
      <div className="relative overflow-hidden bg-white text-gray-900 py-20">
        <div className="absolute inset-0 bg-white opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Security <span className="text-orange-600">Insights</span>
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto mb-8 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Expert analysis, security trends, and actionable advice from our cybersecurity professionals
          </p>
          
          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={activeTab === 'blogs' ? "Search articles by title or description..." : "Search PDFs by title..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Tab Navigation */}
        <div className={`flex border-b border-gray-200 mb-8 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-lg transition-all duration-300 ${
              activeTab === 'blogs'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Articles ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('pdfs')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-lg transition-all duration-300 ${
              activeTab === 'pdfs'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5" />
            PDF Resources ({pdfs.length})
          </button>
        </div>

        {/* Filter Section */}
        <div className={`mb-12 transition-all duration-700 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category
                      ? activeTab === 'blogs' 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-orange-600">
                {activeTab === 'blogs' ? filteredBlogs.length : filteredPDFs.length}
              </span> of{' '}
              <span className="font-semibold">
                {activeTab === 'blogs' ? blogs.length : pdfs.length}
              </span> {activeTab === 'blogs' ? 'articles' : 'PDF resources'}
            </p>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'blogs' ? (
          <>
            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <div
                    key={blog.slug || blog.title}
                    className={`group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1
                      transition-all duration-700 delay-${500 + index * 100} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    onClick={() => handleBlogClick(blog.slug)}
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {blog.category}
                        </span>
                      </div>
                      
                      <div className="relative h-full w-full group-hover:scale-110 transition-transform duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent mix-blend-overlay z-10"></div>
                        
                        {/* Image container */}
                        <div className="relative w-full h-full">
                          {blog.image ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                  console.log('Image error for:', blog.image);
                                  e.target.src = '/blogs/default-blog.jpg';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                              <div className="text-center text-white p-4">
                                <div className="text-lg font-semibold mb-2">{blog.title}</div>
                                <div className="text-sm opacity-80">ThreatCure Blog</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{calculateReadingTime(blog)} min read</span>
                        </div>
                      </div>

                      {/* Read Button */}
                      <button 
                        className="w-full group/btn bg-white border border-gray-200 text-gray-800 py-3 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlogClick(blog.slug);
                        }}
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-3xl transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-12 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-gray-400 text-5xl mb-4">📝</div>
                <div className="text-gray-500 text-xl mb-2">No articles found</div>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* PDF Grid */}
            {filteredPDFs.length > 0 ? (
              <>
                <div className={`mb-6 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Downloadable Resources
                  </h3>
                  <p className="text-gray-600">
                    Access our collection of security whitepapers, guides, and research documents
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPDFs.map((pdf, index) => (
                    <div 
                      key={pdf.id} 
                      className={`transition-all duration-700 delay-${600 + index * 100} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                      <PDFCard pdf={pdf} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={`text-center py-12 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-gray-400 text-5xl mb-4">📄</div>
                <div className="text-gray-500 text-xl mb-2">No PDF resources found</div>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State for Blogs Only View */}
        {activeTab === 'blogs' && filteredBlogs.length === 0 && blogs.length > 0 && (
          <div className={`text-center py-20 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="text-gray-400 text-xl mb-4">No articles found</div>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Loading State */}
        {activeTab === 'blogs' && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">Loading articles...</div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          </div>
        )}

        {activeTab === 'pdfs' && pdfs.length === 0 && initialPDFs === undefined && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">Loading PDF resources...</div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-700 delay-800 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{blogs.length}</div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">In-depth technical articles and guides</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{pdfs.length}</div>
                  <div className="text-sm text-gray-600">PDF Resources</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Downloadable whitepapers and reports</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date().getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600">Updated Regularly</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">New content added monthly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sparkles Effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${0.5 * 100}%`,
              top: `${0.5 * 100}%`,
              animationDelay: `${0.5 * 2}s`,
              animationDuration: `${2 + 0.5 * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}