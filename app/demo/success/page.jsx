"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Check, Sparkles } from "lucide-react";

export default function SuccessPage() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState([]);

  const categories = {
    "Frontend Development": ["React", "Vue.js", "Angular", "HTML/CSS", "TypeScript"],
    "Backend Development": ["Node.js", "Python", "Java", "PHP", "Ruby"],
    "Mobile Development": ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
    "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
    "Database Management": ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    "Testing & QA": ["Jest", "Selenium", "Cypress", "Postman"],
  };

  const formRef = useRef(null);

  // Proper useEffect with cleanup
useEffect(() => {
  // Mount flag
  const mountTimer = setTimeout(() => {
    setMounted(true);
  }, 0);

  // Generate confetti positions asynchronously
  const confettiTimer = setTimeout(() => {
    const positions = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      translateX: (Math.random() - 0.5) * 200,
      translateY: Math.random() * -100,
    }));
    setConfettiPositions(positions);
  }, 0);

  return () => {
    clearTimeout(mountTimer);
    clearTimeout(confettiTimer);
  };
}, []);


  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = () => {
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with proper cleanup
    const submitTimer = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const alertTimer = setTimeout(() => {
        alert("Your selected skills: " + selectedSkills.join(", "));
        setIsSubmitted(false);
      }, 1000);

      return () => clearTimeout(alertTimer);
    }, 1500);

    return () => clearTimeout(submitTimer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex justify-center items-start py-12 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* CARD WRAPPER with entrance animation */}
      <div 
        ref={formRef}
        className={`w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 p-8 md:p-10 relative z-10
          transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-10 -z-10"></div>
        
        {/* HEADER with staggered animation */}
        <div className="flex flex-col items-center mb-10">
          <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg animate-bounce-subtle relative group">
              <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <Shield className="text-white w-7 h-7 relative z-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight animate-gradient-x">
              ThreatCure
            </h1>
          </div>

          <h2 className={`text-2xl md:text-3xl font-bold text-black mt-6 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Select Your Expertise
          </h2>
          <p className={`text-gray-600 mt-2 text-center max-w-2xl transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Choose multiple areas and subfields that match your skills
          </p>
        </div>

        {/* CATEGORY SELECTION GRID with staggered animation */}
        <div className="space-y-8">
          {Object.entries(categories).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className={`bg-gradient-to-br from-white to-gray-50 p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1
                border border-gray-200/50 overflow-hidden relative group
                ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: `${300 + categoryIndex * 100}ms`,
              }}
            >
              {/* Animated border effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3 flex items-center">
                <span className="mr-2">▸</span>
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => {
                  const active = selectedSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md relative overflow-hidden group/btn
                        transform hover:scale-105 active:scale-95
                        ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-300/50 border border-orange-600"
                            : "bg-white border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-600 hover:shadow-orange-200"
                        }
                      `}
                      style={{ 
                        transitionDelay: `${skillIndex * 30}ms`,
                        animation: mounted ? `skillSlideIn 0.5s ease-out ${categoryIndex * 100 + skillIndex * 30}ms both` : 'none'
                      }}
                    >
                      {/* Ripple effect */}
                      <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 group-hover/btn:animate-ripple"></span>
                      
                      {/* Active checkmark */}
                      {active && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center animate-pop-in">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {skill}
                        {active && <Sparkles className="w-3 h-3 animate-pulse" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SELECTED COUNT with counter animation */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              Selected Skills:{" "}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {selectedSkills.length}
              </span>
              <span className="text-gray-500 text-sm">/ 28</span>
            </span>
            
            {/* Animated progress circle */}
            <div className="relative w-8 h-8 ml-2">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-2 border-orange-500 border-t-transparent -rotate-90 transition-all duration-1000"
                style={{
                  clipPath: `inset(0 ${100 - (selectedSkills.length / 28) * 100}% 0 0)`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON with loading animation */}
        <div className={`mt-10 flex justify-center transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitted}
            className={`relative overflow-hidden group/btn px-10 py-4 rounded-xl font-semibold text-lg shadow-xl 
              transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0
              ${isSubmitted 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }
              ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
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
                  Submit My Selections
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </>
              )}
            </span>
            
            {/* Confetti effect on success */}
            {isSubmitted && confettiPositions.length > 0 && (
              <div className="absolute inset-0 overflow-hidden">
                {confettiPositions.map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-confetti"
                    style={{
                      left: `${pos.left}%`,
                      animationDelay: `${i * 0.1}s`,
                      '--tw-translate-x': `${pos.translateX}px`,
                      '--tw-translate-y': `${pos.translateY}px`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Custom animations in style tag */}
      <style jsx>{`
        @keyframes skillSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
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
        
        @keyframes gradientX {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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
        
        .animate-count-up {
          animation: countUp 0.5s ease-out;
        }
        
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
        
        .animate-pop-in {
          animation: popIn 0.3s ease-out;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounceSubtle 3s ease-in-out infinite;
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
      `}</style>
    </div>
  );
}