"use client";

import { Eye, Brain, Zap, Users } from 'lucide-react';

export default function WhyUsSection() {
  const features = [
    {
      icon: Eye,
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance of your systems with instant threat detection and alerting.',
    },
    {
      icon: Brain,
      title: 'AI Detection',
      description: 'Machine learning algorithms that identify anomalies and predict threats before they strike.',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Average response time under 5 minutes with automated containment protocols.',
    },
    {
      icon: Users,
      title: 'Expert Analysts',
      description: 'Certified security professionals with decades of combined experience protecting enterprises.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why ThreatCure?</h2>
          <p className="text-lg text-gray-600">
            Industry-leading security backed by cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.15)] group cursor-pointer overflow-hidden
                         transition-all duration-500 hover:bg-[#ff6b35] hover:scale-105"
            >
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors bg-gray-300 duration-500 group-hover:bg-white/30">
                  <feature.icon className="w-6 h-6 text-gray-900 transition-colors duration-500 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center transition-colors duration-500 group-hover:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed text-center transition-colors duration-500 group-hover:text-white">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
