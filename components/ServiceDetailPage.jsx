"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, ArrowLeft, CheckCircle, Sparkles, 
  ArrowRight, Phone, Mail, Clock, Award,
  Target, Zap, Users, BarChart
} from "lucide-react";
import Link from "next/link";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function ServiceDetailPage({ 
  title, 
  subtitle,
  description, 
  content, 
  features = [], 
  benefits = [],
  icon: Icon = Shield,
  stats = [],
  color = "orange"
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parse content into sections if it contains headers
  const parseContent = (text) => {
    if (!text) return [];
    const sections = text.split(/\n(?=[A-Z][^:]+:)/);
    return sections.map(section => {
      const lines = section.trim().split('\n');
      const firstLine = lines[0];
      const hasHeader = firstLine.endsWith(':');
      return {
        header: hasHeader ? firstLine.replace(':', '') : null,
        content: hasHeader ? lines.slice(1).join('\n').trim() : section.trim()
      };
    }).filter(s => s.content);
  };

  const contentSections = parseContent(content);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Services</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                ThreatCure Security Service
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>

              {subtitle && (
                <p className="text-xl text-orange-600 font-semibold mb-4">{subtitle}</p>
              )}

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  Request Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-orange-600" />
                  Contact Sales
                </Link>
              </div>
            </motion.div>

            {/* Right - Icon/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 shadow-2xl">
                <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                <div className="relative flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Floating Stats */}
                {stats.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {stats.slice(0, 4).map((stat, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300 rounded-full opacity-40 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Key <span className="text-orange-600">Features</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive capabilities designed to protect your organization
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 transition-colors">
                      <CheckCircle className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{feature}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contentSections.length > 0 ? (
              <div className="space-y-12">
                {contentSections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                  >
                    {section.header && (
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                        {section.header}
                      </h3>
                    )}
                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                      {section.content.split('\n').map((paragraph, pIdx) => {
                        if (paragraph.trim().startsWith('- ')) {
                          return (
                            <div key={pIdx} className="flex items-start gap-3 my-2">
                              <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                              <span>{paragraph.replace('- ', '')}</span>
                            </div>
                          );
                        }
                        return paragraph.trim() ? (
                          <p key={pIdx} className="mb-4">{paragraph}</p>
                        ) : null;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-orange-500">ThreatCure</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Industry-leading security solutions backed by expert teams
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{benefit}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Organization?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get started with ThreatCure&apos;s enterprise security solutions today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
