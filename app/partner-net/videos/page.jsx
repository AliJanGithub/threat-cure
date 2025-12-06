"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedVideosRoute } from "../../../components/ProtectedRoute";
import { logout } from "../../../lib/auth";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { 
  Shield, Play, CheckCircle, ArrowLeft, Search, Eye, LogOut
} from "lucide-react";

function VideosContent() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

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

  // Set initial video on mount
  const initialVideoSet = useRef(false);
  useEffect(() => {
    if (!initialVideoSet.current && videos.length > 0) {
      initialVideoSet.current = true;
      setSelectedVideo(videos[0]);
    }
  }, [videos]);

  useEffect(() => {
    if (!vantaEffect && containerRef.current) {
      setVantaEffect(
        VANTA({
          el: containerRef.current, THREE,
          mouseControls: true, touchControls: true, gyroControls: false,
          minHeight: 200.0, minWidth: 200.0,
          highlightColor: 0xffa726, midtoneColor: 0xffffff,
          lowlightColor: 0x0a0a0a, baseColor: 0x000000,
          blurFactor: 0.35, speed: 1.0, zoom: 1.0
        })
      );
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect]);

  const handleLogout = async () => {
    await logout();
    router.replace("/partner-net");
  };

  const filteredVideos = videos.filter(v => 
    searchQuery === '' || v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedVideos = videos.filter(v => v.progress === 100).length;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-2">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ThreatCure</span>
              </div>
            </div>
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text" placeholder="Search videos..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-300">{completedVideos}/{videos.length}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400">
                <LogOut className="w-4 h-4" /><span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-6">
              <div className="relative aspect-video bg-black">
                {selectedVideo ? (
                  <iframe src={selectedVideo.videoUrl} className="w-full h-full" allowFullScreen title={selectedVideo.title} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-orange-500" />
                  </div>
                )}
              </div>
            </div>
            {selectedVideo && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h1 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{selectedVideo.views} views</span>
                  <span>👤 {selectedVideo.instructor}</span>
                </div>
                <p className="text-gray-300">{selectedVideo.description}</p>
              </div>
            )}
          </div>
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 h-fit">
            <h3 className="text-lg font-semibold text-white mb-4">Training Videos</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredVideos.map((video) => (
                <div key={video.id} onClick={() => setSelectedVideo(video)}
                  className={`cursor-pointer rounded-xl p-3 transition-all ${selectedVideo?.id === video.id ? 'ring-2 ring-orange-500 bg-orange-500/10' : 'hover:bg-gray-800/50'}`}>
                  <div className="flex gap-3">
                    <div className="relative w-28 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.thumbnail})` }} />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">{video.duration}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm line-clamp-2">{video.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{video.instructor}</p>
                      {video.progress === 100 && <CheckCircle className="w-4 h-4 text-green-500 mt-1" />}
                    </div>
                  </div>
                </div>
              ))}
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
