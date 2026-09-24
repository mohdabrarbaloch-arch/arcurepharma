import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const [selectedCaseModal, setSelectedCaseModal] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      label: "Acne & Active Breakouts",
      subtitle: "Papules & Comedones Cleared",
      before: "/results/result-1-before.jpg",
      after: "/results/result-1-after.jpg",
      duration: "6 Weeks",
      regimen: "ArcuGleam Face Wash + ArcuDerm CS Serum",
      details: "Noticeable reduction in active inflammatory pustules, normalized follicular oil secretion, and fading of red post-inflammatory erythema (PIE)."
    },
    {
      id: 2,
      label: "Dark Spots & Melasma",
      subtitle: "85%+ Pigment Clearance",
      before: "/results/result-2-before.jpg",
      after: "/results/result-2-after.jpg",
      duration: "4 Weeks",
      regimen: "ArcuDerm CS Serum + Arcu-Shield SPF 60",
      details: "Intense fading of stubborn UV-induced sun spots and hormonal melasma patches. Restored even skin tone and healthy radiance."
    },
    {
      id: 3,
      label: "Rough Texture & Pores",
      subtitle: "Smoother & Healthier Skin",
      before: "/results/result-4-before.jpg",
      after: "/results/result-4-after.jpg",
      duration: "5 Weeks",
      regimen: "Complete Arcure Day & Night Protocol",
      details: "Congested comedones cleared, micro-exfoliation with pure Salicylic Acid refined enlarged pores, yielding smooth glass-like texture."
    }
  ];

  return (
    <section id="clinical-results" className="py-12 sm:py-18 bg-white" aria-label="Real Clinical Results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#F43F96] text-[11px] font-extrabold uppercase tracking-widest border border-pink-100 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 font-serif-heading">
              Real Clinical Results
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Documented patient transformations monitored over 4-6 weeks of consistent clinical regimen.
            </p>
          </div>
        </div>

        {/* 3 Cases Side-by-Side + 4th CTA Tile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {cases.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedCaseModal(item.id)}
              className="clean-card rounded-3xl overflow-hidden p-3.5 flex flex-col cursor-pointer group"
            >
              {/* Dual Before / After Image Box with Divider */}
              <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden bg-gray-100 relative">
                
                {/* Before Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  <img 
                    src={item.before} 
                    alt={`Before ${item.label}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Before
                  </span>
                </div>

                {/* After Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  <img 
                    src={item.after} 
                    alt={`After ${item.label}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-2 right-2 bg-[#F43F96] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    After
                  </span>
                </div>

              </div>

              {/* Title & Info Below */}
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#F43F96] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10.5px]">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                  <span className="text-[#F43F96] font-bold group-hover:underline">
                    View Case &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* 4th Tile: "More Real Results -> View Gallery" with Modern Glass Styling */}
          <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F5] p-6 sm:p-7 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#F43F96] transition-all group shadow-2xs hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs text-[#F43F96] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-base font-bold text-gray-900 block font-serif-heading">
                Explore More Case Studies
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Browse hundreds of documented patient journeys on our medical portal.
              </p>
            </div>
            
            <a
              href="#reviews"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white text-xs font-bold transition-all shadow-md hover:shadow-pink-500/25 active:scale-98"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* Case Details Modal with Clinical Overview */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative space-y-5 shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedCaseModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const current = cases.find(c => c.id === selectedCaseModal);
              if (!current) return null;
              return (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-50 text-[#F43F96] border border-pink-200">
                      Duration: {current.duration}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Study
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 font-serif-heading">
                    {current.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 mb-4">
                    Prescribed Routine: <strong className="text-gray-800">{current.regimen}</strong>
                  </p>

                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                    <div className="relative aspect-square">
                      <img src={current.before} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2.5 left-2.5 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-square">
                      <img src={current.after} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2.5 right-2.5 bg-[#F43F96] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 mb-5">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Clinical Observations:
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {current.details}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="#best-sellers"
                      onClick={() => setSelectedCaseModal(null)}
                      className="flex-1 py-3 rounded-full bg-[#F43F96] hover:bg-[#E11D7A] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md"
                    >
                      Shop Regimen
                    </a>
                    <button
                      onClick={() => setSelectedCaseModal(null)}
                      className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </section>
  );
};
