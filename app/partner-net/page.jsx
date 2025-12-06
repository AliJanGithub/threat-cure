"use client";
import { useState, useEffect, useRef } from "react";
import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";

export default function SignInPage() {
  const [partnerNetId, setPartnerNetId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (hasPartnerSession()) {
      router.replace("/partner-net/videos");
    }
  }, [router]);

  // Floating balls animation
  const [balls, setBalls] = useState(() =>
    Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.1) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.7 ? "#ff6b35" : "#e63e62",
    }))
  );

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);

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
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !partnerNetId) {
      alert("Please fill out all details");
      return;
    }
    
    if (!acceptTerms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${PHP_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, partnerNetId }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // Set signin flow cookie on client side
      setSigninFlow({
        partnerNetId,
        email,
        mode: data.mode ? "set-password" : "compare-password",
      });

      // Route based on mode
      if (data.mode) {
        router.push("/partner-net/set-password");
      } else {
        router.push("/partner-net/compare-password");
      }
    } catch (err) {
      setLoading(false);
      console.error("Sign in error:", err);
      alert("Internal server error");
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 overflow-hidden relative"
    >
      {/* Floating balls */}
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
      </div>

      <div className={`w-full max-w-md px-4 z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              ThreatCure
            </h1>
          </div>
          <p className="text-gray-600 mb-2">Partner Network Portal</p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
            <Sparkles className="w-3 h-3" />
            Secure Partner Access
          </div>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-600">Sign in to your partner account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" /> Partner Network ID
              </label>
              <input
                type="text"
                value={partnerNetId}
                onChange={(e) => setPartnerNetId(e.target.value)}
                placeholder="Enter your Partner ID"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-400 rounded"
              />
              <label className="text-gray-700 text-sm cursor-pointer">
                I agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptTerms}
              className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-500 ${
                loading || !acceptTerms
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Need help? <button className="text-orange-600 font-semibold hover:text-orange-700">Contact Support</button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
