import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha K.",
      city: "Karachi",
      avatar: "/jenpharm/result-huma.jpg",
      text: "My skin feels clearer and significantly brighter. The ArcuGleam wash combined with the Azelaic serum resolved my 2-year cystic acne struggles!",
      product: "ArcuGleam + ArcuDerm Serum",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Bilal S.",
      city: "Lahore",
      avatar: "/jenpharm/result-shahid.jpg",
      text: "Exceptional clinical grade products. Visible difference in sebum balance and post-breakout marks within just 3 weeks.",
      product: "ArcuDerm CS Serum",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Mariam T.",
      city: "Islamabad",
      avatar: "/jenpharm/result-zoha.jpg",
      text: "The sunscreen is amazing! No chalky white cast, absorbs completely matte, and doesn't sting my eyes under the intense summer sun.",
      product: "Arcu-Shield SPF 60",
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "Zubair A.",
      city: "Rawalpindi",
      avatar: "/jenpharm/result-mubeen.jpg",
      text: "Face wash solved my chronic sebaceous shine and breakouts within 10 days. Fast doorstep delivery to Islamabad.",
      product: "ArcuGleam Face Wash",
      rating: 5,
      verified: true
    }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Showing 3 reviews on desktop
  const displayedReviews = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    <section id="reviews" className="py-12 sm:py-18 bg-[#FAFBFC] border-y border-gray-100/90" aria-label="What Our Customers Say">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#F43F96] block mb-1">
              PATIENT SATISFACTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
              What Our Customers Say
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Verified clinical testimonials from real customers across Pakistan.
            </p>
          </div>

          {/* Prev / Next Circular Arrows */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 hover:text-[#F43F96] hover:border-pink-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 hover:text-[#F43F96] hover:border-pink-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Reviews Grid with clean modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Subtle Quote Icon */}
              <Quote className="w-8 h-8 text-pink-100 absolute top-5 right-5 group-hover:text-pink-200 transition-colors" />

              <div className="space-y-3 relative z-10">
                {/* 5 Stars */}
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  "{item.text}"
                </p>
              </div>

              {/* User Bio and Product Mention */}
              <div className="pt-4 mt-4 border-t border-gray-100/90 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10.5px] text-emerald-600 font-semibold mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-500/20 shrink-0" />
                    <span>Verified Purchase</span>
                  </div>
                  
                  <span className="text-[10px] text-pink-600 font-medium block truncate mt-0.5">
                    {item.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
