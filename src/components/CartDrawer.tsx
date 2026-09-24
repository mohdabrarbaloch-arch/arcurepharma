import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck, CheckCircle2 } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenTrackingWithId?: (trackingId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenTrackingWithId,
}) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState('');
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderId: string;
    trackingNumber: string;
    products: { id: string; title: string; price: number; quantity: number; imageUrl?: string }[];
    total: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 200;
  const grandTotal = subtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let text = `*New Order - Arcure Pharma*\n\n`;
    text += `*Order Items:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.title} x ${item.quantity} - Rs. ${(item.product.price * item.quantity).toLocaleString()}\n`;
    });
    text += `\n*Subtotal:* Rs. ${subtotal.toLocaleString()}`;
    text += `\n*Delivery:* ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}`;
    text += `\n*Grand Total:* Rs. ${grandTotal.toLocaleString()}`;
    if (formData.name) {
      text += `\n\n*Customer Info:*\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nAddress: ${formData.address}`;
    }
    text += `\n\nPlease confirm availability and dispatch timeline.`;

    window.open(CONTACT_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  const handleCodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    const newTrackingId = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrderId = `ORD-${Date.now().toString().slice(-4)}`;
    setGeneratedTrackingNumber(newTrackingId);

    const orderedProducts = items.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl,
    }));

    // Save order in localStorage so it can be tracked in the tracking modal
    try {
      const existing = JSON.parse(localStorage.getItem('arcure_orders') || '[]');
      const newOrder = {
        orderId: newOrderId,
        trackingNumber: newTrackingId,
        customerName: formData.name,
        items: items.reduce((a, b) => a + b.quantity, 0),
        products: orderedProducts,
        totalAmount: grandTotal,
        currentStatus: 'Order Placed',
        estimatedDelivery: '3 - 4 Working Days',
        statusHistory: [
          {
            status: 'Order Placed',
            timestamp: 'Just now',
            location: `${formData.city || 'Online Store'}`,
            note: 'Your Cash on Delivery order has been registered and sent to pharmacy dispatch.',
            completed: true,
          },
          {
            status: 'Processing & Quality Check',
            timestamp: 'Pending verification call',
            location: 'Karachi Central Facility',
            note: 'Package will be sealed and inspected once address is phone-confirmed.',
            completed: false,
          },
          {
            status: 'Shipped',
            timestamp: 'Expected within 24h',
            location: 'Courier Express DC',
            note: 'Handed over to priority logistics with COD tracking bill.',
            completed: false,
          },
          {
            status: 'Out for Delivery',
            timestamp: 'Expected day 3',
            location: `${formData.city || 'Destination City'} Hub`,
            note: 'Courier rider will arrive at delivery address.',
            completed: false,
          },
          {
            status: 'Delivered',
            timestamp: 'Estimated: 3-4 days',
            location: formData.address,
            note: 'Cash payment due upon parcel handover.',
            completed: false,
          },
        ],
      };
      localStorage.setItem('arcure_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    // Send order to server backend for Neon PostgreSQL storage and Email notifications
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: newOrderId,
        trackingNumber: newTrackingId,
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        notes: formData.notes,
        items: orderedProducts,
        totalAmount: grandTotal,
      }),
    }).catch(err => {
      console.warn('Backend order sync note:', err);
    });

    setLastOrderDetails({
      orderId: newOrderId,
      trackingNumber: newTrackingId,
      products: orderedProducts,
      total: grandTotal,
    });

    setIsSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-full flex pl-0 sm:pl-10 justify-end pointer-events-none">
        <div className="w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col justify-between h-full max-h-[100dvh] pointer-events-auto overflow-hidden">
          
          {/* Header */}
          <div className="p-3.5 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <ShoppingBag className="w-5 h-5 text-[#1E254A] shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                Your Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 -mr-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer touch-manipulation shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-[#FEF7ED] p-2.5 sm:p-3 px-3.5 sm:px-5 border-b border-[#F6D8A6]/70 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C580E] mb-1.5">
              <Truck className="w-4 h-4 text-[#D48D20] shrink-0" />
              {isFreeShipping ? (
                <span className="truncate">🎉 You&apos;ve unlocked <strong>FREE Nationwide Delivery</strong>!</span>
              ) : (
                <span className="truncate">Add <strong>Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE Shipping!</span>
              )}
            </div>
            <div className="w-full bg-[#FDE8C8] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#D48D20] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-5 scrollbar-thin">
            {isSuccess ? (
              <div className="text-center py-8 sm:py-10 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Confirmed!</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto px-2">
                  Thank you, <strong>{formData.name}</strong>. Our pharmacy dispatch coordinator will call you to confirm dispatch to {formData.city || 'your address'}.
                </p>

                {generatedTrackingNumber && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left max-w-sm mx-auto space-y-2">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Your Tracking Number:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-base text-[#1E254A]">{generatedTrackingNumber}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Active</span>
                    </div>
                  </div>
                )}

                {lastOrderDetails && lastOrderDetails.products.length > 0 && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left max-w-sm mx-auto space-y-2.5">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-[#1E254A]" />
                        Ordered Products ({lastOrderDetails.products.length})
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">#{lastOrderDetails.orderId}</span>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto">
                      {lastOrderDetails.products.map((p, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between text-xs">
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-gray-900 truncate">{p.title}</p>
                            <p className="text-[11px] text-gray-500">Qty: {p.quantity} &bull; Rs. {p.price.toLocaleString()}</p>
                          </div>
                          <span className="font-bold text-[#1E254A] shrink-0">
                            Rs. {(p.quantity * p.price).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-bold text-gray-900">
                      <span>Total (COD)</span>
                      <span className="text-[#1E254A]">Rs. {lastOrderDetails.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
                  {onOpenTrackingWithId && generatedTrackingNumber && (
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setShowCheckoutForm(false);
                        onClose();
                        onOpenTrackingWithId(generatedTrackingNumber);
                      }}
                      className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E254A] hover:bg-[#141A36] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer touch-manipulation"
                    >
                      <Truck className="w-4 h-4 text-[#D48D20]" />
                      <span>Track My Order Now</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setShowCheckoutForm(false);
                      onClose();
                    }}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs cursor-pointer transition-colors touch-manipulation"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-14 sm:py-16 space-y-3 px-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-semibold text-gray-800">Your bag is empty</p>
                <p className="text-xs text-gray-500">Discover our dermatologist-formulated skincare.</p>
                <button
                  onClick={onClose}
                  className="mt-4 min-h-[42px] px-6 py-2.5 rounded-xl bg-[#1E254A] hover:bg-[#141A36] text-white font-semibold text-xs cursor-pointer touch-manipulation"
                >
                  Explore Products
                </button>
              </div>
            ) : showCheckoutForm ? (
              <form onSubmit={handleCodSubmit} className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Cash on Delivery (COD) Details</h3>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-xs text-[#D48D20] font-semibold hover:underline p-1 touch-manipulation"
                  >
                    &larr; Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ayesha Khan"
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#1E254A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="03XX XXXXXXX"
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#1E254A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Karachi, Lahore, Islamabad..."
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#1E254A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Complete Street Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Apartment #, Street, Area..."
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#1E254A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-3.5 px-4 rounded-xl bg-[#1E254A] hover:bg-[#141A36] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer mt-4 touch-manipulation"
                >
                  Place Order (Cash on Delivery) • Rs. {grandTotal.toLocaleString()}
                </button>
              </form>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1 border border-gray-100 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-snug">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1 shrink-0 touch-manipulation"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-[#1E254A] shrink-0">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation font-bold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold select-none min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && !isSuccess && !showCheckoutForm && (
            <div className="p-3.5 sm:p-5 border-t border-gray-100 bg-gray-50 space-y-2.5 sm:space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (Nationwide)</span>
                  <span className={shippingFee === 0 ? 'font-bold text-emerald-600' : 'font-semibold text-gray-900'}>
                    {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#1E254A]">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E254A] hover:bg-[#141A36] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer touch-manipulation"
                >
                  <span>Checkout with Cash on Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full min-h-[42px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer touch-manipulation"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Order</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
