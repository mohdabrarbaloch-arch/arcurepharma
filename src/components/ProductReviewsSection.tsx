import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  Camera, 
  Upload, 
  X, 
  Image as ImageIcon, 
  Filter, 
  ShieldCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { getProductReviews, saveProductReview, voteReviewHelpful } from '../data/productReviews';

interface ProductReviewsSectionProps {
  product: Product;
  onReviewAdded?: () => void;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  onReviewAdded
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'helpful'>('newest');
  
  // Selected image for enlarged Lightbox modal
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string; author: string } | null>(null);

  // Helpful votes tracked in session
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  // Form states
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Load reviews on mount or when product changes
  useEffect(() => {
    const list = getProductReviews(product.id);
    setReviews(list);
  }, [product.id]);

  // Handle image upload from user device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedImages.length + files.length > 4) {
      setFormError('You can attach a maximum of 4 photos per review.');
      return;
    }

    setFormError(null);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setFormError('Please select valid image files (JPG, PNG, WebP).');
        return;
      }

      // Max 5MB check
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Image size should be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input value so same file can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!rating || rating < 1) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!title.trim()) {
      setFormError('Please write a brief headline for your review.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setFormError('Please write at least 10 characters in your review comment.');
      return;
    }

    setIsSubmitting(true);

    const newReview: ProductReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      productId: product.id,
      name: name.trim(),
      location: location.trim() || 'Pakistan',
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verified: true,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
      helpfulCount: 0,
    };

    setTimeout(() => {
      const updated = saveProductReview(newReview);
      setReviews(updated);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form fields
      setName('');
      setLocation('');
      setTitle('');
      setComment('');
      setUploadedImages([]);
      setRating(5);

      if (onReviewAdded) {
        onReviewAdded();
      }

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsFormOpen(false);
      }, 2500);
    }, 600);
  };

  const handleHelpfulClick = (id: string) => {
    if (votedIds.has(id)) return;
    voteReviewHelpful(id);
    setVotedIds((prev) => new Set(prev).add(id));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r))
    );
  };

  // Calculations for summary stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : product.rating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: reviews.filter((r) => Math.round(r.rating) === s).length,
    percentage: totalReviews > 0 ? (reviews.filter((r) => Math.round(r.rating) === s).length / totalReviews) * 100 : 0,
  }));

  // Collect all photos from all reviews for the customer photo gallery
  const allReviewPhotos = reviews.flatMap((r) => 
    (r.images || []).map((img) => ({
      src: img,
      caption: r.title,
      author: r.name,
      rating: r.rating,
      date: r.date,
    }))
  );

  // Filter & sort reviews
  const filteredReviews = reviews
    .filter((r) => {
      if (filterRating !== 'all' && Math.round(r.rating) !== filterRating) return false;
      if (onlyPhotos && (!r.images || r.images.length === 0)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'helpful') return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const ratingDescriptions: Record<number, string> = {
    1: 'Poor • Does not recommend',
    2: 'Fair • Needs improvement',
    3: 'Good • Met expectations',
    4: 'Very Good • Highly effective',
    5: 'Excellent • Exceeded expectations!',
  };

  return (
    <div id="customer-reviews-section" className="pt-8 border-t border-gray-100">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">
              Customer Ratings &amp; Reviews
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-[#F43F96]">
              {totalReviews} Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real experiences and verified photos from Arcure Pharma customers across Pakistan.
          </p>
        </div>

        {/* Write a Review Button */}
        {!isFormOpen && (
          <button
            onClick={() => {
              setIsFormOpen(true);
              setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#161D3A] hover:bg-[#F43F96] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {/* 1. Review Summary Score & Distribution Card */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-pink-50/30 rounded-2xl p-5 sm:p-6 border border-gray-200/80 mb-8 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Overall Score */}
          <div className="md:col-span-4 text-center md:text-left md:border-r border-gray-200 md:pr-6">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                {averageRating}
              </span>
              <span className="text-lg font-bold text-gray-400">/ 5.0</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < Math.round(Number(averageRating))
                      ? 'fill-amber-400 text-amber-400' 
                      : 'fill-gray-200 text-gray-200'
                  }`} 
                />
              ))}
            </div>

            <p className="text-xs text-gray-600 font-medium">
              Based on {totalReviews} authentic customer ratings
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>98% Customers Recommend This</span>
            </div>
          </div>

          {/* Center: Rating Distribution Breakdown */}
          <div className="md:col-span-8 space-y-2">
            {starCounts.map(({ stars, count, percentage }) => (
              <div 
                key={stars}
                onClick={() => setFilterRating(filterRating === stars ? 'all' : stars)}
                className={`flex items-center gap-3 text-xs cursor-pointer group p-1 rounded-lg transition-colors ${
                  filterRating === stars ? 'bg-pink-100/60 font-bold' : 'hover:bg-gray-100/60'
                }`}
              >
                <div className="flex items-center gap-1 w-14 shrink-0 font-medium text-gray-700">
                  <span>{stars}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>

                {/* Progress bar */}
                <div className="flex-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-[#F43F96] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right text-gray-500 group-hover:text-gray-900 shrink-0">
                  <span>{count}</span>
                  <span className="text-[10px] text-gray-400 ml-1">({percentage.toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 2. Customer Photos Gallery Strip (if photos exist) */}
      {allReviewPhotos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F43F96]" />
              <span>Customer Photos &amp; Real Results ({allReviewPhotos.length})</span>
            </h4>
            <span className="text-xs text-gray-400">Click photo to view enlarged</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {allReviewPhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxImage(photo)}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-gray-200 hover:border-[#F43F96] hover:scale-105 transition-all shadow-2xs group cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white drop-shadow-sm" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Interactive Review Submission Form */}
      {isFormOpen && (
        <div 
          ref={formRef} 
          className="mb-8 p-5 sm:p-7 rounded-2xl bg-white border-2 border-pink-200 shadow-xl transition-all animate-fade-in"
        >
          <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900">
                Write a Customer Review for {product.title}
              </h4>
              <p className="text-xs text-gray-500">
                Share your skin type, texture feedback, and before/after photos.
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close review form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h5 className="text-lg font-bold text-gray-900">Thank You for Your Review!</h5>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Your rating, comments, and uploaded photos have been successfully submitted and added to this product's reviews.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isFilled = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                          aria-label={`${starVal} stars`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                                : 'fill-gray-100 text-gray-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 ml-2">
                    {ratingDescriptions[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cleared my breakouts in 2 weeks! / Best sunscreen for humid weather"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F43F96] focus:ring-1 focus:ring-[#F43F96]"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Detailed Review *
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others what you loved about this formulation, how it felt on your skin, fragrance/texture, and how fast you noticed clinical improvements..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F43F96] focus:ring-1 focus:ring-[#F43F96]"
                />
              </div>

              {/* Name & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ayesha Malik"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F43F96] focus:ring-1 focus:ring-[#F43F96]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your City / Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Karachi, Lahore, Islamabad"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F43F96] focus:ring-1 focus:ring-[#F43F96]"
                  />
                </div>
              </div>

              {/* Image Upload Zone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Upload Photos (Optional, up to 4 images)
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Attach packaging photos, before &amp; after results, or product texture. (JPG, PNG, WebP up to 5MB each)
                </p>

                {/* Uploaded thumbnails preview */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl border-2 border-pink-300 overflow-hidden group shadow-2xs">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                          aria-label="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedImages.length < 4 && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="review-image-input"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="review-image-input"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#F43F96] hover:bg-pink-50/40 text-gray-700 hover:text-[#F43F96] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#F43F96]" />
                      <span>{uploadedImages.length === 0 ? 'Click to Upload Photos' : 'Add More Photos'}</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl bg-[#F43F96] hover:bg-[#E11D7A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* 4. Filters & Sorting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 text-xs">
        
        {/* Rating Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-gray-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-[#161D3A] text-white shadow-2xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            All ({totalReviews})
          </button>

          {[5, 4, 3].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
            if (count === 0) return null;
            return (
              <button
                key={star}
                onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  filterRating === star
                    ? 'bg-[#F43F96] text-white shadow-2xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span>{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="opacity-80">({count})</span>
              </button>
            );
          })}

          <button
            onClick={() => setOnlyPhotos(!onlyPhotos)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              onlyPhotos
                ? 'bg-[#F43F96] text-white shadow-2xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Camera className="w-3 h-3" />
            <span>With Photos ({allReviewPhotos.length})</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-semibold">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-7 rounded-xl font-semibold cursor-pointer focus:outline-none focus:border-[#F43F96]"
            >
              <option value="newest">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 5. Customer Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="py-12 text-center bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-semibold text-gray-600">No reviews found matching your filter criteria.</p>
            <button
              onClick={() => {
                setFilterRating('all');
                setOnlyPhotos(false);
              }}
              className="mt-3 text-xs font-bold text-[#F43F96] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasVoted = votedIds.has(rev.id);
            const initials = rev.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .substring(0, 2);

            return (
              <div 
                key={rev.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-2xs hover:shadow-xs transition-all"
              >
                {/* Review Header: User Info & Verification */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#161D3A] to-[#2B3868] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Verified Buyer</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">
                        {rev.location || 'Pakistan'} • {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars display */}
                  <div className="flex text-amber-400 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(rev.rating) ? 'fill-amber-400' : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Title & Comment */}
                <h5 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">
                  {rev.title}
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {rev.comment}
                </p>

                {/* Uploaded Customer Photos */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {rev.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxImage({
                          src: img,
                          caption: rev.title,
                          author: rev.name,
                        })}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-gray-200 hover:border-[#F43F96] hover:scale-105 transition-all shadow-2xs group cursor-pointer"
                      >
                        <img src={img} alt={`Customer photo ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Helpful Count Button */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      hasVoted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'text-emerald-600 fill-emerald-600' : ''}`} />
                    <span>{hasVoted ? 'Helpful' : 'Was this helpful?'}</span>
                    <span className="font-bold text-gray-800 ml-1">({rev.helpfulCount || 0})</span>
                  </button>

                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Arcure Verified Purchase</span>
                  </span>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 6. Image Lightbox Modal for Full Screen Inspection */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between">
              <div>
                <h6 className="text-sm font-bold text-gray-900">{lightboxImage.caption}</h6>
                <p className="text-xs text-gray-500">Shared by {lightboxImage.author}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Verified Result</span>
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
