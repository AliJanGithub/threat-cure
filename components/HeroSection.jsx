"use client";

import React, { useState, useRef } from "react";

export default function HeroSection() {
  const features = ["24/7 Protection", "AI-Powered", "Expert Team"];
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef(null);

  const openVideo = () => {
    setVideoOpen(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const closeVideo = () => {
    setVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="relative bg-white rounded-3xl shadow-xl max-w-[1200px] mx-auto mt-12 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
      
      {/* Left Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
          Re-Architect  <br />
          Security Landscape  <br />
          {/* Modern Businesses */}
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
        Enhance your organization’s cybersecurity by utilizing the ThreatCure Artifical Intelligence (AI)-ShieldOps, Breach & Attack Simulation-AI (BASMAI) and the GuardianCare Services to address and mitigate the cybersecurity threats and improve SOC activities.
        </p>

        {/* Get Started Button */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={openVideo}
            className="bg-[#ff6b35] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#ff5722] transition-all shadow-md"
          >
            Get Started
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mt-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-[#f3ecea] text-black px-4 py-2 rounded-xl font-medium shadow-sm"
            >
              <span className="text-[#ff6b35] font-bold">✔</span> {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Right Thumbnail / Hover Video */}
      <div 
        className="flex-1 flex justify-center items-center relative cursor-pointer"
        onMouseEnter={openVideo}
        onMouseLeave={closeVideo}
      >
        {/* Thumbnail */}
        {!videoOpen && (
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <img
              src="/videoThumbnail.png"
              alt="Video Thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl text-[#ff6b35]">▶</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Centered Video Overlay with Close Button */}
      {videoOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closeVideo}
            className="absolute top-4 left-4 text-white text-3xl font-bold z-50 bg-black/30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/50 transition"
          >
            ×
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            src="/videoDemo.mp4"
            className="w-full max-w-4xl rounded-2xl shadow-xl"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      )}
    </section>
  );
}
