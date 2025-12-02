"use client";

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ChevronRight,
  Lock,
  Download,
  Award
} from 'lucide-react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerLinks = {
    solutions: [
      { name: 'AI-ShieldOps Platform', icon: Shield },
      { name: 'BASM-AI Platform', icon: Zap },
      { name: 'Cloud Attack Surface Mgmt', icon: Globe },
      { name: 'Threat Intelligence', icon: ShieldCheck },
      { name: 'Compliance & Governance', icon: Award },
      { name: 'Digital Forensics & IR', icon: Lock }
    ],
    company: [
      { name: 'About ThreatCure', highlight: true },
      { name: 'Leadership Team' },
      { name: 'Careers', badge: 'We\'re hiring!' },
      { name: 'Partners' },
      { name: 'Press & Media' },
      { name: 'Contact Sales' }
    ],
    resources: [
      { name: 'Blog & Insights' },
      { name: 'Documentation' },
      { name: 'Whitepapers', icon: Download },
      { name: 'Case Studies' },
      { name: 'Webinars' },
      { name: 'API Reference' }
    ],
    legal: [
      { name: 'Privacy Policy' },
      { name: 'Terms of Service' },
      { name: 'Cookie Policy' },
      { name: 'Security Compliance' },
      { name: 'Data Processing Addendum' },
      { name: 'GDPR' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', color: 'hover:bg-blue-500', label: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
    { icon: Github, href: '#', color: 'hover:bg-gray-800', label: 'GitHub' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-600', label: 'YouTube' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20 pb-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-800/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #ff6b35 1px, transparent 1px),
                          linear-gradient(to bottom, #ff6b35 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Newsletter & Quick Links */}
        <div className={`grid lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Newsletter Subscription */}
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-3xl p-8 border border-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Stay Secure & Updated</h3>
                <p className="text-gray-400 text-sm">Get the latest security insights</p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`absolute right-2 top-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                    ${isSubscribed 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                >
                  {isSubscribed ? (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center">✓</span>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                By subscribing, you agree to our Privacy Policy. No spam, ever.
              </p>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-400 text-xs">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-gray-400 text-xs">Detection Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-400 text-xs">Security Coverage</div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-black to-gray-800 shadow-lg">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Need Immediate Help?</h3>
                <p className="text-gray-400 text-sm">Our security experts are available 24/7</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="tel:+15551234567"
                className="group bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 border border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Emergency Hotline</div>
                    <div className="text-orange-500 font-bold">+1 (555) 123-4567</div>
                  </div>
                </div>
              </a>

              <a 
                href="mailto:support@threatcure.com"
                className="group bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 border border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Support Email</div>
                    <div className="text-orange-500">support@threatcure.com</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-800/50">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`group relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                      aria-label={social.label}
                    >
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg animate-pulse-subtle">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-ping"></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">ThreatCure</h2>
                <p className="text-gray-400 text-sm">Enterprise Security Platform</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Next-generation cybersecurity solutions powered by AI and expert intelligence. 
              Protecting 500+ enterprises worldwide with 99.9% threat detection accuracy.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-black rounded-lg text-xs font-medium text-gray-300 border border-gray-700">
                ISO 27001 Certified
              </div>
              <div className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-black rounded-lg text-xs font-medium text-gray-300 border border-gray-700">
                SOC 2 Type II
              </div>
              <div className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-black rounded-lg text-xs font-medium text-gray-300 border border-gray-700">
                GDPR Compliant
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <Icon className="w-3 h-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{item.name}</span>
                      <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`group flex items-center justify-between text-sm transition-all duration-300 hover:translate-x-1
                      ${item.highlight ? 'text-orange-400 hover:text-orange-300' : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {item.name}
                      {item.badge && (
                        <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-orange-600 text-xs rounded">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {item.highlight && <ChevronRight className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal Columns */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-6">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      {item.icon && <item.icon className="w-3 h-3" />}
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Address & Bottom Bar */}
        <div className={`space-y-8 pt-8 border-t border-gray-800/50 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Address Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-white font-semibold">Global Headquarters</div>
                <div className="text-gray-400 text-sm">
                  123 Security Boulevard, Suite 500 • San Francisco, CA 94105 • United States
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-semibold">Regional Offices</div>
                <div className="text-gray-400 text-sm">London • Singapore • Sydney • Dubai</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800/50">
            <div className="text-gray-500 text-sm">
              © {currentYear} ThreatCure Technologies Inc. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Security verified • Trusted by Fortune 500</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-800"></div>
              <div className="text-gray-500 text-sm">
                <span className="text-orange-500">✦</span> Securing digital futures since 2018
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:-translate-y-1 transition-all duration-300 z-50 group"
        aria-label="Back to top"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90 group-hover:-translate-y-1 transition-transform duration-300" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Back to top
        </span>
      </button>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </footer>
  );
}