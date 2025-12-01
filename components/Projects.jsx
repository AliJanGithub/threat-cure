"use client";

import { Shield, Brain, Zap } from "lucide-react";

export default function Projects() {
  const demos = [
    {
      icon: Shield,
      title: "Shieldops",
      description:
        "Complete walkthrough of ThreatCure's security dashboard",
      bg: "/basmai.png",
    },
    {
      icon: Brain,
      title: "Basm AI",
      description:
        "See how our AI identifies and neutralizes threats across all your systems and dashboards. Comprehensive AI-powered monitoring for modern businesses.",
      bg: "/basmai2.png",
    },
    {
      icon: Zap,
      title: "Threat Cure",
      description:
        "How we helped a Fortune 500 prevent a major breach with proactive threat detection and expert security operations.",
      bg: "/ai.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See ThreatCure in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how our platform protects businesses like yours
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${demo.bg})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 transition-colors duration-500 "></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center p-8 min-h-[400px] justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-white/20 group-hover:bg-white/30 transition-colors duration-500">
                    <demo.icon className="w-7 h-7 text-white group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-500">
                    {demo.title}
                  </h3>

                  <p className="text-sm text-white mb-6 transition-colors duration-500 line-clamp-4">
                    {demo.description}
                  </p>
                </div>

                <button className="px-6 py-2 rounded-full bg-white text-[#ff6b35] font-semibold hover:bg-[#ff6b35] hover:text-white transition-all duration-300 shadow-lg flex items-center gap-2">
                  <span>Watch {demo.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
