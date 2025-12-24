"use client";
import { useState, useEffect, useRef } from "react";
import { Shield, LogIn, Mail, Key, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { hasPartnerSession, setSigninFlow, PHP_API_URL } from "../../lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (hasPartnerSession()) {
      router.replace("/partner-net/videos");
    }
  }, [router]);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (!email || !password) {
    setError("Please fill out all details");
    setLoading(false);
    return;
  }

  try {
    // Step 1: Login attempt
    const response = await fetch(`${PHP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      setError(data.error || "Invalid credentials");
      setLoading(false);
      return;
    }

    // Check if OTP is required
    if (data.needsOtp) {
      // Determine OTP destination
      const otpDestination = data.hasPhone ? "phone" : "email";
      
      // Request OTP
      const otpResponse = await fetch(`${PHP_API_URL}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          email: data.email || email,
          partnerId: data.partnerId || data.user?.partnerNetId,
          flow: "signin", // or data.flow if provided
          destination: otpDestination
        }),
      });

      const otpData = await otpResponse.json();
      console.log("OTP Response:", otpData);

      if (!otpResponse.ok) {
        setError(otpData.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // Store signin flow data for OTP verification
      setSigninFlow({
        email: data.email || email,
        partnerId: data.partnerId || data.user?.partnerNetId,
        mode: "verify-otp",
        otpDestination: otpDestination,
        // Store any other necessary data
      });

      // Redirect to OTP verification page
      router.push("/partner-net/verify-otp");
      return;
    }

    // If no OTP required, proceed directly
    if (data.user?.partnerNetId) {
      setPartnerSession({
        email: data.email || email,
        partnerNetId: data.user.partnerNetId,
      });
    }

    // Store signin flow
    setSigninFlow({ email: data.email || email, loggedIn: true });
    
    // Redirect to videos page
    router.push("/partner-net/videos");

  } catch (err) {
    console.error("Login error:", err);
    setError("Internal server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${0.5 * 100}%`,
              top: `${0.3 * 100}%`,
              width: `${0.2 * 30 + 10}px`,
              height: `${0.6 * 30 + 10}px`,
              backgroundColor: 0.3 > 0.5 ? "#ff6b35" : "#e63e62",
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

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your partner account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`group w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
                loading
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

          {/* New Login Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/partner-net/new-login")}
              className="w-full py-3 rounded-xl font-semibold text-orange-600 border-2 border-orange-400 hover:bg-orange-50 transition-all duration-300"
            >
              Create New Login
            </button>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Need help? <button className="text-orange-600 font-semibold hover:text-orange-700">Contact Support</button>
            </p>
          </div>
        </div>

        {/* Stats */}
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