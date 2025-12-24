// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { ProtectedSetPasswordRoute } from "../../../components/ProtectedRoute";
// import { getSigninFlow, setPartnerSession, clearSigninFlow, PHP_API_URL } from "../../../lib/auth";
// import VANTA from "vanta/dist/vanta.fog.min"; 
// import * as THREE from "three";
// import { Shield, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Key, ShieldCheck, AlertCircle } from "lucide-react";

// function SetPasswordContent() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
  
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState(null);

//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false, uppercase: false, lowercase: false, number: false, special: false,
//   });

//   // Pre-fill email from signin flow
//   useEffect(() => {
//     const signinFlow = getSigninFlow();
//     if (signinFlow?.email) {
//       setFormData(prev => ({ ...prev, email: signinFlow.email }));
//     }
//   }, []);

//   useEffect(() => {
//     if (!vantaEffect && vantaRef.current) {
//       setVantaEffect(
//         VANTA({
//           el: vantaRef.current, THREE,
//           mouseControls: true, touchControls: true, gyroControls: false,
//           minHeight: 200.0, minWidth: 200.0,
//           highlightColor: 0xffa726, midtoneColor: 0xffffff,
//           lowlightColor: 0x0a0a0a, baseColor: 0x000000,
//           blurFactor: 0.45, speed: 1.5, zoom: 1.2
//         })
//       );
//     }
//     return () => { if (vantaEffect) vantaEffect.destroy(); };
//   }, [vantaEffect]);

//   useEffect(() => {
//     if (formData.password) {
//       setPasswordStrength({
//         length: formData.password.length >= 8,
//         uppercase: /[A-Z]/.test(formData.password),
//         lowercase: /[a-z]/.test(formData.password),
//         number: /[0-9]/.test(formData.password),
//         special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
//       });
//     }
//   }, [formData.password]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 8) newErrors.password = "Min 8 characters";
//     if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password";
//     else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const response = await fetch(`${PHP_API_URL}/set-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email: formData.email, password: formData.password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to set password');
//       }

//       // Set session cookie on client
//       const signinFlow = getSigninFlow();
//       setPartnerSession({
//         email: formData.email,
//         partnerNetId: signinFlow?.partnerNetId,
//       });
//       clearSigninFlow();

//       setSuccess(true);
//       setTimeout(() => router.push('/partner-net/videos'), 1500);
//     } catch (error) {
//       setErrors({ submit: error.message || 'Something went wrong' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const strengthScore = Math.round((Object.values(passwordStrength).filter(Boolean).length / 5) * 100);

//   return (
//     <div ref={vantaRef} className="min-h-screen w-full flex items-center justify-center relative">
//       <div className="absolute top-8 left-8 z-20">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2">
//             <Shield className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold text-white">ThreatCure</span>
//         </div>
//       </div>

//       <div className="w-full max-w-md z-10 px-4">
//         <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
//           {success ? (
//             <div className="text-center py-8">
//               <div className="w-20 h-20 rounded-full bg-green-500 mb-6 mx-auto flex items-center justify-center">
//                 <CheckCircle className="w-10 h-10 text-white" />
//               </div>
//               <h1 className="text-white text-2xl font-bold mb-2">Password Set!</h1>
//               <p className="text-gray-300 mb-6">Redirecting to videos...</p>
//               <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
//             </div>
//           ) : (
//             <>
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
//                   <Key className="w-3 h-3" /> Set Your Password
//                 </div>
//                 <h1 className="text-white text-2xl font-bold mb-2">Secure Your Account</h1>
//               </div>

//               {errors.submit && (
//                 <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <AlertCircle className="w-5 h-5 text-red-400" />
//                     <p className="text-red-300 text-sm">{errors.submit}</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
//                   <input
//                     type="email" value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                     className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.email ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none`}
//                     disabled={isLoading}
//                   />
//                   {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <label className="text-gray-300 text-sm font-medium">Password</label>
//                     <span className="text-xs text-gray-400">{strengthScore}% strength</span>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"} value={formData.password}
//                       onChange={(e) => setFormData({...formData, password: e.target.value})}
//                       className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.password ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none pr-10`}
//                       disabled={isLoading}
//                     />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
//                   <div className="mt-2 grid grid-cols-2 gap-2">
//                     {Object.entries(passwordStrength).map(([key, valid]) => (
//                       <div key={key} className="flex items-center gap-1">
//                         {valid ? <CheckCircle className="w-3 h-3 text-green-500" /> : <div className="w-3 h-3 rounded-full border border-gray-500" />}
//                         <span className={`text-xs ${valid ? 'text-green-400' : 'text-gray-400'}`}>
//                           {key === 'length' ? '8+ chars' : key === 'uppercase' ? 'Uppercase' : key === 'lowercase' ? 'Lowercase' : key === 'number' ? 'Number' : 'Special'}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword}
//                       onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//                       className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} focus:border-orange-400 outline-none pr-10`}
//                       disabled={isLoading}
//                     />
//                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>}
//                 </div>

//                 <button type="submit" disabled={isLoading}
//                   className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold p-4 rounded-xl hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-3">
//                   {isLoading ? (
//                     <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Setting...</>
//                   ) : (
//                     <><Lock className="w-5 h-5" />Set Password<ArrowRight className="w-5 h-5" /></>
//                   )}
//                 </button>

//                 <button type="button" onClick={() => router.back()} className="w-full text-gray-400 hover:text-white text-sm" disabled={isLoading}>
//                   ← Back
//                 </button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function SetPasswordPage() {
//   return (
//     <ProtectedSetPasswordRoute>
//       <SetPasswordContent />
//     </ProtectedSetPasswordRoute>
//   );
// }
"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Key, User, AlertCircle } from "lucide-react";
import { getSigninFlow, setPartnerSession, clearSigninFlow, PHP_API_URL } from "../../../lib/auth";

export default function SetPasswordPage() {
  const router = useRouter();
  
  // Memoize signinFlow to prevent unnecessary recreations
  const signinFlow = useMemo(() => getSigninFlow(), []);
  
  const [formData, setFormData] = useState({ 
    email: '', 
    name: '',
    password: '', 
    confirmPassword: '' 
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const [passwordStrength, setPasswordStrength] = useState({
    length: false, uppercase: false, lowercase: false, number: false, special: false,
  });

  // 🔐 Guard: must be in set-password flow
  useEffect(() => {
    if (!signinFlow?.email) {
      router.replace("/partner-net");
      return;
    }
    
    if (signinFlow.mode !== "set-password") {
      router.replace("/partner-net");
      return;
    }

    // Only update if email hasn't been set yet or is different
    if (formData.email !== signinFlow.email) {
      setFormData(prev => ({ ...prev, email: signinFlow.email }));
    }
  }, [signinFlow, router, formData.email]); // Add formData.email to dependencies

  // Password strength checker
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength({
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
      });
    } else {
      // Reset password strength when password is empty
      setPasswordStrength({
        length: false, uppercase: false, lowercase: false, number: false, special: false,
      });
    }
  }, [formData.password]);

  // Rest of your code remains the same...
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    
    if (!formData.name) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
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
        body: JSON.stringify({ 
          email: formData.email, 
          name: formData.name,
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to set password');
      }

      // Set session cookie on client with partnerNetId from response
      if (data.user?.partnerNetId) {
        setPartnerSession({
          email: formData.email,
          partnerNetId: data.user.partnerNetId,
        });
      }

      clearSigninFlow();
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => router.push('/partner-net/videos'), 2000);
    } catch (error) {
      console.error("Set password error:", error);
      setErrors({ submit: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen if no signin flow
  if (!signinFlow?.email || signinFlow.mode !== "set-password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  const strengthScore = Math.round((Object.values(passwordStrength).filter(Boolean).length / 5) * 100);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <div className="w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 mx-auto shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Your Password</h1>
          <p className="text-gray-600">Complete your account setup</p>
        </div>

        {/* Success Screen */}
        {success ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-200 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">Your password has been set successfully</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-500">Redirecting to dashboard...</p>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-200">
            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (read-only) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-orange-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">This is the email you used to sign in</p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-orange-200'
                  }`}
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 font-medium flex items-center gap-2">
                    <Key className="w-4 h-4 text-orange-500" /> Password
                  </label>
                  <span className={`text-sm font-medium ${
                    strengthScore < 50 ? 'text-red-500' : 
                    strengthScore < 75 ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {strengthScore}% strength
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      if (errors.password) setErrors({...errors, password: ''});
                    }}
                    placeholder="Create a strong password"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 ${
                      errors.password ? 'border-red-500' : 'border-orange-200'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-red-500 text-sm">{errors.password}</p>}
                
                {/* Password Strength Indicators */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(passwordStrength).map(([key, valid]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${valid ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-sm ${valid ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                        {key === 'length' ? 'At least 8 characters' : 
                         key === 'uppercase' ? 'Uppercase letter' : 
                         key === 'lowercase' ? 'Lowercase letter' : 
                         key === 'number' ? 'Number' : 
                         'Special character'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({...formData, confirmPassword: e.target.value});
                      if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                    }}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-orange-200'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-300'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Setting Password...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Shield className="w-5 h-5" />
                    Complete Setup
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </button>

              {/* Back Button */}
              <div className="text-center pt-4 border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => {
                    clearSigninFlow();
                    router.push("/partner-net");
                  }}
                  className="text-sm text-gray-500 hover:text-orange-600 underline"
                  disabled={isLoading}
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Your data is encrypted and securely stored</span>
          </div>
        </div>
      </div>
    </div>
  );
}