"use client";

import { Shield, Cloud, AlertTriangle } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Shield,
      title: 'Managed SOC',
      description: '24/7 security operations center with expert analysts monitoring your infrastructure, detecting threats, and responding to incidents in real-time.',
    },
    {
      icon: Cloud,
      title: 'Cloud Monitoring',
      description: 'Comprehensive cloud security monitoring across AWS, Azure, and GCP with automated compliance checks and threat intelligence integration.',
    },
    {
      icon: AlertTriangle,
      title: 'Breach Response',
      description: 'Rapid incident response team ready to contain, investigate, and remediate security breaches with minimal business disruption.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Security Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            End-to-end cybersecurity services designed to protect your business from evolving threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.15)] group cursor-pointer overflow-hidden transition-all duration-500 hover:bg-[#ff6b35]"
            >
              <div className="relative z-10 flex flex-col items-center">
                {/* Decorative line */}
                <div className="w-4 h-1 bg-black mb-4 transition-colors duration-500 group-hover:bg-white"></div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/30">
                  <service.icon className="w-7 h-7 text-gray-900 transition-colors duration-500 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center transition-colors duration-500 group-hover:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-center transition-colors duration-500 group-hover:text-white">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
