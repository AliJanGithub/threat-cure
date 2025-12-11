"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedComparePasswordRoute } from "../../../components/ProtectedRoute";
import { getSigninFlow, setPartnerSession, clearSigninFlow, PHP_API_URL } from "../../../lib/auth";
import { Shield, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Key, ShieldCheck, AlertCircle, LogIn, User } from "lucide-react";
import Image from "next/image";

class Particle {
  constructor(x, y, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;  // Increased size: 1-5px
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 150, 53, 0.8)";
    this.connections = [];
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
    
    // Ultra-fast mouse interaction
    if (distance < mouseRadius && mouseX > 0 && mouseY > 0) {
      const angle = Math.atan2(dy, dx);
      const force = (mouseRadius - distance) / mouseRadius;
      const pushStrength = 12;
      
      this.vx += Math.cos(angle) * force * pushStrength;
      this.vy += Math.sin(angle) * force * pushStrength;
      
      // Add some random turbulence for natural feel
      this.vx += (Math.random() - 0.5) * force * 6;
      this.vy += (Math.random() - 0.5) * force * 6;
    }
    
    // Constant automatic movement
    const time = Date.now() * 0.002;
    const waveX = Math.sin(time * 0.8 + this.x * 0.005) * 0.8;
    const waveY = Math.cos(time * 0.6 + this.y * 0.005) * 0.8;
    
    this.vx += (waveX + this.speedX * 0.5) * 0.2;
    this.vy += (waveY + this.speedY * 0.5) * 0.2;
    
    // Apply inertia
    this.vx *= this.inertia;
    this.vy *= this.inertia;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary wrap-around for continuous flow
    if (this.x > this.canvas.width + 50) this.x = -50;
    if (this.x < -50) this.x = this.canvas.width + 50;
    if (this.y > this.canvas.height + 50) this.y = -50;
    if (this.y < -50) this.y = this.canvas.height + 50;
    
    // Fast pulse animation
    this.pulse += this.pulseSpeed;
    if (this.pulse > Math.PI * 2) this.pulse -= Math.PI * 2;
  }

  draw() {
    const pulseSize = Math.sin(this.pulse) * 0.3 + 0.8;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    
    // Glow effect
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size * pulseSize * 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color.replace('0.8)', '0.2)');
    this.ctx.fill();
  }

  drawConnections(particles, mouseX, mouseY) {
    // Connect to nearby particles
    let connectionsDrawn = 0;
    for (let i = 0; i < particles.length && connectionsDrawn < this.maxConnections; i++) {
      if (particles[i] === this) continue;
      
      const dx = this.x - particles[i].x;
      const dy = this.y - particles[i].y;
      const distanceSq = dx * dx + dy * dy;
      
      if (distanceSq < this.connectionDistance * this.connectionDistance) {
        connectionsDrawn++;
        const distance = Math.sqrt(distanceSq);
        const opacity = (1 - (distance / this.connectionDistance)) * 0.4;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(particles[i].x, particles[i].y);
        this.ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
        this.ctx.lineWidth = 0.6 + Math.sin(this.pulse) * 0.2;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      }
    }
    
    // Connect to mouse with strong visual feedback
    if (mouseX > 0 && mouseY > 0) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distanceSq = dx * dx + dy * dy;
      const mouseDist = 200;
      
      if (distanceSq < mouseDist * mouseDist) {
        const distance = Math.sqrt(distanceSq);
        const opacity = 0.7 - (distance / (mouseDist * 1.5));
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
        this.ctx.lineWidth = 1.5 + Math.sin(Date.now() * 0.02) * 0.5;
        this.ctx.stroke();
      }
    }
  }
}

function ComparePasswordContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Particle animation refs
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Pre-fill email from signin flow
  useEffect(() => {
    const signinFlow = getSigninFlow();
    if (signinFlow?.email) {
      setFormData(prev => ({ ...prev, email: signinFlow.email }));
    }
  }, []);

  // Initialize particles and animation
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);

    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate velocity for enhanced effects
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

      // Create 500 particles for dense web
      const particleCount = 500;
      particlesRef.current = Array.from({ length: particleCount }, () => {
        return new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas
        );
      });
    };

    // Add optimized mouse event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    initCanvas();
    window.addEventListener("resize", initCanvas);

    // Ultra-fast animation loop
    const animate = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Clear with dark background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Single-pass optimized particle processing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update with velocity-enhanced mouse position
        const enhancedMouseX = mouseX + mouseVelocityRef.current.x * 0.5;
        const enhancedMouseY = mouseY + mouseVelocityRef.current.y * 0.5;
        p.update(enhancedMouseX, enhancedMouseY);
        
        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 10000) { // 100px squared
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / 100) * 0.3;
            ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
            ctx.lineWidth = 0.5 + Math.sin(p.pulse) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Draw mouse connections
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 40000) { // 200px squared
            const distance = Math.sqrt(distSq);
            const opacity = 0.6 - (distance / 300);
            ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
        
        // Draw particle
        p.draw();
      }

      // Draw mouse effect
      if (mouseX > 0 && mouseY > 0) {
        const velocity = Math.sqrt(
          mouseVelocityRef.current.x * mouseVelocityRef.current.x + 
          mouseVelocityRef.current.y * mouseVelocityRef.current.y
        );
        
        // Mouse glow
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 100
        );
        gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
        gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.1)");
        gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Mouse center with velocity effect
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setAttemptCount(prev => prev + 1);

    try {
      const response = await fetch(`${PHP_API_URL}/compare-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password verification failed');
      }

      // Set session cookie on client
      const signinFlow = getSigninFlow();
      setPartnerSession({
        email: formData.email,
        partnerNetId: signinFlow?.partnerNetId || data.user?.partnerNetId,
      });
      clearSigninFlow();

      setSuccess(true);
      setTimeout(() => router.push('/partner-net/videos'), 1500);
    } catch (error) {
      setErrors({ submit: error.message || 'Wrong password. Try again.' });
      setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black overflow-hidden relative">
      {/* Canvas for fast spider web animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'none' }}
      />

      <div className={`w-full max-w-md px-4 z-10 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute top-8 left-8 z-20">
          <div className="flex items-center gap-3">
            {/* <div className="rounded-xl p-2">
  <Image alt="logo" src={"/logowhite.png"} width={120} height={50} />            </div> */}
            {/* <span className="text-2xl font-bold text-white">ThreatCure</span> */}
          </div>
        </div>

        {attemptCount > 0 && !success && (
          <div className="absolute top-8 right-8 z-20">
            <div className="bg-black/50 rounded-full px-3 py-1 border border-white/20">
              <span className="text-gray-300 text-sm">Attempt: <span className="text-orange-400 font-semibold">{attemptCount}</span></span>
            </div>
          </div>
        )}

        <div className=" bg-white/30 rounded-3xl p-8 shadow-2xl border border-orange-200  backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500 mb-6 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Password Verified!</h1>
              <p className="text-gray-300 mb-6">Redirecting to videos...</p>
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="text-center  mb-8">
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Key className="w-3 h-3" /> Verify Password
                </div>
                <h1 className="text-gray-400 text-2xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-300 text-sm">Enter your password to continue</p>
              </div>

              {attemptCount >= 3 && (
                <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <p className="text-gray-300 text-xs">Multiple failed attempts. Consider resetting your password.</p>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-300 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-black text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-3 h-3" /> Email
                  </label>
<input
  type={"email"}
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  placeholder="Enter your email"
  className={`w-full p-3 rounded-lg bg-white/20 text-gray-500 border ${errors.email ? 'border-red-500' : 'border-white/50'} focus:border-orange-400 outline-none pr-10 placeholder-gray-400`}
  disabled={isLoading}
/>



                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <div className="relative">
                   <input
  type={showPassword ? "text" : "password"}
  value={formData.password}
  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
  placeholder="Enter your password"
  className={`w-full p-3 rounded-lg bg-white/20 text-gray-500 border border-amber-700 ${errors.password ? 'border-red-500' : 'border-white/40'} focus:border-orange-400 outline-none pr-10 placeholder-gray-400`}
  disabled={isLoading}
/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
                </div>

                <div className="p-4 bg-black rounded-xl border border-white/10">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">Password Verification</h4>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Enter the password you previously set</li>
                        <li>• Make sure Caps Lock is not enabled</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold p-4 rounded-xl hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Verifying...</>
                  ) : (
                    <><LogIn className="w-5 h-5" />Verify & Continue<ArrowRight className="w-5 h-5" /></>
                  )}
                </button>

                <button type="button" onClick={() => router.back()} className="w-full text-gray-400 hover:text-white text-sm" disabled={isLoading}>
                  ← Go Back
                </button>
              </form>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm">Secure verification • Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePasswordPage() {
  return (
    <ProtectedComparePasswordRoute>
      <ComparePasswordContent />
    </ProtectedComparePasswordRoute>
  );
}