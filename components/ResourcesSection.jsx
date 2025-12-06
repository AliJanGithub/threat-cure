"use client";

import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResourcesSection() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        const response = await fetch('/api/blogs?limit=6');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecentBlogs();
  }, []);

  const handleReadBlog = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  if (loading) {
    return (
      <section id="blogs" className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-6"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-[400px]"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
              Latest Insights
            </div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Security <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert analysis, security trends, and actionable advice from our team of cybersecurity professionals.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length> 0  && blogs?.map((blog, index) => (
            <div
              key={blog.slug}
              className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Blog Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    Blog
                  </span>
                </div>
                <div className="relative h-full w-full group-hover:scale-110 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent mix-blend-overlay"></div>
                  {/* Blog Image */}
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${blog.image || '/blogs/default-blog.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!blog.image && (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/60" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{Math.ceil(blog.excerpt.length / 200)} min read</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-5 leading-relaxed line-clamp-3">
                  {blog.description || blog.excerpt}
                </p>

                {/* Read Button */}
                <button
                  onClick={() => handleReadBlog(blog.slug)}
                  className="group/btn w-full bg-gradient-to-r from-white to-gray-50 border border-gray-200 text-gray-800 py-3 rounded-xl hover:border-orange-300 hover:from-orange-50 hover:to-orange-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md"
                >
                  <span>Read Blog</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-3xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/blogs')}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}