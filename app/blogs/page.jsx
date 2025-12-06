// "use client";

// import { useState } from 'react';
// import { Search, Filter, Calendar, Clock, User } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { getAllBlogPosts } from './blog-data';
// import Navigation from '../../components/Navigation';

// export default function BlogsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const router = useRouter();
  
//   const blogs = getAllBlogPosts();
//   const categories = ['All', 'Research', 'Cloud', 'AI', 'Architecture', 'Threats', 'Compliance'];

//   const filteredBlogs = blogs.filter(blog => {
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          blog.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       <Navigation/>
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">Security Insights</h1>
//           <p className="text-xl opacity-90 max-w-3xl mx-auto">
//             Expert analysis, security trends, and actionable advice from our cybersecurity professionals
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {/* Search & Filter */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
//             <div className="relative w-full md:w-96">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="flex items-center gap-4">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                       selectedCategory === category
//                         ? 'bg-orange-500 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-gray-600">
//               Showing {filteredBlogs.length} of {blogs.length} articles
//             </p>
//           </div>
//         </div>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredBlogs.map((blog) => (
//             <div
//               key={blog.id}
//               className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
//               onClick={() => router.push(`/blogs/${blog.id}`)}
//             >
//               {/* Blog Header */}
//               <div className="relative h-48 bg-gradient-to-br from-gray-300 to-gray-400">
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
//                     {blog.category}
//                   </span>
//                 </div>
//               </div>

//               {/* Blog Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
//                   {blog.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   {blog.excerpt}
//                 </p>

//                 {/* Meta Info */}
//                 <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//                   <div className="flex items-center gap-1">
//                     <User className="w-4 h-4" />
//                     <span>{blog.author}</span>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{blog.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       <span>{blog.readTime}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Read Button */}
//                 <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
//                   Read Article
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredBlogs.length === 0 && (
//           <div className="text-center py-20">
//             <div className="text-gray-400 mb-4">No articles found</div>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedCategory('All');
//               }}
//               className="text-orange-600 hover:text-orange-700 font-medium"
//             >
//               Clear filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { getAllBlogs } from './lib/blog-utils';
import BlogListingClient from './BlogListingClient';
import Navigation from '../../components/Navigation';

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  
  // Debug log to check blog data structure
  console.log('Blogs data:', blogs.map(b => ({
    slug: b.slug,
    title: b.title,
    image: b.image,
    hasContent: !!b.content
  })));
  
  return(
    <>
    <Navigation/>
    <BlogListingClient initialBlogs={blogs} />
    </>

  ) 
}