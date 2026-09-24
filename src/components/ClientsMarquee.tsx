import React from 'react';
import { CLIENT_CLINICS } from '../data/products';
import { Building2, Stethoscope } from 'lucide-react';

export const ClientsMarquee: React.FC = () => {
  return (
    <section id="partners" className="py-14 bg-gray-50/60 border-y border-gray-100 overflow-hidden" aria-label="Partner Clinics & Hospitals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEF7ED] text-[#B87714] border border-[#F6D8A6] mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          Institutional Healthcare Trust
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Prescribed in Leading Clinics &amp; Hospitals Across Pakistan
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Dermatologists, aesthetic surgeons, and clinical physicians trust Arcure Pharma daily.
        </p>
      </div>

      {/* Infinite Horizontal Ticker */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 sm:gap-6 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap py-2">
          {[...CLIENT_CLINICS, ...CLIENT_CLINICS].map((clinic, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#D48D20]/40 transition-all shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EEF2F9] text-[#1E254A] flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-gray-900">{clinic.name}</p>
                <p className="text-[11px] text-gray-500">{clinic.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
