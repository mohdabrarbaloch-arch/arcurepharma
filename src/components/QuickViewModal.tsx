import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Award,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { ProductReviewsSection } from './ProductReviewsSection';
import { getProductReviews } from '../data/productReviews';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOrderViaWhatsApp: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderViaWhatsApp,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'usage' | 'reviews'>('overview');
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(5.0);

  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync state when product opens
  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      setQuantity(1);
      setActiveTab('overview');
      updateReviewStats(product.id);
    }
  }, [product]);

  const updateReviewStats = (productId: string) => {
    const revs = getProductReviews(productId);
    setReviewCount(revs.length);
    if (revs.length > 0) {
      const avg = revs.reduce((sum, r) => sum + r.rating, 0) / revs.length;
      setAverageScore(Number(avg.toFixed(1)));
    } else if (product) {
      setAverageScore(product.rating);
    }
  };

  if (!product) return null;

  const activeImage = selectedImage || product.imageUrl;

  const handleAdd = () => {
    onAddToCart(product, quantity);
  };

  const handleWhatsApp = () => {
    onOrderViaWhatsApp(product, quantity);
  };

  const scrollToReviews = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
    >
      <div 
        ref={scrollContainerRef}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 relative flex flex-col scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Close Button & Breadcrumb */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-800">Arcure Pharma</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="font-semibold text-[#F43F96]">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:inline" />
            <span className="text-gray-400 hidden sm:inline truncate max-w-[200px]">{product.title}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 sm:p-8 space-y-8">
          
          {/* Main Product Showcase Row (Image Gallery + Buy Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-[#F7FAFC] to-[#EDF2F7] border border-gray-100 flex items-center justify-center p-6 sm:p-8 overflow-hidden group">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {product.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F43F96] text-white shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-gray-800 border border-gray-200 shadow-2xs backdrop-blur-xs flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    GMP Certified
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 p-1.5 bg-gray-50 overflow-hidden cursor-pointer transition-all shrink-0 ${
                        activeImage === img ? 'border-[#F43F96] shadow-xs' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Assurances */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span>Free Shipping PK</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Authentic</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Pricing & CTA (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              
              <div>
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span className="font-bold text-[#F43F96] uppercase tracking-wider">{product.category}</span>
                  <span className="font-mono text-gray-400">SKU: {product.sku}</span>
                </div>

                {/* Product Title */}
                <h1 id="product-detail-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#161D3A] tracking-tight font-serif leading-tight mb-2">
                  {product.title}
                </h1>

                {/* Subtitle / Actives summary */}
                {product.ingredientSubtitle && (
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-3">
                    {product.ingredientSubtitle}
                  </p>
                )}

                {/* Star Rating with Click to Scroll to Reviews */}
                <div 
                  onClick={scrollToReviews}
                  className="inline-flex items-center gap-2 mb-4 p-1.5 -ml-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                  title="Click to read all customer reviews"
                >
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(averageScore)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{averageScore}</span>
                  <span className="text-xs text-gray-500 group-hover:text-[#F43F96] underline transition-colors">
                    ({reviewCount} customer reviews)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 bg-pink-50/40 p-3.5 rounded-2xl border border-pink-100/70">
                  <span className="text-2xl sm:text-3xl font-black text-[#161D3A]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#F43F96] bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                        Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Concise Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Feature checklist */}
                <div className="space-y-1.5 mb-5 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold text-gray-800 block mb-1">Key Clinical Highlights:</span>
                  {product.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Controls & Quantity Selector */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-2xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold text-gray-900 min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>In Stock • Ready to Dispatch</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F43F96] hover:bg-[#E11D7A] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:shadow-pink-500/25 transition-all cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Cart</span>
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Tabs for Deep Details */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 sm:space-x-8 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#F43F96] text-[#F43F96]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Actives &amp; Formula
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'usage'
                    ? 'border-[#F43F96] text-[#F43F96]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                How To Use &amp; Protocol
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-[#F43F96] text-[#F43F96]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Customer Reviews</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-pink-100 text-[#F43F96]">
                  {reviewCount}
                </span>
              </button>
            </nav>
          </div>

          {/* Tab 1: Actives & Formula */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Key Pharmaceutical Actives:</h4>
                <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
              </div>
              <div className="pt-2">
                <h4 className="font-bold text-gray-900 mb-1">Complete Clinical Benefits:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: How To Use */}
          {activeTab === 'usage' && (
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900">Recommended Dermatological Protocol:</h4>
              <p className="text-gray-600 leading-relaxed">{product.howToUse}</p>
              <div className="pt-2 text-gray-500 text-xs">
                💡 <em>Pro Tip: Consistent morning and night application for 4 to 6 weeks is recommended for maximum epidermal clarity.</em>
              </div>
            </div>
          )}

          {/* Tab 3: Customer Reviews Section with Image Uploads */}
          <div ref={reviewsSectionRef} className="pt-2">
            <ProductReviewsSection 
              product={product} 
              onReviewAdded={() => updateReviewStats(product.id)}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
