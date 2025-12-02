"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Check, Shield, Sparkles, ArrowRight } from "lucide-react";


export default function Demo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [accept, setAccept] = useState(false);
  
  const formRef = useRef(null);

  // Proper useEffect with cleanup
  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous state update
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      clearTimeout(timer);
      // Cleanup any animations or subscriptions
      if (formRef.current) {
        formRef.current.style.animation = 'none';
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!fullName || !email || !interest) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (!accept) {
      alert("Please accept the Terms of Service");
      return;
    }



    const data={
      fullName,
      email,
      interest
    }
    const query=new URLSearchParams(data).toString()

    setIsSubmitting(true);
    
    // Simulate API call
   
    const submitTimer = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const successTimer = setTimeout(() => {
        // Navigate to success page
        router.push(`/demo/success?${query}`);
      }, 1000);

      return () => clearTimeout(successTimer);
    }, 1500);

    return () => clearTimeout(submitTimer);
  };

  // Handle form animation reset on unmount
  useEffect(() => {
    return () => {
      setIsSubmitting(false);
      setIsSubmitted(false);
      setMounted(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* CARD WRAPPER with entrance animation */}
      <div 
        ref={formRef}
        className={`w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 p-8 relative z-10
          transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-10 -z-10"></div>
        
        {/* Header with animation */}
        <div className="flex flex-col items-center mb-6">
          <div className={`bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full shadow-lg animate-bounce-subtle mb-3 relative group transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <Shield size={40} className="text-white relative z-10" />
          </div>
          
          <h1 className={`text-3xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight animate-gradient-x transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Threat Cure
          </h1>
        </div>

        {/* Title with animation */}
        <h2 className={`text-xl font-bold text-center text-gray-800 mt-4 transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Get Started
        </h2>
        <p className={`text-center text-gray-600 mb-6 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Fill in your details to create your account
        </p>

        {/* Form with staggered animations */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name with animation */}
          <div className={`transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 group-hover:border-orange-400 bg-white/50"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Email with animation */}
          <div className={`transition-all duration-500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">Email Address</label>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300 group-hover:border-orange-400 bg-white/50"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Area of Interest with animation */}
          <div className={`transition-all duration-500 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="block font-semibold mb-2 text-gray-700">
              Choose Your Area of Interest
            </label>
            <div className="relative group">
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="border border-gray-300 p-4 rounded-xl w-full bg-white/50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none appearance-none transition-all duration-300 group-hover:border-orange-400"
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Services">Services</option>
                <option value="Solutions">Solutions</option>
                <option value="Development">Development</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Terms with animation */}
          <div className={`transition-all duration-500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <label className="flex items-center gap-3 text-gray-700 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer opacity-0 absolute"
                />
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-300
                  ${accept 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-600' 
                    : 'bg-white border-gray-300 group-hover:border-orange-400'
                  }`}>
                  {accept && <Check className="w-3 h-3 text-white animate-pop-in" />}
                </div>
              </div>
              <span className="text-sm select-none">
                By continuing, you agree to our{" "}
                <span className="text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-300">
                  Terms of Service
                </span>
              </span>
            </label>
          </div>

          {/* Submit Button with full animations */}
          <div className={`transition-all duration-700 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`relative overflow-hidden group/btn w-full py-4 rounded-xl font-semibold text-lg shadow-xl 
                transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0
                ${isSubmitted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                }
                ${(isSubmitting || isSubmitted) ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Button shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 animate-checkmark" />
                    Submitted Successfully!
                  </>
                ) : (
                  <>
                    Continue
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </>
                )}
              </span>
              
              {/* Confetti effect on success */}
              {isSubmitted && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-confetti"
                      style={{
                        left: `${3 * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                        '--tw-translate-x': `${(3 - 0.5) * 200}px`,
                        '--tw-translate-y': `${3 * -100}px`,
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Custom animations in style tag */}
      <style jsx>{`
        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradientX {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes popIn {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes checkmark {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounceSubtle 3s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }
        
        .animate-pop-in {
          animation: popIn 0.3s ease-out;
        }
        
        .animate-confetti {
          animation: confetti 1s ease-out forwards;
        }
        
        .animate-checkmark {
          animation: checkmark 0.3s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        select:focus {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}