import React, { useState } from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Product } from '../types';

interface ModernHeroProps {
  onExploreProducts: () => void;
  onOpenConsultation: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  featuredProduct?: Product;
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  onExploreProducts,
  onOpenConsultation,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const trustHighlights = [
    { icon: FlaskConical, label: 'Dermatology Focused', desc: 'Clinically formulated' },
    { icon: ShieldCheck, label: 'Quality Ingredients', desc: 'GMP certified' },
    { icon: Truck, label: 'Nationwide Delivery', desc: 'Doorstep across PK' },
    { icon: Leaf, label: 'Made for Pakistani Skin', desc: 'Climate tailored' },
  ];

  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FB] via-[#F8FAFC] to-white border-b border-gray-100 py-10 sm:py-14 lg:py-18"
      aria-label="Arcure Pharma Science-Driven Skincare & Wellness"
    >
      {/* Background Soft Sky Blue Atmosphere & Subtle Botanicals */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-blue-100/50 via-pink-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-50/60 via-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Floating Botanical Leaves (SVG Elements) */}
      <div className="absolute top-8 left-12 opacity-35 pointer-events-none hidden sm:block">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="text-emerald-600/40 rotate-12">
          <path d="M10 90 Q 50 10, 90 10 Q 50 50, 10 90 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-16 opacity-30 pointer-events-none hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="text-emerald-600/35 -rotate-45">
          <path d="M10 90 Q 50 10, 90 10 Q 50 50, 10 90 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Top Tag: SCIENCE • CARE • CONFIDENCE */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gray-600 font-bold">
                SCIENCE • CARE • CONFIDENCE
              </span>
            </div>

            {/* Main Headline: Science-Driven / Skincare & Wellness (Warm Gold Serif) */}
            <div className="space-y-3 sm:space-y-3.5">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#161D3A] leading-[1.12] font-serif">
                Science-Driven<br />
                <span className="font-serif italic font-normal text-[#C58B35] drop-shadow-xs">
                  Skincare &amp; Wellness
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                Advanced formulations for healthier, brighter-looking skin.
              </p>
            </div>

            {/* 4 Feature Highlights in a Row with Outline Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
              {trustHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center lg:items-start text-center lg:text-left p-2.5 rounded-xl bg-white/80 border border-gray-100/90 shadow-2xs hover:bg-white hover:shadow-xs transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 text-[#161D3A] flex items-center justify-center mb-1.5 border border-gray-100">
                      <Icon className="w-4 h-4 text-[#161D3A]" />
                    </div>
                    <span className="text-xs font-bold text-gray-900 leading-snug">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Two Action Buttons: SHOP NOW -> (Magenta) & Explore Products (White) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-8 py-3.5 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-pink-500/25 flex items-center gap-2 cursor-pointer touch-manipulation group active:scale-98"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 font-semibold text-xs sm:text-sm border border-gray-700/80 transition-all shadow-2xs hover:shadow-xs hover:border-gray-900 cursor-pointer touch-manipulation active:scale-98"
              >
                Explore Products
              </button>
            </div>

            {/* Pagination Carousel Dots: [ Pink Pill ] [ Dot ] [ Dot ] */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              <button 
                onClick={() => setActiveSlide(0)}
                aria-label="Slide 1"
                className={`transition-all duration-300 ${activeSlide === 0 ? 'w-6 h-2 bg-[#F43F96] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'}`}
              />
              <button 
                onClick={() => setActiveSlide(1)}
                aria-label="Slide 2"
                className={`transition-all duration-300 ${activeSlide === 1 ? 'w-6 h-2 bg-[#F43F96] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'}`}
              />
              <button 
                onClick={() => setActiveSlide(2)}
                aria-label="Slide 3"
                className={`transition-all duration-300 ${activeSlide === 2 ? 'w-6 h-2 bg-[#F43F96] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'}`}
              />
            </div>

          </div>

          {/* Right Hero Product Group Showcase with White Marble Pedestal & Gold Ring */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Upper Right Script: "Healthier Brighter You" in elegant warm gold cursive */}
            <div className="absolute top-0 right-2 sm:right-6 z-30 pointer-events-none">
              <div className="text-right">
                <span 
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#C58B35] leading-none block font-normal"
                >
                  Healthier
                </span>
                <span 
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#C58B35] leading-none block mt-1 font-normal"
                >
                  Brighter You
                </span>
              </div>
            </div>

            {/* Circular Gold Halo & Botanical Leaves Backdrop */}
            <div className="relative w-full max-w-lg aspect-4/3 flex items-end justify-center pt-8 pb-4">
              
              {/* Golden Circular Ring Backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full border-2 border-amber-300/80 shadow-[0_0_30px_rgba(245,158,11,0.15)] pointer-events-none z-0" />
              
              {/* Botanical Green Leaves Accent Behind Ring */}
              <div className="absolute -top-2 left-12 w-20 h-20 text-emerald-500/80 pointer-events-none z-0">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full rotate-45 filter drop-shadow-sm">
                  <path d="M50 0 C70 30, 90 50, 100 80 C80 90, 60 70, 50 100 C40 70, 20 90, 0 80 C10 50, 30 30, 50 0 Z" opacity="0.85"/>
                </svg>
              </div>
              <div className="absolute top-8 right-14 w-24 h-24 text-emerald-600/70 pointer-events-none z-0">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full -rotate-12 filter drop-shadow-sm">
                  <path d="M50 0 C70 30, 90 50, 100 80 C80 90, 60 70, 50 100 C40 70, 20 90, 0 80 C10 50, 30 30, 50 0 Z" opacity="0.85"/>
                </svg>
              </div>

              {/* White Round Marble Pedestal with natural veining & 3D bevel */}
              <div className="absolute bottom-0 inset-x-4 sm:inset-x-8 h-12 sm:h-14 rounded-[100%] bg-gradient-to-b from-[#FDFDFD] via-[#EDEDED] to-[#D8D8D8] border border-gray-200/90 shadow-2xl z-0 pointer-events-none">
                <div className="absolute inset-x-2 top-0 h-4 rounded-[100%] bg-white/90" />
              </div>

              {/* 4 Flagship Products Arranged on Pedestal */}
              <div className="relative z-10 flex items-end justify-center gap-1 sm:gap-2 px-2 pb-2">
                
                {/* 1. ArcuGleam Face Wash (Pump Bottle) */}
                <div 
                  onClick={onExploreProducts}
                  className="flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
                >
                  <img 
                    src="/arcure/arcu-gleam-facewash.jpeg" 
                    alt="ARCU GLEAM Face Wash" 
                    className="h-44 sm:h-56 md:h-64 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 rounded-xl"
                  />
                  <span className="text-[10px] font-bold text-gray-800 mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100">
                    ArcuGleam
                  </span>
                </div>

                {/* 2. ArcuDerm CS Serum (Dropper Bottle) */}
                <div 
                  onClick={onExploreProducts}
                  className="flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 -ml-2 z-10 cursor-pointer group"
                >
                  <img 
                    src="/arcure/arcuderm-cs-serum.png" 
                    alt="ARCUDERM CS Serum" 
                    className="h-40 sm:h-52 md:h-60 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="text-[10px] font-bold text-gray-800 mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100">
                    CS Serum
                  </span>
                </div>

                {/* 3. ARCU-CAL K2 (Bone & Joint Supplement Bottle) */}
                <div 
                  onClick={onExploreProducts}
                  className="flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 -ml-2 z-20 cursor-pointer group"
                >
                  <img 
                    src="/arcure/arcu-cal-k2.png" 
                    alt="ARCU-CAL K2 Supplement" 
                    className="h-44 sm:h-56 md:h-64 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="text-[10px] font-bold text-gray-800 mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100">
                    Arcu-Cal K2
                  </span>
                </div>

                {/* 4. ARCU GLOW Supplement (Amber Bottle Glutathione & Collagen) */}
                <div 
                  onClick={onExploreProducts}
                  className="flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 -ml-2 cursor-pointer group"
                >
                  <img 
                    src="/arcure/arcu-glow.jpeg" 
                    alt="ARCU GLOW Supplement" 
                    className="h-36 sm:h-48 md:h-54 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 rounded-xl"
                  />
                  <span className="text-[10px] font-bold text-gray-800 mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100">
                    ArcuGlow
                  </span>
                </div>

              </div>

            </div>

            {/* Clean Trust Verification Bar */}
            <div className="flex items-center gap-2 mt-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/80 shadow-2xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-gray-800">
                Dermatologist Tested &amp; Approved Formulas
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
