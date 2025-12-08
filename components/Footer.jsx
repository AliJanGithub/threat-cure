"use client";

import { useState } from 'react';
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
  Award,
  FileText,
  AlertTriangle,
  Users,
  Cloud
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerLinks = {
    services: [
      { name: 'Managed Defense and Response', icon: ShieldCheck },
      { name: 'Managed Cloud Attack Surface Management', icon: Cloud },
      { name: 'SOC Maturity Assessment', icon: Award },
      { name: 'ThreatCure Breach Response Service', icon: Shield },
      { name: 'Cyber Threat Advisory', icon: AlertTriangle },
      { name: 'Cyber Drill Exercise', icon: Users }
    ],
    blogs: [
      { name: 'A Comprehensive Guide to Modern Security Operations Centers' },
      { name: 'A Comprehensive Insight' },
      { name: 'The Role of Managed SOC Services in Modern Cybersecurity' },
      { name: 'Navigating the complex world of Data Security' },
      { name: 'Cybersecurity Breaches – Report in last 10 years' },
      { name: 'How ThreatCure\'s Managed Cloud ASM Safeguards Your Business' },
      { name: 'Top Benefits of ThreatCure Breach Response Solution' },
      { name: 'A Critical Analysis of the ThreatCure ShieldOps Platform' }
    ],
    solutions: [
      { name: 'AI-ShieldOps Platform solution', icon: Shield },
      { name: 'BASM-AI Platform', icon: Zap },
      { name: 'Managed Cloud Attack Surface Management', icon: Cloud },
      { name: 'ThreatCure Cyber Drill Practices', icon: Users }
    ],
    advisories: [
      { name: 'FunSec Ransomware' },
      { name: 'Windows LDAP RCE' },
      { name: 'Mirai' },
      { name: 'NetWalker' },
      { name: 'Splunk Vulnerability' },
      { name: 'AKIRA' },
      { name: 'Hive' },
      { name: 'RA World' },
      { name: 'Fighting Ursa' },
      { name: 'Water Hydra' },
      { name: 'Grandoreiro Malware' },
      { name: 'Lazarus Group' }
    ],
    threatActors: [
      { name: 'FunSec Ransomware' },
      { name: 'Mirai' },
      { name: 'Hunters International' },
      { name: 'Tick' },
      { name: 'BianLian Ransomware' },
      { name: 'LockBit 3.0 Ransomware' },
      { name: 'MuddyWater Analysis Report by ThreatCure' },
      { name: 'ThreatCure Analysis Report: Fighting Ursa' },
      { name: 'Water Hydra' },
      { name: 'Lazarus Group' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', color: 'hover:bg-blue-500', label: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
    { icon: Github, href: '#', color: 'hover:bg-gray-800', label: 'GitHub' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-600', label: 'YouTube' },
  ];

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
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
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
              <Link 
                href="tel:+1-734-6371042"
                className="group bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 border border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">USA Office</div>
                    <div className="text-orange-500 font-bold">+1-(734)-6371042</div>
                    <div className="text-orange-500 text-sm mt-1">+1-(734)-2186219</div>
                  </div>
                </div>
              </Link>

              <Link 
                href="tel:+92-021-34025367"
                className="group bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 border border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Pakistan Office</div>
                    <div className="text-orange-500 font-bold">+92-(021)-34025367</div>
                  </div>
                </div>
              </Link>
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
                    <Link
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
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-3 rounded-2xl  shadow-lg animate-pulse-subtle">
                    {/* <Shield className="w-8 h-8 text-white" /> */}
                        <Image alt="logo" src={"/logowhite.png"} width={120} height={50} />

                  </div>
                  {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-ping"></div> */}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">ThreatCure® Networks</h2>
                  <p className="text-gray-400 text-sm">USA Headquarters</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link href="tel:+1-734-6371042" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +1-(734)-6371042
                </Link>
                <Link href="tel:+1-734-2186219" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +1-(734)-2186219
                </Link>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>41366 Northwind Drive, Canton, Michigan. USA</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-800">
              <h3 className="text-xl font-bold text-white">ThreatCure® Pvt. Ltd.</h3>
              <div className="space-y-2">
                <Link href="tel:+92-021-34025367" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +92-(021)-34025367
                </Link>
                <div className="flex items-start gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>B-111, Block-7, Gulistan-e-Johar. Karachi, Pakistan.</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-white font-bold mb-4">Contact Info</h3>
              <Link href="mailto:info@threatcure.net" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
                <Mail className="w-4 h-4" />
                info@threatcure.net
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link 
                      href="/services" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <Icon className="w-3 h-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="flex-1">{item.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Blogs & Solutions Columns */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Blogs
              </h3>
              <ul className="space-y-3">
                {footerLinks.blogs.slice(0, 6).map((item, index) => (
                  <li key={index}>
                    <Link 
                      href="/blogs" 
                      className="group flex items-center justify-between text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="line-clamp-2">{item.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Solutions</h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href="/solutions" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      {item.icon && <item.icon className="w-3 h-3" />}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Advisories & Threat Actors Columns */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-6">Advisories</h3>
              <ul className="space-y-3">
                {footerLinks.advisories.slice(0, 6).map((item, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block hover:translate-x-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Threat Actors Analysis</h3>
              <ul className="space-y-3">
                {footerLinks.threatActors.slice(0, 6).map((item, index) => (
                  <li key={index}>
                    <Link 
                      href="/blogs" 
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block hover:translate-x-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="space-y-8 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {currentYear} ThreatCure®. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Enterprise Security Solutions</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-800"></div>
              <div className="text-gray-500 text-sm">
                <span className="text-orange-500">✦</span> Advanced Threat Protection
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </footer>
  );
}