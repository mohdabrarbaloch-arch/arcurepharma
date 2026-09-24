import React from 'react';
import { Stethoscope, UserCheck, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DoctorEndorsement: React.FC = () => {
  const credentials = [
    { icon: Stethoscope, label: "Dermatologists", count: "120+ Prescribers" },
    { icon: UserCheck, label: "Skin Specialists", count: "Clinical Specialists" },
    { icon: Building2, label: "Leading Clinics", count: "Nationwide Coverage" },
    { icon: ShieldCheck, label: "Healthcare Pros", count: "GMP Standards" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#F4F8FD] via-[#F8FBFE] to-[#F1F6FD] border-y border-blue-50/80" aria-label="Trusted by Healthcare Professionals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Description and 4 Modern Badges */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-[11px] font-extrabold uppercase tracking-widest mb-2 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Medical Credibility
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
                Trusted by Healthcare Professionals
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-xl">
                Recommended by leading Pakistani dermatologists, aesthetic consultants, and private clinics for predictable therapeutic outcomes.
              </p>
            </div>

            {/* 4 Professional Credential Modern Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-1">
              {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex flex-col p-3 rounded-2xl bg-white/90 border border-gray-200/60 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mb-2">
                      <Icon className="w-4 h-4 text-blue-800" />
                    </div>
                    <span className="text-xs font-bold text-gray-900 leading-snug">
                      {cred.label}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-0.5">
                      {cred.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Doctor Portrait with Clinical Quote */}
          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4 relative overflow-hidden group">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-100 shadow-sm">
              <img 
                src="/jenpharm/hero-desktop.jpg" 
                alt="Doctor with Stethoscope" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="min-w-0">
              <blockquote className="text-xs sm:text-sm italic font-serif text-gray-800 leading-snug">
                "Pure, predictable active percentages tailored for Asian skin photodermatology."
              </blockquote>
              <div className="w-8 h-0.5 bg-[#D48D20] mt-2 mb-1" />
              <span className="text-[11px] font-bold text-gray-900 block truncate">
                Clinical Dermatology Board
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Certified Panel
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
