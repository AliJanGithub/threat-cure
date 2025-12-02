"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, Brain, Zap, Users, Shield, Clock, Target, Award, BarChart, TrendingUp, Sparkles, CheckCircle, ArrowRight, Globe, Lock } from 'lucide-react';

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
      description: 'Round-the-clock surveillance with AI-powered threat detection and instant alerting systems.',
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
      title: 'AI-Powered Threat Intelligence',
      description: 'Advanced machine learning algorithms that identify anomalies and predict threats before they impact your business.',
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
      title: 'Rapid Incident Response',
      description: 'Industry-leading response times with automated containment and expert-led remediation.',
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
      title: 'Expert Security Team',
      description: 'Certified security professionals with decades of experience protecting global enterprises.',
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
      title: 'Global Threat Coverage',
      description: 'Comprehensive threat intelligence from global sources with localized protection strategies.',
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
      title: 'Compliance Assurance',
      description: 'Ensuring your organization meets all regulatory requirements across global standards.',
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-black/5 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float delay-1500"></div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Shield, Lock, Target, Brain].map((Icon, i) => (
          <div
            key={i}
            className="absolute opacity-5 animate-float"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '8s'
            }}
          >
            <Icon className="w-24 h-24 text-orange-400" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse-subtle">
            <Sparkles className="w-4 h-4" />
            Industry Leadership
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent animate-gradient-x">
            Why <span className="text-orange-600">ThreatCure</span>?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Industry-leading security powered by cutting-edge technology and expert professionals
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <StatIcon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  
                  <div className="text-4xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-500">
                    {stat.value}
                  </div>
                  
                  <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-500">
                    {stat.label}
                  </p>
                </div>
                
                {/* Animated progress ring */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-orange-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className={`grid lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left Column - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={index}
                  className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-500 overflow-hidden
                    ${isActive ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl hover:scale-105'}
                    ${mounted ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse-subtle"></div>
                  )}
                  
                  {/* Background gradient on active */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 ${isActive ? 'opacity-5' : 'group-hover:opacity-5'} transition-opacity duration-500`}></div>
                  
                  {/* Base background */}
                  <div className="absolute inset-0 bg-white transition-colors duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                        <FeatureIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 flex-1">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Details list - shows on hover/active */}
                    <div className={`space-y-2 overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 ${isActive ? 'opacity-10 blur-xl' : ''} transition-all duration-500`}></div>
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
                      <div className={`w-3 h-3 ${features[activeIndex].accentColor} rounded-full animate-pulse`}></div>
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
                        className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300"
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
                          <div className={`h-full ${features[activeIndex].accentColor} rounded-full transition-all duration-1000`} style={{ width: '95%' }}></div>
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-400 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <Shield className="w-5 h-5" />
                  Learn More About This Feature
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl -z-10 animate-float-delayed"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-black/5 to-gray-800/5 rounded-2xl -z-10 animate-float-delayed-2"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">
              Ready to Experience Enterprise-Grade Security?
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group relative overflow-hidden bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-300 hover:border-orange-300 flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                Schedule a Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Join 500+ enterprises who trust ThreatCure for their cybersecurity needs
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
        
        @keyframes float-delayed-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(10px) translateX(-10px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-delayed-2 {
          animation: float-delayed-2 7s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}