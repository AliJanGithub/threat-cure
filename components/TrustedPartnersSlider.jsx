// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useEmblaCarousel } from "embla-carousel-react";

// export default function TrustedPartnersSlider() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: true,
//     skipSnaps: false,
//   });

//   const [scrollInterval, setScrollInterval] = useState(null);

//   // Auto-scroll function
//   const autoScroll = useCallback(() => {
//     if (emblaApi) {
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi]);

//   useEffect(() => {
//     if (emblaApi && !scrollInterval) {
//       const interval = setInterval(autoScroll, 2000); // scroll every 2s
//       setScrollInterval(interval);
//     }
//     return () => scrollInterval && clearInterval(scrollInterval);
//   }, [emblaApi, autoScroll, scrollInterval]);



//   return (
//     <div className="max-w-[1280px] mx-auto px-6 py-10">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//         Trusted Partners
//       </h2>
//       <div className="overflow-hidden" ref={emblaRef}>
//         <div className="flex gap-8">
//           {partners.concat(partners).map((logo, idx) => (
//             <div
//               key={idx}
//               className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-white rounded-xl shadow-md"
//             >
//               <img src={logo} alt={`Partner ${idx}`} className="max-h-12 object-contain" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function TrustedPartnersSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [scrollInterval, setScrollInterval] = useState(null);

  const autoScroll = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && !scrollInterval) {
      const interval = setInterval(autoScroll, 1500);
     setTimeout(()=> setScrollInterval(interval),300);
    }
    return () => scrollInterval && clearInterval(scrollInterval);
  }, [emblaApi, autoScroll, scrollInterval]);

  const partners = [
    "/slider/cisco-seeklogo.png",
     "/slider/compliance.jpg",
    "/slider/hr.png",
     "/slider/it.png",
     "/slider/kpmg-seeklogo.png",
     "/slider/splunk-technology-seeklogo.png",
     "/slider/symantec-seeklogo.png",
     "/slider/vecta.png",
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-16 py-30">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Trusted Partners
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {partners.concat(partners).map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-30 h-16 flex items-center justify-center bg-white rounded-xl shadow-md"
            >
              <img src={logo} alt={`Partner ${idx}`} className="max-h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
