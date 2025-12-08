// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { MapPin, Phone, Mail, Send, Clock, Globe, Building, Sparkles, Shield, ArrowRight } from 'lucide-react';

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     company: '',
//     phone: '',
//     message: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);

//   // Replace with your actual office coordinates
//   const OFFICE_COORDINATES = {
//     lat: 37.7749, // Example: San Francisco
//     lng: -122.4194,
//   };

//   const OFFICE_ADDRESS = {
//     street: '123 Security Boulevard, Suite 500',
//     city: 'San Francisco',
//     state: 'CA',
//     zip: '94105',
//     country: 'United States',
//     formatted: '123 Security Boulevard, Suite 500, San Francisco, CA 94105, United States'
//   };

//   const contactInfo = {
//     phone: '+1 (555) 123-4567',
//     email: 'contact@threatcure.com',
//     support: 'support@threatcure.com',
//     hours: 'Monday - Friday: 9:00 AM - 6:00 PM PST'
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => setMounted(true), 100);
    
//     // Initialize Google Maps
//     const initMap = () => {
//       if (typeof window.google === 'undefined' || !window.google.maps) {
//         // Load Google Maps API if not already loaded
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMapCallback`;
//         script.async = true;
//         script.defer = true;
        
//         window.initMapCallback = () => {
//           createMap();
//         };
        
//         document.head.appendChild(script);
//       } else {
//         createMap();
//       }
//     };

//     const createMap = () => {
//       if (!mapRef.current) return;

//       const map = new window.google.maps.Map(mapRef.current, {
//         center: OFFICE_COORDINATES,
//         zoom: 15,
//         styles: [
//           {
//             featureType: "all",
//             elementType: "geometry",
//             stylers: [{ color: "#f5f5f5" }]
//           },
//           {
//             featureType: "all",
//             elementType: "labels.text.fill",
//             stylers: [{ color: "#333333" }]
//           },
//           {
//             featureType: "poi",
//             elementType: "all",
//             stylers: [{ visibility: "off" }]
//           },
//           {
//             featureType: "road",
//             elementType: "all",
//             stylers: [{ color: "#ffffff" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.icon",
//             stylers: [{ visibility: "off" }]
//           },
//           {
//             featureType: "transit",
//             elementType: "all",
//             stylers: [{ visibility: "off" }]
//           },
//           {
//             featureType: "water",
//             elementType: "all",
//             stylers: [{ color: "#ffedd5" }, { lightness: 20 }]
//           }
//         ],
//         disableDefaultUI: true,
//         zoomControl: true,
//         mapTypeControl: false,
//         streetViewControl: false,
//         fullscreenControl: true,
//       });

//       mapInstance.current = map;

//       // Create custom marker
//       const marker = new window.google.maps.Marker({
//         position: OFFICE_COORDINATES,
//         map: map,
//         title: 'ThreatCure Headquarters',
//         animation: window.google.maps.Animation.DROP,
//         icon: {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           fillColor: "#ff6b35",
//           fillOpacity: 1,
//           strokeColor: "#ffffff",
//           strokeWeight: 2,
//           scale: 10
//         }
//       });

//       markerRef.current = marker;

//       // Add info window
//       const infoWindow = new window.google.maps.InfoWindow({
//         content: `
//           <div style="padding: 12px; max-width: 250px;">
//             <h3 style="margin: 0 0 8px 0; color: #ff6b35; font-weight: bold;">ThreatCure HQ</h3>
//             <p style="margin: 0 0 4px 0; color: #333; font-size: 14px;">${OFFICE_ADDRESS.street}</p>
//             <p style="margin: 0; color: #666; font-size: 13px;">${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.state} ${OFFICE_ADDRESS.zip}</p>
//             <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
//               <a href="https://maps.google.com/?q=${encodeURIComponent(OFFICE_ADDRESS.formatted)}" 
//                  target="_blank" 
//                  style="color: #ff6b35; text-decoration: none; font-size: 13px; font-weight: 500;">
//                 Open in Google Maps →
//               </a>
//             </div>
//           </div>
//         `,
//       });

//       marker.addListener('click', () => {
//         infoWindow.open(map, marker);
//       });

//       // Open info window on mount
//       setTimeout(() => {
//         infoWindow.open(map, marker);
//       }, 1000);
//     };

//     initMap();

//     return () => {
//       if (markerRef.current) {
//         markerRef.current.setMap(null);
//       }
//       if (mapInstance.current) {
//         mapInstance.current = null;
//       }
//       clearTimeout(timer);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
      
//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         company: '',
//         phone: '',
//         message: '',
//       });

//       // Reset success message after 3 seconds
//       setTimeout(() => {
//         setIsSubmitted(false);
//       }, 3000);
//     }, 1500);
//   };

//   const handleGetDirections = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS.formatted)}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <section id="contact" className="relative py-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse-subtle">
//             <Sparkles className="w-4 h-4" />
//             Get in Touch
//             <Sparkles className="w-4 h-4" />
//           </div>
          
//           <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent animate-gradient-x">
//             Contact <span className="text-orange-600">Our Team</span>
//           </h2>
          
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
//             Our security experts are ready to help protect your business
//           </p>
//         </div>

//         <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           {/* Contact Form */}
//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
//             <p className="text-gray-600 mb-8">Fill out the form and our team will get back to you within 24 hours</p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="john@company.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Your Company"
//                     value={formData.company}
//                     onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   placeholder="Tell us about your security needs or ask any questions..."
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   rows={5}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 resize-none"
//                   required
//                 />
//               </div>

//               <div className="flex items-center gap-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || isSubmitted}
//                   className={`group relative overflow-hidden flex-1 py-4 rounded-xl font-semibold text-lg shadow-xl 
//                     transition-all duration-500 hover:shadow-2xl ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'hover:-translate-y-1'}
//                     ${isSubmitted ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'}
//                   `}
//                 >
//                   {/* Button shine effect */}
//                   <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
//                   {/* Button content */}
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Sending...
//                       </>
//                     ) : isSubmitted ? (
//                       <>
//                         <span className="w-5 h-5 flex items-center justify-center">✓</span>
//                         Message Sent!
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-5 h-5" />
//                         Send Message
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Contact Information & Map */}
//           <div className="space-y-8">
//             {/* Contact Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <MapPin className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 mb-1">Visit Our Office</p>
//                     <p className="text-sm text-gray-600 mb-3 leading-relaxed">
//                       {OFFICE_ADDRESS.street}<br />
//                       {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.state} {OFFICE_ADDRESS.zip}<br />
//                       {OFFICE_ADDRESS.country}
//                     </p>
//                     <button
//                       onClick={handleGetDirections}
//                       className="text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-300 flex items-center gap-1"
//                     >
//                       Get Directions
//                       <ArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-black to-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <Phone className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 mb-1">Call Us</p>
//                     <p className="text-sm text-gray-600 mb-3">{contactInfo.phone}</p>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Clock className="w-4 h-4" />
//                       {contactInfo.hours}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <Mail className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 mb-1">Email Us</p>
//                     <p className="text-sm text-gray-600 mb-1">{contactInfo.email}</p>
//                     <p className="text-xs text-gray-500">General inquiries</p>
//                     <div className="mt-3 pt-3 border-t border-gray-200">
//                       <p className="text-sm text-gray-600 mb-1">{contactInfo.support}</p>
//                       <p className="text-xs text-gray-500">Technical support</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-lg group-hover:scale-110 transition-transform duration-500">
//                     <Globe className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 mb-1">Global Presence</p>
//                     <p className="text-sm text-gray-600 mb-3">Serving clients across 50+ countries</p>
//                     <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
//                       <Building className="w-4 h-4" />
//                       Multiple offices worldwide
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Interactive Map */}
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-300 group">
//               {/* Map Container */}
//               <div 
//                 ref={mapRef}
//                 className="w-full h-80 bg-gray-100"
//               >
//                 {/* Fallback content */}
//                 <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white p-8 text-center">
//                   <MapPin className="w-12 h-12 text-orange-400 mb-4 animate-bounce" />
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2">ThreatCure Headquarters</h4>
//                   <p className="text-gray-600 text-sm mb-4">{OFFICE_ADDRESS.formatted}</p>
//                   <button
//                     onClick={handleGetDirections}
//                     className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
//                   >
//                     View on Google Maps
//                   </button>
//                 </div>
//               </div>

//               {/* Map Overlay Controls */}
//               <div className="absolute top-4 right-4 flex gap-2">
//                 <button
//                   onClick={handleGetDirections}
//                   className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 backdrop-blur-sm"
//                 >
//                   <ArrowRight className="w-4 h-4" />
//                   Directions
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (markerRef.current) {
//                       const infowindow = new window.google.maps.InfoWindow({
//                         content: `
//                           <div style="padding: 12px; max-width: 250px;">
//                             <h3 style="margin: 0 0 8px 0; color: #ff6b35; font-weight: bold;">ThreatCure HQ</h3>
//                             <p style="margin: 0 0 4px 0; color: #333; font-size: 14px;">${OFFICE_ADDRESS.street}</p>
//                             <p style="margin: 0; color: #666; font-size: 13px;">${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.state} ${OFFICE_ADDRESS.zip}</p>
//                           </div>
//                         `,
//                       });
//                       infowindow.open(mapInstance.current, markerRef.current);
//                     }
//                   }}
//                   className="w-10 h-10 bg-white text-gray-900 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center backdrop-blur-sm"
//                 >
//                   ℹ️
//                 </button>
//               </div>

//               {/* Map Footer */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <p className="text-white text-sm font-semibold">ThreatCure HQ</p>
//                       <p className="text-white/80 text-xs">Click marker for details</p>
//                     </div>
//                   </div>
//                   <div className="text-white/60 text-xs">
//                     © Google Maps
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className={`mt-16 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="text-3xl font-black text-orange-600 mb-2">24h</div>
//             <div className="font-semibold text-gray-900 mb-2">Response Time</div>
//             <p className="text-gray-600 text-sm">Average response time for all inquiries</p>
//           </div>
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="text-3xl font-black text-orange-600 mb-2">500+</div>
//             <div className="font-semibold text-gray-900 mb-2">Clients Supported</div>
//             <p className="text-gray-600 text-sm">Enterprise clients across all industries</p>
//           </div>
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="text-3xl font-black text-orange-600 mb-2">99%</div>
//             <div className="font-semibold text-gray-900 mb-2">Satisfaction Rate</div>
//             <p className="text-gray-600 text-sm">Client satisfaction with our support</p>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes pulse-subtle {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.8; }
//         }
        
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-gradient-x {
//           background-size: 200% auto;
//           animation: gradient-x 3s ease infinite;
//         }
        
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
        
//         .animate-pulse-subtle {
//           animation: pulse-subtle 2s ease-in-out infinite;
//         }
        
//         .animate-bounce {
//           animation: bounce 2s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Globe, Building, Sparkles, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { PHP_API_URL } from '../lib/auth';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    address:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const OFFICE_ADDRESS = {
    street: '.',
    city: 'Karachi',
    state: 'Sindh',
    zip: 'R111 Block 7 University Road Gulistan-e-Johar',
    country: 'Pakistan',
    formatted: 'R111 Block 7 University Road Gulistan-e-Johar',
    coordinates: '24.936031,67.1492713' 
  };

  const contactInfo = {
    phone: '+92-(021)-34025367',
    usaPhone: '+1-(734)-6371042',
    usaPhone2: '+1-(734)-2186219',
    email: 'info@threatcure.net',
    support: 'info@threatcure.net',
    hours: 'Monday - Saturday: 9:00 AM - 6:00 PM PST'
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
  const response = await fetch(`${PHP_API_URL}/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    companyName: formData.company,   // map to PHP
    address: formData.address,
    phoneNumber: formData.phone,     // map to PHP
    message: formData.message,
  }),
});


    const result = await response.json();

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        address: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      alert("Failed: " + result);
    }
  } catch (error) {
    alert("Server error: " + error.message);
  }

  setIsSubmitting(false);
};


  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS.formatted)}`;
    window.open(url, '_blank');
  };

  const handleViewOnMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS.formatted)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      {/* Static background elements - no animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - No transition classes */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Get in Touch
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-black via-black to-orange-600 bg-clip-text text-transparent">
            Contact <span className="text-orange-600">Our Team</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our security experts are ready to help protect your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
            <p className="text-gray-600 mb-8">Fill out the form and our team will get back to you within 24 hours</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400"
                  />
                </div>
              </div>
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Address
  </label>
  <input
    type="text"
    placeholder="Your Address"
    value={formData.address}
    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400"
  />
</div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  placeholder="Tell us about your security needs or ask any questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-400 resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`group relative overflow-hidden flex-1 py-4 rounded-xl font-semibold text-lg shadow-xl 
                    ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-2xl'}
                    ${isSubmitted ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'}
                  `}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full"></span>
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <span className="w-5 h-5 flex items-center justify-center">✓</span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg group-hover:scale-110">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Visit Our Office</p>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {OFFICE_ADDRESS.street}<br />
                      {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.state} {OFFICE_ADDRESS.zip}<br />
                      {OFFICE_ADDRESS.country}
                    </p>
                    <button
                      onClick={handleGetDirections}
                      className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-black to-gray-800 shadow-lg group-hover:scale-110">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Call Us</p>
                    <p className="text-sm text-gray-600 mb-3">{contactInfo.phone}</p>
                    <p className="font-bold text-gray-900 mb-1">USA</p>
                    <p className="text-sm text-gray-600 mb-3">{contactInfo.usaPhone}</p>
                    <p className="text-sm text-gray-600 mb-3">{contactInfo.usaPhone2}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {contactInfo.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 shadow-lg group-hover:scale-110">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Email Us</p>
                    <p className="text-sm text-gray-600 mb-1">{contactInfo.email}</p>
                    <p className="text-xs text-gray-500">General inquiries</p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">{contactInfo.support}</p>
                      <p className="text-xs text-gray-500">Technical support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-lg group-hover:scale-110">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Global Presence</p>
                    <p className="text-sm text-gray-600 mb-3">Serving clients across 50+ countries</p>
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                      <Building className="w-4 h-4" />
                      Multiple offices worldwide
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Map with Overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-300 group">
              {/* Map Image */}
              <div className="relative w-full h-80 bg-gradient-to-br from-orange-50 to-white overflow-hidden">
                {/* Placeholder Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                        <MapPin className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">ThreatCure Headquarters</h4>
                    <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto">
                      {OFFICE_ADDRESS.street}, {OFFICE_ADDRESS.city}
                    </p>
                  </div>
                </div>

                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Map Coordinates */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
                  📍 {OFFICE_ADDRESS.coordinates}
                </div>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleGetDirections}
                  className="group relative px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 backdrop-blur-sm overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full"></span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Get Directions</span>
                </button>
                <button
                  onClick={handleViewOnMaps}
                  className="group relative px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 backdrop-blur-sm overflow-hidden"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Maps
                </button>
              </div>

              {/* Map Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="text-white text-sm font-semibold">You are here</p>
                      <p className="text-white/80 text-xs">Click buttons above for navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={handleGetDirections}
                    className="text-white/80 hover:text-white text-xs"
                  >
                    Need help finding us?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-black text-orange-600 mb-2">24h</div>
            <div className="font-semibold text-gray-900 mb-2">Response Time</div>
            <p className="text-gray-600 text-sm">Average response time for all inquiries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-black text-orange-600 mb-2">500+</div>
            <div className="font-semibold text-gray-900 mb-2">Clients Supported</div>
            <p className="text-gray-600 text-sm">Enterprise clients across all industries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-black text-orange-600 mb-2">99%</div>
            <div className="font-semibold text-gray-900 mb-2">Satisfaction Rate</div>
            <p className="text-gray-600 text-sm">Client satisfaction with our support</p>
          </div>
        </div>
      </div>

      {/* Remove all custom animations from style tag */}
    </section>
  );
}