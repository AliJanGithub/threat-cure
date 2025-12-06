"use client";

import { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 30 + 10;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.15 + 0.05;
      const color = Math.random() > 0.5 ? '#ff6b35' : '#ff8e53';
      const speedX = (Math.random() - 0.5) * 0.2;
      const speedY = (Math.random() - 0.5) * 0.2;
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 0.5;
      
      particle.className = 'absolute rounded-full';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: radial-gradient(circle at 30% 30%, ${color}, ${color}00);
        opacity: ${opacity};
        filter: blur(${size/4}px);
        transform: rotate(${rotation}deg);
        will-change: transform;
      `;
      
      container.appendChild(particle);
      
      particles.push({
        element: particle,
        x, y, speedX, speedY, rotation, rotationSpeed
      });
    }

    // Animation loop
    let animationId;
    const animate = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= 100) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= 100) particle.speedY *= -1;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Apply changes
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
        particle.element.style.transform = `rotate(${particle.rotation}deg)`;
        
        // Subtle pulsing effect
        const pulse = Math.sin(Date.now() * 0.002 + particle.x) * 0.1 + 1;
        particle.element.style.transform += ` scale(${pulse})`;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      particles.forEach(particle => {
        if (particle.element && particle.element.parentNode === container) {
          container.removeChild(particle.element);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
};

export default FloatingParticles;