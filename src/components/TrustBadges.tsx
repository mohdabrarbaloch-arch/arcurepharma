import React from 'react';
import { Truck, Shield, Headphones, Star } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const perks = [
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'Across Pakistan',
    },
    {
      icon: Shield,
      title: '100% Original',
      subtitle: 'Products',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      subtitle: 'Via WhatsApp',
    },
    {
      icon: Star,
      title: 'Trusted by',
      subtitle: 'Professionals',
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-white" aria-label="Customer Benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs py-4 px-3 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {perks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 pt-3 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/60 text-[#161D3A] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#161D3A]" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
