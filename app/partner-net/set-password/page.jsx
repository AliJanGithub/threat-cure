"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedSetPasswordRoute } from "../../../components/ProtectedRoute";
import { getSigninFlow, setPartnerSession, clearSigninFlow, PHP_API_URL } from "../../../lib/auth";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { Shield, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Key, ShieldCheck, AlertCircle } from "lucide-react";

function SetPasswordContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [passwordStrength, setPasswordStrength] = useState({
    length: false, uppercase: false, lowercase: false, number: false, special: false,
  });

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

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength({
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
      });
    }
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Min 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${PHP_API_URL}/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to set password');
      }

      // Set session cookie on client
      const signinFlow = getSigninFlow();
      setPartnerSession({
        email: formData.email,
        partnerNetId: signinFlow?.partnerNetId,
      });
      clearSigninFlow();

      setSuccess(true);
      setTimeout(() => router.push('/partner-net/videos'), 1500);
    } catch (error) {
      setErrors({ submit: error.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  const strengthScore = Math.round((Object.values(passwordStrength).filter(Boolean).length / 5) * 100);

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

      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500 mb-6 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Password Set!</h1>
              <p className="text-gray-300 mb-6">Redirecting to videos...</p>
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Key className="w-3 h-3" /> Set Your Password
                </div>
                <h1 className="text-white text-2xl font-bold mb-2">Secure Your Account</h1>
              </div>

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
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.email ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none`}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 text-sm font-medium">Password</label>
                    <span className="text-xs text-gray-400">{strengthScore}% strength</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.password ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none pr-10`}
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(passwordStrength).map(([key, valid]) => (
                      <div key={key} className="flex items-center gap-1">
                        {valid ? <CheckCircle className="w-3 h-3 text-green-500" /> : <div className="w-3 h-3 rounded-full border border-gray-500" />}
                        <span className={`text-xs ${valid ? 'text-green-400' : 'text-gray-400'}`}>
                          {key === 'length' ? '8+ chars' : key === 'uppercase' ? 'Uppercase' : key === 'lowercase' ? 'Lowercase' : key === 'number' ? 'Number' : 'Special'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none pr-10`}
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold p-4 rounded-xl hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Setting...</>
                  ) : (
                    <><Lock className="w-5 h-5" />Set Password<ArrowRight className="w-5 h-5" /></>
                  )}
                </button>

                <button type="button" onClick={() => router.back()} className="w-full text-gray-400 hover:text-white text-sm" disabled={isLoading}>
                  ← Back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <ProtectedSetPasswordRoute>
      <SetPasswordContent />
    </ProtectedSetPasswordRoute>
  );
}
