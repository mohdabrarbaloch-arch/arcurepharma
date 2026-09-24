import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.ingredients.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.benefits.some((b) => b.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, active ingredient (e.g. Salicylic Acid, Vitamin C)..."
            className="w-full text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4 py-4 text-xs text-gray-500">
              <p className="font-semibold text-gray-700">Popular Clinical Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Salicylic Acid', 'Vitamin C Serum', 'Acne Face Wash', 'Vitamin D3', 'Calcium K2'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#EEF2F9] hover:text-[#1E254A] text-gray-700 font-medium transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-100 p-1 shrink-0 flex items-center justify-center">
                    <img src={product.imageUrl} alt={product.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#D48D20] uppercase">{product.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-extrabold text-[#1E254A]">Rs. {product.price.toLocaleString()}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{product.ingredients}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 text-xs sm:text-sm">
              No medical formulations found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
