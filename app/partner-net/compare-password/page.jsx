"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedComparePasswordRoute } from "../../../components/ProtectedRoute";
import { getSigninFlow, setPartnerSession, clearSigninFlow, PHP_API_URL } from "../../../lib/auth";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { Shield, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Key, ShieldCheck, AlertCircle, LogIn, User } from "lucide-react";

function ComparePasswordContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Pre-fill email from signin flow
  useEffect(() => {
    const signinFlow = getSigninFlow();
    if (signinFlow?.email) {
      setFormData(prev => ({ ...prev, email: signinFlow.email }));
    }
  }, []);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current, THREE,
          mouseControls: true, touchControls: true, gyroControls: false,
          minHeight: 200.0, minWidth: 200.0,
          highlightColor: 0xffa726, midtoneColor: 0xffffff,
          lowlightColor: 0x0a0a0a, baseColor: 0x000000,
          blurFactor: 0.45, speed: 1.5, zoom: 1.2
        })
      );
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect]);

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
    <div ref={vantaRef} className="min-h-screen w-full flex items-center justify-center relative">
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">ThreatCure</span>
        </div>
      </div>

      {attemptCount > 0 && !success && (
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-black/50 rounded-full px-3 py-1 border border-white/20">
            <span className="text-gray-300 text-sm">Attempt: <span className="text-orange-400 font-semibold">{attemptCount}</span></span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
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
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Key className="w-3 h-3" /> Verify Password
                </div>
                <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
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
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-3 h-3" /> Email
                  </label>
                  <input
                    type="email" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.email ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none`}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter your password"
                      className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.password ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none pr-10 placeholder-gray-400`}
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
                </div>

                <div className="p-4 bg-black/20 rounded-xl border border-white/10">
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
