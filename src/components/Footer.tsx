import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube,
  ShieldCheck,
  Truck,
  PhoneCall,
  Clock,
  ArrowUp,
  Globe
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface FooterProps {
  onOpenTracking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 text-gray-700" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-gray-100">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-arcure.png" 
                alt="ARCURE PHARMA" 
                className="h-11 w-auto object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="text-lg font-extrabold tracking-wider text-[#1E254A] font-serif-heading">
                  ARCURE <span className="text-[#2E7D32]">PHARMA</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.22em] text-[#1E254A]/70">
                  SCIENCE • CARE • CONFIDENCE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              Arcure Pharma is committed to advanced aesthetic dermatology and clinical-grade health supplements. Manufactured under strict cGMP pharmaceutical guidelines for exceptional purity and efficacy.
            </p>

            <div className="pt-0.5">
              <a 
                href="https://arcurepharma.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#1E254A] font-bold hover:text-[#F43F96] transition-colors bg-pink-50/60 px-3 py-1.5 rounded-lg border border-pink-100"
              >
                <Globe className="w-3.5 h-3.5 text-[#F43F96]" />
                <span>arcurepharma.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://www.instagram.com/arcurepharma_official" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#F43F96] hover:border-[#F43F96] transition-all shadow-2xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/share/1MJnpFc6QJ/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shadow-2xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@arcure_pharma" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white hover:bg-black hover:border-black transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.19 6.32 6.34 6.34 0 0 0 6.34 6.34c3.5 0 6.34-2.84 6.34-6.34V8.46a8.28 8.28 0 0 0 4.76 1.49v-3.26z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <a href="#hero-section" className="hover:text-[#F43F96] transition-colors">Home &amp; Hero</a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#F43F96] transition-colors">Best Sellers</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#F43F96] transition-colors">Skin Care &amp; Supplements</a>
              </li>
              <li>
                <a href="#clinical-results" className="hover:text-[#F43F96] transition-colors">Real Clinical Results</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#F43F96] transition-colors">Patient Reviews</a>
              </li>
              {onOpenTracking && (
                <li>
                  <button onClick={onOpenTracking} className="hover:text-[#F43F96] transition-colors font-semibold text-[#1E254A] cursor-pointer">
                    Track Your Parcel &rarr;
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Customer Service & Consultation */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
              Customer Support
            </h4>
            
            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#F43F96] shrink-0" />
                <span>WhatsApp Helpline: <strong>0316 2647620</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#F43F96] shrink-0" />
                <span>Nationwide Express Delivery (2-4 Days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F43F96] shrink-0" />
                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="https://wa.me/923162647620"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <span>Free Dermatology WhatsApp Chat</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-[11px] text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ARCURE PHARMA (<a href="https://arcurepharma.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F43F96] font-medium underline">arcurepharma.com</a>). All Rights Reserved. Science • Care • Confidence.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#why-arcure" className="hover:text-gray-900">Privacy Policy</a>
            <span>•</span>
            <a href="#why-arcure" className="hover:text-gray-900">Terms &amp; Conditions</a>
            <span>•</span>
            <a href="#why-arcure" className="hover:text-gray-900">Shipping Policy</a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
