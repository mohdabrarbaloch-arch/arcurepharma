import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, ChevronRight } from 'lucide-react';

interface TopNotificationBarProps {
  onOpenTracking: () => void;
}

interface PromoMessage {
  id: string;
  prefix: string;
  main: string;
  hasChevron?: boolean;
  highlight?: string;
  desktopSub?: string;
}

const PROMO_MESSAGES: PromoMessage[] = [
  {
    id: 'free-delivery',
    prefix: 'FREE Delivery',
    main: 'on orders over',
    hasChevron: true,
    highlight: 'Rs. 999.',
    desktopSub: 'Genuine Medicated Skincare Across Pakistan',
  },
  {
    id: 'dermatologist-tested',
    prefix: 'Clinical Efficacy',
    main: '100% Dermatologist',
    highlight: 'Formulated.',
    desktopSub: 'Batch-Tested Formulas with Cold-Sealed Packaging',
  },
  {
    id: 'cash-on-delivery',
    prefix: 'Doorstep COD',
    main: 'Cash on Delivery',
    hasChevron: true,
    highlight: 'Nationwide.',
    desktopSub: 'Zero Prepayment Risk • Open Box Verification',
  },
  {
    id: 'express-dispatch',
    prefix: 'Fast Dispatch',
    main: 'Orders Shipped',
    hasChevron: true,
    highlight: 'Within 24h.',
    desktopSub: 'Karachi Same-Day & 2-3 Days Nationwide Priority',
  },
];

export const TopNotificationBar: React.FC<TopNotificationBarProps> = ({ onOpenTracking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const currentPromo = PROMO_MESSAGES[currentIndex];

  return (
    <div 
      id="announcement-bar"
      className="relative w-full bg-gradient-to-r from-[#0E1226] via-[#1A223E] to-[#101428] border-b border-[#D48D20]/30 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-2 min-h-[46px] sm:min-h-[50px]">
        
        {/* Left Side: Subtly Animated Promotional Delivery Text */}
        <div className="flex-1 min-w-0 pr-1 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo.id}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="flex flex-col justify-center min-w-0"
            >
              {/* Line 1: Elegant Gold Serif Title */}
              <div className="flex items-center gap-1.5">
                <span className="font-['Playfair_Display',serif] text-[12.5px] sm:text-[13.5px] font-bold tracking-wide text-[#F5D699] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {currentPromo.prefix}
                </span>
                {currentPromo.desktopSub && (
                  <span className="hidden md:inline-block text-[11px] text-[#CBD7E8]/80 font-normal ml-1">
                    &bull; {currentPromo.desktopSub}
                  </span>
                )}
              </div>

              {/* Line 2: Crisp Details with Subtle Chevron and Highlight */}
              <div className="flex items-center gap-1 text-[10.5px] sm:text-[11.5px] text-[#E2E8F4] font-medium leading-tight mt-0.5 truncate">
                <span>{currentPromo.main}</span>
                {currentPromo.hasChevron && (
                  <ChevronRight className="w-3 h-3 text-[#F5D699] shrink-0 inline-block -mx-0.5 opacity-90" strokeWidth={2.5} />
                )}
                {currentPromo.highlight && (
                  <span className="font-bold text-white tracking-tight">
                    {currentPromo.highlight}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Fixed & Static "Track My Order" Pill with Pulsing Gold Aura & Glossy Reflection */}
        <div className="relative shrink-0 flex items-center justify-end">
          
          {/* Concentric Pulsing Gold Aura Rings radiating around the button */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 pointer-events-none flex items-center justify-center -m-1"
          >
            {/* Outer expanding ripple 1 */}
            <span className="absolute inset-0 rounded-full border border-amber-300/40 bg-amber-400/10 animate-gold-ripple-1 scale-105" />
            {/* Outer expanding ripple 2 */}
            <span className="absolute inset-0 rounded-full border border-amber-200/30 animate-gold-ripple-2 scale-110" />
            {/* Ambient golden radial glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 via-[#f3ce95]/30 to-amber-500/20 blur-sm animate-gold-aura" />
          </div>

          {/* Main Fixed Static Pill Button */}
          <button
            id="notification-track-order-btn"
            onClick={onOpenTracking}
            type="button"
            className="group relative z-10 flex items-center pl-1.5 pr-3.5 py-1 sm:py-1.5 rounded-full 
                       bg-gradient-to-r from-[#B97914] via-[#D99426] to-[#A4670D] 
                       border border-[#FCE0AE] 
                       shadow-[0_2px_14px_rgba(217,148,38,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)] 
                       animate-gold-aura 
                       active:scale-95 transition-transform duration-150 cursor-pointer overflow-hidden focus:outline-none"
            aria-label="Track My Order"
          >
            {/* Sweeping Glossy Light Reflection Sheen (periodic diagonal luxury sweep) */}
            <span 
              aria-hidden="true" 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full z-20"
            >
              <span className="absolute -inset-y-2 -left-full w-2/3 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-glossy-sweep" />
            </span>

            {/* Left Badge: Circular Gold Medallion with Delivery Truck Icon */}
            <div className="relative z-10 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-tr from-[#f3ce95] via-[#fae3be] to-[#e4bc80] flex items-center justify-center shadow-xs shrink-0 border border-white/60">
              <Truck 
                className="w-3.5 h-3.5 text-[#141A36] transition-transform group-hover:translate-x-0.5 duration-200" 
                strokeWidth={2.4} 
              />
            </div>

            {/* Right Typography: Stacked Crisp Two-Line Text (as seen in image) */}
            <div className="relative z-10 flex flex-col text-left pl-2 leading-none select-none">
              <span className="text-[10px] sm:text-[10.5px] font-medium text-white/95 tracking-tight">
                Track My
              </span>
              <span className="text-[11px] sm:text-[11.5px] font-bold text-white tracking-wide mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                Order
              </span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
