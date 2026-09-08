"use client";

import { useEffect, useState } from "react";
import { Star, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  imageUrl: string | null;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Trusted by thousands of customers and healthcare professionals
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">
              Reviews coming soon. Check back later!
            </p>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 reveal ${gridVisible ? "is-visible" : ""}`}
            >
              {reviews.map((t) => (
                <div
                  key={t.id}
                  className="relative p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: Math.min(5, t.rating || 5) }).map(
                      (_, j) => (
                        <Star
                          key={j}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic line-clamp-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {t.role || "Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-teal-600/25 active:scale-95"
              >
                <BadgeCheck className="w-4 h-4" />
                View All Reviews
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}