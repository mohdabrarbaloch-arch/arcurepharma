import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  X, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

export interface OrderStatus {
  status: string;
  timestamp: string;
  location: string;
  note: string;
  completed: boolean;
}

export interface OrderedProduct {
  title: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface TrackedOrder {
  orderId: string;
  trackingNumber: string;
  customerName: string;
  items: number;
  products?: OrderedProduct[];
  totalAmount: number;
  currentStatus: string;
  estimatedDelivery: string;
  statusHistory: OrderStatus[];
}

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingNumber?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialTrackingNumber = '',
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Synchronize when initialTrackingNumber changes or modal opens
  useEffect(() => {
    if (initialTrackingNumber) {
      setTrackingNumber(initialTrackingNumber);
      lookupOrder(initialTrackingNumber);
    } else if (isOpen && !order) {
      // Don't auto-search if empty, just focus
      setError('');
    }
  }, [initialTrackingNumber, isOpen]);

  if (!isOpen) return null;

  const lookupOrder = async (trackingQuery: string) => {
    const query = trackingQuery.trim();
    if (!query) {
      setError('Please enter a valid tracking number.');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    // Realistic API network simulation matching existing logic
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check stored user orders first
    try {
      const storedOrders = JSON.parse(localStorage.getItem('arcure_orders') || '[]');
      const foundInStorage = storedOrders.find(
        (o: TrackedOrder) =>
          o.trackingNumber.toLowerCase() === query.toLowerCase() ||
          o.orderId.toLowerCase() === query.toLowerCase()
      );
      if (foundInStorage) {
        const enrichedOrder = {
          ...foundInStorage,
          products: (foundInStorage.products && foundInStorage.products.length > 0)
            ? foundInStorage.products
            : [
                {
                  title: 'Arcure RetinAge Advanced 0.5% Serum (30ml)',
                  quantity: 1,
                  price: 1850,
                },
                {
                  title: 'Arcure GlowShield Invisible SPF 60+ Gel (50g)',
                  quantity: 1,
                  price: 1650,
                },
              ],
        };
        setOrder(enrichedOrder);
        setLoading(false);
        return;
      }
    } catch {
      // fallback to api or mock
    }

    // Try fetching from server backend API
    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.order) {
          const sOrder = data.order;
          const orderData: TrackedOrder = {
            orderId: sOrder.orderId,
            trackingNumber: sOrder.trackingNumber,
            customerName: sOrder.customerName || 'Customer',
            items: sOrder.items || (sOrder.products?.length ?? 1),
            products: (sOrder.products && sOrder.products.length > 0)
              ? sOrder.products
              : [
                  {
                    title: 'Arcure RetinAge Advanced 0.5% Serum (30ml)',
                    quantity: 1,
                    price: 1850,
                  },
                ],
            totalAmount: sOrder.totalAmount || 0,
            currentStatus: sOrder.currentStatus || 'Order Placed',
            estimatedDelivery: sOrder.estimatedDelivery || '3 - 4 Working Days',
            statusHistory: [
              {
                status: 'Order Placed',
                timestamp: sOrder.createdAt ? new Date(sOrder.createdAt).toLocaleDateString() : 'Confirmed',
                location: 'Arcure Pharma Online Store',
                note: 'Your Cash on Delivery order has been verified and dispatched to fulfillment.',
                completed: true,
              },
              {
                status: 'Processing & Quality Check',
                timestamp: 'In Progress',
                location: 'Karachi Central Facility (Site Super Highway)',
                note: 'Batch tested, cold-sealed, and packaged in temperature-safe materials.',
                completed: true,
              },
              {
                status: 'Shipped',
                timestamp: 'Expected within 24h',
                location: 'Priority Courier Hub',
                note: 'Handed over to priority logistics with COD consignment number.',
                completed: false,
              },
              {
                status: 'Delivered',
                timestamp: 'Estimated: 3-4 days',
                location: 'Customer Address',
                note: 'Handover against Cash on Delivery payment receipt.',
                completed: false,
              },
            ],
          };
          setOrder(orderData);
          setLoading(false);
          return;
        }
      }
    } catch {
      // proceed to demo logic
    }

    // Existing tracking page logic compatibility: handles demo123, TRK-, ORD-
    const normalized = query.toLowerCase();
    if (
      normalized === 'demo123' ||
      normalized.startsWith('trk') ||
      normalized.startsWith('ord') ||
      normalized === 'arcure-demo'
    ) {
      const isDelivered = normalized.includes('deliv');
      const orderData: TrackedOrder = {
        orderId: normalized === 'demo123' ? 'ORD-001' : `ORD-${query.toUpperCase().replace(/[^A-Z0-9]/g, '') || '789'}`,
        trackingNumber: query.toUpperCase(),
        customerName: 'Ahmed Khan',
        items: 3,
        products: [
          {
            title: 'Arcure RetinAge Advanced 0.5% Serum (30ml)',
            quantity: 1,
            price: 1850,
          },
          {
            title: 'Arcure GlowShield Invisible SPF 60+ Gel (50g)',
            quantity: 1,
            price: 1650,
          },
          {
            title: 'Arcure Sebocure Clarifying Cleanser (150ml)',
            quantity: 1,
            price: 1000,
          },
        ],
        totalAmount: 4500,
        currentStatus: isDelivered ? 'Delivered' : 'Out for Delivery',
        estimatedDelivery: '2026-09-24',
        statusHistory: [
          {
            status: 'Order Placed',
            timestamp: 'Sep 21, 2026 - 10:30 AM',
            location: 'Arcure Pharma Online Store',
            note: 'Your prescription order has been received and verified by our clinical pharmacist.',
            completed: true,
          },
          {
            status: 'Processing & Quality Check',
            timestamp: 'Sep 21, 2026 - 02:15 PM',
            location: 'Karachi Central Facility (Site Super Highway)',
            note: 'Batch tested, cold-sealed, and prepared for temperature-controlled dispatch.',
            completed: true,
          },
          {
            status: 'Shipped',
            timestamp: 'Sep 22, 2026 - 09:00 AM',
            location: 'Karachi Distribution Center',
            note: 'Package handed over to TCS / Leopards Express priority courier.',
            completed: true,
          },
          {
            status: 'Out for Delivery',
            timestamp: 'Sep 22, 2026 - 03:30 PM',
            location: 'Destination Delivery Hub',
            note: 'Courier delivery rider is en route to customer destination address.',
            completed: true,
          },
          {
            status: 'Delivered',
            timestamp: isDelivered ? 'Sep 22, 2026 - 05:15 PM' : 'Estimated: Sep 23 - Sep 24',
            location: 'Customer Address',
            note: isDelivered
              ? 'Package successfully handed to recipient. Thank you for choosing Arcure Pharma!'
              : 'Package will be handed over with Cash on Delivery invoice.',
            completed: isDelivered,
          },
        ],
      };
      setOrder(orderData);
    } else {
      setError(
        'Tracking number not found. Please double-check your receipt or try the sample demo tracking number: demo123'
      );
    }

    setLoading(false);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrder(trackingNumber);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return Clock;
      case 'Processing & Quality Check':
      case 'Processing':
        return Package;
      case 'Shipped':
      case 'Out for Delivery':
        return Truck;
      case 'Delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-order-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FEF7ED] text-[#B87714] border border-[#F6D8A6] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="track-order-modal-title" className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Track Your Order
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500">Live shipping updates &amp; courier milestones</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close tracking modal"
            className="p-2 -mr-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Tracking Search Input Form */}
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g. demo123 or TRK-123456)"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#1E254A] focus:border-transparent outline-none bg-gray-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-[#1E254A] hover:bg-[#141A36] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <span>Track Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </form>

          {/* Demo helper pill */}
          {!order && !loading && (
            <div className="bg-[#FEF7ED] border border-[#F6D8A6] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#8C580E]">
                <ShieldCheck className="w-4 h-4 text-[#D48D20] shrink-0" />
                <span>
                  Testing the system? Try the preloaded sample tracking number:{' '}
                  <code className="px-2 py-0.5 bg-white border border-[#F6D8A6] text-[#B87714] rounded-md font-mono font-bold">
                    demo123
                  </code>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('demo123');
                  lookupOrder('demo123');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1E254A] hover:bg-[#141A36] text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
              >
                Auto-fill demo123
              </button>
            </div>
          )}

          {/* Active Order Details */}
          {order && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Order Summary Card */}
              <div className="bg-gray-50/80 rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-gray-900">
                        Order #{order.orderId}
                      </h3>
                      <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {order.trackingNumber}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recipient: {order.customerName}</p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#EEF2F9] text-[#1E254A] text-xs font-bold rounded-full self-start sm:self-center border border-[#CBD7E8]">
                    <span className="w-2 h-2 rounded-full bg-[#1E254A] animate-pulse" />
                    {order.currentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block mb-0.5">Package Contents</span>
                    <span className="font-bold text-gray-900">{order.items} Medicated Products</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">Total Amount</span>
                    <span className="font-extrabold text-[#1E254A]">Rs. {order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-gray-500 block mb-0.5">Estimated Delivery</span>
                    <span className="font-bold text-emerald-700">{order.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Ordered Products in Order Details */}
              {order.products && order.products.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#EEF2F9] text-[#1E254A] flex items-center justify-center">
                        <Package className="w-4 h-4 text-[#1E254A]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-none">
                          Products in Order Details ({order.products.length})
                        </h4>
                        <span className="text-[11px] text-gray-500">Verified by Arcure Clinical Quality Control</span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 hidden sm:inline-block">
                      Original Prescription
                    </span>
                  </div>
                  
                  <div className="divide-y divide-gray-100 border border-gray-200/80 rounded-xl overflow-hidden bg-white">
                    {order.products.map((prod, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 bg-gray-50/40 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          {prod.imageUrl ? (
                            <img
                              src={prod.imageUrl}
                              alt={prod.title}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-200 shrink-0 bg-white"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-[#EEF2F9] text-[#1E254A] font-bold rounded-xl flex items-center justify-center text-sm shrink-0 border border-gray-200/60">
                              Rx
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D48D20] block mb-0.5">
                              Arcure Pharma Certified
                            </span>
                            <p className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">
                              {prod.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 flex flex-wrap items-center gap-x-2">
                              <span>
                                Qty: <strong className="text-gray-900 font-bold">{prod.quantity}</strong>
                              </span>
                              <span className="text-gray-300">&bull;</span>
                              <span>
                                Unit Price: <span className="font-semibold text-gray-800">Rs. {prod.price.toLocaleString()}</span>
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <span className="text-[11px] text-gray-400 block mb-0.5">Subtotal</span>
                          <span className="font-extrabold text-[#1E254A] text-sm sm:text-base block">
                            Rs. {(prod.quantity * prod.price).toLocaleString()}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            COD
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Timeline */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#1E254A]" />
                  <span>Tracking Milestones</span>
                </h4>

                <div className="space-y-6">
                  {order.statusHistory.map((step, idx) => {
                    const Icon = getStatusIcon(step.status);
                    const isLast = idx === order.statusHistory.length - 1;

                    return (
                      <div key={idx} className="relative flex gap-4">
                        {/* Connecting Line */}
                        {!isLast && (
                          <div
                            className={`absolute left-5 top-10 bottom-0 w-0.5 ${
                              step.completed ? 'bg-[#1E254A]' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        {/* Status Icon Marker */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            step.completed
                              ? 'bg-[#1E254A] text-white shadow-md'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Step Details */}
                        <div className="flex-1 pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h5
                              className={`text-sm font-bold ${
                                step.completed ? 'text-gray-900' : 'text-gray-400'
                              }`}
                            >
                              {step.status}
                            </h5>
                            <span
                              className={`text-xs ${
                                step.completed ? 'text-[#D48D20] font-semibold' : 'text-gray-400'
                              }`}
                            >
                              {step.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>{step.location}</span>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
                            {step.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier Support Help Section */}
              <div className="bg-[#FEF7ED] border border-[#F6D8A6] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-900">Need Delivery Assistance?</h5>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Our Karachi dispatch support team can reschedule or confirm courier routes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <a
                    href={CONTACT_CONFIG.getWhatsAppUrl(`Hello Arcure Pharma, I am inquiring about order status for tracking number: ${order.trackingNumber}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Dispatch ({CONTACT_CONFIG.ownerWhatsAppFormatted})</span>
                  </a>

                  <a
                    href={CONTACT_CONFIG.getMailtoUrl(`Order Status Inquiry - ${order.trackingNumber}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Email ({CONTACT_CONFIG.ownerEmail})</span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Nationwide Courier Partners: TCS, Leopards &amp; Trax</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
