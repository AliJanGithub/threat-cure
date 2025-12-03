"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Check, Sparkles, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import IdModalViewer from "../../../components/IdModalViewer";

export default function SuccessPageContent() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [decideLater, setDecideLater] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState([]);
  const [idCardView, setIdCardView] = useState(false);
  const [id, setId] = useState('');
 
  const searchParams = useSearchParams();
  const name = searchParams.get("fullName");
  const email = searchParams.get("email");
  const interest = searchParams.get("interest");

  const formRef = useRef(null);
  let categories;

  const servicesCategories = {
    "Managed Response": ["ThreatCure Managed Defense and Response"],
    "ThreatCure Cloud Security Management Services (CSMS)": ["CSMS"],
    "ThreatCure Managed SOC Services": ["Soc"],
    "ThreatCure Breach Response Service (TBRS)": ["Breach Response Service"],
    "ThreatCure Security Operation Center (SOC) Maturity Assessment": ["SOC Maturity Assessment"],
    "ThreatCure Cyber Drill Practices (CDP)": ["Cyber Drill Practices"],
  };

  const developmentCategories = {
    "Frontend Development": ["React", "Vue.js", "Angular", "HTML/CSS", "TypeScript"],
    "Backend Development": ["Node.js", "Python", "Java", "PHP", "Ruby"],
    "Mobile Development": ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
    "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
    "Database Management": ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    "Testing & QA": ["Jest", "Selenium", "Cypress", "Postman"],
  };

  const solutionsCategories = {
    "Seildops work": ["Sheildops"],
    "Basm AI Work": ["Basm AI"],
  };

  if (interest === "Services") categories = servicesCategories;
  else if (interest === "Development") categories = developmentCategories;
  else if (interest === "Solutions") categories = solutionsCategories;
  
  const router = useRouter();

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 50);

    const confettiTimer = setTimeout(() => {
      const positions = Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        translateX: (Math.random() - 0.5) * 200,
        translateY: Math.random() * -100,
      }));
      setConfettiPositions(positions);
    }, 100);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const toggleSkill = (skill) => {
    if (decideLater) {
      return;
    }
    
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleDecideLater = () => {
    const newDecideLaterState = !decideLater;
    setDecideLater(newDecideLaterState);
    
    if (newDecideLaterState) {
      setSelectedSkills([]);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    
    const payload = {
      userName: name,
      userEmail: email,
      mainCategory: interest,
      subCategory: decideLater ? [] : selectedSkills,
      decideLater: decideLater
    };
    
    console.log("Submitting payload:", JSON.stringify(payload));
    
    try {
      const response = await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.log("Submission failed:", data);
        setIsSubmitting(false);
        alert(data.error || data.msg || "Submission failed");
        router.replace("/");
        return;
      }

      setId(data.id || "");
      setIdCardView(true);
      setIsSubmitting(false);
      setIsSubmitted(true);

    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Simplify animations by removing the most complex ones
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex justify-center items-start py-12 px-4 overflow-hidden">
      {idCardView && id && <IdModalViewer id={id} onClose={() => setIdCardView(false)} />}
      
      {/* Simplified background - removed multiple animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply opacity-10"></div>
      </div>

      <div 
        ref={formRef}
        className={`w-full max-w-4xl bg-white shadow-xl rounded-3xl border border-gray-200 p-8 md:p-10 relative z-10
          transition-all duration-500 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-5 -z-10"></div>
        
        <div className="flex flex-col items-center mb-10">
          <div className={`flex items-center gap-3 mb-4 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg relative">
              <Shield className="text-white w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              ThreatCure
            </h1>
          </div>

          <h2 className={`text-2xl md:text-3xl font-bold text-black mt-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            Select Your Expertise
          </h2>
          <p className={`text-gray-600 mt-2 text-center max-w-2xl transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            Choose multiple areas and subfields that match your skills
          </p>
          
          {name && email && (
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Welcome back, <span className="font-semibold">{name}</span>!
              </p>
            </div>
          )}
        </div>

        {/* Decide Later Option */}
        <div className={`mb-10 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gray-50 p-6 rounded-2xl shadow border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${decideLater ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <Clock className={`w-6 h-6 ${decideLater ? 'text-orange-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Decide Later</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Select this option to decide about your expertise later
                  </p>
                </div>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={decideLater}
                    onChange={handleDecideLater}
                    className="sr-only"
                  />
                  <div className={`w-14 h-7 rounded-full transition-colors duration-300
                    ${decideLater ? 'bg-orange-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300
                      ${decideLater ? 'translate-x-7' : 'translate-x-1'}`}
                    ></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className={`space-y-8 transition-opacity duration-300 ${decideLater ? 'opacity-40' : 'opacity-100'}`}>
          {Object.entries(categories).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className="bg-white p-5 md:p-6 rounded-2xl shadow border border-gray-200 relative"
            >
              {decideLater && (
                <div className="absolute inset-0 bg-white/50 rounded-2xl z-10 cursor-not-allowed"></div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">
                {category}
                {decideLater && (
                  <span className="ml-2 text-sm text-gray-500 font-normal">(disabled)</span>
                )}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => {
                  const active = selectedSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      onClick={() => !decideLater && toggleSkill(skill)}
                      disabled={decideLater}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 relative
                        ${
                          active
                            ? "bg-orange-500 text-white border border-orange-600"
                            : decideLater
                              ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-600"
                        }
                      `}
                    >
                      {active && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      
                      <span className="flex items-center gap-2">
                        {skill}
                        {active && <Sparkles className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Count */}
        <div className={`mt-12 text-center transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-full shadow border border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              {decideLater ? 'Status:' : 'Selected Skills:'}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-2xl font-bold text-orange-600">
                {decideLater ? 'Deciding Later' : selectedSkills.length}
              </span>
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className={`mt-10 flex justify-center transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitted || (!decideLater && selectedSkills.length === 0)}
            className={`px-10 py-4 rounded-xl font-semibold text-lg shadow transition-colors duration-200
              ${isSubmitted 
                ? 'bg-green-500 text-white' 
                : isSubmitting || (!decideLater && selectedSkills.length === 0)
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }
            `}
          >
            <span className="flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : isSubmitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Submitted Successfully!
                </>
              ) : decideLater ? (
                <>
                  <Clock className="w-5 h-5" />
                  Submit Decide Later
                </>
              ) : selectedSkills.length === 0 ? (
                <>
                  Select Skills First
                </>
              ) : (
                <>
                  Submit My Selections
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Simplified animations */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}