"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Key,
  ShieldCheck,
  AlertCircle,
  LogIn,
  User
} from "lucide-react";

export default function ComparePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("partnerNetSession="));
    
    if (cookie) {
      router.replace("/partner-net/videos");
    }
  }, [router]);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffa726,
          midtoneColor: 0xffffff,
          lowlightColor: 0x0a0a0a,
          baseColor: 0x000000,
          blurFactor: 0.45,
          speed: 1.5,
          zoom: 1.2
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setAttemptCount(prev => prev + 1);

    try {
      // API call to compare password
      const response = await fetch('/api/compare-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password comparison failed');
      }

      // Success - check if password matches
      if (data.matches) {
        setSuccess(true);
        
        // Wait for 1.5 seconds then redirect to partner-net/videos
        setTimeout(() => {
          router.push('/partner-net/videos');
        }, 1500);
      } else {
        setErrors({
          submit: 'Incorrect password. Please try again.'
        });
        
        // Clear password field on incorrect attempt
        setFormData(prev => ({ ...prev, password: '' }));
      }

    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
      
      // Clear password field on error
      setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/reset-password');
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen w-full flex items-center justify-center relative"
    >
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2 flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">ThreatCure</span>
          <span className="text-sm text-orange-400 font-semibold bg-black/30 px-3 py-1 rounded-full">Partner Network</span>
        </div>
      </div>

      {/* Attempt Counter */}
      {attemptCount > 0 && !success && (
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
            <span className="text-gray-300 text-sm">
              Attempt: <span className="text-orange-400 font-semibold">{attemptCount}</span>
            </span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          {/* Success Message */}
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Password Verified!</h1>
              <p className="text-gray-300 mb-6">
                Your password has been successfully verified. Redirecting to partner videos...
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <Key className="w-3 h-3" />
                  Verify Your Password
                </div>
                <h1 className="text-white text-2xl font-bold mb-2">Password Verification</h1>
                <p className="text-gray-300 text-sm">
                  Enter your credentials to verify password
                </p>
              </div>

              {/* Security Alert for multiple attempts */}
              {attemptCount >= 3 && (
                <div className="mb-6 p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">Security Notice</h4>
                      <p className="text-gray-300 text-xs">
                        Multiple failed attempts detected. Consider resetting your password if you have forgotten it.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-red-300 text-sm">{errors.submit}</p>
                      {attemptCount >= 2 && (
                        <button
                          onClick={handleForgotPassword}
                          className="text-red-300 hover:text-red-200 text-xs underline mt-1"
                        >
                          Forgot your password?
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your registered email"
                    className={`w-full p-3 rounded-lg bg-white/10 text-white outline-none border placeholder-gray-300 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-white/20 focus:border-orange-400'
                    }`}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter your password"
                      className={`w-full p-3 rounded-lg bg-white/10 text-white outline-none border placeholder-gray-300 transition-all duration-300 pr-10 ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-orange-400'
                      }`}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Password Help Section */}
                <div className="p-4 bg-gradient-to-br from-black/20 to-gray-900/20 rounded-xl border border-white/10">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">Password Verification</h4>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Enter the password you previously set</li>
                        <li>• Make sure Caps Lock is not enabled</li>
                        <li>• Contact support if you encounter issues</li>
                      </ul>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-orange-400 hover:text-orange-300 text-xs underline mt-2"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold p-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying Password...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Links */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center justify-center gap-1"
                    disabled={isLoading}
                  >
                    ← Go Back
                  </button>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-orange-400 hover:text-orange-300 text-sm transition-colors duration-300"
                      disabled={isLoading}
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push('/contact-support')}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                      disabled={isLoading}
                    >
                      Need Help?
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm">
              Secure password verification • End-to-end encrypted
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            By verifying your password, you confirm access to your partner account.
            <br />
            Unauthorized access attempts may be logged.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

