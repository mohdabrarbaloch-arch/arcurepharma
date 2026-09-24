import React, { useState } from 'react';
import { Heart, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOrderViaWhatsApp: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col relative group border border-gray-100 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Top Wishlist Heart Icon matching Image 2 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        aria-label="Save to Wishlist"
        className="absolute top-4 right-4 z-10 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
      >
        <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
      </button>

      {/* Product Image Area matching Image 2 */}
      <div className="relative w-full aspect-square flex items-center justify-center p-3 mb-3 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain filter group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Product Information Left-Aligned matching Image 2 */}
      <div className="text-left space-y-1 mb-3">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug group-hover:text-[#F43F96] transition-colors">
          {product.title}
        </h3>

        {/* 5 Yellow Stars & Review Count in Parentheses */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price matching Image 2 */}
        <div className="pt-1">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Solid Pink ADD TO CART Pill Button matching Image 2 */}
      <div className="mt-auto pt-1">
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
              : 'bg-[#F48FB1] hover:bg-[#F43F96] text-white hover:shadow-md hover:shadow-pink-500/20'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>
      </div>

    </div>
  );
};
