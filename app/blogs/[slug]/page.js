import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Tag, MessageSquare, ChevronRight, Sparkles, Eye, User } from 'lucide-react';
import { getBlogBySlug, getAllBlogSlugs } from '../lib/blog-utils';
import ReactMarkdown from 'react-markdown';
import Navigation from '../../../components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import './BlogPage.css'; // Create this CSS file

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(({ params }) => ({ slug: params.slug }));
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <div className="text-center p-8 bg-white rounded-3xl border border-gray-200 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The requested article could not be found.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
  const tags = blog.tags || ['Security', 'Technology', 'Insights'];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Elegant Hero Section */}
      <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-white border-b border-gray-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 relative">
          {/* Minimal Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-orange-600 transition-colors duration-300">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blogs" className="hover:text-orange-600 transition-colors duration-300">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium text-gray-700">Article</span>
          </div>

          {/* Article Title */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200 px-4 py-1.5 rounded-full mb-6 text-sm font-medium">
              <Tag className="w-3 h-3" />
              <span>{tags[0]}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              {blog.description}
            </p>
          </div>

          {/* Clean Meta Info */}
          <div className="flex flex-wrap items-center gap-6 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">ThreatCure Team</div>
                <div className="text-xs text-gray-500">Security Experts</div>
              </div>
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-medium">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Image with Hover Effect */}
        {blog.image && (
          <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden mb-10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent mix-blend-overlay"></div>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm z-20">
              <Eye className="w-4 h-4 inline mr-1.5" />
              Featured Image
            </div>
          </div>
        )}

        {/* Article Content Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                {tag}
              </span>
            ))}
          </div>

          {/* Enhanced Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-800 space-y-8">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b border-gray-100" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-3 group">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0"></div>
                      <span className="group-hover:text-orange-600 transition-colors duration-300" {...props} />
                    </h2>
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3 pl-4 border-l-4 border-orange-400" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="my-5 text-gray-700 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-gray-900 bg-gradient-to-r from-orange-50 to-transparent px-1" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="my-6 space-y-3 ml-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="my-6 space-y-3 ml-4 list-decimal" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="flex items-start gap-3 my-2 group" {...props}>
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{props.children}</span>
                    </li>
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-orange-500 pl-6 my-8 py-4 bg-gradient-to-r from-orange-50/50 to-transparent rounded-r-xl text-gray-700 italic relative overflow-hidden" {...props}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500"></div>
                      {props.children}
                    </blockquote>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg font-mono text-sm border border-gray-200" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2 transition-colors duration-300" {...props} />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Interactive Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button className="group flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-300">
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Share
              </button>
              
              <button className="group flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
                <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Save
              </button>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>24 Comments</span>
            </div>
          </div>
        </div>

        {/* Author Section */}
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 mt-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                TC
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">ThreatCure Security Team</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our cybersecurity experts bring decades of combined experience in threat detection,
                incident response, and security architecture. We are dedicated to sharing actionable
                insights to help organizations stay secure in an evolving threat landscape.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">Follow:</span>
                <div className="flex gap-2">
                  {['Twitter', 'GitHub', 'LinkedIn'].map((platform, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform duration-300"
                    >
                      {platform.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-3 bg-white border-2 border-orange-200 text-gray-800 px-8 py-3.5 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to All Articles</span>
            <div className="w-5 h-5 relative overflow-hidden">
              <ChevronRight className="w-5 h-5 absolute -translate-x-5 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
            </div>
          </Link>
        </div>
      </div>

      {/* Subtle Footer */}
      <div className="relative mt-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <div className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ThreatCure. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}