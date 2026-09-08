"use client";

import { ShieldCheck, Heart, Truck } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function VisionPanel() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Assured",
      text: "All products sourced from certified manufacturers with strict quality control.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health First",
      text: "Committed to making healthcare accessible and affordable for everyone.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      text: "Reliable doorstep delivery ensuring your medications reach you on time.",
    },
  ];

  return (
    <section className="py-20 bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
            Our Vision
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Committed to Your Well-Being
          </h2>
          <p className="text-white/80 mt-3 max-w-xl mx-auto">
            Building a healthier tomorrow through trusted medicated care
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 reveal ${gridVisible ? "is-visible" : ""}`}
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}