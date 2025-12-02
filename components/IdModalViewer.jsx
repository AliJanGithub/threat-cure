"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IdModalViewer({ id, onClose }) {
  const router = useRouter();

  // Close on Escape key - only closes modal, doesn't navigate
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleGoHome = () => {
    onClose(); // Close the modal
    router.push("/"); // Navigate to home page
  };

  if (!id) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay - only closes modal on click */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white w-80 max-w-[90%] p-6 rounded-xl shadow-lg flex flex-col items-center border-4 border-orange-500">
        <h2 className="text-xl font-bold text-black mb-4 text-center">
          Your Submission ID
          <br />
          <span className="text-sm font-normal text-gray-600">
            Please copy it as you will need it later
          </span>
        </h2>
        
        {/* ID Display */}
        <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
          <p className="text-orange-600 font-mono text-lg break-all text-center">
            {id}
          </p>
        </div>

        {/* Single Go Home Button - user MUST click this to navigate */}
        <button
          onClick={handleGoHome}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-md transition duration-300 flex items-center justify-center gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go to Home Page
        </button>

        {/* Copy ID Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(id);
            alert("ID copied to clipboard!");
          }}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline transition duration-300"
        >
          Click here to copy ID
        </button>
      </div>
    </div>
  );
}