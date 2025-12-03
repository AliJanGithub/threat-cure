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
  AlertCircle
} from "lucide-react";

export default function SetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
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

  // Check password strength
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

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordStrength.uppercase || !passwordStrength.lowercase || !passwordStrength.number) {
      newErrors.password = "Password must include uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    try {
      // API call to set password
      const response = await fetch('/api/setpassword', {
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
        throw new Error(data.message || 'Failed to set password');
      }

      // Success - show success message and redirect
      setSuccess(true);
      
      // Wait for 2 seconds then redirect
      setTimeout(() => {
        router.push('/partner-net/videos');
      }, 2000);

    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStrengthScore = () => {
    const checks = Object.values(passwordStrength);
    const passed = checks.filter(Boolean).length;
    return Math.round((passed / checks.length) * 100);
  };

  const getStrengthColor = (score) => {
    if (score < 40) return 'bg-red-500';
    if (score < 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score) => {
    if (score < 40) return 'Weak';
    if (score < 70) return 'Medium';
    return 'Strong';
  };

  const strengthScore = calculateStrengthScore();

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

      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          {/* Success Message */}
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Password Set Successfully!</h1>
              <p className="text-gray-300 mb-6">
                Your password has been updated. Redirecting to partner videos...
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
                  Set Your Password
                </div>
                <h1 className="text-white text-2xl font-bold mb-2">Secure Your Account</h1>
                <p className="text-gray-300 text-sm">
                  Create a strong password for your partner account
                </p>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-300 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email address"
                    className={`w-full p-3 rounded-lg bg-white/10 text-white outline-none border placeholder-gray-300 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-white/20 focus:border-orange-400'
                    }`}
                    disabled={isLoading}
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-300 text-sm font-medium">
                      Password
                    </label>
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-2 rounded-full bg-white/10 overflow-hidden`}>
                        <div 
                          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500`}
                          style={{ width: `${strengthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {getStrengthText(strengthScore)}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create a strong password"
                      className={`w-full p-3 rounded-lg bg-white/10 text-white outline-none border placeholder-gray-300 transition-all duration-300 pr-10 ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-orange-400'
                      }`}
                      disabled={isLoading}
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
                  {errors.password ? (
                    <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  ) : (
                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(passwordStrength).map(([key, isValid]) => (
                          <div key={key} className="flex items-center gap-2">
                            {isValid ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-gray-500"></div>
                            )}
                            <span className={`text-xs ${isValid ? 'text-green-400' : 'text-gray-400'}`}>
                              {key === 'length' && '8+ characters'}
                              {key === 'uppercase' && 'Uppercase letter'}
                              {key === 'lowercase' && 'Lowercase letter'}
                              {key === 'number' && 'Number'}
                              {key === 'special' && 'Special character'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                      className={`w-full p-3 rounded-lg bg-white/10 text-white outline-none border placeholder-gray-300 transition-all duration-300 pr-10 ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-orange-400'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Security Tips */}
                <div className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">Security Tips</h4>
                      <ul className="text-gray-300 text-xs space-y-1">
                        <li>• Use a unique password for this account</li>
                        <li>• Avoid common words or personal information</li>
                        <li>• Consider using a password manager</li>
                        <li>• Enable two-factor authentication if available</li>
                      </ul>
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
                      Setting Password...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Set Password & Continue
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Back Link */}
                <div className="text-center pt-4 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center justify-center gap-1 mx-auto"
                    disabled={isLoading}
                  >
                    ← Back to previous step
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            By setting your password, you agree to our{" "}
            <a href="#" className="text-orange-400 hover:text-orange-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-400 hover:text-orange-300 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}