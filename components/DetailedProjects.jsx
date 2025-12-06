"use client";

import { useState, useRef } from "react";
import { Shield, Brain, Zap, ArrowRight, Eye, Target, Cloud, Lock, Globe, BarChart, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DetailedProjects() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  const services = [
    {
      id: 0,
      icon: Shield,
      title: "ThreatCure AI-ShieldOps Platform",
      subtitle: "Complete Security Dashboard & Operations",
      description: "Minimize the need for labor-intensive and time-consuming investigations by implementing the ML/AI based data platform. Automation can significantly reduce the human effort required for tasks like data analysis, threat detection, and incident response. By leveraging advanced technologies and tools, organizations can enhance their cybersecurity posture, respond to incidents swiftly, and allocate their resources more effectively",
      features: [
        "360° Security Visibility",
        "Cloud Workload Aggregation",
        "Risk Identification & Management",
        "Incident Response Automation",
        "Zero-day Attack Protection"
      ],
      bg: "/shieldops.png",
      color: "from-orange-500 to-orange-600",
      accentColor: "bg-orange-500",
      stats: "98% threat detection rate"
    },
    {
      id: 1,
      icon: Brain,
      title: "ThreatCure BASM-AI Platform",
      subtitle: "Breach Attack Surface Management",
      description: "ThreatCure Breach Attack Surface Management (BASM-AI) is an advanced tool designed to identify security weaknesses in security controls & mitigate risks, and strengthen an organization's defenses before attackers exploit. BASM-AI is a comprehensive cybersecurity solution that integrates advanced tabletop exercise attack simulations, dark web monitoring, breach response strategies, and user and executive awareness training.",
      features: [
        "Attack Surface Simulation",
        "Dark Web Monitoring",
        "Breach Response Planning",
        "Executive Awareness Training",
        "Security Control Assessment"
      ],
      bg: "/basmai2.png",
      color: "from-orange-500 to-orange-600",
      accentColor: "bg-orange-500",
      stats: "Reduce attack surface by 73%"
    },
    {
      id: 2,
      icon: Cloud,
      title: "Managed Cloud Attack Surface Management",
      subtitle: "Continuous Monitoring & Protection",
      description: "Attackers are only looking for simple targets, malicious actors will discover and attack unidentified assets. Attackers can quickly search the entire internet for weak systems because of their own digital metamorphosis. The practice of continually identifying, monitoring, and managing all internal and external internet-connected assets for possible attack vectors and exposures is known as attack surface management (ASM).",
      features: [
        "Continuous Asset Discovery",
        "Real-time Vulnerability Scanning",
        "Automated Threat Detection",
        "Compliance Monitoring",
        "Attack Vector Analysis"
      ],
      bg: "/videothumbnail.png",
      color: "from-orange-500 to-orange-600",
      accentColor: "bg-orange-500",
      stats: "24/7 real-time monitoring"
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const IconComponent = services[activeTab].icon;

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white via-orange-50 to-white py-20 overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-black/5 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Enterprise Security Solutions
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            ThreatCure <span className="bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent bg-fixed">Platforms</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Comprehensive cybersecurity solutions designed to protect, detect, and respond to threats across your entire digital ecosystem.
          </p>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted by 500+ enterprises worldwide</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <BarChart className="w-4 h-4" />
            <span>99.9% threat detection accuracy</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service, index) => {
            const TabIcon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleTabClick(index)}
                className={`group relative px-6 py-3 rounded-full font-semibold flex items-center gap-2 overflow-hidden
                  ${activeTab === index 
                    ? `bg-gradient-to-r ${service.color} text-white shadow-2xl` 
                    : 'bg-white/80 text-gray-700 hover:text-orange-600 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm'
                  }
                `}
              >
                <TabIcon className={`w-5 h-5 ${activeTab === index ? 'text-white' : 'text-orange-500'}`} />
                {service.title}
                {activeTab === index && (
                  <ArrowRight className="w-4 h-4 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Service Details */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${services[activeTab].color} shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{services[activeTab].title}</h3>
                  <p className="text-orange-600 font-semibold">{services[activeTab].subtitle}</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {services[activeTab].description}
              </p>

              {/* Stats Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-100 px-6 py-3 rounded-full mb-8 shadow-lg">
                <div className={`w-3 h-3 ${services[activeTab].accentColor} rounded-full`}></div>
                <span className="font-bold text-gray-900">{services[activeTab].stats}</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${services[activeTab].accentColor} rounded-full`}
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {services[activeTab].features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-white/50 p-4 rounded-xl border border-gray-200"
                  >
                    <div className={`p-2 rounded-lg ${services[activeTab].accentColor} bg-opacity-10`}>
                      <ChevronRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg border border-gray-300 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <Link href={"demo"}>Request Free Trial</Link>  
                </button>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="text-4xl font-black text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Enterprise Clients</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="text-4xl font-black text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Detection Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Display */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"
                  style={{
                    backgroundImage: `url(${services[activeTab].bg || '/default-bg.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                
                {/* Fallback background if image doesn't exist */}
                {!services[activeTab].bg && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 p-12 min-h-[500px] flex flex-col justify-end">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                      <div className={`w-3 h-3 ${services[activeTab].accentColor} rounded-full`}></div>
                      <span className="text-white font-medium">LIVE DEMO AVAILABLE</span>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white leading-tight">
                      Experience {services[activeTab].title.split(' ')[0]}
                    </h3>
                    
                    <p className="text-gray-200 text-lg">
                      Interactive demonstration of our platforms capabilities
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-white">
                        <div className="font-semibold">Join 500+ security teams</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Static */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              {/* Static Background Cards */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl shadow-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}