"use client";

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BlogListingClient({ initialBlogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();
  
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
      category: blog.category || 'Security'
    }));
  }, [initialBlogs]);

  const filteredBlogs = blogs.filter(blog => {
    // Safely access blog properties
    const title = blog?.title || '';
    const description = blog?.description || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filtering
    const matchesCategory = selectedCategory === 'All' || 
                           blog.category === selectedCategory ||
                           (blog.description && blog.description.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  // ... rest of your component code remains the same

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
    // If you included contentWords in getAllBlogs:
    if (blog.contentWords) {
        const wordsPerMinute = 200;
        return Math.ceil(blog.contentWords / wordsPerMinute) || 5;
    }
    // Fallback if not available, or estimate based on description/excerpt length
    const text = blog.description || blog.excerpt || ''; 
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length * 2; // Assuming excerpt is about half the article
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-pink-400 text-white py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Security <span className="text-orange-100">Insights</span>
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Expert analysis, security trends, and actionable advice from our cybersecurity professionals
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            {/* <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by:</span>
            </div>
             */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-orange-600">{filteredBlogs.length}</span> of{' '}
              <span className="font-semibold">{blogs.length}</span> articles
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.slug || blog.title}
              className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
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
                  className="w-full group/btn bg-gradient-to-r from-white to-gray-50 border border-gray-200 text-gray-800 py-3 rounded-xl hover:border-orange-300 hover:from-orange-50 hover:to-orange-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md"
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

        {/* Empty State */}
        {filteredBlogs.length === 0 && blogs.length > 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">No articles found</div>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Loading State */}
        {blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">Loading articles...</div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        {/* <div className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest security insights and blog updates
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}