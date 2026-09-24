import React from 'react';
import { ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';

interface PromoBannerProps {
  onShopSale?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopSale }) => {
  return (
    <section className="py-10 sm:py-14 bg-white" aria-label="Limited Time Offer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Panoramic Pink Banner matching Image 3 */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FDE8EF] via-[#FCE4EC] to-[#FFF0F5] p-6 sm:p-10 lg:p-12 border border-pink-200/70 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Limited Time Offer / Flat 30% OFF / On Selected Products / SHOP SALE -> */}
          <div className="space-y-3.5 text-center lg:text-left z-10 max-w-sm">
            <span className="font-serif text-lg sm:text-xl text-[#881337] tracking-wide block">
              Limited Time Offer
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
              <span className="text-[#881337]">Flat </span>
              <span className="text-[#F43F96] italic font-serif">30% OFF</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              On Selected Products
            </p>

            <div className="pt-2">
              <a
                href="#best-sellers"
                onClick={onShopSale}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:shadow-pink-500/25 active:scale-98 group cursor-pointer"
              >
                <span>SHOP SALE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Center: The 4 products on the white marble pedestal with gold ring and green leaves */}
          <div className="relative z-10 flex items-end justify-center py-2">
            
            {/* Circular Gold Ring Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full border border-amber-300/80 shadow-[0_0_20px_rgba(245,158,11,0.12)] pointer-events-none" />

            {/* Botanical Green Leaves Accents */}
            <div className="absolute top-2 left-6 w-14 h-14 text-emerald-600/70 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full rotate-45">
                <path d="M50 0 C70 30, 90 50, 100 80 C80 90, 60 70, 50 100 C40 70, 20 90, 0 80 C10 50, 30 30, 50 0 Z" />
              </svg>
            </div>
            <div className="absolute top-6 right-6 w-16 h-16 text-emerald-600/60 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full -rotate-25">
                <path d="M50 0 C70 30, 90 50, 100 80 C80 90, 60 70, 50 100 C40 70, 20 90, 0 80 C10 50, 30 30, 50 0 Z" />
              </svg>
            </div>

            {/* White Round Marble Pedestal */}
            <div className="absolute bottom-0 inset-x-2 h-10 rounded-[100%] bg-gradient-to-b from-[#FDFDFD] via-[#ECECEC] to-[#D5D5D5] border border-gray-200/90 shadow-lg pointer-events-none" />

            {/* 4 Signature Bottles */}
            <div className="relative z-10 flex items-end justify-center gap-1 sm:gap-2 px-2 pb-1">
              <img 
                src="/arcure/arcu-gleam.jpeg" 
                alt="ArcuGleam Face Wash" 
                className="h-32 sm:h-44 object-contain drop-shadow-xl hover:-translate-y-1 transition-transform duration-300"
              />
              <img 
                src="/arcure/arcuderm-serum.png" 
                alt="ArcuDerm CS Serum" 
                className="h-28 sm:h-40 object-contain drop-shadow-xl -ml-3 z-10 hover:-translate-y-1 transition-transform duration-300"
              />
              <img 
                src="/arcure/arcu-cal-k2.png" 
                alt="Arcu-Shield Sunscreen" 
                className="h-32 sm:h-44 object-contain drop-shadow-xl -ml-3 z-20 hover:-translate-y-1 transition-transform duration-300"
              />
              <img 
                src="/arcure/mida-d.png" 
                alt="ArcuGlow Supplement" 
                className="h-26 sm:h-36 object-contain drop-shadow-xl -ml-3 hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right: 3 Pillars (Free Delivery Across Pakistan, 100% Original Products, Secure Payments) */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start justify-center gap-5 sm:gap-6 z-10 shrink-0 text-left border-t lg:border-t-0 lg:border-l border-pink-200/60 pt-4 lg:pt-0 lg:pl-8">
            
            {/* 1. Free Delivery */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#161D3A] shadow-2xs flex items-center justify-center shrink-0 border border-pink-100">
                <Truck className="w-4 h-4 text-[#161D3A]" strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">Free Delivery</h4>
                <p className="text-[11px] text-gray-600 leading-tight">Across Pakistan</p>
              </div>
            </div>

            {/* 2. 100% Original Products */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#161D3A] shadow-2xs flex items-center justify-center shrink-0 border border-pink-100">
                <Shield className="w-4 h-4 text-[#161D3A]" strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">100% Original</h4>
                <p className="text-[11px] text-gray-600 leading-tight">Products</p>
              </div>
            </div>

            {/* 3. Secure Payments */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#161D3A] shadow-2xs flex items-center justify-center shrink-0 border border-pink-100">
                <CreditCard className="w-4 h-4 text-[#161D3A]" strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">Secure</h4>
                <p className="text-[11px] text-gray-600 leading-tight">Payments</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
