// "use client";

// import { Shield, Cloud, AlertTriangle } from 'lucide-react';

// export default function ServicesSection() {
//   const services = [
//     {
//       icon: Shield,
//       title: 'Managed SOC',
//       description: '24/7 security operations center with expert analysts monitoring your infrastructure, detecting threats, and responding to incidents in real-time.',
//     },
//     {
//       icon: Cloud,
//       title: 'Cloud Monitoring',
//       description: 'Comprehensive cloud security monitoring across AWS, Azure, and GCP with automated compliance checks and threat intelligence integration.',
//     },
//     {
//       icon: AlertTriangle,
//       title: 'Breach Response',
//       description: 'Rapid incident response team ready to contain, investigate, and remediate security breaches with minimal business disruption.',
//     },
//   ];

//   return (
//     <section id="services" className="py-20 bg-white">
//       <div className="max-w-[1280px] mx-auto px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Comprehensive Security Solutions
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             End-to-end cybersecurity services designed to protect your business from evolving threats
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="relative bg-white rounded-2xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.15)] group cursor-pointer overflow-hidden transition-all duration-500 hover:bg-[#ff6b35]"
//             >
//               <div className="relative z-10 flex flex-col items-center">
//                 {/* Decorative line */}
//                 <div className="w-4 h-1 bg-black mb-4 transition-colors duration-500 group-hover:bg-white"></div>

//                 {/* Icon */}
//                 <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-white/30">
//                   <service.icon className="w-7 h-7 text-gray-900 transition-colors duration-500 group-hover:text-white" />
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center transition-colors duration-500 group-hover:text-white">
//                   {service.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 leading-relaxed text-center transition-colors duration-500 group-hover:text-white">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Cloud, Zap, Target, Cpu, Lock, AlertTriangle, BarChart, Users, Globe, Brain, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Link from "next/link";

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const services = [
    {
      icon: Cloud,
      title: 'ThreatCure Managed Defense and Response',
      description: 'Managed detection and response (MDR), a service that is outsourced, offers organization assistance in identifying threats and in responding to them after they have been identified. A human aspect is also present since security providers provide MDR clients access to their team of security researchers and engineers, who oversee keeping an eye on networks, examining occurrences, and reacting to security situations.',
      features: [
        'Multi-cloud Security Orchestration',
        'Automated Compliance Monitoring',
        'Real-time Cloud Workload Protection',
        'Identity & Access Management',
        'Data Loss Prevention'
      ],
      color: 'from-orange-500 to-orange-600',
      accentColor: 'bg-orange-500',
      stats: '99.5% cloud security compliance'
    },
    {
      icon: Zap,
      title: 'ThreatCure Cloud Security Management Services (CSMS)',
      subtitle: '',
      description: 'Businesses are switching from on-premises platforms to cloud, multi-cloud, or hybrid ones. Therefore, its crucial that cybersecurity professionals build the architecture of an organizations digital assets in a way that allows it to be flexible and in line with the environments rapid changes',
      features: [
        'AI-Powered Threat Detection',
        'Automated Incident Response',
        'Behavioral Analytics',
        'Threat Hunting Services',
        'Forensic Investigation'
      ],
      color: 'from-black to-gray-800',
      accentColor: 'bg-black',
      stats: 'Average response time: 15 minutes'
    },
    {
      icon: Target,
      title: 'ThreatCure Managed SOC Services',
      subtitle: '',
      description: 'In the ever-evolving digital landscape, threats are becoming more sophisticated and frequent. ThreatCures Managed Security Operations Center (SOC) services are designed to offer businesses a robust defense mechanism. We monitor, detect, and respond to these cyber threats, ensuring that your organization remains fortified against digital adversaries',
      features: [
        'Continuous Attack Surface Discovery',
        'Real-time Vulnerability Scanning',
        'Automated Threat Mitigation',
        'Attack Vector Analysis',
        'Risk Prioritization'
      ],
      color: 'from-gray-900 to-black',
      accentColor: 'bg-gray-900',
      stats: 'Reduce attack surface by 73%'
    },
    {
      icon: Cpu,
      title: 'ThreatCure Breach Response Service (TBRS)',
      subtitle: '',
      description: 'Businesses are switching from on-premises platforms to cloud, multi-cloud, or hybrid ones. Therefore, its crucial that cybersecurity professionals build the architecture of an organizations digital assets in a way that allows it to be flexible and in line with the environments rapid changes',
      features: [
        'Automated Vulnerability Scanning',
        'Risk-based Prioritization',
        'Remediation Workflow Automation',
        'Compliance Reporting',
        'Continuous Risk Assessment'
      ],
      color: 'from-orange-600 to-orange-700',
      accentColor: 'bg-orange-600',
      stats: '95% faster vulnerability remediation'
    },
    {
      icon: Brain,
      title: 'ThreatCure Security Operation Center (SOC) Maturity Assessment',
      description: 'It’s a SOC a responsibility to function efficiently and help the organization defend against cyber threats before they have a disruptive effect on the business. This is where functional maturity measurement plays its part.',
      features: [
        'Predictive Threat Intelligence',
        'Machine Learning Algorithms',
        'Dark Web Monitoring',
        'Zero-day Threat Prediction',
        'Behavioral Analysis'
      ],
      color: 'from-black to-orange-900',
      accentColor: 'bg-black',
      stats: '99.9% threat prediction accuracy'
    },
    {
      icon: Lock,
      title: 'ThreatCure Cyber Drill Practices (CDP)',
      description: 'In an era where cyber threats are evolving rapidly, it’s crucial for organizations to be well-prepared. At ThreatCure, we understand the importance of robust cybersecurity measures. One effective way to enhance an organizations cyber',
      features: [
        'Automated Compliance Scanning',
        'Audit Trail Management',
        'Policy Enforcement',
        'Risk Assessment',
        'Documentation Automation'
      ],
      color: 'from-gray-800 to-black',
      accentColor: 'bg-gray-800',
      stats: '100% compliance assurance'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-gradient-to-b from-white via-orange-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-black/5 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float delay-1500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-particle"
            style={{
              left: `${0.3 * 100}%`,
              top: `${0.9 * 100}%`,
              animationDelay: `${0.5 * 5}s`,
              animationDuration: `${10 + 0.4 * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse-subtle">
            <Sparkles className="w-4 h-4" />
            Comprehensive Security Solutions
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent animate-gradient-x">
            Enterprise <span className="text-orange-600">Security Services</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
           ThreatCure services provide best solutions to complex problems around the globe in cybersecurity domain.
          </p>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Trusted by 500+ global enterprises</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <BarChart className="w-4 h-4" />
            <span>99.9% threat detection accuracy</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer
                  ${hoveredIndex === index ? 'scale-105 shadow-2xl' : 'shadow-xl hover:shadow-2xl'}
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: 'all'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* White Background (base) */}
                <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:bg-white/95"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-orange-500 via-orange-700 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-white/95 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon and Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg transition-all duration-500 group-hover:scale-110`}>
                      <ServiceIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 transition-colors duration-500 group-hover:text-white">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="text-sm text-orange-600 font-semibold transition-colors duration-500 group-hover:text-orange-300">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-1 transition-colors duration-500 group-hover:text-white/90">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-orange-500 transition-colors duration-500 group-hover:text-orange-300" />
                        <span className="text-sm font-medium text-gray-700 transition-colors duration-500 group-hover:text-white">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="flex items-center gap-3 text-sm text-gray-500 transition-colors duration-500 group-hover:text-orange-200">
                        <div className="w-4 h-4 flex items-center justify-center">+{service.features.length - 3}</div>
                        <span>more features</span>
                      </div>
                    )}
                  </div>

                  {/* Stats and CTA */}
                  <div className="mt-auto pt-6 border-t border-gray-200 group-hover:border-orange-300 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${service.accentColor} rounded-full animate-pulse`}></div>
                        <span className="font-semibold text-gray-900 transition-colors duration-500 group-hover:text-white">
                          {service.stats}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-orange-600 font-semibold transition-all duration-300 group-hover:text-white group-hover:gap-3">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-orange-500/20 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Additional CTA Section */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-white to-orange-50 rounded-3xl p-8 shadow-2xl border border-gray-200">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Custom Security Solutions?</h3>
              <p className="text-gray-600">Contact our experts for a tailored security strategy</p>
            </div>
            <div className="flex gap-4">
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <Shield className="w-5 h-5" />
                Get Security Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group relative overflow-hidden bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-300 hover:border-orange-300 flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <Link href={"/contact"}>Contact Sales</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}