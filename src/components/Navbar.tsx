import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Truck, 
  MessageCircle,
  ShieldCheck,
  Headphones,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWhatsApp: () => void;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenWhatsApp,
  onOpenTracking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. Top Bar (Clean pink with subtle sheen) */}
      <div className="bg-gradient-to-r from-[#FDE8F1] via-[#FDF2F8] to-[#FCE7F3] text-gray-800 text-[11px] sm:text-xs py-2 px-4 border-b border-pink-200/60 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F43F96]"></span>
            </span>
            <Truck className="w-3.5 h-3.5 text-gray-700" />
            <span><strong className="text-gray-900 font-semibold">Free Delivery</strong> Across Pakistan on all orders</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-gray-700 font-medium text-xs">
            <span className="flex items-center gap-1.5 text-gray-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Genuine Formulations
            </span>
            <span className="text-pink-300">|</span>
            <button
              onClick={onOpenTracking}
              className="hover:text-[#F43F96] transition-colors font-semibold text-gray-700"
            >
              Track Order
            </button>
            <span className="text-pink-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Need Help?</span>
              <button 
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-1 text-gray-900 font-bold hover:text-[#E11D7A] transition-colors cursor-pointer group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-pink-300 underline-offset-2">WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Glass Blur */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-md py-3 border-b border-gray-100' 
          : 'bg-white py-3.5 sm:py-4 border-b border-gray-100/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            
            {/* Brand Logo with Tagline */}
            <a href="#" className="flex items-center gap-3 shrink-0 focus:outline-none group">
              <div className="relative">
                <img 
                  src="/logo-arcure.png" 
                  alt="ARCURE PHARMA" 
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden xs:flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-wider text-[#1E254A] font-serif-heading">
                  ARCURE <span className="text-[#2E7D32]">PHARMA</span>
                </span>
                <span className="text-[9px] sm:text-[9.5px] uppercase font-bold tracking-[0.22em] text-[#1E254A]/70">
                  SCIENCE • CARE • CONFIDENCE
                </span>
              </div>
            </a>

            {/* Center Search Bar with Modern Pill Style */}
            <form 
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-lg hidden md:block"
            >
              <div 
                onClick={onOpenSearch}
                className="relative flex items-center cursor-pointer group"
              >
                <Search className="w-4 h-4 text-gray-400 absolute left-4 group-hover:text-[#F43F96] transition-colors" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search products, ingredients (Salicylic, Vitamin C, SPF)..."
                  className="w-full bg-[#F6F7FA] hover:bg-[#EEF1F7] text-gray-800 placeholder-gray-400 text-xs sm:text-sm pl-11 pr-24 py-2.5 rounded-full border border-gray-200/60 focus:border-[#F43F96] focus:bg-white focus:outline-none transition-all shadow-2xs cursor-pointer"
                />
                <span className="absolute right-3 text-[11px] font-semibold text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200 pointer-events-none group-hover:border-pink-200 group-hover:text-[#F43F96] transition-colors">
                  Search
                </span>
              </div>
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-semibold text-gray-700">
              <a href="#best-sellers" className="hover:text-[#F43F96] transition-colors py-1">Best Sellers</a>
              <a href="#categories" className="hover:text-[#F43F96] transition-colors py-1">Categories</a>
              <a href="#clinical-results" className="hover:text-[#F43F96] transition-colors py-1">Clinical Results</a>
              <a href="#reviews" className="hover:text-[#F43F96] transition-colors py-1">Reviews</a>
              <a href="#why-arcure" className="hover:text-[#F43F96] transition-colors py-1">Why Arcure</a>
            </nav>

            {/* Right Action Icons: User, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Mobile Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-2 md:hidden text-gray-700 hover:text-[#F43F96] rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Consultation / Support Button */}
              <button
                onClick={onOpenWhatsApp}
                aria-label="Account / Support"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-[#1E254A] hover:bg-gray-100 transition-colors border border-gray-200/80 cursor-pointer"
                title="Support & Consultation"
              >
                <User className="w-4 h-4 text-gray-500" />
                <span>Consultation</span>
              </button>

              {/* Shopping Cart with Vibrantly Animated Pink Badge */}
              <button
                onClick={onOpenCart}
                aria-label={`Cart with ${cartCount} items`}
                className="relative p-2.5 text-gray-800 hover:text-[#F43F96] rounded-full hover:bg-pink-50 transition-all cursor-pointer group"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-108" />
                {cartCount > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#F43F96] text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center">
                    0
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="p-2 xl:hidden text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl px-4 py-5 shadow-2xl space-y-4 animate-fade-in-down">
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-gray-800">
            <a 
              href="#best-sellers" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-gray-50/80 hover:bg-[#FDF2F8] hover:text-[#F43F96] border border-gray-100 transition-colors"
            >
              ⭐ Best Sellers
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-gray-50/80 hover:bg-[#FDF2F8] hover:text-[#F43F96] border border-gray-100 transition-colors"
            >
              🧴 Categories
            </a>
            <a 
              href="#clinical-results" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-gray-50/80 hover:bg-[#FDF2F8] hover:text-[#F43F96] border border-gray-100 transition-colors"
            >
              🔬 Real Results
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-gray-50/80 hover:bg-[#FDF2F8] hover:text-[#F43F96] border border-gray-100 transition-colors"
            >
              💬 Patient Reviews
            </a>
            <a 
              href="#why-arcure" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-gray-50/80 hover:bg-[#FDF2F8] hover:text-[#F43F96] border border-gray-100 transition-colors"
            >
              ✨ Why Arcure
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="p-3 rounded-xl bg-[#EEF2F9] text-[#1E254A] font-bold text-left border border-[#D5E1F2] hover:bg-[#E3EDFA] transition-colors"
            >
              📦 Track Order
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Dermatology Helpline:</span>
            <button
              onClick={onOpenWhatsApp}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              0316 2647620
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
