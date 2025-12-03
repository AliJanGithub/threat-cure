"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { 
  Shield, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  CheckCircle,
  BookOpen,
  Target,
  Users,
  Zap,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Menu,
  Grid,
  List,
  Search,
  Filter,
  Download,
  Bookmark,
  Share2,
  Eye
} from "lucide-react";
import LogoutButton from "../../../components/Logout";


export default function VideoSectionPage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Sample videos with actual YouTube embed URLs
  const videos= [
    {
      id: 1,
      title: 'Advanced Threat Detection Techniques',
      description: 'Learn cutting-edge techniques for identifying and mitigating sophisticated cyber threats in real-time environments.',
      duration: '15:30',
      category: 'Threat Intelligence',
      progress: 75,
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      instructor: 'Dr. Sarah Chen',
      views: 2450,
      likes: 198,
      publishedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Cloud Security Best Practices',
      description: 'Comprehensive guide to securing cloud infrastructure across AWS, Azure, and GCP platforms.',
      duration: '22:15',
      category: 'Cloud Security',
      progress: 25,
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/7LNl2JlZKHA',
      instructor: 'Mark Rodriguez',
      views: 3120,
      likes: 245,
      publishedDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Incident Response & Forensics',
      description: 'Step-by-step guide to handling security incidents and conducting digital forensics investigations.',
      duration: '18:45',
      category: 'Incident Response',
      progress: 0,
      required: false,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/J---aiyznGQ',
      instructor: 'Alex Thompson',
      views: 1890,
      likes: 167,
      publishedDate: '2024-01-05'
    },
    {
      id: 4,
      title: 'AI-Powered Security Analytics',
      description: 'How machine learning and AI are revolutionizing security analytics and threat prediction.',
      duration: '30:20',
      category: 'AI Security',
      progress: 100,
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/BEhGm2rywLY',
      instructor: 'Dr. Michael Park',
      views: 4210,
      likes: 356,
      publishedDate: '2024-01-20'
    },
    {
      id: 5,
      title: 'Network Security Fundamentals',
      description: 'Essential network security concepts and implementation strategies for modern enterprises.',
      duration: '12:10',
      category: 'Network Security',
      progress: 50,
      required: false,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/9sJUDx7iEJw',
      instructor: 'Lisa Wang',
      views: 1560,
      likes: 132,
      publishedDate: '2024-01-08'
    },
    {
      id: 6,
      title: 'Zero Trust Architecture Implementation',
      description: 'Practical implementation guide for Zero Trust security models in enterprise environments.',
      duration: '20:05',
      category: 'Architecture',
      progress: 0,
      required: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/0b_eXLZf6YE',
      instructor: 'James Wilson',
      views: 2780,
      likes: 221,
      publishedDate: '2024-01-12'
    },
    {
      id: 7,
      title: 'Compliance & Regulatory Standards',
      description: 'Understanding and implementing security compliance standards across global regulations.',
      duration: '25:40',
      category: 'Compliance',
      progress: 10,
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/3JluqTojuME',
      instructor: 'Emma Davis',
      views: 1890,
      likes: 154,
      publishedDate: '2024-01-18'
    },
    {
      id: 8,
      title: 'Security Automation with SOAR',
      description: 'Implementing Security Orchestration, Automation and Response platforms for efficient security operations.',
      duration: '17:55',
      category: 'Automation',
      progress: 30,
      required: false,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/VT60UGs8eM8',
      instructor: 'Robert Kim',
      views: 2340,
      likes: 189,
      publishedDate: '2024-01-22'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Videos', icon: Grid, count: videos.length },
    { id: 'Threat Intelligence', label: 'Threat Intel', icon: Target, count: videos.filter(v => v.category === 'Threat Intelligence').length },
    { id: 'Cloud Security', label: 'Cloud Security', icon: Shield, count: videos.filter(v => v.category === 'Cloud Security').length },
    { id: 'Incident Response', label: 'IR & Forensics', icon: Zap, count: videos.filter(v => v.category === 'Incident Response').length },
    { id: 'AI Security', label: 'AI Security', icon: Sparkles, count: videos.filter(v => v.category === 'AI Security').length },
    { id: 'Network Security', label: 'Network Security', icon: Users, count: videos.filter(v => v.category === 'Network Security').length },
    { id: 'Compliance', label: 'Compliance', icon: BookOpen, count: videos.filter(v => v.category === 'Compliance').length },
  ];

  // Initialize with first video
 useEffect(() => {
    // Only set selectedVideo if it's currently null and videos array has items
    if (!selectedVideo && videos.length > 0) {
      // Wrap in setTimeout 0 to defer the state update after render
      const timer = setTimeout(() => {
        setSelectedVideo(videos[0]);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [videos, selectedVideo]);



  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: containerRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffa726,
          midtoneColor: 0xffffff,
          lowlightColor: 0x0a0a0a,
          baseColor: 0x000000,
          blurFactor: 0.35,
          speed: 1.0,
          zoom: 1.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
  };

  const handleProgressChange = (e) => {
    const value = parseInt(e.target.value);
    setProgress(value);
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const minutes = Math.floor(videoRef.current.duration / 60);
      const seconds = Math.floor(videoRef.current.duration % 60);
      setTotalTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progressPercent = (current / duration) * 100;
      setProgress(progressPercent);
      
      const minutes = Math.floor(current / 60);
      const seconds = Math.floor(current % 60);
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime("0:00");
    
    // Auto-play after a short delay
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }, 100);
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const completedVideos = videos.filter(v => v.progress === 100).length;
  const totalVideos = videos.length;
  const completionPercentage = Math.round((completedVideos / totalVideos) * 100);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <LogoutButton/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button & Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-2">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ThreatCure</span>
                <span className="text-sm text-orange-400 font-semibold bg-black/50 px-2 py-0.5 rounded">Partner Training</span>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search training videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Right: Stats & Controls */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-300">
                  {completedVideos}/{totalVideos} completed
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    viewMode === 'grid' ? 'bg-orange-500/20 text-orange-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    viewMode === 'list' ? 'bg-orange-500/20 text-orange-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Video Player & Details */}
          <div className="lg:col-span-2">
            {/* Video Player Container */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-6">
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                {selectedVideo ? (
                  <>
                    {/* YouTube Embed */}
                    <div className="absolute inset-0">
                      <iframe
                        src={`${selectedVideo.videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    </div>

                    {/* Custom Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {/* Progress Bar */}
                      <div className="absolute bottom-16 left-0 right-0 px-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleProgressChange}
                          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                        />
                        <div className="flex justify-between text-sm text-gray-300 mt-1">
                          <span>{currentTime}</span>
                          <span>{totalTime}</span>
                        </div>
                      </div>

                      {/* Control Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={togglePlay}
                              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                            >
                              {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" />
                              ) : (
                                <Play className="w-6 h-6 text-white" />
                              )}
                            </button>
                            
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
                              <SkipBack className="w-5 h-5 text-gray-300" />
                            </button>
                            
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
                              <SkipForward className="w-5 h-5 text-gray-300" />
                            </button>

                            {/* Volume Control */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={toggleMute}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                              >
                                {isMuted ? (
                                  <VolumeX className="w-5 h-5 text-gray-300" />
                                ) : (
                                  <Volume2 className="w-5 h-5 text-gray-300" />
                                )}
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
                              <Download className="w-5 h-5 text-gray-300" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
                              <Bookmark className="w-5 h-5 text-gray-300" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
                              <Share2 className="w-5 h-5 text-gray-300" />
                            </button>
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                            >
                              {isFullscreen ? (
                                <Minimize className="w-5 h-5 text-gray-300" />
                              ) : (
                                <Maximize className="w-5 h-5 text-gray-300" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-400">Select a video to start watching</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Details */}
            {selectedVideo && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedVideo.views.toLocaleString()} views
                      </span>
                      <span>•</span>
                      <span>{selectedVideo.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        👤 {selectedVideo.instructor}
                      </span>
                    </div>
                  </div>
                  {selectedVideo.progress === 100 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Completed</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 mb-6">{selectedVideo.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Category</div>
                    <div className="text-white font-semibold">{selectedVideo.category}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Duration</div>
                    <div className="text-white font-semibold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedVideo.duration}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Progress</div>
                    <div className="text-white font-semibold">{selectedVideo.progress}%</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Status</div>
                    <div className={`font-semibold ${selectedVideo.required ? 'text-orange-400' : 'text-blue-400'}`}>
                      {selectedVideo.required ? 'Required' : 'Optional'}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Materials
                  </button>
                  <button className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Save for Later
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Video List & Categories */}
          <div className="space-y-6">
            {/* Categories Filter */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isActive ? 'bg-orange-500' : 'bg-gray-800'
                        }`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {category.label}
                        </span>
                      </div>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video List */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Training Videos</h3>
                <span className="text-sm text-gray-400">
                  {filteredVideos.length} of {videos.length}
                </span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    onMouseEnter={() => setHoveredVideo(video.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    className={`group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedVideo?.id === video.id
                        ? 'ring-2 ring-orange-500 bg-gradient-to-r from-orange-500/10 to-orange-600/10'
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="flex gap-4 p-4">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
                        />
                        
                        {/* Play Button on Hover */}
                        {hoveredVideo === video.id && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        
                        {/* Progress Bar */}
                        {video.progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                              style={{ width: `${video.progress}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">
                              {video.category}
                            </span>
                            {video.required && (
                              <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                Required
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {video.progress === 100 ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : video.progress > 0 ? (
                              <span className="text-xs text-orange-400">{video.progress}%</span>
                            ) : null}
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Overall Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">{completedVideos}</div>
                    <div className="text-sm text-gray-400">Videos Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">
                      {videos.filter(v => v.required && v.progress === 100).length}/{videos.filter(v => v.required).length}
                    </div>
                    <div className="text-sm text-gray-400">Required Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        /* Custom scrollbar for video list */
        .max-h-\[600px\]::-webkit-scrollbar {
          width: 4px;
        }
        
        .max-h-\[600px\]::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .max-h-\[600px\]::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 53, 0.5);
          border-radius: 4px;
        }
        
        .max-h-\[600px\]::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 53, 0.8);
        }
        
        /* Range slider styling */
        input[type="range"] {
          -webkit-appearance: none;
          background: transparent;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #ff6b35;
          cursor: pointer;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #ff6b35;
          cursor: pointer;
          border: none;
        }
        
        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}