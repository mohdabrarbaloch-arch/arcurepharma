"use client";

import { Newspaper } from "lucide-react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

const PRESS = [
  { name: "ARY Digital", src: "/jenpharm/press-ary.png" },
  { name: "Dawn", src: "/jenpharm/press-dawn.png" },
  { name: "Mashion", src: "/jenpharm/press-mashion.png" },
  { name: "Paperazzi", src: "/jenpharm/press-paperazzi.png" },
  { name: "Startup Pakistan", src: "/jenpharm/press-startup.png" },
  { name: "Sunday Times", src: "/jenpharm/press-sunday-times.png" },
];

export default function PressLogos() {
  const { ref: headerRef, visible: headerVisible } = useReveal();

  return (
    <section className="py-14 lg:py-20 bg-[#bedfff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-10 reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 text-teal-800 text-sm font-semibold rounded-full mb-4">
            <Newspaper className="w-4 h-4" />
            As Featured In
          </span>
          <h2 className="text-2xl lg:text-4xl font-bold text-teal-900 mb-2">
            Trusted By Leading News &amp; Publications
          </h2>
          <p className="text-teal-800/70 mt-2 max-w-xl mx-auto">
            Recognized by Pakistan&apos;s most trusted media brands
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#bedfff] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#bedfff] to-transparent z-10" />

          {/* Marquee track */}
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 gap-6 pr-6 animate-[marquee_30s_linear_infinite] items-center">
              {[...PRESS, ...PRESS].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity shrink-0 bg-white rounded-2xl px-8 py-5 shadow-sm"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={120}
                    height={46}
                    className="w-auto h-[46px] object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}