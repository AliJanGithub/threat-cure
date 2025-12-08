"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

class Particle {
  constructor(x, y, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 150, 53, 0.8)";
    this.maxConnections = 5;
    this.connectionDistance = 100;
    this.vx = 0;
    this.vy = 0;
    this.inertia = 0.85;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.1 + Math.random() * 0.1;
  }

  update(mouseX, mouseY, mouseRadius = 150) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouseRadius && mouseX > 0 && mouseY > 0) {
      const angle = Math.atan2(dy, dx);
      const force = (mouseRadius - distance) / mouseRadius;
      const pushStrength = 12;
      this.vx += Math.cos(angle) * force * pushStrength;
      this.vy += Math.sin(angle) * force * pushStrength;
      this.vx += (Math.random() - 0.5) * force * 6;
      this.vy += (Math.random() - 0.5) * force * 6;
    }

    const time = Date.now() * 0.002;
    const waveX = Math.sin(time * 0.8 + this.x * 0.005) * 0.8;
    const waveY = Math.cos(time * 0.6 + this.y * 0.005) * 0.8;
    this.vx += (waveX + this.speedX * 0.5) * 0.2;
    this.vy += (waveY + this.speedY * 0.5) * 0.2;

    this.vx *= this.inertia;
    this.vy *= this.inertia;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > this.canvas.width + 50) this.x = -50;
    if (this.x < -50) this.x = this.canvas.width + 50;
    if (this.y > this.canvas.height + 50) this.y = -50;
    if (this.y < -50) this.y = this.canvas.height + 50;

    this.pulse += this.pulseSpeed;
    if (this.pulse > Math.PI * 2) this.pulse -= Math.PI * 2;
  }

  draw() {
    const pulseSize = Math.sin(this.pulse) * 0.3 + 0.8;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize * 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color.replace('0.8)', '0.2)');
    this.ctx.fill();
  }
}

export default function Demo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [accept, setAccept] = useState(false);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);

    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseVelocityRef.current = {
        x: (x - lastMouseRef.current.x) * 2,
        y: (y - lastMouseRef.current.y) * 2
      };
      lastMouseRef.current = { x, y };
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      mouseVelocityRef.current = { x: 0, y: 0 };
    };

    const initCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: 400 }, () =>
        new Particle(Math.random() * canvas.width, Math.random() * canvas.height, canvas)
      );
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    initCanvas();
    window.addEventListener("resize", initCanvas);

    const animate = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const enhancedMouseX = mouseX + mouseVelocityRef.current.x * 0.5;
        const enhancedMouseY = mouseY + mouseVelocityRef.current.y * 0.5;
        p.update(enhancedMouseX, enhancedMouseY);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) {
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / 100) * 0.3;
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000) {
            const distance = Math.sqrt(distSq);
            const opacity = 0.6 - (distance / 300);
            ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
        p.draw();
      }

      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
        gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.1)");
        gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        const pulse = Math.sin(Date.now() * 0.02) * 0.3 + 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 53, 0.9)";
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !interest) {
      alert("Please fill in all required fields");
      return;
    }
    if (!accept) {
      alert("Please accept the Terms of Service");
      return;
    }

    const data = { fullName, email, interest };
    const query = new URLSearchParams(data).toString();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        router.push(`/demo/success?${query}`);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'none' }}
      />

      <div 
        className={`w-full max-w-md bg-white shadow-2xl rounded-3xl border border-orange-200 p-8 relative z-10
          transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-t-3xl"></div>
        
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-full shadow-lg mb-3 transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <Image alt="logo" src={"/logo.png"} width={120} height={50} />   
          </div>
          <h1 className={`text-3xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Threat Cure
          </h1>
        </div>

        <h2 className={`text-xl font-bold text-center text-gray-800 mt-4 transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Get Started
        </h2>
        <p className={`text-center text-gray-600 mb-6 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Fill in your details to create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={`transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-orange-200 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 bg-white"
              required
            />
          </div>

          <div className={`transition-all duration-500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-orange-200 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 bg-white"
              required
            />
          </div>

          <div className={`transition-all duration-500 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Choose Your Area of Interest</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="border border-orange-200 p-4 rounded-xl w-full bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none appearance-none transition-all duration-300"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Services">Services</option>
              <option value="Solutions">Solutions</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <div className={`transition-all duration-500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="flex items-center gap-3 text-gray-700 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="h-5 w-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500 cursor-pointer opacity-0 absolute"
                />
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-300
                  ${accept ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-600' : 'bg-white border-gray-300 group-hover:border-orange-400'}`}>
                  {accept && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm select-none">
                By continuing, you agree to our <span className="text-orange-600 font-semibold">Terms of Service</span>
              </span>
            </label>
          </div>

          <div className={`transition-all duration-700 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`group w-full py-4 rounded-xl font-semibold text-lg shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl
                ${isSubmitted ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'}
                ${(isSubmitting || isSubmitted) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Submitted Successfully!
                  </>
                ) : (
                  <>
                    Continue
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
