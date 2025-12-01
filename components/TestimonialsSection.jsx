'use client';

import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'CISO, TechCorp International',
      company: 'TechCorp',
      text: '"ThreatCure transformed our security posture. Their AI-powered detection caught threats our previous solution missed. The team is incredibly responsive and knowledgeable."',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'VP of Security, FinanceHub',
      company: 'FinanceHub',
      text: '"The managed SOC service is exceptional. We sleep better knowing experts are monitoring our systems 24/7. ThreatCure prevented a major breach that could have cost us millions."',
      rating: 5,
    },
    {
      name: 'David Martinez',
      role: 'CTO, CloudScale Solutions',
      company: 'CloudScale',
      text: '"Outstanding service and expertise. ThreatCure helped us achieve SOC 2 compliance and significantly reduced our security incidents. Highly recommend to any enterprise."',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">Trusted by security leaders worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ff6b35] text-[#ff6b35]" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {testimonial.text}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center">
                <div className="text-sm text-gray-400 opacity-60">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
