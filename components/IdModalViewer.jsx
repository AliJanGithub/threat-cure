"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Mail, Clock, Sparkles, Home } from "lucide-react";

export default function IdModalViewer({ id, onClose }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleGoHome = () => {
    onClose();
    router.push("/");
  };

  const handleCopy = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!id) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-white via-orange-50 to-white rounded-2xl shadow-2xl p-8 border border-orange-200 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200/20 rounded-full blur-xl"></div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Thank You! 🎉
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <p className="text-lg font-semibold text-gray-800">
                    Our Team Will Contact You
                  </p>
                </div>
                <p className="text-gray-600">
                  Expect to hear from us within the next 24 hours
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <p className="text-lg font-semibold text-gray-800">
                    What to Expect
                  </p>
                </div>
                <ul className="text-left text-gray-600 space-y-2 text-sm pl-4">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Personalized consultation call</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Detailed project discussion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Customized solution proposal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reference ID Section */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-2">Your submission has been received</p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-1 rounded-full">
                <span className="text-sm text-gray-500">Reference ID:</span>
                <span className="font-mono text-orange-600 font-semibold">
                  {id.substring(0, 12)}...
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3
                ${copied 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Reference ID
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoHome}
              className="group w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Return to Homepage
            </button>

            <div className="text-center">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300"
              >
                Close this message
              </button>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Have questions? Email us at{" "}
            <a href="mailto:support@threatcure.com" className="text-orange-600 hover:text-orange-700 font-medium">
              support@threatcure.com
            </a>
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}