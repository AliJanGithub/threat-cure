"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedVideosRoute } from "../../../components/ProtectedRoute";
import { logout } from "../../../lib/auth";
import { 
  Shield, Play, CheckCircle, ArrowLeft, Search, Eye, LogOut, 
  Menu, X, Moon, Sun, Palette
} from "lucide-react";
import Image from "next/image";

class Particle {
  constructor(x, y, canvas, isDarkMode = true) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.isDarkMode = isDarkMode;
    this.updateColors(isDarkMode);
    this.connections = [];
    this.maxConnections = 5;
    this.connectionDistance = 100;
    this.vx = 0;
    this.vy = 0;
    this.inertia = 0.85;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.1 + Math.random() * 0.1;
  }

  updateColors(isDarkMode) {
    this.isDarkMode = isDarkMode;
    if (isDarkMode) {
      this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 150, 53, 0.8)";
    } else {
      this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.6)" : "rgba(255, 150, 53, 0.6)";
    }
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
    this.ctx.fillStyle = this.color.replace('0.8)', '0.2)').replace('0.6)', '0.15)');
    this.ctx.fill();
  }

  drawConnections(particles, mouseX, mouseY, isDarkMode) {
    let connectionsDrawn = 0;
    for (let i = 0; i < particles.length && connectionsDrawn < this.maxConnections; i++) {
      if (particles[i] === this) continue;
      
      const dx = this.x - particles[i].x;
      const dy = this.y - particles[i].y;
      const distanceSq = dx * dx + dy * dy;
      
      if (distanceSq < this.connectionDistance * this.connectionDistance) {
        connectionsDrawn++;
        const distance = Math.sqrt(distanceSq);
        const opacity = isDarkMode ? (1 - (distance / this.connectionDistance)) * 0.4 : (1 - (distance / this.connectionDistance)) * 0.2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(particles[i].x, particles[i].y);
        this.ctx.strokeStyle = isDarkMode ? `rgba(255, 107, 53, ${opacity})` : `rgba(255, 107, 53, ${opacity})`;
        this.ctx.lineWidth = 0.6 + Math.sin(this.pulse) * 0.2;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      }
    }
    
    if (mouseX > 0 && mouseY > 0) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distanceSq = dx * dx + dy * dy;
      const mouseDist = 200;
      
      if (distanceSq < mouseDist * mouseDist) {
        const distance = Math.sqrt(distanceSq);
        const opacity = isDarkMode ? 0.7 - (distance / (mouseDist * 1.5)) : 0.4 - (distance / (mouseDist * 2));
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.strokeStyle = isDarkMode ? `rgba(255, 200, 53, ${opacity})` : `rgba(255, 150, 53, ${opacity})`;
        this.ctx.lineWidth = 1.5 + Math.sin(Date.now() * 0.02) * 0.5;
        this.ctx.stroke();
      }
    }
  }
}

function VideosContent() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const videos = [
    {
      id: 1,
      title: 'Advanced Threat Detection Techniques',
      description: 'Learn cutting-edge techniques for identifying cyber threats.',
      duration: '15:30',
      category: 'Threat Intelligence',
      progress: 75,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      instructor: 'Dr. Sarah Chen',
      views: 2450,
    },
    {
      id: 2,
      title: 'Cloud Security Best Practices',
      description: 'Guide to securing cloud infrastructure.',
      duration: '22:15',
      category: 'Cloud Security',
      progress: 25,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/7LNl2JlZKHA',
      instructor: 'Mark Rodriguez',
      views: 3120,
    },
    {
      id: 3,
      title: 'Incident Response & Forensics',
      description: 'Handling security incidents and forensics.',
      duration: '18:45',
      category: 'Incident Response',
      progress: 100,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/J---aiyznGQ',
      instructor: 'Alex Thompson',
      views: 1890,
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set initial video
  useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      setTimeout(() => setSelectedVideo(videos[0]), 300);
    }
  }, [videos]);

  // Particle animation setup
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
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

      // Adjust particle count based on screen size
      const particleCount = window.innerWidth < 768 ? 150 : 300;
      particlesRef.current = Array.from({ length: particleCount }, () => {
        return new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas,
          isDarkMode
        );
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    initCanvas();
    window.addEventListener("resize", initCanvas);

    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Clear with theme-based background
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Single-pass optimized particle processing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update particle colors if theme changed
        if (p.isDarkMode !== isDarkMode) {
          p.updateColors(isDarkMode);
        }
        
        const enhancedMouseX = mouseX + mouseVelocityRef.current.x * 0.5;
        const enhancedMouseY = mouseY + mouseVelocityRef.current.y * 0.5;
        p.update(enhancedMouseX, enhancedMouseY);
        
        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 10000) {
            const distance = Math.sqrt(distSq);
            const opacity = isDarkMode ? (1 - distance / 100) * 0.3 : (1 - distance / 100) * 0.2;
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
            ctx.lineWidth = 0.5 + Math.sin(p.pulse) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Draw mouse connections
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 40000) {
            const distance = Math.sqrt(distSq);
            const opacity = isDarkMode ? 0.6 - (distance / 300) : 0.3 - (distance / 400);
            ctx.strokeStyle = isDarkMode ? `rgba(255, 200, 53, ${opacity})` : `rgba(255, 150, 53, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
        
        p.draw();
      }

      // Draw mouse effect
      if (mouseX > 0 && mouseY > 0) {
        const velocity = Math.sqrt(
          mouseVelocityRef.current.x * mouseVelocityRef.current.x + 
          mouseVelocityRef.current.y * mouseVelocityRef.current.y
        );
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 100
        );
        
        if (isDarkMode) {
          gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
          gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.1)");
          gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        } else {
          gradient.addColorStop(0, "rgba(255, 150, 53, 0.2)");
          gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.05)");
          gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        const pulse = Math.sin(Date.now() * 0.02) * 0.3 + 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? "rgba(255, 200, 53, 0.9)" : "rgba(255, 150, 53, 0.8)";
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredVideos = videos.filter(v => 
    searchQuery === '' || v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedVideos = videos.filter(v => v.progress === 100).length;

  // Theme-based colors
  const bgColor = isDarkMode ? "bg-black" : "bg-gray-50";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const textTertiaryColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBg = isDarkMode ? "bg-gray-900/50" : "bg-white/80";
  const headerBg = isDarkMode ? "bg-black/80" : "bg-white/80";
  const searchBg = isDarkMode ? "bg-gray-900/50" : "bg-white/90";
  const hoverBg = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const selectedBg = isDarkMode ? "bg-orange-500/10" : "bg-orange-100";
  const progressBg = isDarkMode ? "bg-gray-800" : "bg-gray-200";
  const categoryBg = isDarkMode ? "bg-orange-500/20" : "bg-orange-100";
  const categoryText = isDarkMode ? "text-orange-400" : "text-orange-600";
  const overlayGradient = isDarkMode 
    ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70" 
    : "bg-gradient-to-b from-white/70 via-white/50 to-white/70";

  return (
    <div className={`min-h-screen ${bgColor} overflow-hidden relative transition-colors duration-300`}>
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'none' }}
      />

      {/* Overlay gradient */}
      <div className={`absolute inset-0 ${overlayGradient} pointer-events-none transition-all duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header - Responsive */}
        <div className={`sticky top-0 z-50 ${headerBg} backdrop-blur-xl border-b ${borderColor} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and back button */}
              <div className="flex items-center gap-4">
                {isMobile ? (
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-lg ${hoverBg} transition-colors duration-200`}
                  >
                    {mobileMenuOpen ? (
                      <X className={`w-5 h-5 ${textColor}`} />
                    ) : (
                      <Menu className={`w-5 h-5 ${textColor}`} />
                    )}
                  </button>
                ) : (
                  <button onClick={() => router.back()} className={`p-2 rounded-lg ${hoverBg} transition-colors duration-200`}>
                    <ArrowLeft className={`w-5 h-5 ${textColor}`} />
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-2">
                    {/* <Shield className="w-5 h-5 text-white" />
                     */}
                     {/* {
                      da
                     } */}
                     {/* <Image src={"/logo.png"} height={60} width={80}    />
                     <Image src={"/logo.png"} height={60} width={80}    /> */}
                  </div>
                  <span className={`text-xl font-bold ${textColor} hidden sm:inline transition-colors duration-300`}>
                    ThreatCure
                  </span>
                </div>
              </div>

              {/* Search bar - hidden on mobile in menu */}
              {!isMobile && (
                <div className="flex-1 max-w-xl mx-8">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textTertiaryColor} transition-colors duration-300`} />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 ${searchBg} border ${borderColor} rounded-xl ${textColor} placeholder-gray-400 focus:outline-none focus:border-orange-500 backdrop-blur-sm transition-all duration-300`}
                    />
                  </div>
                </div>
              )}

              {/* Desktop actions */}
              {!isMobile && (
                <div className="flex items-center gap-4">
                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} border ${borderColor} rounded-xl ${textColor} hover:opacity-90 transition-all duration-300 backdrop-blur-sm`}
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Dark</span>
                      </>
                    )}
                  </button>

                  <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100'} rounded-xl backdrop-blur-sm`}>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${textSecondaryColor} transition-colors duration-300`}>
                      {completedVideos}/{videos.length}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'} border ${isDarkMode ? 'border-red-500/30' : 'border-red-200'} rounded-xl ${isDarkMode ? 'text-red-400' : 'text-red-600'} hover:opacity-90 transition-all duration-300 backdrop-blur-sm`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile search bar */}
            {isMobile && (
              <div className="pb-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textTertiaryColor} transition-colors duration-300`} />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 ${searchBg} border ${borderColor} rounded-xl ${textColor} placeholder-gray-400 focus:outline-none focus:border-orange-500 backdrop-blur-sm transition-all duration-300`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-b ${borderColor} transition-colors duration-300`}>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                {/* Theme Toggle for Mobile */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} border ${borderColor} rounded-xl ${textColor} hover:opacity-90 transition-all duration-300`}
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4" />
                      <span className="text-sm">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  )}
                </button>

                <div className={`flex items-center gap-2 px-3 py-1.5 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100'} rounded-xl`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${textSecondaryColor} transition-colors duration-300`}>
                    {completedVideos}/{videos.length}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'} border ${isDarkMode ? 'border-red-500/30' : 'border-red-200'} rounded-xl ${isDarkMode ? 'text-red-400' : 'text-red-600'} hover:opacity-90 transition-all duration-300`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main content - Responsive grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video player and details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video player */}
              <div className={`rounded-2xl overflow-hidden shadow-2xl border ${borderColor} ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-300`}>
                <div className="relative aspect-video bg-black">
                  {selectedVideo ? (
                    <iframe 
                      src={selectedVideo.videoUrl} 
                      className="w-full h-full" 
                      allowFullScreen 
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-orange-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Video details */}
              {selectedVideo && (
                <div className={`${cardBg} rounded-2xl p-6 border ${borderColor} backdrop-blur-sm transition-all duration-300`}>
                  <h1 className={`text-xl sm:text-2xl font-bold ${textColor} mb-2 transition-colors duration-300`}>
                    {selectedVideo.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                    <span className={`flex items-center gap-1 ${textSecondaryColor} transition-colors duration-300`}>
                      <Eye className="w-4 h-4" />
                      {selectedVideo.views} views
                    </span>
                    <span className={`${textSecondaryColor} transition-colors duration-300`}>
                      👤 {selectedVideo.instructor}
                    </span>
                    <span className={`${categoryBg} ${categoryText} px-2 py-1 rounded-lg text-xs transition-all duration-300`}>
                      {selectedVideo.category}
                    </span>
                  </div>
                  <p className={`${textSecondaryColor} text-sm sm:text-base transition-colors duration-300`}>
                    {selectedVideo.description}
                  </p>
                </div>
              )}
            </div>

            {/* Video list sidebar */}
            <div className="lg:col-span-1">
              <div className={`${cardBg} rounded-2xl p-4 sm:p-6 border ${borderColor} backdrop-blur-sm h-fit sticky top-24 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${textColor} transition-colors duration-300`}>
                    Training Videos
                  </h3>
                  <div className={`text-sm ${textTertiaryColor} transition-colors duration-300`}>
                    <span className="text-green-500">{completedVideos}</span>/{videos.length}
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredVideos.map((video) => (
                    <div 
                      key={video.id} 
                      onClick={() => setSelectedVideo(video)}
                      className={`cursor-pointer rounded-xl p-3 transition-all duration-300 border ${
                        selectedVideo?.id === video.id 
                          ? `border-orange-500 ${selectedBg} ring-1 ring-orange-500/30` 
                          : `${borderColor} ${hoverBg} hover:border-gray-400`
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-16 sm:w-28 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <div 
                            className="absolute inset-0 bg-cover bg-center" 
                            style={{ backgroundImage: `url(${video.thumbnail})` }} 
                          />
                          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-black/60 to-transparent' : 'bg-gradient-to-t from-black/30 to-transparent'}`} />
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </span>
                          {video.progress === 100 && (
                            <div className="absolute top-1 left-1">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm line-clamp-2 ${textColor} transition-colors duration-300`}>
                            {video.title}
                          </h4>
                          <p className={`text-xs mt-1 ${textTertiaryColor} transition-colors duration-300`}>
                            {video.instructor}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${textTertiaryColor} transition-colors duration-300`}>
                              {video.category}
                            </span>
                            <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${progressBg} rounded-full overflow-hidden`}
                              >
                                <div 
                                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                                  style={{ width: `${video.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoSectionPage() {
  return (
    <ProtectedVideosRoute>
      <VideosContent />
    </ProtectedVideosRoute>
  );
}