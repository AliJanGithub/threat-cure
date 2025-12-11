// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Shield, Check, Sparkles, Clock } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import IdModalViewer from "../../../components/IdModalViewer"
// import Image from "next/image";
// import { PHP_API_URL } from "../../../lib/auth";

// export default function SuccessPage() {
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [decideLater, setDecideLater] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [confettiPositions, setConfettiPositions] = useState([]);
//   const [idCardView, setIdCardeView] = useState(false);
//   const [id, setId] = useState('');
 
//   const searchParams = useSearchParams();
//   const name = searchParams.get("fullName");
//   const email = searchParams.get("email");
//   const interest = searchParams.get("interest");

//   const formRef = useRef(null);
//   let categories;



//   const servicesCategories = {
//     "Managed Response": ["ThreatCure Managed Defense and Response"],
//     "ThreatCure Cloud Security Management Services (CSMS)": ["CSMS"],
//     "ThreatCure Managed SOC Services": ["Soc"],
//     "ThreatCure Breach Response Service (TBRS)": ["Breach Response Service"],
//     "ThreatCure Security Operation Center (SOC) Maturity Assessment": ["SOC Maturity Assessment"],
//     "ThreatCure Cyber Drill Practices (CDP)": ["Cyber Drill Practices"],
//   };

//   const developmemtCategories = {
//     "Frontend Development": ["React", "Vue.js", "Angular", "HTML/CSS", "TypeScript"],
//     "Backend Development": ["Node.js", "Python", "Java", "PHP", "Ruby"],
//     "Mobile Development": ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
//     "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
//     "Database Management": ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
//     "Testing & QA": ["Jest", "Selenium", "Cypress", "Postman"],
//   };

//   const solutionsCategories = {
//     "Seildops work": ["Sheildops"],
//     "Basm AI Work": ["Basm AI"],
//   };
//   if (interest === "Services") categories = servicesCategories;
//   else if (interest === "Development") categories = developmemtCategories;
//   else if (interest === "Solutions") categories = solutionsCategories;
//   const router =useRouter()
//   useEffect(() => {
//     const mountTimer = setTimeout(() => {
//       setMounted(true);
//     }, 0);

//     const confettiTimer = setTimeout(() => {
//       const positions = Array.from({ length: 20 }, () => ({
//         left: Math.random() * 100,
//         translateX: (Math.random() - 0.5) * 200,
//         translateY: Math.random() * -100,
//       }));
//       setConfettiPositions(positions);
//     }, 0);

//     return () => {
//       clearTimeout(mountTimer);
//       clearTimeout(confettiTimer);
//     };
//   }, []);

//   const toggleSkill = (skill) => {
//     // If "Decide Later" is checked, don't allow any skill selection
//     if (decideLater) {
//       return;
//     }
    
//     setSelectedSkills((prev) =>
//       prev.includes(skill)
//         ? prev.filter((s) => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   const handleDecideLater = () => {
//     const newDecideLaterState = !decideLater;
//     setDecideLater(newDecideLaterState);
    
//     // If user checks "Decide Later", clear all selected skills
//     if (newDecideLaterState) {
//       setSelectedSkills([]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (isSubmitting || isSubmitted) return;
    
//     setIsSubmitting(true);
    
//     const payload = {
//       userName: name,
//       userEmail: email,
//       mainCategory: interest,
//       subCategory: decideLater ? [] : selectedSkills,
//       decideLater: decideLater
//     };
    
//     console.log("Submitting payload:", JSON.stringify(payload));
    
//   try {
//   const response = await fetch(`${PHP_API_URL}/submission`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await response.json().catch(() => ({})); // safe parsing

//   if (!response.ok) {
//     console.log("Submission failed:", data);
//     setIsSubmitting(false);
//     alert(data.error || data.msg || "Submission failed");
//     router.replace("/")
//     return;
//   }

//   setId(data.id || "");
//   setIdCardeView(true); // show modal after id is set
//   setIsSubmitting(false);
//   setIsSubmitted(true);
//   console.log(data)

// } catch (error) {
//   console.error(error);
//   alert("Network error. Please try again.");
//   setIsSubmitting(false);
// }

//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex justify-center items-start py-12 px-4 overflow-hidden">
// {idCardView && id && <IdModalViewer id={id} onClose={() => setIdCardeView(false)} />}
//         <div>
            
//         </div>
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//       </div>

//       <div 
//         ref={formRef}
//         className={`w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 p-8 md:p-10 relative z-10
//           transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
//       >
//         <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-10 -z-10"></div>
        
//         <div className="flex flex-col items-center mb-10">
//           <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
//             <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg animate-bounce-subtle relative group">
//               <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
//               {/* <Shield className="text-white w-7 h-7 relative z-10" /> */}
//             </div>
//             <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight animate-gradient-x">
//                <Image alt="logo" src={"/logo.png"} width={160} height={50} />
//             </h1>
//           </div>

//           <h2 className={`text-2xl md:text-3xl font-bold text-black mt-6 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
//             Select Your Expertise
//           </h2>
//           <p className={`text-gray-600 mt-2 text-center max-w-2xl transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
//             Choose multiple areas and subfields that match your skills
//           </p>
//         </div>

//         {/* Single "Decide Later" Option */}
//         <div className={`mb-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//           <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-xl ${decideLater ? 'bg-orange-100' : 'bg-gray-100'} transition-colors duration-300`}>
//                   <Clock className={`w-6 h-6 ${decideLater ? 'text-orange-600' : 'text-gray-400'}`} />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">Will Decide Later</h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     Select this option if you want to decide about your {interest.toLowerCase()} expertise later
//                   </p>
//                 </div>
//               </div>
              
//               <label className="flex items-center gap-3 cursor-pointer select-none group">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     checked={decideLater}
//                     onChange={handleDecideLater}
//                     className="sr-only"
//                   />
//                   <div className={`w-14 h-7 rounded-full transition-all duration-300 relative
//                     ${decideLater 
//                       ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
//                       : 'bg-gray-300'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300
//                       ${decideLater ? 'left-8' : 'left-1'}`}
//                     ></div>
//                   </div>
//                 </div>
//                 <span className={`text-lg font-medium transition-colors ${decideLater ? 'text-orange-600' : 'text-gray-600'}`}>
//                   {decideLater ? 'Selected' : 'Not Selected'}
//                 </span>
//               </label>
//             </div>
            
//             {decideLater && (
//               <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg animate-pulse-subtle">
//                 <p className="text-orange-700 flex items-center gap-2">
//                   <span className="text-orange-500">⚠</span>
//                   <span className="font-medium">All skill selections are disabled.</span> 
//                   <span className="text-sm">Uncheck Decide Later to enable skill selection.</span>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Categories Section with conditional opacity */}
//         <div className={`space-y-8 transition-all duration-500 ${decideLater ? 'opacity-40' : 'opacity-100'}`}>
//           {Object.entries(categories).map(([category, skills], categoryIndex) => (
//             <div 
//               key={category} 
//               className={`bg-gradient-to-br from-white to-gray-50 p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden relative
//                 transition-all duration-500 ${decideLater ? '' : 'hover:shadow-xl hover:-translate-y-1'}`}
//               style={{ 
//                 transitionDelay: `${300 + categoryIndex * 100}ms`,
//               }}
//             >
//               {decideLater && (
//                 <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-2xl z-10 cursor-not-allowed"></div>
//               )}
              
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
//               <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3 flex items-center">
//                 <span className="mr-2">▸</span>
//                 {category}
//                 {decideLater && (
//                   <span className="ml-2 text-sm text-gray-500 font-normal">(disabled)</span>
//                 )}
//               </h3>

//               <div className="flex flex-wrap gap-3">
//                 {skills.map((skill, skillIndex) => {
//                   const active = selectedSkills.includes(skill);

//                   return (
//                     <button
//                       key={skill}
//                       onClick={() => !decideLater && toggleSkill(skill)}
//                       disabled={decideLater}
//                       className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md relative overflow-hidden group/btn
//                         ${!decideLater ? 'transform hover:scale-105 active:scale-95' : 'cursor-not-allowed'}
//                         ${
//                           active
//                             ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-300/50 border border-orange-600"
//                             : decideLater
//                               ? "bg-gray-100 border border-gray-200 text-gray-400"
//                               : "bg-white border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-600 hover:shadow-orange-200"
//                         }
//                       `}
//                       style={{ 
//                         transitionDelay: `${skillIndex * 30}ms`,
//                       }}
//                     >
//                       {!decideLater && (
//                         <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 group-hover/btn:animate-ripple"></span>
//                       )}
                      
//                       {active && (
//                         <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
//                           <Check className="w-3 h-3" />
//                         </span>
//                       )}
                      
//                       <span className="relative z-10 flex items-center gap-2">
//                         {skill}
//                         {active && <Sparkles className="w-3 h-3 animate-pulse" />}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Selected Count with conditional display */}
//         <div className={`mt-12 text-center transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
//             <span className="text-lg font-semibold text-gray-700">
//               {decideLater ? 'Status:' : 'Selected Skills:'}
//             </span>
//             <span className="flex items-center gap-1">
//               <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
//                 {decideLater ? 'Deciding Later' : selectedSkills.length}
//               </span>
//             </span>
//           </div>
          
//           {decideLater && (
//             <p className="text-gray-600 text-sm mt-3">
//               You have chosen to decide about your expertise later. No skills will be submitted.
//             </p>
//           )}
//         </div>

//         <div className={`mt-10 flex justify-center transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting || isSubmitted || (!decideLater && selectedSkills.length === 0)}
//             className={`relative overflow-hidden group/btn px-10 py-4 rounded-xl font-semibold text-lg shadow-xl 
//               transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0
//               ${isSubmitted 
//                 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
//                 : isSubmitting || (!decideLater && selectedSkills.length === 0)
//                   ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
//               }
//               ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
//             `}
//           >
//             <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
            
//             <span className="relative z-10 flex items-center justify-center gap-3">
//               {isSubmitting ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Processing...
//                 </>
//               ) : isSubmitted ? (
//                 <>
//                   <Check className="w-5 h-5 animate-checkmark" />
//                   Submitted Successfully!
//                 </>
//               ) : decideLater ? (
//                 <>
//                   <Clock className="w-5 h-5" />
//                   Submit Decide Later
//                 </>
//               ) : selectedSkills.length === 0 ? (
//                 <>
//                   Select Skills First
//                 </>
//               ) : (
//                 <>
//                   Submit My Selections
//                   <Sparkles className="w-5 h-5 animate-pulse" />
//                 </>
//               )}
//             </span>
            
//             {isSubmitted && confettiPositions.length > 0 && (
//               <div className="absolute inset-0 overflow-hidden">
//                 {confettiPositions.map((pos, i) => (
//                   <div
//                     key={i}
//                     className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-confetti"
//                     style={{
//                       left: `${pos.left}%`,
//                       animationDelay: `${i * 0.1}s`,
//                       '--tw-translate-x': `${pos.translateX}px`,
//                       '--tw-translate-y': `${pos.translateY}px`,
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes skillSlideIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes countUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes ripple {
//           0% {
//             transform: scale(0);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(4);
//             opacity: 0;
//           }
//         }
        
//         @keyframes popIn {
//           0% {
//             transform: scale(0);
//           }
//           70% {
//             transform: scale(1.2);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
        
//         @keyframes gradientX {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }
        
//         @keyframes bounceSubtle {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         @keyframes confetti {
//           0% {
//             transform: translate(0, 0) rotate(0deg);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(360deg);
//             opacity: 0;
//           }
//         }
        
//         @keyframes checkmark {
//           0% {
//             transform: scale(0);
//           }
//           50% {
//             transform: scale(1.2);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
        
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes pulseSubtle {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }
        
//         .animate-count-up {
//           animation: countUp 0.5s ease-out;
//         }
        
//         .animate-ripple {
//           animation: ripple 0.6s linear;
//         }
        
//         .animate-pop-in {
//           animation: popIn 0.3s ease-out;
//         }
        
//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradientX 3s ease infinite;
//         }
        
//         .animate-bounce-subtle {
//           animation: bounceSubtle 3s ease-in-out infinite;
//         }
        
//         .animate-confetti {
//           animation: confetti 1s ease-out forwards;
//         }
        
//         .animate-checkmark {
//           animation: checkmark 0.3s ease-out;
//         }
        
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
        
//         .animate-pulse-subtle {
//           animation: pulseSubtle 2s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
// "use client";

// import { Suspense } from "react";
// import SuccessPageContent from "./SuccessPageContent";

// export default function SuccessPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center animate-pulse">
//             <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
//           <p className="text-gray-500 mt-2">Preparing your experience</p>
//         </div>
//       </div>
//     }>
//       <SuccessPageContent />
//     </Suspense>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Check, Sparkles, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import IdModalViewer from "../../../components/IdModalViewer";
import Image from "next/image";
import { PHP_API_URL } from "../../../lib/auth";

export default function SuccessPage() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [decideLater, setDecideLater] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState([]);
  const [idCardView, setIdCardeView] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
 
  const searchParams = useSearchParams();
  const name = searchParams.get("fullName");
  const email = searchParams.get("email");
  const interestParam = searchParams.get("interest");

  const formRef = useRef(null);
  
  // Parse multiple interests from comma-separated string
  const selectedInterests = interestParam ? interestParam.split(",") : [];

  // Define all categories
  const allCategories = {
    "Services": {
      "Managed Response": ["ThreatCure Managed Defense and Response"],
      "ThreatCure Cloud Security Management Services (CSMS)": ["CSMS"],
      "ThreatCure Managed SOC Services": ["Soc"],
      "ThreatCure Breach Response Service (TBRS)": ["Breach Response Service"],
      "ThreatCure Security Operation Center (SOC) Maturity Assessment": ["SOC Maturity Assessment"],
      "ThreatCure Cyber Drill Practices (CDP)": ["Cyber Drill Practices"],
    },
    "Development": {
      "Frontend Development": ["React", "Vue.js", "Angular", "HTML/CSS", "TypeScript"],
      "Backend Development": ["Node.js", "Python", "Java", "PHP", "Ruby"],
      "Mobile Development": ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
      "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
      "Database Management": ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
      "Testing & QA": ["Jest", "Selenium", "Cypress", "Postman"],
    },
    "Solutions": {
      "Seildops work": ["Sheildops"],
      "Basm AI Work": ["Basm AI"],
    }
  };

  // Get categories for selected interests
  const getCategoriesForSelectedInterests = () => {
    const result = {};
    selectedInterests.forEach(interest => {
      if (allCategories[interest]) {
        Object.keys(allCategories[interest]).forEach(category => {
          result[category] = allCategories[interest][category];
        });
      }
    });
    return result;
  };

  const categories = getCategoriesForSelectedInterests();
  
  const router = useRouter();

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

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
  mainCategory: Array.isArray(selectedInterests) ? selectedInterests : [],
  subCategory: decideLater ? [] : (Array.isArray(selectedSkills) ? selectedSkills : []),
  decideLater: decideLater
};

  console.log("Sending payload:", payload);
  console.log("mainCategory type:", typeof selectedInterests, selectedInterests);
console.log("subCategory type:", typeof selectedSkills, selectedSkills);

  try {
    const response = await fetch(`${PHP_API_URL}/submission`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    const rawText = await response.text();
    console.log("Raw response:", rawText);
    
    // Clean PHP warnings from response
    const cleanText = rawText.replace(/<br\s*\/?>\s*<b>.*?<\/b>\s*on\s*line\s*<b>\d+<\/b><br\s*\/?>/g, '');
    
    let data;
    try {
      data = JSON.parse(cleanText);
      console.log("Parsed response:", data);
    } catch (parseError) {
      // If cleaning didn't work, try to extract JSON from the text
      const jsonMatch = rawText.match(/\{.*\}/s);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
        console.log("Extracted JSON:", data);
      } else {
        throw new Error("Could not parse response");
      }
    }
    
    if (data && data.success) {
      setId(data.id);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Show the beautiful modal
      setTimeout(() => {
        setShowModal(true);
      }, 500);
      
      console.log("✅ Data saved successfully! ID:", data.id);
      
    } else {
      alert(data?.error || "Submission failed");
      setIsSubmitting(false);
    }
    
  } catch (error) {
    console.error("Submission error:", error);
    setIsSubmitting(false);
    alert("Error submitting data. Please try again.");
  }
};
  const handleModalClose = () => {
    setShowModal(false);
    setIdCardeView(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-orange-50 flex justify-center items-start py-12 px-4 overflow-hidden">
      {/* Show the modal when showModal is true */}
      {showModal && id && <IdModalViewer id={id} onClose={handleModalClose} />}
      
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div 
        ref={formRef}
        className={`w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 p-8 md:p-10 relative z-10
          transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-10 -z-10"></div>
        
        <div className="flex flex-col items-center mb-10">
          <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg animate-bounce-subtle relative group">
              <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent tracking-tight animate-gradient-x">
              <Image alt="logo" src={"/logo.png"} width={160} height={50} />
            </h1>
          </div>

          <h2 className={`text-2xl md:text-3xl font-bold text-black mt-6 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Select Your Expertise
          </h2>
          <p className={`text-gray-600 mt-2 text-center max-w-2xl transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Choose multiple subfields across your selected areas: {selectedInterests.join(", ")}
          </p>
          
          {/* Selected Main Categories Display */}
          {selectedInterests.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {selectedInterests.map(interest => (
                <span 
                  key={interest} 
                  className="px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Single "Decide Later" Option */}
        <div className={`mb-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${decideLater ? 'bg-orange-100' : 'bg-gray-100'} transition-colors duration-300`}>
                  <Clock className={`w-6 h-6 ${decideLater ? 'text-orange-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Will Decide Later</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Select this option if you want to decide about your expertise later
                  </p>
                </div>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={decideLater}
                    onChange={handleDecideLater}
                    className="sr-only"
                  />
                  <div className={`w-14 h-7 rounded-full transition-all duration-300 relative
                    ${decideLater 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                      : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300
                      ${decideLater ? 'left-8' : 'left-1'}`}
                    ></div>
                  </div>
                </div>
                <span className={`text-lg font-medium transition-colors ${decideLater ? 'text-orange-600' : 'text-gray-600'}`}>
                  {decideLater ? 'Selected' : 'Not Selected'}
                </span>
              </label>
            </div>
            
            {decideLater && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg animate-pulse-subtle">
                <p className="text-orange-700 flex items-center gap-2">
                  <span className="text-orange-500">⚠</span>
                  <span className="font-medium">All skill selections are disabled.</span> 
                  <span className="text-sm">Uncheck Decide Later to enable skill selection.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Categories Section - Shows ALL categories from selected interests */}
        <div className={`space-y-8 transition-all duration-500 ${decideLater ? 'opacity-40' : 'opacity-100'}`}>
          {Object.entries(categories).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className={`bg-gradient-to-br from-white to-gray-50 p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden relative
                transition-all duration-500 ${decideLater ? '' : 'hover:shadow-xl hover:-translate-y-1'}`}
              style={{ 
                transitionDelay: `${300 + categoryIndex * 100}ms`,
              }}
            >
              {decideLater && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-2xl z-10 cursor-not-allowed"></div>
              )}
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3 flex items-center">
                <span className="mr-2">▸</span>
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
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md relative overflow-hidden group/btn
                        ${!decideLater ? 'transform hover:scale-105 active:scale-95' : 'cursor-not-allowed'}
                        ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-300/50 border border-orange-600"
                            : decideLater
                              ? "bg-gray-100 border border-gray-200 text-gray-400"
                              : "bg-white border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-600 hover:shadow-orange-200"
                        }
                      `}
                      style={{ 
                        transitionDelay: `${skillIndex * 30}ms`,
                      }}
                    >
                      {!decideLater && (
                        <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 group-hover/btn:animate-ripple"></span>
                      )}
                      
                      {active && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
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

        {/* Selected Count */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              {decideLater ? 'Status:' : 'Selected Skills:'}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {decideLater ? 'Deciding Later' : selectedSkills.length}
              </span>
            </span>
          </div>
          
          {decideLater && (
            <p className="text-gray-600 text-sm mt-3">
              You have chosen to decide about your expertise later. No skills will be submitted.
            </p>
          )}
          
          {selectedInterests.length > 0 && (
            <p className="text-gray-600 text-sm mt-2">
              From {selectedInterests.length} selected main category(ies)
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className={`mt-10 flex justify-center transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitted || (!decideLater && selectedSkills.length === 0)}
            className={`relative overflow-hidden group/btn px-10 py-4 rounded-xl font-semibold text-lg shadow-xl 
              transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0
              ${isSubmitted 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-not-allowed' 
                : isSubmitting || (!decideLater && selectedSkills.length === 0)
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }
              ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
            
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
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </>
              )}
            </span>
            
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
        
        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
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
        
        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}