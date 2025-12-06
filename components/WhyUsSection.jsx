"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, Brain, Zap, Users, Shield, Clock, Target, Award, BarChart, TrendingUp, Sparkles, CheckCircle, ArrowRight, Globe, Lock } from 'lucide-react';
import Link from "next/link";

export default function WhyUsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const stats = [
    { value: "99.9%", label: "Threat Detection Accuracy", icon: Target, color: "text-orange-500" },
    { value: "<5min", label: "Average Response Time", icon: Clock, color: "text-black" },
    { value: "500+", label: "Enterprise Clients", icon: Users, color: "text-orange-600" },
    { value: "24/7", label: "Security Coverage", icon: Shield, color: "text-black" },
  ];

  const features = [
    {
      icon: Eye,
      title: '24/7 Proactive Monitoring',
      description: 'Our dedicated support team is available around the clock, ensuring that any concerns or incidents are addressed promptly and efficiently.',
      details: [
        'Real-time network monitoring',
        'AI-powered anomaly detection',
        'Automated threat correlation',
        'Instant alert notifications'
      ],
      color: 'from-orange-500 to-orange-600',
      accentColor: 'bg-orange-500'
    },
    {
      icon: Brain,
      title: 'Industry-Leading Expertise',
      description: 'Our team comprises cybersecurity veterans with decades of combined experience, ensuring that your digital assets are protected by the best in the business.',
      details: [
        'Predictive threat analysis',
        'Behavioral analytics',
        'Automated threat hunting',
        'Zero-day vulnerability detection'
      ],
      color: 'from-black to-gray-800',
      accentColor: 'bg-black'
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Technology',
      description: 'We utilize the latest advancements in cybersecurity technology, ensuring that our clients are always one step ahead of potential threats.',
      details: [
        '<5 minute average response',
        'Automated containment protocols',
        'Expert-led investigation',
        'Post-incident analysis'
      ],
      color: 'from-gray-900 to-black',
      accentColor: 'bg-gray-900'
    },
    {
      icon: Users,
      title: 'Tailored Solutions',
      description: 'At ThreatCure, we understand that every business is unique. We offer customized security solutions that cater specifically to your organizations needs.',
      details: [
        'CISSP certified analysts',
        'Industry-specific expertise',
        'Continuous training programs',
        'Dedicated account managers'
      ],
      color: 'from-orange-600 to-orange-700',
      accentColor: 'bg-orange-600'
    },
    {
      icon: Globe,
      title: 'Proactive Threat Intelligence',
      description: 'Our advanced threat intelligence systems continuously monitor the digital landscape, identifying potential vulnerabilities before they can be exploited.',
      details: [
        'Global threat intelligence',
        'Regional threat monitoring',
        'Multi-language support',
        'Local compliance expertise'
      ],
      color: 'from-black to-orange-900',
      accentColor: 'bg-black'
    },
    {
      icon: Lock,
      title: 'Comprehensive Training',
      description: 'Beyond just providing security solutions, we empower our clients with the knowledge and training they need to maintain a secure digital environment.',
      details: [
        'Automated compliance checks',
        'Audit trail management',
        'Policy enforcement',
        'Documentation automation'
      ],
      color: 'from-gray-800 to-black',
      accentColor: 'bg-gray-800'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [features.length]);

  return (
    <section ref={containerRef} className="relative py-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-black/5 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Shield, Lock, Target, Brain].map((Icon, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          >
            <Icon className="w-24 h-24 text-orange-400" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Industry Leadership
            <Sparkles className="w-4 h-4" />
          </div>
          
          {/* Fixed heading without animation that affects size */}
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Why <span className="bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent bg-fixed">ThreatCure</span>?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Industry-leading security powered by cutting-edge technology and expert professionals
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-white mb-6 mx-auto">
                    <StatIcon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  
                  <div className="text-4xl font-black text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  
                  <p className="text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={index}
                  className={`group relative rounded-3xl p-6 cursor-pointer overflow-hidden shadow-lg min-h-[220px]`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                  )}
                  
                  {/* Background gradient on active */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 ${isActive ? 'opacity-5' : 'group-hover:opacity-5'} transition-opacity duration-300`}></div>
                  
                  {/* Base background */}
                  <div className="absolute inset-0 bg-white"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                        <FeatureIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 flex-1">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Fixed height details - only opacity changes */}
                    <div className={`space-y-2 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Active Feature Detail */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${features[activeIndex].color} shadow-lg`}>
                    {(() => {
                      const ActiveIcon = features[activeIndex].icon;
                      return <ActiveIcon className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {features[activeIndex].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${features[activeIndex].accentColor} rounded-full`}></div>
                      <span className="text-sm text-gray-600">Active Feature</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {features[activeIndex].description}
                </p>

                {/* Feature Details */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-orange-600" />
                    Key Benefits
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features[activeIndex].details.map((detail, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-gray-200"
                      >
                        <div className={`p-2 rounded-lg ${features[activeIndex].accentColor} bg-opacity-10`}>
                          <TrendingUp className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Comparison */}
                <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-6 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    Industry Comparison
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>ThreatCure</span>
                        <span>Industry Average</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${features[activeIndex].accentColor} rounded-full`} style={{ width: '95%' }}></div>
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-400 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">
              Ready to Experience Enterprise-Grade Security?
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300"></span>
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group relative overflow-hidden bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 hover:border-orange-300 flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
               <Link href={"demo"}> Schedule a Demo</Link>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Join 500+ enterprises who trust ThreatCure for their cybersecurity needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}