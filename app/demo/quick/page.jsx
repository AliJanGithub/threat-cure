"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Sparkles, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import IdModalViewer from "../../../components/IdModalViewer";

function QuickDemoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get pre-selected data from URL
  const preSelectedCategory = searchParams.get("category") || "";
  const preSelectedService = searchParams.get("service") || "";
  const preSelectedType = searchParams.get("type") || ""; // "service" or "project"
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [idCardView, setIdCardView] = useState(false);
  const [id, setId] = useState("");
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accept, setAccept] = useState(false);

  // Floating balls animation
  const [balls, setBalls] = useState(() =>
    Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.7 ? "#ff6b35" : "#e63e62",
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);

    let animationFrame;
    const animateBalls = () => {
      setBalls(prev =>
        prev.map(ball => {
          let newX = ball.x + ball.speedX;
          let newY = ball.y + ball.speedY;
          if (newX <= 0 || newX >= 100) ball.speedX *= -1;
          if (newY <= 0 || newY >= 100) ball.speedY *= -1;
          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));
          return { ...ball, x: newX, y: newY };
        })
      );
      animationFrame = requestAnimationFrame(animateBalls);
    };
    animationFrame = requestAnimationFrame(animateBalls);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullName || !email) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (!accept) {
      alert("Please accept the Terms of Service");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      userName: fullName,
      userEmail: email,
      mainCategory: preSelectedCategory,
      subCategory: [preSelectedService],
      decideLater: false,
      quickDemo: true,
      type: preSelectedType
    };

    try {
      // const response = await fetch("http://localhost/threat-cure-php-backend/my-api/public/submission", {
      const response = await fetch("http://207.180.228.70:8080/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setIsSubmitting(false);
        alert(data.error || data.msg || "Submission failed");
        return;
      }

      setId(data.id || "");
      setIdCardView(true);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {idCardView && id && <IdModalViewer id={id} onClose={() => setIdCardView(false)} />}
      
      {/* Floating balls background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {balls.map((ball, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${ball.x}%`,
              top: `${ball.y}%`,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              backgroundColor: ball.color,
              filter: 'blur(2px)',
            }}
          />
        ))}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-pink-100/20 to-transparent"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* CARD WRAPPER */}
      <div 
        className={`w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 p-8 relative z-10
          transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-10 -z-10"></div>
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-full shadow-lg mb-3 transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <Image alt="logo" src={"/logo.png"} width={120} height={50} />   
          </div>
          
          <h1 className={`text-3xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Quick Demo Request
          </h1>
        </div>

        {/* Pre-selected Service Display */}
        <div className={`mb-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-200 transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              {/* <Shield className="w-5 h-5 text-white" /> */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Selected {preSelectedType === "project" ? "Platform" : "Service"}</p>
              <p className="font-bold text-gray-900">{preSelectedService}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Sparkles className="w-4 h-4" />
            <span>Category: {preSelectedCategory}</span>
          </div>
        </div>

        <p className={`text-center text-gray-600 mb-6 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Just enter your details to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className={`transition-all duration-500 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 bg-white/50"
              required
            />
          </div>

          {/* Email */}
          <div className={`transition-all duration-500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 bg-white/50"
              required
            />
          </div>

          {/* Terms */}
          <div className={`transition-all duration-500 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="flex items-center gap-3 text-gray-700 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer opacity-0 absolute"
                />
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-300
                  ${accept ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-600' : 'bg-white border-gray-300 group-hover:border-orange-400'}`}>
                  {accept && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm select-none">
                I agree to the <span className="text-orange-600 font-semibold">Terms of Service</span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className={`transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                    Demo Requested!
                  </>
                ) : (
                  <>
                    Request Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Alternative Link */}
        <div className={`mt-6 text-center transition-all duration-700 delay-[800ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">
            Want to explore more options?{" "}
            <button
              onClick={() => router.push("/demo")}
              className="text-orange-600 font-semibold hover:underline"
            >
              Full Demo Form
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuickDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <QuickDemoContent />
    </Suspense>
  );
}
