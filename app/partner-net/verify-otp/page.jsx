"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Smartphone, ArrowRight, RefreshCw, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { PHP_API_URL, getSigninFlow, clearSigninFlow } from "../../../lib/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const signinFlow = getSigninFlow();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [destination, setDestination] = useState("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success, error, info
  const [countdown, setCountdown] = useState(0);
  const [emailHint, setEmailHint] = useState("");
  const [phoneHint, setPhoneHint] = useState("");
  const [otpflow,setOtpFlow]=useState("")
  const inputRefs = useRef([]);
   console.log("signinflow",signinFlow)
  useEffect(() => {
  if (signinFlow?.email) {
    const parts = signinFlow.email.split('@');
    if (parts.length === 2) {
      const username = parts[0];
      const domain = parts[1];
      const maskedEmail = username.length > 2 
        ? username.substring(0, 2) + '*'.repeat(Math.max(username.length - 2, 1)) + '@' + domain
        : '*' + '@' + domain;
      setEmailHint(maskedEmail);
    }
  }
}, [signinFlow]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Focus first input on load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const requestOtp = async (dest) => {
    if (countdown > 0) {
      setMessage({
        text: `Please wait ${countdown} seconds before requesting a new OTP`,
        type: "error"
      });
      return;
    }

    if (!signinFlow?.email) {
      setMessage({
        text: "Session expired. Please sign in again.",
        type: "error"
      });
      router.push("/partner-net");
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`${PHP_API_URL}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: signinFlow.email,
          destination: dest,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
    console.log("REQUEST  OTP",data)
    setOtpFlow(data.flow)
      setDestination(dest);
      setMessage({
        text: `✅ OTP sent to ${data.hint}`,
        type: "success"
      });
      setCountdown(60); // Start 60-second countdown
      
      // Store hint for phone if provided
      if (dest === "phone" && data.hint) {
        setPhoneHint(data.hint);
      }
    } catch (err) {
      setMessage({
        text: `❌ ${err.message || "Failed to send OTP"}`,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      setActiveInput(index + 1);
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
    
    // Auto-submit when last digit is entered
    if (value && index === 5) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      setActiveInput(index - 1);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      setActiveInput(index + 1);
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const verifyOtp = async (otpValue) => {
    if (!signinFlow?.email) {
      setMessage({
        text: "Session expired. Please sign in again.",
        type: "error"
      });
      router.push("/partner-net");
      return;
    }

    if (!otpValue || otpValue.length !== 6) {
      setMessage({
        text: "Please enter a complete 6-digit OTP",
        type: "error"
      });
      return;
    }
     console.log(otpValue)
     console.log("otp flow",otpflow)
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`${PHP_API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: signinFlow.email,
          flow:signinFlow.flow ?? 'signin',
           partnerId: signinFlow.partnerId ?? null,
          otp: otpValue,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP verification failed");
     console.log(data)
      // ✅ OTP success - check what's next
      if (data.nextStep === "set-password") {
        // First time user - needs to set password
        router.push("/partner-net/set-password");
      } else if (data.nextStep === "compare-password") {
        // Returning user - needs to enter password
        router.push("/partner-net/compare-password");
      } else {
        // Fallback
        router.push("/partner-net/set-password");
      }
    } catch (err) {
      console.log(err)
      setMessage({
        text: `❌${err} ${err.message || "Invalid OTP. Please try again."}`,
        type: "error"
      });
      
      // Clear OTP on error for security
      setOtp(["", "", "", "", "", ""]);
      setActiveInput(0);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp(otp.join(""));
  };

  if (!signinFlow?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Two-Factor Verification</h1>
          <p className="text-gray-600">
            Enter the verification code sent to
            <span className="font-semibold text-orange-600 ml-1">
              {destination === "email" ? emailHint : phoneHint}
            </span>
          </p>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-200">
          {/* OTP Inputs */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => setActiveInput(index)}
                    className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all ${
                      otp[index]
                        ? "border-orange-500 bg-orange-50"
                        : "border-orange-300"
                    }`}
                    disabled={loading}
                  />
                ))}
              </div>
              
              <p className="text-center text-sm text-gray-500">
                Enter the 6-digit code
              </p>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                message.type === "success" 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-orange-50 text-orange-700 border border-orange-200"
              }`}>
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : message.type === "error" ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <Shield className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
                loading || otp.join("").length !== 6
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-300"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Verify & Continue
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>

          {/* Delivery Options */}
          <div className="mt-8 pt-8 border-t border-orange-100">
            <p className="text-center text-gray-600 mb-4">Send code via:</p>
            <div className="flex gap-4">
              <button
                onClick={() => requestOtp("email")}
                disabled={loading || countdown > 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  destination === "email"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${(loading || countdown > 0) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
              </button>
              <button
                onClick={() => requestOtp("phone")}
                disabled={loading || countdown > 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  destination === "phone"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${(loading || countdown > 0) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  SMS
                </span>
              </button>
            </div>
          </div>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <button
              onClick={() => requestOtp(destination)}
              disabled={loading || countdown > 0}
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                countdown > 0 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-orange-600 hover:text-orange-700"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                clearSigninFlow();
                router.push("/partner-net");
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              disabled={loading}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Your security is our priority. Codes expire in 10 minutes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}