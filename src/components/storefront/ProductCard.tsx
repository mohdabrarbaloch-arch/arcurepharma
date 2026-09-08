"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Eye,
  PlayCircle,
  ShoppingCart,
  Heart,
  X,
  Minus,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  category?: string;
  description?: string;
  videoUrl?: string | null;
  images?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const gallery = Array.from(
    new Set([product.imageUrl, ...(product.images || [])])
  ).filter(Boolean) as string[];

  const [wishlisted, setWishlisted] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [activeImg, setActiveImg] = useState(product.imageUrl);
  const [qty, setQty] = useState(1);

  // Load wishlist state from localStorage (after mount to avoid hydration mismatch)
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        const list = JSON.parse(
          localStorage.getItem("arcure-wishlist") || "[]"
        ) as string[];
        setWishlisted(list.includes(product.id));
      } catch {
        /* ignore */
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, [product.id]);

  // Close quick view on Escape + lock body scroll while open
  useEffect(() => {
    if (!quickView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickView(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [quickView]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.title} added to cart!`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const list = JSON.parse(
        localStorage.getItem("arcure-wishlist") || "[]"
      ) as string[];
      const exists = list.includes(product.id);
      const next = exists
        ? list.filter((id) => id !== product.id)
        : [...list, product.id];
      localStorage.setItem("arcure-wishlist", JSON.stringify(next));
      setWishlisted(!exists);
      toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
    } catch {
      /* ignore */
    }
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(1);
    setActiveImg(product.imageUrl);
    setQuickView(true);
  };

  const addFromQuickView = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    toast.success(`${qty} × ${product.title} added to cart!`);
    setQuickView(false);
  };

  return (
    <>
      <div className="group relative h-full">
        {/* Animated gradient border + glow on hover */}
        <div className="relative h-full rounded-[26px] bg-white p-[1.5px] ring-1 ring-black/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-teal-400 group-hover:via-emerald-300 group-hover:to-teal-500 group-hover:ring-transparent group-hover:shadow-[0_24px_50px_-12px_rgba(20,83,45,0.35)]">
          <Link
            href={`/product/${product.id}`}
            className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white"
          >
            {/* Top accent line */}
            <span className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {gallery.slice(0, 2).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                    i === 0
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              ))}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-900/0 to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Category chip */}
              {product.category && (
                <span className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-medium rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  {product.category}
                </span>
              )}

              {/* Wishlist heart */}
              <button
                onClick={toggleWishlist}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-300 active:scale-90 ${
                  wishlisted
                    ? "bg-red-500/90 text-white hover:bg-red-600"
                    : "bg-white/90 text-gray-600 hover:text-red-500 hover:scale-110"
                }`}
              >
                <Heart
                  className={`w-4.5 h-4.5 ${
                    wishlisted ? "fill-white" : ""
                  }`}
                />
              </button>

              {/* Video chip */}
              {product.videoUrl && (
                <span className="absolute top-14 right-3 flex items-center gap-1 px-2.5 py-1 bg-teal-600/90 backdrop-blur-sm text-white text-[11px] font-medium rounded-full shadow-sm">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Video
                </span>
              )}

              {/* Image counter */}
              {gallery.length > 1 && (
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/45 backdrop-blur-sm text-white text-[11px] font-medium rounded-full">
                  {gallery.length} photos
                </span>
              )}

              {/* Quick view - center on hover */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={openQuickView}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-teal-700 text-sm font-semibold rounded-full shadow-xl group-hover:scale-105 transition-transform duration-300 hover:bg-teal-600 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
              </div>

              {/* Quick add button */}
              <button
                onClick={handleAdd}
                aria-label="Add to cart"
                className="absolute bottom-3 right-3 z-10 w-11 h-11 bg-white text-teal-700 rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-110 active:scale-95"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col p-5">
              <h3 className="font-semibold text-gray-900 text-base mb-1.5 line-clamp-1 group-hover:text-teal-700 transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-4">
                {product.description
                  ? product.description
                  : "No description available"}
              </p>

              <div className="mt-auto">
                <div className="flex items-end justify-between gap-3 pt-4 border-t border-dashed border-gray-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">
                      Price
                    </p>
                    <span className="text-[22px] font-extrabold text-teal-700 leading-none">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-xl transition-all active:scale-95 shadow-md shadow-teal-600/25 group-hover:shadow-teal-600/40"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>

                {/* Trust row */}
                <div className="mt-3.5 flex items-center gap-4 text-[11px] font-medium text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    100% Genuine
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-teal-600" />
                    Fast Delivery
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
            onClick={() => setQuickView(false)}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-fade-in">
            <button
              onClick={() => setQuickView(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Gallery */}
              <div className="relative aspect-square md:aspect-auto md:min-h-[440px] bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src={activeImg}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-medium rounded-full shadow-sm">
                    {product.category}
                  </span>
                )}
                {product.videoUrl && (
                  <span className="absolute top-4 right-16 flex items-center gap-1 px-2.5 py-1 bg-teal-600/90 backdrop-blur-sm text-white text-[11px] font-medium rounded-full shadow-sm">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Video
                  </span>
                )}

                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md rounded-2xl p-2">
                    {gallery.slice(0, 5).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(img)}
                        aria-label={`View image ${i + 1}`}
                        className={`relative w-11 h-11 rounded-xl overflow-hidden ring-2 transition-all ${
                          activeImg === img
                            ? "ring-teal-400 scale-105"
                            : "ring-white/40 hover:ring-white"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.title} ${i + 1}`}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-semibold rounded-full mb-4">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified Product
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3">
                  {product.title}
                </h2>
                <div className="flex items-end gap-2 mb-5">
                  <span className="text-3xl font-extrabold text-teal-700">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-400 pb-1">
                    incl. all taxes
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {product.description || "No description available."}
                </p>

                {/* Quantity + Add */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow rounded-lg transition-all active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow rounded-lg transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={addFromQuickView}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-teal-600/25"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>

                <div className="border-t border-dashed border-gray-100 pt-5 flex items-center gap-5 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    100% Genuine
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-teal-600" />
                    Fast Delivery
                  </span>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setQuickView(false)}
                  className="mt-auto pt-6 flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}