"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/storefront/Navbar";
import HeroSlider from "@/components/storefront/HeroSlider";
import ProductCard from "@/components/storefront/ProductCard";
import Testimonials from "@/components/storefront/Testimonials";
import VisionPanel from "@/components/storefront/VisionPanel";
import Footer from "@/components/storefront/Footer";
import { useReveal } from "@/lib/useReveal";

interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { ref: productsHeaderRef, visible: productsHeaderVisible } = useReveal();

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />

      <section
        id="products"
        className="py-20 lg:py-28 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={productsHeaderRef}
            className={`text-center mb-16 reveal ${productsHeaderVisible ? "is-visible" : ""}`}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-4 animate-pulse-glow">
              Our Products
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-teal-800">
              Quality Health Products
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Browse our wide range of trusted medicated products
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-1 w-16 rounded-full bg-teal-500" />
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="h-1 w-16 rounded-full bg-teal-500" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                Products coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <VisionPanel />
      <Testimonials />
      <Footer />
    </main>
  );
}
