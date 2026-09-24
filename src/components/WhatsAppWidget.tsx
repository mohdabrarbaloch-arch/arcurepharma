import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpen = () => {
    const text = "Hello Arcure Pharma! I have a question regarding your dermatologist formulations.";
    window.open(CONTACT_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3.5 sm:right-6 z-40 flex flex-col items-end">
      {/* Consultation Tooltip */}
      {showTooltip && (
        <div className="relative mb-2.5 sm:mb-3 bg-white text-gray-900 rounded-2xl shadow-xl border border-gray-100 p-2.5 sm:p-3 max-w-[200px] sm:max-w-[220px] text-xs animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-0.5 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Pharmacist Online</span>
          </div>
          <p className="text-gray-600 text-[10.5px] sm:text-[11px] leading-snug">
            Need dosage advice or product recommendations? Chat with us live!
          </p>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleOpen}
        aria-label="Chat with Arcure Pharma on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer touch-manipulation"
        title="Consult on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 border-2 border-white rounded-full" />
      </button>
    </div>
  );
};
