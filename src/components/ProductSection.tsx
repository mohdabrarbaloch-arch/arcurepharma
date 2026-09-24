import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOrderViaWhatsApp: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onOrderViaWhatsApp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Products', count: products.length },
    { id: 'Skin Care', label: 'Skin Care', count: products.filter(p => p.category === 'Skin Care').length },
    { id: 'Supplements', label: 'Supplements', count: products.filter(p => p.category === 'Supplements').length },
  ];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="best-sellers" className="py-10 sm:py-16 bg-white" aria-label="Our Best Sellers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F43F96] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Pharmaceutical Formulations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#161D3A] font-serif">
              Our Products &amp; Best Sellers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Dermatologist formulated skincare and clinical supplements for Pakistani wellness.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#161D3A] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Product Grid Showing All Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onOrderViaWhatsApp={onOrderViaWhatsApp}
            />
          ))}
        </div>

        {/* Footer Subtext */}
        <div className="mt-10 sm:mt-12 text-center border-t border-gray-100 pt-6">
          <p className="text-xs sm:text-sm text-gray-500">
            Need customized dosage or skincare recommendation?{' '}
            <a
              href="https://wa.me/923337346765?text=Hello%20Arcure%20Pharma,%20I%20would%20like%20a%20free%20consultation%20regarding%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#F43F96] hover:underline"
            >
              Consult our pharmacist on WhatsApp &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
