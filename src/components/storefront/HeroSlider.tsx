"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(5000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/sliders").then((r) => r.json()),
      fetch("/api/settings").then((r) => r.json()),
    ])
      .then(([slidesData, settingsData]) => {
        setSlides(Array.isArray(slidesData) ? slidesData : []);
        if (settingsData && settingsData.slider_duration) {
          setDuration(Number(settingsData.slider_duration) * 1000);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const next = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, duration);
    return () => clearInterval(timer);
  }, [next, slides.length, duration]);

  if (loading) {
    return (
      <section className="relative h-[60vh] lg:h-[80vh] bg-teal-600 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[60vh] lg:h-[80vh] bg-teal-600 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            Your Health, Our Priority
          </h2>
          <p className="text-lg lg:text-xl opacity-90">
            Trusted pharmacy products delivered to your doorstep
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] lg:h-[80vh] overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title || "Slide"}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    {slide.title && (
                      <h2
                        key={`title-${i}-${current}`}
                        className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                      >
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p
                        key={`sub-${i}-${current}`}
                        className="text-lg lg:text-xl text-white animate-fade-in drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
                        style={{ animationDelay: "0.15s" }}
                      >
                        {slide.subtitle}
                      </p>
                    )}
                    <Link
                      href="/#products"
                      className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-teal-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-teal-500/40 hover:shadow-teal-400/60 hover:scale-105 transition-all animate-fade-in"
                      style={{ animationDelay: "0.3s" }}
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* scroll indicator */}
        <div className="absolute bottom-6 right-8 hidden lg:flex flex-col items-center gap-2 text-white/70 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-teal-400 shadow-[0_0_10px_color-mix(in_srgb,var(--color-teal-400)_80%,transparent)]"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
