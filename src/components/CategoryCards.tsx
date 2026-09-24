import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardsProps {
  onSelectCategory?: (category: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white" aria-label="Shop by Category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Image 2 */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#161D3A] font-serif">
            Shop by Category
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Find the right products for your health and beauty needs.
          </p>
        </div>

        {/* 2 Category Cards matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* 1. Skin Care Card (Pink Gradient) */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFF0F4] via-[#FFEBF2] to-[#FFDEEB] p-6 sm:p-8 border border-pink-100/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between group overflow-hidden">
            
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 z-10 text-center sm:text-left mb-6 sm:mb-0 max-w-xs">
              <h3 className="text-2xl sm:text-3xl font-normal text-[#161D3A] font-serif">
                Skin Care
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Cleansers, Serums, Sunscreens and more for healthier, brighter-looking skin.
              </p>
              
              <div className="pt-2">
                <a
                  href="#best-sellers"
                  onClick={() => onSelectCategory && onSelectCategory('Skin Care')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-pink-500/25 group-hover:gap-2.5 cursor-pointer"
                >
                  <span>Shop Skin Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Skincare Product Duo (ARCU GLEAM Face Wash & CS Serum) */}
            <div className="relative w-44 sm:w-52 h-44 sm:h-48 flex items-center justify-center shrink-0">
              {/* Cream swirl background highlight */}
              <div className="absolute inset-x-4 bottom-2 h-16 bg-white/70 rounded-full blur-sm" />
              
              <img 
                src="/arcure/arcu-gleam-facewash.jpeg" 
                alt="ARCU GLEAM Face Wash"
                className="absolute left-2 sm:left-4 h-36 sm:h-42 object-contain drop-shadow-md z-10 group-hover:-translate-x-1 group-hover:scale-102 transition-transform duration-300 rounded-lg" 
              />
              <img 
                src="/arcure/arcuderm-cs-serum.png" 
                alt="ARCUDERM CS Serum" 
                className="absolute right-2 sm:right-4 h-32 sm:h-38 object-contain drop-shadow-md z-20 group-hover:translate-x-1 group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>

          {/* 2. Supplements Card (Soft Sky Blue / Cyan Gradient) */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EBF5FF] via-[#E1F0FE] to-[#D6EAF8] p-6 sm:p-8 border border-blue-100/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between group overflow-hidden">
            
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 z-10 text-center sm:text-left mb-6 sm:mb-0 max-w-xs">
              <h3 className="text-2xl sm:text-3xl font-normal text-[#161D3A] font-serif">
                Supplements
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Vitamins, Antioxidants, Biotin and essential nutrients for your daily wellness.
              </p>

              <div className="pt-2">
                <a
                  href="#best-sellers"
                  onClick={() => onSelectCategory && onSelectCategory('Supplements')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-pink-500/25 group-hover:gap-2.5 cursor-pointer"
                >
                  <span>Shop Supplements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Supplements Product Duo (ARCU GLOW & ARCU-CAL K2 / ArcuBio) */}
            <div className="relative w-44 sm:w-52 h-44 sm:h-48 flex items-center justify-center shrink-0">
              <div className="absolute inset-x-4 bottom-2 h-16 bg-white/70 rounded-full blur-sm" />

              <img 
                src="/arcure/arcu-glow.jpeg" 
                alt="ARCU GLOW Glutathione" 
                className="absolute left-2 sm:left-4 h-36 sm:h-42 object-contain drop-shadow-md z-10 group-hover:scale-105 transition-transform duration-300 rounded-lg" 
              />
              <img 
                src="/arcure/arcu-bio.jpeg" 
                alt="ArcuBio Biotin" 
                className="absolute right-2 sm:right-4 h-32 sm:h-38 object-contain drop-shadow-md z-20 group-hover:translate-x-1 group-hover:scale-105 transition-transform duration-300 rounded-lg" 
              />
              
              {/* Spilled Golden Softgels Graphic Accents */}
              <div className="absolute bottom-2 -right-1 flex gap-1 z-20">
                <div className="w-3 h-5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-xs rotate-45 border border-amber-200" />
                <div className="w-3 h-5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-xs -rotate-12 border border-amber-200" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
