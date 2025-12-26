// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";

// export default function SignInPage() {
//   const [partnerNetId, setPartnerNetId] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const containerRef = useRef(null);
//   const router = useRouter();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (hasPartnerSession()) {
//       router.replace("/partner-net/videos");
//     }
//   }, [router]);

//   // Floating balls animation
//   const [balls, setBalls] = useState(() =>
//     Array.from({ length: 150 }, () => ({
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 20 + 10,
//       speedX: (Math.random() - 0.1) * 0.3,
//       speedY: (Math.random() - 0.5) * 0.3,
//       color: Math.random() > 0.7 ? "#ff6b35" : "#e63e62",
//     }))
//   );

//   useEffect(() => {
//     setTimeout(() => setMounted(true), 100);

//     let animationFrame;
//     const animateBalls = () => {
//       setBalls(prev =>
//         prev.map(ball => {
//           let newX = ball.x + ball.speedX;
//           let newY = ball.y + ball.speedY;
//           if (newX <= 0 || newX >= 100) ball.speedX *= -1;
//           if (newY <= 0 || newY >= 100) ball.speedY *= -1;
//           newX = Math.max(0, Math.min(100, newX));
//           newY = Math.max(0, Math.min(100, newY));
//           return { ...ball, x: newX, y: newY };
//         })
//       );
//       animationFrame = requestAnimationFrame(animateBalls);
//     };
//     animationFrame = requestAnimationFrame(animateBalls);
//     return () => cancelAnimationFrame(animationFrame);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !partnerNetId) {
//       alert("Please fill out all details");
//       return;
//     }
    
//     if (!acceptTerms) {
//       alert("Please accept the Terms & Conditions");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${PHP_API_URL}/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, partnerNetId }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         alert(data.error || "Something went wrong");
//         return;
//       }

//       // Set signin flow cookie on client side
//       setSigninFlow({
//         partnerNetId,
//         email,
//         mode: data.mode ? "set-password" : "compare-password",
//       });

//       // Route based on mode
//       if (data.mode) {
//         router.push("/partner-net/set-password");
//       } else {
//         router.push("/partner-net/compare-password");
//       }
//     } catch (err) {
//       setLoading(false);
//       console.error("Sign in error:", err);
//       alert("Internal server error");
//     }
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 overflow-hidden relative"
//     >
//       {/* Floating balls */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {balls.map((ball, index) => (
//           <div
//             key={index}
//             className="absolute rounded-full opacity-20"
//             style={{
//               left: `${ball.x}%`,
//               top: `${ball.y}%`,
//               width: `${ball.size}px`,
//               height: `${ball.size}px`,
//               backgroundColor: ball.color,
//               filter: 'blur(2px)',
//             }}
//           />
//         ))}
//       </div>

//       <div className={`w-full max-w-md px-4 z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="relative">
//               <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl shadow-lg">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
//               ThreatCure
//             </h1>
//           </div>
//           <p className="text-gray-600 mb-2">Partner Network Portal</p>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
//             <Sparkles className="w-3 h-3" />
//             Secure Partner Access
//           </div>
//         </div>

//         {/* Sign In Card */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto">
//               <LogIn className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//             <p className="text-gray-600">Sign in to your partner account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Key className="w-4 h-4" /> Partner Network ID
//               </label>
//               <input
//                 type="text"
//                 value={partnerNetId}
//                 onChange={(e) => setPartnerNetId(e.target.value)}
//                 placeholder="Enter your Partner ID"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Mail className="w-4 h-4" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
//                 required
//               />
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//                 className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded"
//               />
//               <label className="text-gray-700 text-sm cursor-pointer">
//                 I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !acceptTerms}
//               className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-500 ${
//                 loading || !acceptTerms
//                   ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl hover:-translate-y-1'
//               }`}
//             >
//               <span className="flex items-center justify-center gap-3">
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </span>
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-600 text-sm">
//               Need help? <button className="text-orange-600 font-semibold hover:text-orange-700">Contact Support</button>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-6 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               500+ Partners
//             </span>
//             <span>•</span>
//             <span>99.9% Uptime</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";

// class Particle {
//   constructor(x, y, canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d");
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 2 + 1;
//     this.speedX = Math.random() * 2 - 1;
//     this.speedY = Math.random() * 2 - 1;
//     this.color = "rgba(255, 107, 53, 0.7)"; // Orange color
//     this.connections = [];
//     this.maxConnections = 3;
//     this.connectionDistance = 100;
//     this.originalX = x;
//     this.originalY = y;
//   }

//   update(mouseX, mouseY, mouseRadius = 150) {
//     // Store original position for reference
//     const dx = this.x - mouseX;
//     const dy = this.y - mouseY;
//     const distance = Math.sqrt(dx * dx + dy * dy);
    
//     if (distance < mouseRadius) {
//       // Repel from mouse
//       const angle = Math.atan2(dy, dx);
//       const force = (mouseRadius - distance) / mouseRadius;
//       this.x += Math.cos(angle) * force * 3;
//       this.y += Math.sin(angle) * force * 3;
//     } else {
//       // Move back to original position with some randomness
//       const returnSpeed = 0.05;
//       this.x += (this.originalX - this.x) * returnSpeed + this.speedX * 0.5;
//       this.y += (this.originalY - this.y) * returnSpeed + this.speedY * 0.5;
//     }

//     // Keep particles within bounds
//     if (this.x > this.canvas.width || this.x < 0) {
//       this.speedX = -this.speedX;
//     }
//     if (this.y > this.canvas.height || this.y < 0) {
//       this.speedY = -this.speedY;
//     }
//   }

//   draw() {
//     this.ctx.beginPath();
//     this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     this.ctx.fillStyle = this.color;
//     this.ctx.fill();
//   }

//   drawConnections(particles, mouseX, mouseY) {
//     this.connections = [];
    
//     // Connect to nearby particles
//     for (let i = 0; i < particles.length; i++) {
//       const dx = this.x - particles[i].x;
//       const dy = this.y - particles[i].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < this.connectionDistance && this.connections.length < this.maxConnections) {
//         this.connections.push(particles[i]);
        
//         const opacity = 1 - (distance / this.connectionDistance);
//         this.ctx.beginPath();
//         this.ctx.moveTo(this.x, this.y);
//         this.ctx.lineTo(particles[i].x, particles[i].y);
//         this.ctx.strokeStyle = `rgba(255, 107, 53, ${opacity * 0.3})`; // Orange connections
//         this.ctx.lineWidth = 1;
//         this.ctx.stroke();
//       }
//     }

//     // Connect to mouse if close
//     const dx = this.x - mouseX;
//     const dy = this.y - mouseY;
//     const distance = Math.sqrt(dx * dx + dy * dy);
    
//     if (distance < this.connectionDistance * 1.5) {
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.x, this.y);
//       this.ctx.lineTo(mouseX, mouseY);
//       this.ctx.strokeStyle = `rgba(255, 107, 53, ${0.5 - (distance / (this.connectionDistance * 3))})`;
//       this.ctx.lineWidth = 1.5;
//       this.ctx.stroke();
//     }
//   }
// }

// export default function SignInPage() {
//   const [partnerNetId, setPartnerNetId] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const router = useRouter();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (hasPartnerSession()) {
//       router.replace("/partner-net/videos");
//     }
//   }, [router]);

//   const drawWebPattern = (ctx, canvas) => {
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     const maxRadius = Math.max(canvas.width, canvas.height) / 2;

//     // Draw concentric circles (web rings)
//     for (let i = 1; i <= 5; i++) {
//       const radius = (maxRadius / 5) * i;
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//       ctx.strokeStyle = `rgba(255, 107, 53, 0.03)`;
//       ctx.lineWidth = 0.5;
//       ctx.stroke();
//     }

//     // Draw radial lines (web spokes)
//     for (let i = 0; i < 12; i++) {
//       const angle = (Math.PI * 2 * i) / 12;
//       const endX = centerX + Math.cos(angle) * maxRadius;
//       const endY = centerY + Math.sin(angle) * maxRadius;

//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.lineTo(endX, endY);
//       ctx.strokeStyle = `rgba(255, 107, 53, 0.04)`;
//       ctx.lineWidth = 0.3;
//       ctx.stroke();
//     }
//   };

//   const drawFloatingStrands = (ctx, canvas) => {
//     const time = Date.now() * 0.001;
    
//     for (let i = 0; i < 3; i++) {
//       const amplitude = 50 + i * 20;
//       const frequency = 0.002 + i * 0.001;
//       const yOffset = (canvas.height / 4) * (i + 1);
      
//       ctx.beginPath();
//       ctx.moveTo(0, yOffset + Math.sin(time * 0.5 + i) * 10);

//       for (let x = 0; x < canvas.width; x += 10) {
//         const y = yOffset + Math.sin(x * frequency + time) * amplitude;
//         ctx.lineTo(x, y);
//       }

//       ctx.strokeStyle = `rgba(255, 107, 53, ${0.05 - i * 0.01})`;
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     }
//   };

//   // Initialize particles and animation
//   useEffect(() => {
//     setTimeout(() => setMounted(true), 100);

//     const handleMouseMove = (e) => {
//       if (!canvasRef.current) return;
      
//       const canvas = canvasRef.current;
//       const rect = canvas.getBoundingClientRect();
//       mouseRef.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       };
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current = { x: -1000, y: -1000 };
//     };

//     const initCanvas = () => {
//       if (!canvasRef.current) return;

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;

//       // Create particles
//       const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 5000));
//       particlesRef.current = Array.from({ length: particleCount }, () => {
//         return new Particle(
//           Math.random() * canvas.width,
//           Math.random() * canvas.height,
//           canvas
//         );
//       });
//     };

//     // Add mouse event listeners
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.addEventListener("mousemove", handleMouseMove);
//       canvas.addEventListener("mouseleave", handleMouseLeave);
//     }

//     initCanvas();
//     window.addEventListener("resize", initCanvas);

//     // Animation loop
//     const animate = () => {
//       if (!canvasRef.current) return;

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       // Clear with subtle fade effect for trailing
//       ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw web background pattern
//       drawWebPattern(ctx, canvas);

//       // Update and draw particles
//       particlesRef.current.forEach((particle, index) => {
//         particle.update(mouseRef.current.x, mouseRef.current.y);
//         particle.draw();
        
//         // Draw connections for all particles (optimized)
//         if (index % 2 === 0) {
//           particle.drawConnections(particlesRef.current, mouseRef.current.x, mouseRef.current.y);
//         }
//       });

//       // Draw floating "strands"
//       drawFloatingStrands(ctx, canvas);

//       // Draw mouse interaction effect
//       if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
//         ctx.beginPath();
//         ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(255, 107, 53, 0.2)";
//         ctx.fill();
        
//         ctx.beginPath();
//         ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
//         ctx.strokeStyle = "rgba(255, 107, 53, 0.05)";
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("resize", initCanvas);
//       if (canvas) {
//         canvas.removeEventListener("mousemove", handleMouseMove);
//         canvas.removeEventListener("mouseleave", handleMouseLeave);
//       }
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !partnerNetId) {
//       alert("Please fill out all details");
//       return;
//     }
    
//     if (!acceptTerms) {
//       alert("Please accept the Terms & Conditions");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${PHP_API_URL}/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, partnerNetId }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         alert(data.error || "Something went wrong");
//         return;
//       }

//       // Set signin flow cookie on client side
//       setSigninFlow({
//         partnerNetId,
//         email,
//         mode: data.mode ? "set-password" : "compare-password",
//       });

//       // Route based on mode
//       if (data.mode) {
//         router.push("/partner-net/set-password");
//       } else {
//         router.push("/partner-net/compare-password");
//       }
//     } catch (err) {
//       setLoading(false);
//       console.error("Sign in error:", err);
//       alert("Internal server error");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 overflow-hidden relative">
//       {/* Canvas for particle spider web animation */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full pointer-events-auto"
//         style={{ cursor: 'none' }}
//       />

//       <div className={`w-full max-w-md px-4 z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="relative">
//               <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl shadow-lg">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
//               ThreatCure
//             </h1>
//           </div>
//           <p className="text-gray-600 mb-2">Partner Network Portal</p>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
//             <Sparkles className="w-3 h-3" />
//             Secure Partner Access
//           </div>
//         </div>

//         {/* Sign In Card */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto">
//               <LogIn className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//             <p className="text-gray-600">Sign in to your partner account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Key className="w-4 h-4" /> Partner Network ID
//               </label>
//               <input
//                 type="text"
//                 value={partnerNetId}
//                 onChange={(e) => setPartnerNetId(e.target.value)}
//                 placeholder="Enter your Partner ID"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Mail className="w-4 h-4" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
//                 required
//               />
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//                 className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded"
//               />
//               <label className="text-gray-700 text-sm cursor-pointer">
//                 I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !acceptTerms}
//               className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-500 ${
//                 loading || !acceptTerms
//                   ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl hover:-translate-y-1'
//               }`}
//             >
//               <span className="flex items-center justify-center gap-3">
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </span>
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-600 text-sm">
//               Need help? <button className="text-orange-600 font-semibold hover:text-orange-700">Contact Support</button>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-6 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               500+ Partners
//             </span>
//             <span>•</span>
//             <span>99.9% Uptime</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

































// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";

// class Particle {
//   constructor(x, y, canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d");
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 3 + 1;
//     this.speedX = Math.random() * 1 - 0.5;
//     this.speedY = Math.random() * 1 - 0.5;
//     this.color = `rgba(255, ${100 + Math.random() * 100}, 53, ${0.6 + Math.random() * 0.3})`;
//     this.connections = [];
//     this.maxConnections = 8; // More connections for dense web
//     this.connectionDistance = 120;
//     this.originalX = x;
//     this.originalY = y;
//     this.pulse = 0;
//     this.pulseSpeed = 0.02 + Math.random() * 0.03;
//   }

//   update(mouseX, mouseY, mouseRadius = 200) {
//     const dx = this.x - mouseX;
//     const dy = this.y - mouseY;
//     const distance = Math.sqrt(dx * dx + dy * dy);
    
//     if (distance < mouseRadius) {
//       // Interactive particle movement
//       const angle = Math.atan2(dy, dx);
//       const force = (mouseRadius - distance) / mouseRadius;
//       const pushStrength = 4;
//       this.x += Math.cos(angle) * force * pushStrength;
//       this.y += Math.sin(angle) * force * pushStrength;
      
//       // Add some turbulence
//       this.x += (Math.random() - 0.5) * force * 10;
//       this.y += (Math.random() - 0.5) * force * 10;
//     } else {
//       // Natural movement with smooth return
//       const returnSpeed = 0.03;
//       this.x += (this.originalX - this.x) * returnSpeed + this.speedX * 0.3;
//       this.y += (this.originalY - this.y) * returnSpeed + this.speedY * 0.3;
//     }

//     // Gentle bounds checking
//     if (this.x > this.canvas.width * 1.1 || this.x < -this.canvas.width * 0.1) {
//       this.speedX = -this.speedX;
//     }
//     if (this.y > this.canvas.height * 1.1 || this.y < -this.canvas.height * 0.1) {
//       this.speedY = -this.speedY;
//     }

//     // Pulse animation
//     this.pulse += this.pulseSpeed;
//     if (this.pulse > Math.PI * 2) this.pulse = 0;
//   }

//   draw() {
//     const pulseSize = Math.sin(this.pulse) * 0.5 + 1;
//     this.ctx.beginPath();
//     this.ctx.arc(this.x, this.y, this.size * pulseSize, 0, Math.PI * 2);
    
//     // Create gradient for particles
//     const gradient = this.ctx.createRadialGradient(
//       this.x, this.y, 0,
//       this.x, this.y, this.size * pulseSize
//     );
//     gradient.addColorStop(0, this.color.replace('0.9)', '1)'));
//     gradient.addColorStop(1, this.color.replace('0.9)', '0.3)'));
    
//     this.ctx.fillStyle = gradient;
//     this.ctx.fill();
    
//     // Glow effect
//     this.ctx.beginPath();
//     this.ctx.arc(this.x, this.y, this.size * pulseSize * 2, 0, Math.PI * 2);
//     this.ctx.fillStyle = this.color.replace('0.9)', '0.1)');
//     this.ctx.fill();
//   }

//   drawConnections(particles, mouseX, mouseY) {
//     // Connect to all nearby particles (dense web)
//     let connectionCount = 0;
//     for (let i = 0; i < particles.length && connectionCount < this.maxConnections; i++) {
//       if (particles[i] === this) continue;
      
//       const dx = this.x - particles[i].x;
//       const dy = this.y - particles[i].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < this.connectionDistance) {
//         connectionCount++;
//         this.connections.push(particles[i]);
        
//         // Dynamic opacity based on distance and pulse
//         const opacity = (1 - (distance / this.connectionDistance)) * 0.4;
//         const pulseOpacity = Math.sin(this.pulse + particles[i].pulse) * 0.2 + opacity;
        
//         this.ctx.beginPath();
//         this.ctx.moveTo(this.x, this.y);
//         this.ctx.lineTo(particles[i].x, particles[i].y);
        
//         // Gradient line effect
//         const lineGradient = this.ctx.createLinearGradient(
//           this.x, this.y,
//           particles[i].x, particles[i].y
//         );
        
//         const hue1 = Math.sin(this.pulse) * 10 + 20;
//         const hue2 = Math.sin(particles[i].pulse) * 10 + 20;
        
//         lineGradient.addColorStop(0, `rgba(255, ${150 + hue1}, 53, ${pulseOpacity})`);
//         lineGradient.addColorStop(0.5, `rgba(255, 107, 53, ${pulseOpacity * 0.8})`);
//         lineGradient.addColorStop(1, `rgba(255, ${150 + hue2}, 53, ${pulseOpacity})`);
        
//         this.ctx.strokeStyle = lineGradient;
//         this.ctx.lineWidth = 0.8 + Math.sin(this.pulse) * 0.4;
//         this.ctx.lineCap = 'round';
//         this.ctx.stroke();
//       }
//     }

//     // Connect to mouse with special effect
//     const dx = this.x - mouseX;
//     const dy = this.y - mouseY;
//     const distance = Math.sqrt(dx * dx + dy * dy);
    
//     if (distance < this.connectionDistance * 2) {
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.x, this.y);
//       this.ctx.lineTo(mouseX, mouseY);
      
//       const mouseGradient = this.ctx.createLinearGradient(
//         this.x, this.y,
//         mouseX, mouseY
//       );
//       const mouseOpacity = 0.6 - (distance / (this.connectionDistance * 3));
      
//       mouseGradient.addColorStop(0, `rgba(255, 200, 53, ${mouseOpacity})`);
//       mouseGradient.addColorStop(1, `rgba(255, 107, 53, ${mouseOpacity * 0.3})`);
      
//       this.ctx.strokeStyle = mouseGradient;
//       this.ctx.lineWidth = 2 + Math.sin(Date.now() * 0.01) * 1;
//       this.ctx.stroke();
//     }
//   }
// }

// export default function SignInPage() {
//   const [partnerNetId, setPartnerNetId] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const router = useRouter();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (hasPartnerSession()) {
//       router.replace("/partner-net/videos");
//     }
//   }, [router]);

//   const drawWebPattern = (ctx, canvas) => {
//     const time = Date.now() * 0.001;
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

//     // Animated concentric circles
//     for (let i = 1; i <= 8; i++) {
//       const radius = (maxRadius / 8) * i;
//       const pulse = Math.sin(time * 0.5 + i * 0.3) * 0.1 + 1;
      
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, radius * pulse, 0, Math.PI * 2);
//       ctx.strokeStyle = `rgba(255, ${100 + i * 20}, 53, ${0.02 + i * 0.005})`;
//       ctx.lineWidth = 0.5 + Math.sin(time + i) * 0.3;
//       ctx.stroke();
//     }

//     // Dynamic radial lines
//     for (let i = 0; i < 24; i++) {
//       const angle = (Math.PI * 2 * i) / 24 + time * 0.1;
//       const wave = Math.sin(time * 2 + i) * 0.1 + 1;
//       const endX = centerX + Math.cos(angle) * maxRadius * wave;
//       const endY = centerY + Math.sin(angle) * maxRadius * wave;

//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.lineTo(endX, endY);
      
//       const lineGradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
//       lineGradient.addColorStop(0, `rgba(255, 150, 53, 0.08)`);
//       lineGradient.addColorStop(1, `rgba(255, 107, 53, 0.02)`);
      
//       ctx.strokeStyle = lineGradient;
//       ctx.lineWidth = 0.4 + Math.sin(time * 3 + i) * 0.2;
//       ctx.stroke();
//     }
//   };

//   const drawFloatingStrands = (ctx, canvas) => {
//     const time = Date.now() * 0.001;
    
//     // Multiple floating strands with different properties
//     for (let i = 0; i < 5; i++) {
//       const amplitude = 30 + i * 25;
//       const frequency = 0.001 + i * 0.0008;
//       const yOffset = (canvas.height / 6) * (i + 1) + Math.sin(time * 0.2 + i) * 20;
//       const speed = 0.3 + i * 0.1;
      
//       ctx.beginPath();
//       const startY = yOffset + Math.sin(time * speed + i) * 15;
//       ctx.moveTo(0, startY);

//       for (let x = 0; x < canvas.width; x += 8) {
//         const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude;
//         ctx.lineTo(x, y);
//       }

//       const strandGradient = ctx.createLinearGradient(0, startY, canvas.width, startY);
//       strandGradient.addColorStop(0, `rgba(255, 150, 53, ${0.1 - i * 0.015})`);
//       strandGradient.addColorStop(0.5, `rgba(255, 107, 53, ${0.15 - i * 0.015})`);
//       strandGradient.addColorStop(1, `rgba(255, 150, 53, ${0.1 - i * 0.015})`);
      
//       ctx.strokeStyle = strandGradient;
//       ctx.lineWidth = 1.2 - i * 0.2;
//       ctx.lineCap = 'round';
//       ctx.stroke();
//     }
//   };

//   // Initialize particles and animation
//   // useEffect(() => {
//   //   setTimeout(() => setMounted(true), 100);

//   //   const handleMouseMove = (e) => {
//   //     if (!canvasRef.current) return;
      
//   //     const canvas = canvasRef.current;
//   //     const rect = canvas.getBoundingClientRect();
//   //     mouseRef.current = {
//   //       x: e.clientX - rect.left,
//   //       y: e.clientY - rect.top
//   //     };
//   //   };

//   //   const handleMouseLeave = () => {
//   //     mouseRef.current = { x: -1000, y: -1000 };
//   //   };

//   //   const initCanvas = () => {
//   //     if (!canvasRef.current) return;

//   //     const canvas = canvasRef.current;
//   //     const ctx = canvas.getContext("2d");
//   //     canvas.width = canvas.offsetWidth;
//   //     canvas.height = canvas.offsetHeight;

//   //     // Create LOTS of particles for dense web
//   //     const particleCount = 300; // Fixed high number for dense web
//   //     particlesRef.current = Array.from({ length: particleCount }, () => {
//   //       return new Particle(
//   //         Math.random() * canvas.width,
//   //         Math.random() * canvas.height,
//   //         canvas
//   //       );
//   //     });
//   //   };

//   //   // Add mouse event listeners
//   //   const canvas = canvasRef.current;
//   //   if (canvas) {
//   //     canvas.addEventListener("mousemove", handleMouseMove);
//   //     canvas.addEventListener("mouseleave", handleMouseLeave);
//   //   }

//   //   initCanvas();
//   //   window.addEventListener("resize", initCanvas);

//   //   // Animation loop
//   //   const animate = () => {
//   //     if (!canvasRef.current) return;

//   //     const canvas = canvasRef.current;
//   //     const ctx = canvas.getContext("2d");

//   //     // Clear with subtle fade effect
//   //     ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
//   //     ctx.fillRect(0, 0, canvas.width, canvas.height);

//   //     // Draw animated web background
//   //     drawWebPattern(ctx, canvas);

//   //     // Update all particles first
//   //     particlesRef.current.forEach((particle) => {
//   //       particle.update(mouseRef.current.x, mouseRef.current.y);
//   //     });

//   //     // Draw connections for all particles (full density)
//   //     particlesRef.current.forEach((particle) => {
//   //       particle.drawConnections(particlesRef.current, mouseRef.current.x, mouseRef.current.y);
//   //     });

//   //     // Draw particles on top
//   //     particlesRef.current.forEach((particle) => {
//   //       particle.draw();
//   //     });

//   //     // Draw floating strands
//   //     drawFloatingStrands(ctx, canvas);

//   //     // Enhanced mouse interaction effect
//   //     if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
//   //       // Mouse glow
//   //       const gradient = ctx.createRadialGradient(
//   //         mouseRef.current.x, mouseRef.current.y, 0,
//   //         mouseRef.current.x, mouseRef.current.y, 120
//   //       );
//   //       gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
//   //       gradient.addColorStop(0.5, "rgba(255, 107, 53, 0.1)");
//   //       gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        
//   //       ctx.beginPath();
//   //       ctx.arc(mouseRef.current.x, mouseRef.current.y, 120, 0, Math.PI * 2);
//   //       ctx.fillStyle = gradient;
//   //       ctx.fill();

//   //       // Mouse center
//   //       const pulse = Math.sin(Date.now() * 0.01) * 0.5 + 1;
//   //       ctx.beginPath();
//   //       ctx.arc(mouseRef.current.x, mouseRef.current.y, 6 * pulse, 0, Math.PI * 2);
//   //       ctx.fillStyle = "rgba(255, 200, 53, 0.8)";
//   //       ctx.fill();
        
//   //       ctx.beginPath();
//   //       ctx.arc(mouseRef.current.x, mouseRef.current.y, 3 * pulse, 0, Math.PI * 2);
//   //       ctx.fillStyle = "rgba(255, 255, 200, 1)";
//   //       ctx.fill();
//   //     }

//   //     animationRef.current = requestAnimationFrame(animate);
//   //   };

//   //   animationRef.current = requestAnimationFrame(animate);

//   //   return () => {
//   //     window.removeEventListener("resize", initCanvas);
//   //     if (canvas) {
//   //       canvas.removeEventListener("mousemove", handleMouseMove);
//   //       canvas.removeEventListener("mouseleave", handleMouseLeave);
//   //     }
//   //     if (animationRef.current) {
//   //       cancelAnimationFrame(animationRef.current);
//   //     }
//   //   };
//   // }, []);
// useEffect(() => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;
//   const ctx = canvas.getContext("2d", { alpha: false }); // Performance hint to browser
// setTimeout(() => setMounted(true), 100);

//   const initCanvas = () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     // Lower count (100-120) feels just as dense but 3x faster
//     particlesRef.current = Array.from({ length: 120 }, () => 
//       new Particle(Math.random() * canvas.width, Math.random() * canvas.height, canvas)
//     );
//   };

//   const animate = () => {
//     if (!canvasRef.current) return;

//     // 1. Faster Clearing (Clear with white background)
//     ctx.fillStyle = "#ffffff"; 
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     const particles = particlesRef.current;
//     const mouseX = mouseRef.current.x;
//     const mouseY = mouseRef.current.y;
//     const len = particles.length;

//     // 2. Single-Pass Particle Update and Draw
//     for (let i = 0; i < len; i++) {
//       const p1 = particles[i];
//       p1.update(mouseX, mouseY);
//       p1.draw();

//       // 3. Optimized Connection Loop
//       // Only check connections once per pair (j = i + 1)
//       for (let j = i + 1; j < len; j++) {
//         const p2 = particles[j];
//         const dx = p1.x - p2.x;
//         const dy = p1.y - p2.y;
//         const distSq = dx * dx + dy * dy;

//         // Skip connection drawing if too far (squared check is much faster)
//         if (distSq < 12100) { // 110px squared
//           const opacity = (1 - Math.sqrt(distSq) / 110) * 0.3;
//           ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
//           ctx.lineWidth = 0.5;
//           ctx.beginPath();
//           ctx.moveTo(p1.x, p1.y);
//           ctx.lineTo(p2.x, p2.y);
//           ctx.stroke();
//         }
//       }
//     }

//     animationRef.current = requestAnimationFrame(animate);
//   };

//   // Event Listeners
//   const handleMouseMove = (e) => {
//     const rect = canvas.getBoundingClientRect();
//     mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
//   };
  
//   window.addEventListener("resize", initCanvas);
//   canvas.addEventListener("mousemove", handleMouseMove);
  
//   initCanvas();
//   animate();

//   return () => {
//     window.removeEventListener("resize", initCanvas);
//     canvas.removeEventListener("mousemove", handleMouseMove);
//     cancelAnimationFrame(animationRef.current);
//   };
// }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !partnerNetId) {
//       alert("Please fill out all details");
//       return;
//     }
    
//     if (!acceptTerms) {
//       alert("Please accept the Terms & Conditions");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${PHP_API_URL}/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, partnerNetId }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         alert(data.error || "Something went wrong");
//         return;
//       }

//       // Set signin flow cookie on client side
//       setSigninFlow({
//         partnerNetId,
//         email,
//         mode: data.mode ? "set-password" : "compare-password",
//       });

//       // Route based on mode
//       if (data.mode) {
//         router.push("/partner-net/set-password");
//       } else {
//         router.push("/partner-net/compare-password");
//       }
//     } catch (err) {
//       setLoading(false);
//       console.error("Sign in error:", err);
//       alert("Internal server error");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 overflow-hidden relative">
//       {/* Canvas for dense particle spider web animation */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full pointer-events-auto"
//         style={{ cursor: 'none' }}
//       />

//       <div className={`w-full max-w-md px-4 z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="relative">
//               <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl shadow-lg">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
//               ThreatCure
//             </h1>
//           </div>
//           <p className="text-gray-600 mb-2">Partner Network Portal</p>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
//             <Sparkles className="w-3 h-3" />
//             Secure Partner Access
//           </div>
//         </div>

//         {/* Sign In Card */}
//         <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-orange-200/50 relative overflow-hidden">
//           {/* Subtle inner glow */}
//           <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-pink-100/10 pointer-events-none rounded-3xl"></div>
          
//           <div className="text-center mb-8 relative z-10">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto shadow-lg">
//               <LogIn className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//             <p className="text-gray-600">Sign in to your partner account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Key className="w-4 h-4" /> Partner Network ID
//               </label>
//               <input
//                 type="text"
//                 value={partnerNetId}
//                 onChange={(e) => setPartnerNetId(e.target.value)}
//                 placeholder="Enter your Partner ID"
//                 className="w-full px-4 py-3 bg-white/90 border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Mail className="w-4 h-4" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-white/90 border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all"
//                 required
//               />
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50/80 to-pink-50/80 rounded-xl border border-orange-200">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//                 className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded border-orange-300"
//               />
//               <label className="text-gray-700 text-sm cursor-pointer">
//                 I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !acceptTerms}
//               className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-500 relative overflow-hidden ${
//                 loading || !acceptTerms
//                   ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-300/50'
//               }`}
//             >
//               <span className="flex items-center justify-center gap-3 relative z-10">
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
//                   </>
//                 )}
//               </span>
//               {/* Button hover effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-orange-100 text-center relative z-10">
//             <p className="text-gray-600 text-sm">
//               Need help? <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">Contact Support</button>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-6 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               500+ Partners
//             </span>
//             <span>•</span>
//             <span>99.9% Uptime</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





























// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";
// import Image from "next/image";

// class Particle {
//   constructor(x, y, canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d");
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 2 + 0.5;
//     this.speedX = Math.random() * 2 - 1;
//     this.speedY = Math.random() * 2 - 1;
//     this.color = Math.random() > 0.5 ? "rgba(255, 107, 53, 0.8)" : "rgba(255, 150, 53, 0.8)";
//     this.connections = [];
//     this.maxConnections = 5;
//     this.connectionDistance = 100;
//     this.vx = 0;
//     this.vy = 0;
//     this.inertia = 0.85;
//     this.pulse = Math.random() * Math.PI * 2;
//     this.pulseSpeed = 0.1 + Math.random() * 0.1;
//   }

//   update(mouseX, mouseY, mouseRadius = 150) {
//     const dx = this.x - mouseX;
//     const dy = this.y - mouseY;
//     const distance = Math.sqrt(dx * dx + dy * dy);
    
//     // Ultra-fast mouse interaction
//     if (distance < mouseRadius && mouseX > 0 && mouseY > 0) {
//       const angle = Math.atan2(dy, dx);
//       const force = (mouseRadius - distance) / mouseRadius;
//       const pushStrength = 12; // Very strong push for instant response
      
//       this.vx += Math.cos(angle) * force * pushStrength;
//       this.vy += Math.sin(angle) * force * pushStrength;
      
//       // Add some random turbulence for natural feel
//       this.vx += (Math.random() - 0.5) * force * 6;
//       this.vy += (Math.random() - 0.5) * force * 6;
//     }
    
//     // Constant automatic movement
//     const time = Date.now() * 0.002;
//     const waveX = Math.sin(time * 0.8 + this.x * 0.005) * 0.8;
//     const waveY = Math.cos(time * 0.6 + this.y * 0.005) * 0.8;
    
//     this.vx += (waveX + this.speedX * 0.5) * 0.2;
//     this.vy += (waveY + this.speedY * 0.5) * 0.2;
    
//     // Apply inertia
//     this.vx *= this.inertia;
//     this.vy *= this.inertia;
    
//     // Update position
//     this.x += this.vx;
//     this.y += this.vy;
    
//     // Boundary wrap-around for continuous flow
//     if (this.x > this.canvas.width + 50) this.x = -50;
//     if (this.x < -50) this.x = this.canvas.width + 50;
//     if (this.y > this.canvas.height + 50) this.y = -50;
//     if (this.y < -50) this.y = this.canvas.height + 50;
    
//     // Fast pulse animation
//     this.pulse += this.pulseSpeed;
//     if (this.pulse > Math.PI * 2) this.pulse -= Math.PI * 2;
//   }

//   draw() {
//     const pulseSize = Math.sin(this.pulse) * 0.3 + 0.8;
//     this.ctx.beginPath();
//     this.ctx.arc(this.x, this.y, this.size * pulseSize, 0, Math.PI * 2);
//     this.ctx.fillStyle = this.color;
//     this.ctx.fill();
    
//     // Glow effect
//     this.ctx.beginPath();
//     this.ctx.arc(this.x, this.y, this.size * pulseSize * 2, 0, Math.PI * 2);
//     this.ctx.fillStyle = this.color.replace('0.8)', '0.2)');
//     this.ctx.fill();
//   }

//   drawConnections(particles, mouseX, mouseY) {
//     // Connect to nearby particles
//     let connectionsDrawn = 0;
//     for (let i = 0; i < particles.length && connectionsDrawn < this.maxConnections; i++) {
//       if (particles[i] === this) continue;
      
//       const dx = this.x - particles[i].x;
//       const dy = this.y - particles[i].y;
//       const distanceSq = dx * dx + dy * dy;
      
//       if (distanceSq < this.connectionDistance * this.connectionDistance) {
//         connectionsDrawn++;
//         const distance = Math.sqrt(distanceSq);
//         const opacity = (1 - (distance / this.connectionDistance)) * 0.4;
        
//         this.ctx.beginPath();
//         this.ctx.moveTo(this.x, this.y);
//         this.ctx.lineTo(particles[i].x, particles[i].y);
//         this.ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
//         this.ctx.lineWidth = 0.6 + Math.sin(this.pulse) * 0.2;
//         this.ctx.lineCap = 'round';
//         this.ctx.stroke();
//       }
//     }
    
//     // Connect to mouse with strong visual feedback
//     if (mouseX > 0 && mouseY > 0) {
//       const dx = this.x - mouseX;
//       const dy = this.y - mouseY;
//       const distanceSq = dx * dx + dy * dy;
//       const mouseDist = 200;
      
//       if (distanceSq < mouseDist * mouseDist) {
//         const distance = Math.sqrt(distanceSq);
//         const opacity = 0.7 - (distance / (mouseDist * 1.5));
        
//         this.ctx.beginPath();
//         this.ctx.moveTo(this.x, this.y);
//         this.ctx.lineTo(mouseX, mouseY);
//         this.ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
//         this.ctx.lineWidth = 1.5 + Math.sin(Date.now() * 0.02) * 0.5;
//         this.ctx.stroke();
//       }
//     }
//   }
// }

// export default function SignInPage() {
//   const [partnerNetId, setPartnerNetId] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const mouseVelocityRef = useRef({ x: 0, y: 0 });
//   const lastMouseRef = useRef({ x: 0, y: 0 });
//   const router = useRouter();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (hasPartnerSession()) {
//       router.replace("/partner-net/videos");
//     }
//   }, [router]);

//   // Initialize particles and animation
//   useEffect(() => {
//     setTimeout(() => setMounted(true), 100);

//     const handleMouseMove = (e) => {
//       if (!canvasRef.current) return;
      
//       const canvas = canvasRef.current;
//       const rect = canvas.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       // Calculate velocity for enhanced effects
//       mouseVelocityRef.current = {
//         x: (x - lastMouseRef.current.x) * 2,
//         y: (y - lastMouseRef.current.y) * 2
//       };
      
//       lastMouseRef.current = { x, y };
//       mouseRef.current = { x, y };
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current = { x: -1000, y: -1000 };
//       mouseVelocityRef.current = { x: 0, y: 0 };
//     };

//     const initCanvas = () => {
//       if (!canvasRef.current) return;

//       const canvas = canvasRef.current;
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;

//       // Create optimized number of particles for fast animation
//      const particleCount = 500;
//       particlesRef.current = Array.from({ length: particleCount }, () => {
//         return new Particle(
//           Math.random() * canvas.width,
//           Math.random() * canvas.height,
//           canvas
//         );
//       });
//     };

//     // Add optimized mouse event listeners
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.addEventListener("mousemove", handleMouseMove);
//       canvas.addEventListener("mouseleave", handleMouseLeave);
//     }

//     initCanvas();
//     window.addEventListener("resize", initCanvas);

//     // Ultra-fast animation loop
//     const animate = () => {
//       if (!canvasRef.current) return;

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       const particles = particlesRef.current;
//       const mouseX = mouseRef.current.x;
//       const mouseY = mouseRef.current.y;

//       // Clear with pure white background
//       ctx.fillStyle = "#ffffff";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Single-pass optimized particle processing
//       for (let i = 0; i < particles.length; i++) {
//         const p = particles[i];
        
//         // Update with velocity-enhanced mouse position
//         const enhancedMouseX = mouseX + mouseVelocityRef.current.x * 0.5;
//         const enhancedMouseY = mouseY + mouseVelocityRef.current.y * 0.5;
//         p.update(enhancedMouseX, enhancedMouseY);
        
//         // Draw connections to other particles
//         for (let j = i + 1; j < particles.length; j++) {
//           const p2 = particles[j];
//           const dx = p.x - p2.x;
//           const dy = p.y - p2.y;
//           const distSq = dx * dx + dy * dy;
          
//           if (distSq < 10000) { // 100px squared
//             const distance = Math.sqrt(distSq);
//             const opacity = (1 - distance / 100) * 0.3;
//             ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
//             ctx.lineWidth = 0.5 + Math.sin(p.pulse) * 0.2;
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.stroke();
//           }
//         }
        
//         // Draw mouse connections
//         if (mouseX > 0 && mouseY > 0) {
//           const dx = p.x - mouseX;
//           const dy = p.y - mouseY;
//           const distSq = dx * dx + dy * dy;
          
//           if (distSq < 40000) { // 200px squared
//             const distance = Math.sqrt(distSq);
//             const opacity = 0.6 - (distance / 300);
//             ctx.strokeStyle = `rgba(255, 200, 53, ${opacity})`;
//             ctx.lineWidth = 5.2;
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(mouseX, mouseY);
//             ctx.stroke();
//           }
//         }
        
//         // Draw particle
//         p.draw();
//       }

//       // Draw mouse effect
//       if (mouseX > 0 && mouseY > 0) {
//         const velocity = Math.sqrt(
//           mouseVelocityRef.current.x * mouseVelocityRef.current.x + 
//           mouseVelocityRef.current.y * mouseVelocityRef.current.y
//         );
        
//         // Mouse glow
//         ctx.beginPath();
//         ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
//         const gradient = ctx.createRadialGradient(
//           mouseX, mouseY, 0,
//           mouseX, mouseY, 100
//         );
//         gradient.addColorStop(0, "rgba(255, 150, 53, 0.3)");
//         gradient.addColorStop(0.7, "rgba(255, 107, 53, 0.1)");
//         gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
//         ctx.fillStyle = gradient;
//         ctx.fill();
        
//         // Mouse center with velocity effect
//         const pulse = Math.sin(Date.now() * 0.02) * 0.3 + 1;
//         ctx.beginPath();
//         ctx.arc(mouseX, mouseY, 5 * pulse, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(255, 200, 53, 0.9)";
//         ctx.fill();
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("resize", initCanvas);
//       if (canvas) {
//         canvas.removeEventListener("mousemove", handleMouseMove);
//         canvas.removeEventListener("mouseleave", handleMouseLeave);
//       }
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !phoneNumber ) {
//       alert("Please fill out all details");
//       return;
//     }
    
//     if (!acceptTerms) {
//       alert("Please accept the Terms & Conditions");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${PHP_API_URL}/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, phoneNumber }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (!response.ok) {
//         alert(data.error || "Something went wrong");
//         return;
//       }

//       // Set signin flow cookie on client side
//       setSigninFlow({
//         partnerNetId,
//         email,
//         mode: data.mode ? "set-password" : "compare-password",
//       });

//       // Route based on mode
//       if (data.mode) {
//         router.push("/partner-net/set-password");
//       } else {
//         router.push("/partner-net/compare-password");
//       }
//     } catch (err) {
//       setLoading(false);
//       console.error("Sign in error:", err);
//       alert("Internal server error");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-white overflow-hidden relative">
//       {/* Canvas for fast spider web animation */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full pointer-events-auto"
//         style={{ cursor: 'none' }}
//       />

//       <div className={`w-full max-w-md px-4 z-10 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="relative">
//               <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-lg animate-pulse">
//                {/* <Image alt="logo" src={"/logowhite.png"} width={120} height={50} />   */}
//               </div>
//             </div>
//             <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
//               ThreatCure
//             </h1>
//           </div>
//           <p className="text-gray-600 mb-2">Partner Network Portal</p>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold border border-orange-200">
//             <Sparkles className="w-3 h-3" />
//             Secure Partner Access
//           </div>
//         </div>

//         {/* Sign In Card */}
//         <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-200 relative overflow-hidden">
//           {/* Orange accent border */}
//           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
          
//           <div className="text-center mb-8 relative z-10">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto shadow-lg">
//               <LogIn className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//             <p className="text-gray-600">Sign in to your partner account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Key className="w-4 h-4 text-orange-500" /> Phone number 
//               </label>
//               {/* <input
//                 type="text"
//                 value={partnerNetId}
//                 onChange={(e) => setPartnerNetId(e.target.value)}
//                 placeholder="Enter your Partner ID"
//                 className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-200"
//                 required
//               /> */}
//               <input
//   type="tel"
//   value={phoneNumber}
//   onChange={(e) => setPhoneNumber(e.target.value)}
//   placeholder="Enter phone number"
//   required
// />

//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-orange-500" /> Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-200"
//                 required
//               />
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => setAcceptTerms(e.target.checked)}
//                 className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded border-orange-300"
//               />
//               <label className="text-gray-700 text-sm cursor-pointer">
//                 I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !acceptTerms}
//               className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden ${
//                 loading || !acceptTerms
//                   ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-300'
//               }`}
//             >
//               <span className="flex items-center justify-center gap-3 relative z-10">
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
//                   </>
//                 )}
//               </span>
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-orange-100 text-center relative z-10">
//             <p className="text-gray-600 text-sm">
//               Need help? <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">Contact Support</button>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-6 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               500+ Partners
//             </span>
//             <span>•</span>
//             <span>99.9% Uptime</span>
//             <span>•</span>
//             <span className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//               Fast & Secure
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";
import { useState, useEffect, useRef } from "react";
import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight, Smartphone, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../../lib/auth";
import Image from "next/image";

class Particle {
  // ... Keep your Particle class exactly as it is ...
  // (Your Particle class code remains unchanged)
}

export default function NewLogin() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partner_net_id,set_partner_net_id]=useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [otpDestination, setOtpDestination] = useState("email"); // 'email' or 'phone'
  const [hasPhoneRegistered, setHasPhoneRegistered] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (hasPartnerSession()) {
      router.replace("/partner-net/videos");
    }
  }, [router]);

  // Initialize particles and animation (keep exactly as is)
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    // ... (Your existing particle animation code remains exactly the same) ...
  }, []);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phone = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phone.length === 0) return '';
    if (phone.length <= 3) return `(${phone}`;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError(""); // Clear error when user types
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
  };
  const handlePartnerNetChange=(e)=>{
    set_partner_net_id(e.target.value);
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !phoneNumber || !partner_net_id) {
      setError("Please fill out all details");
      return;
    }
    
    if (!acceptTerms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Call /signin to initialize the signin flow
      const signinResponse = await fetch(`${PHP_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ 
          email, 
          phoneNumber: phoneDigits ,// Send only digits
          partner_id:partner_net_id

        }),
      });

      const signinData = await signinResponse.json();
      console.log("Signin Response:", signinData);
      if (!signinResponse.ok) {
        setError(signinData.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Check if user has phone registered (for SMS OTP)
      if (signinData.hasPhone === false && otpDestination === "phone") {
        setError("No phone number registered. Please use email for OTP.");
        setLoading(false);
        return;
      }

      // Update OTP destination based on user's phone availability
      if (!signinData.hasPhone) {
        setOtpDestination("email");
      }

      // Step 2: Request OTP automatically after successful signin
      const otpResponse = await fetch(`${PHP_API_URL}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ 
          email:signinData.email,
          phoneNumber:phoneNumber,
          partnerId:signinData.partnerId,
          flow:signinData.flow,
          destination: signinData.hasPhone ? otpDestination : "email" // Use email if no phone
        }),
      });

      const otpData = await otpResponse.json();
      console.log("OTP Response:", otpData);
      if (!otpResponse.ok) {
        setError(otpData.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // Store signin flow data in client cookie
     setSigninFlow({
  email: signinData.email,
  partnerId: signinData.partnerId ?? partner_net_id,
  phoneNumber: phoneDigits,
  flow: signinData.flow,        // "signup" or "signin"
  mode: "pending-otp",
});


      // Redirect to OTP verification page
      router.push("/partner-net/verify-otp");

    } catch (err) {
      setLoading(false);
      console.error("Sign in error:", err);
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white overflow-hidden relative">
      {/* Canvas for fast spider web animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'none' }}
      />

      <div className={`w-full max-w-md px-4 z-10 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-lg animate-pulse">
                {/* <Image alt="logo" src={"/logowhite.png"} width={120} height={50} /> */}
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              ThreatCure
            </h1>
          </div>
          <p className="text-gray-600 mb-2">Partner Network Portal</p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold border border-orange-200">
            <Sparkles className="w-3 h-3" />
            Secure Partner Access
          </div>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-200 relative overflow-hidden">
          {/* Orange accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Partner</h2>
            <p className="text-gray-600">Sign in to your partner account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> Partner Net Id 
              </label>
              <input
                type="text"
                value={partner_net_id}
                onChange={handlePartnerNetChange}
                placeholder="Enter your Partner_net Id"
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" /> Phone Number
              </label>
             <input
  type="tel"
  value={phoneNumber}
  onChange={(e) => {
    // Only allow numbers, remove any non-digit characters
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  }}
  placeholder="03102866415"
  className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-200"
  required
  maxLength="11" // For Pakistan numbers (03101234567)
/>
              <p className="text-xs text-gray-500 mt-2">
                Used for verification and account recovery
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-orange-500" /> Send OTP to
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setOtpDestination("email")}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                    otpDestination === "email" 
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOtpDestination("phone")}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                    otpDestination === "phone" 
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    SMS
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                OTP will be sent to your {otpDestination === "email" ? "email" : "phone"} for verification
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded border-orange-300"
                disabled={loading}
              />
              <label className="text-gray-700 text-sm cursor-pointer">
                I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptTerms}
              className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden ${
                loading || !acceptTerms
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-300'
              }`}
            >
              <span className="flex items-center justify-center gap-3 relative z-10">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-orange-100 text-center relative z-10">
            <p className="text-gray-600 text-sm">
              Need help? <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">Contact Support</button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              500+ Partners
            </span>
            <span>•</span>
            <span>99.9% Uptime</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Fast & Secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}