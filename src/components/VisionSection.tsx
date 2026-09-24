import React from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Truck,
  ArrowRight,
  Instagram,
  CheckCircle2,
  Award
} from 'lucide-react';

export const VisionSection: React.FC = () => {
  const pillars = [
    {
      icon: FlaskConical,
      title: "Science-Backed",
      subtitle: "Formulations",
      desc: "Clinical trials"
    },
    {
      icon: Sparkles,
      title: "Premium",
      subtitle: "Active Actives",
      desc: "High bioavailability"
    },
    {
      icon: Award,
      title: "High Quality",
      subtitle: "GMP Standards",
      desc: "Certified labs"
    },
    {
      icon: Heart,
      title: "Made for",
      subtitle: "Pakistani Skin",
      desc: "Weather tested"
    },
    {
      icon: Truck,
      title: "Nationwide",
      subtitle: "COD Delivery",
      desc: "Safe & insured"
    }
  ];

  return (
    <section id="why-arcure" className="py-14 sm:py-20 bg-gradient-to-b from-[#F8FAFD] via-white to-[#F8FAFD] border-t border-gray-100" aria-label="Why Arcure and Our Vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        
        {/* Why Arcure? & Our Vision Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Why Arcure? with 5 Features */}
          <div className="lg:col-span-8 bg-white p-7 sm:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/25 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#F43F96] text-[11px] font-extrabold uppercase tracking-widest border border-pink-100 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                The Arcure Standard
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
                Why Arcure?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Pioneering evidence-based aesthetic dermatology and high-potency nutritional medicine.
              </p>

              {/* 5 Icons Row with Modern Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4 mt-8">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/80 hover:bg-pink-50/40 border border-gray-100 hover:border-pink-200 transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-gray-200/60 shadow-2xs flex items-center justify-center text-[#1E254A] group-hover:text-[#F43F96] group-hover:scale-108 transition-all mb-2.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-900 leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10.5px] text-gray-500 leading-tight mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ISO 9001 &amp; cGMP Pharmaceutical Certified Facilities
              </span>
              <span className="text-[#F43F96] font-bold hidden sm:inline">
                Pure • Potent • Proven
              </span>
            </div>
          </div>

          {/* Right: Our Vision */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#161D3A] via-[#1E254A] to-[#12162E] text-white p-7 sm:p-10 rounded-3xl border border-[#2D376A] shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Nebula Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F43F96]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block">
                PHARMACEUTICAL VISION
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white font-serif-heading">
                Our Vision
              </h2>
              <span className="text-xs font-semibold text-gray-300 block">
                Committed to Your Long-Term Well-Being
              </span>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                To engineer accessible, clinical-grade skincare and preventative health formulations that empower Pakistani men and women with clear, radiant skin and cellular vitality.
              </p>
              <div className="w-12 h-1 bg-[#F43F96] rounded-full mt-4" />
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 z-10">
              <span className="text-[11px] text-gray-400 block">
                Formulated by dermatological scientists for local tropical and arid climatic conditions.
              </span>
            </div>
          </div>

        </div>

        {/* Follow @arcurepharma Social Strip with Modern Glass Style */}
        <div className="rounded-3xl bg-gradient-to-r from-pink-50/70 via-purple-50/40 to-blue-50/50 p-6 sm:p-8 border border-pink-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Instagram Gradient Icon */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Instagram className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 leading-snug">
                  Follow @arcurepharma
                </h3>
                <span className="bg-pink-100 text-[#F43F96] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Official
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Daily clinical skincare tips, routine reels, and verified doctor recommendations.
              </p>
            </div>
          </div>

          {/* Social Photos Thumbnails & Follow Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* 5 Mini Rounded Thumbnails */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-2xs hover:scale-108 transition-transform">
                <img src="/arcure/arcu-gleam.jpeg" alt="Post" className="w-full h-full object-cover" />
              </div>
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-2xs hover:scale-108 transition-transform">
                <img src="/results/result-1-after.jpg" alt="Post" className="w-full h-full object-cover" />
              </div>
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-2xs hover:scale-108 transition-transform">
                <img src="/arcure/arcuderm-serum.png" alt="Post" className="w-full h-full object-cover" />
              </div>
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-2xs hover:scale-108 transition-transform">
                <img src="/jenpharm/hero-mobile.jpg" alt="Post" className="w-full h-full object-cover" />
              </div>
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-2xs hover:scale-108 transition-transform">
                <img src="/arcure/mida-d.png" alt="Post" className="w-full h-full object-cover" />
              </div>
            </div>

            <a 
              href="https://www.instagram.com/arcurepharma_official"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#1E254A] hover:bg-[#141A36] text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-98 shrink-0"
            >
              <span>Follow Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

        {/* Ready to Transform Your Skin? High Impact Modern Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] via-[#FFF5F8] to-[#FFF0F5] p-8 sm:p-14 border border-pink-200 text-center space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F43F96] bg-white px-3.5 py-1.5 rounded-full border border-pink-200 shadow-2xs inline-block">
            Take The First Step Today
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 font-serif-heading">
            Ready to Transform Your Skin?
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Explore our complete range of certified dermatologist skincare and wellness formulations. Doorstep cash on delivery across Pakistan.
          </p>

          <div className="pt-3">
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:shadow-pink-500/25 active:scale-98"
            >
              <span>SHOP ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
