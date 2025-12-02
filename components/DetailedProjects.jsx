"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Brain, Zap, ArrowRight, Play, Target, Cloud, Lock, Globe, BarChart, ShieldCheck, Sparkles, ChevronRight, Eye } from "lucide-react";

export default function DetailedProjects() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particlePositions, setParticlePositions] = useState([]);
  const containerRef = useRef(null);

  const services = [
    {
      id: 0,
      icon: Shield,
      title: "ThreatCure AI-ShieldOps Platform",
      subtitle: "Complete Security Dashboard & Operations",
      description: "With the aid of ThreatCure AI-ShieldOps Platform, we are assisting businesses in increasing the visibility of various digital assets, and cloud workloads and aggregating them into a single platform to provide security leadership with a 360-degree view and assist in risk identification. Further assisting the incident response team in defending the fundamental infrastructure and addressing zero-day attacks.",
      features: [
        "360° Security Visibility",
        "Cloud Workload Aggregation",
        "Risk Identification & Management",
        "Incident Response Automation",
        "Zero-day Attack Protection"
      ],
      bg: "/shieldops.png", // You need to add this image to your public folder
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
      bg: "/basmai2.png", // You need to add this image to your public folder
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
      bg: "/videothumbnail.png", // You need to add this image to your public folder
      color: "from-orange-500 to-orange-600",
      accentColor: "bg-orange-500",
      stats: "24/7 real-time monitoring"
    },
   
    
  
  ];

useEffect(() => {
  const timer = setTimeout(() => setMounted(true), 100);

  // Defer particle positions generation
  const positionsTimer = setTimeout(() => {
    const positions = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setParticlePositions(positions);
  }, 0);

  return () => {
    clearTimeout(timer);
    clearTimeout(positionsTimer);
  };
}, []);


  const handleTabClick = (index) => {
    setActiveTab(index);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const IconComponent = services[activeTab].icon;

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white via-orange-50 to-white py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-black/5 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float delay-1500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full animate-particle"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse-subtle">
            <Sparkles className="w-4 h-4" />
            Enterprise Security Solutions
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent animate-gradient-x">
            ThreatCure <span className="text-orange-600">Platforms</span>
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
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {services.map((service, index) => {
            const TabIcon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleTabClick(index)}
                className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-500 flex items-center gap-2 overflow-hidden
                  ${activeTab === index 
                    ? `bg-gradient-to-r ${service.color} text-white shadow-2xl scale-105` 
                    : 'bg-white/80 text-gray-700 hover:text-orange-600 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm'
                  }
                `}
              >
                {/* Animated border on active */}
                {activeTab === index && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-ping-subtle"></span>
                )}
                
                {/* Glow effect */}
                <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.color} blur-xl`}></span>
                
                <TabIcon className={`w-5 h-5 ${activeTab === index ? 'text-white' : 'text-orange-500'}`} />
                {service.title.split(' ')[0]}
                {activeTab === index && (
                  <ArrowRight className="w-4 h-4 ml-1 animate-bounce-right" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className={`grid lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                <div className={`w-3 h-3 ${services[activeTab].accentColor} rounded-full animate-pulse`}></div>
                <span className="font-bold text-gray-900">{services[activeTab].stats}</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${services[activeTab].accentColor} rounded-full transition-all duration-1000`}
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {services[activeTab].features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-white/50 p-4 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <div className={`p-2 rounded-lg ${services[activeTab].accentColor} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <ChevronRight className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <Play className="w-5 h-5" />
                  Watch Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-300 hover:border-orange-300 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-orange-600" />
                  Request Free Trial
                </button>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center group hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Enterprise Clients</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center group hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Detection Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Display */}
          <div className="relative">
            {/* 3D Card Stack */}
            <div className="sticky top-24">
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                {/* Background Image with Parallax Effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"
                  style={{
                    backgroundImage: `url(${services[activeTab].bg || '/default-bg.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.5s ease'
                  }}
                ></div>
                
                {/* Fallback background if image doesn't exist */}
                {!services[activeTab].bg && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                )}
                
                {/* Animated Grid Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)]"></div>

                {/* Content */}
                <div className="relative z-10 p-12 min-h-[500px] flex flex-col justify-end">
                  <div className="space-y-6 transform translate-y-0 group-hover:translate-y-[-20px] transition-transform duration-700">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                      <div className={`w-3 h-3 ${services[activeTab].accentColor} rounded-full animate-pulse`}></div>
                      <span className="text-white font-medium">LIVE DEMO AVAILABLE</span>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white leading-tight">
                      Experience {services[activeTab].title.split(' ')[0]}
                    </h3>
                    
                    <p className="text-gray-200 text-lg">
                      Interactive demonstration of our platforms capabilities
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 border-2 border-white"></div>
                        ))}
                      </div>
                      <div className="text-white">
                        <div className="font-semibold">Join 500+ security teams</div>
                        <div className="text-sm text-gray-300">Already using this platform</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center shadow-lg animate-float delay-500">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              {/* Floating Cards Behind */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-xl -z-10 animate-float-delayed"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl shadow-xl -z-10 animate-float-delayed-2"></div>
            </div>
          </div>
        </div>

        {/* Testimonials/Case Studies */}
        {/* <div className={`mt-20 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">See how we are transforming cybersecurity for enterprises worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { company: "Fortune 500 Tech", result: "Reduced breaches by 95%", color: "from-blue-500 to-blue-600" },
              { company: "Global Bank", result: "Saved $2M in potential losses", color: "from-green-500 to-green-600" },
              { company: "Healthcare Provider", result: "Achieved HIPAA compliance", color: "from-purple-500 to-purple-600" }
            ].map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${testimonial.color} mb-6`}></div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{testimonial.company}</h4>
                <p className="text-gray-600 mb-4">Successfully implemented {services[activeTab].title.split(' ')[0]}</p>
                <div className="text-orange-600 font-bold">{testimonial.result}</div>
              </div>
            ))}
          </div>
        </div> */}
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
        
        @keyframes particle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        @keyframes ping-subtle {
          75%, 100% { transform: scale(2); opacity: 0; }
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
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-bounce-right {
          animation: bounce-right 0.5s ease infinite;
        }
        
        .animate-ping-subtle {
          animation: ping-subtle 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}