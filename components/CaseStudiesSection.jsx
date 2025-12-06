"use client";

import { Building2, Heart, ShoppingCart, TrendingUp, Shield, Target, Zap, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CaseStudiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const caseStudies = [
    {
      icon: Building2,
      title: 'Global Financial Corp',
      industry: 'Banking & Finance',
      description: 'Prevented 127 sophisticated attacks in 6 months, reducing security incidents by 94% and achieving full compliance with PCI-DSS and SOC 2 standards.',
      metrics: [
        { value: '94%', label: 'Incident Reduction', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
        { value: '127', label: 'Attacks Prevented', icon: Shield, color: 'from-blue-500 to-cyan-600' },
      ],
      achievements: ['PCI-DSS Certified', 'SOC 2 Compliant', 'Zero Data Breaches'],
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100',
    },
    {
      icon: Heart,
      title: 'HealthTech Solutions',
      industry: 'Healthcare Technology',
      description: 'Secured patient data for 2M+ users, achieved HIPAA compliance, and detected ransomware attack before encryption began, saving $8M in potential damages.',
      metrics: [
        { value: '$8M', label: 'Damages Prevented', icon: Target, color: 'from-red-500 to-pink-600' },
        { value: '2M+', label: 'Users Protected', icon: Heart, color: 'from-purple-500 to-violet-600' },
      ],
      achievements: ['HIPAA Compliant', 'Real-time Detection', 'Automated Response'],
      gradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-100',
    },
    {
      icon: ShoppingCart,
      title: 'RetailMax Enterprise',
      industry: 'E-commerce',
      description: 'Protected Black Friday sales processing $50M in transactions, blocked 3,400 fraud attempts, and maintained 99.99% uptime during peak traffic periods.',
      metrics: [
        { value: '99.99%', label: 'Uptime', icon: Zap, color: 'from-yellow-500 to-orange-600' },
        { value: '3.4K', label: 'Fraud Blocked', icon: Shield, color: 'from-amber-500 to-red-600', highlight: true },
      ],
      achievements: ['Zero Downtime', 'Fraud Detection', 'Scalable Protection'],
      gradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 opacity-100 translate-y-0 transition-all duration-700">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Success <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real results from industry leaders who trust ThreatCure with their most critical security challenges.
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="relative group transition-all duration-500 opacity-100 translate-y-0"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${study.metrics[0].color} rounded-3xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300`}></div>
              
              {/* Main card */}
              <div className={`relative bg-white rounded-3xl p-8 border-2 ${study.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${hoveredIndex === index ? 'scale-[1.02]' : 'scale-100'}`}>
                {/* Industry badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 self-start border border-gray-200">
                  <study.icon className="w-4 h-4" />
                  <span>{study.industry}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {study.title}
                  <ArrowUpRight className="inline-block w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                  {study.description}
                </p>

                {/* Achievements */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {study.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className={`relative overflow-hidden bg-gradient-to-br ${metric.color} rounded-2xl p-4 text-white transform transition-all duration-300 group-hover:scale-105`}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="w-5 h-5 text-white/80" />
                          <div className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            {metric.highlight && 'HIGHLIGHT'}
                          </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm font-medium text-white/90">
                          {metric.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${study.metrics[0].color} rounded-b-3xl transition-all duration-300 ${hoveredIndex === index ? 'h-2' : 'h-1'}`}></div>
              </div>

              {/* Floating element */}
              <div className={`absolute -right-3 -top-3 w-12 h-12 rounded-full bg-gradient-to-br ${study.metrics[0].color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${hoveredIndex === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div className="mt-20 pt-10 border-t border-gray-200 opacity-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">99.7%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100M+</div>
              <div className="text-gray-600 font-medium">Users Protected</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}