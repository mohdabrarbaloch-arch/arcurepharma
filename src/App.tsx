import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { getProductReviews } from './data/productReviews';
import { Navbar } from './components/Navbar';
import { ModernHero } from './components/ModernHero';
import { CategoryCards } from './components/CategoryCards';
import { ProductSection } from './components/ProductSection';
import { TrustBadges } from './components/TrustBadges';
import { PromoBanner } from './components/PromoBanner';
import { CustomerExperiences } from './components/CustomerExperiences';
import { ReviewsSection } from './components/ReviewsSection';
import { DoctorEndorsement } from './components/DoctorEndorsement';
import { ResultsSection } from './components/ResultsSection';
import { VisionSection } from './components/VisionSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Check } from 'lucide-react';
import { CONTACT_CONFIG } from './config/contact';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arcure_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewUpdateTrigger, setReviewUpdateTrigger] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialId, setTrackingInitialId] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute products dynamically with live customer review count & average rating
  const dynamicProducts = useMemo(() => {
    return PRODUCTS.map((p) => {
      const revs = getProductReviews(p.id);
      if (revs.length > 0) {
        const avg = revs.reduce((sum, r) => sum + r.rating, 0) / revs.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewCount: revs.length,
        };
      }
      return p;
    });
  }, [reviewUpdateTrigger]);

  // Keep quickViewProduct in sync if dynamicProducts change
  useEffect(() => {
    if (quickViewProduct) {
      const found = dynamicProducts.find((p) => p.id === quickViewProduct.id);
      if (found && (found.reviewCount !== quickViewProduct.reviewCount || found.rating !== quickViewProduct.rating)) {
        setQuickViewProduct(found);
      }
    }
  }, [dynamicProducts, quickViewProduct]);

  // URL hash navigation support (e.g. #product-AGF-001 or #product-10000000-0000-4000-8000-000000000001)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const query = hash.replace('#product-', '').toLowerCase();
        const target = dynamicProducts.find(
          (p) => p.id.toLowerCase() === query || p.sku.toLowerCase() === query
        );
        if (target) {
          setQuickViewProduct(target);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [dynamicProducts]);

  useEffect(() => {
    try {
      localStorage.setItem('arcure_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart localStorage error:", e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenTracking = (initialId = '') => {
    setTrackingInitialId(initialId);
    setIsTrackingOpen(true);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.title} to bag!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderViaWhatsApp = (product: Product, quantity = 1) => {
    const text = `Hello Arcure Pharma! I would like to order:\n\n*Product:* ${product.title}\n*Quantity:* ${quantity}\n*Price:* Rs. ${(product.price * quantity).toLocaleString()}\n\nPlease confirm availability and delivery details.`;
    window.open(CONTACT_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  const handleOpenConsultation = () => {
    const text = "Hello Arcure Pharma! I would like a consultation regarding the best skincare / vitamin regimen for my skin condition.";
    window.open(CONTACT_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  const handleExploreProducts = () => {
    const target = document.getElementById('best-sellers');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#1E254A] text-white shadow-2xl border border-pink-400/50 text-xs sm:text-sm font-semibold"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header / Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWhatsApp={handleOpenConsultation}
        onOpenTracking={() => handleOpenTracking()}
      />

      <main className="flex-1">
        {/* 2. Hero Section: "Science-Driven Skincare & Wellness" */}
        <ModernHero
          onExploreProducts={handleExploreProducts}
          onOpenConsultation={handleOpenConsultation}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          featuredProduct={dynamicProducts[0]}
        />

        {/* 3. Shop by Category (Skin Care & Supplements) */}
        <CategoryCards onSelectCategory={() => handleExploreProducts()} />

        {/* 4. Our Best Sellers (4 Product Cards) */}
        <ProductSection
          products={dynamicProducts}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onOrderViaWhatsApp={(p) => handleOrderViaWhatsApp(p, 1)}
        />

        {/* 5. 4 Perks Trust Strip (Free Delivery Across Pakistan, 100% Original Products, etc.) */}
        <TrustBadges />

        {/* 6. Flat 30% OFF Limited Time Offer Banner */}
        <PromoBanner onShopSale={handleExploreProducts} />

        {/* 7. Real Customers, Real Experiences + Customer Videos Reels */}
        <CustomerExperiences />

        {/* 8. What Our Customers Say (Reviews with Carousel Arrows) */}
        <ReviewsSection />

        {/* 9. Trusted by Healthcare Professionals (Doctor Endorsement) */}
        <DoctorEndorsement />

        {/* 10. Real Results (3 Before/After Comparisons + View Gallery) */}
        <ResultsSection />

        {/* 11. Why Arcure? & Our Vision & Follow @arcurepharma & Ready to Transform */}
        <VisionSection />
      </main>

      {/* 12. Clean White Footer */}
      <Footer onOpenTracking={() => handleOpenTracking()} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialTrackingNumber={trackingInitialId}
      />

      {/* Quick View / Product Detail Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => {
          setQuickViewProduct(null);
          if (window.location.hash.startsWith('#product-')) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          setReviewUpdateTrigger((k) => k + 1);
        }}
        onAddToCart={handleAddToCart}
        onOrderViaWhatsApp={handleOrderViaWhatsApp}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenTrackingWithId={(id) => handleOpenTracking(id)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={dynamicProducts}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

    </div>
  );
}
