import { ProductReview } from '../types';

export const INITIAL_PRODUCT_REVIEWS: ProductReview[] = [
  // 1. ArcuGleam Face Wash
  {
    id: "rev-agf-01",
    productId: "10000000-0000-4000-8000-000000000001",
    name: "Anum Tariq",
    location: "Karachi, Pakistan",
    rating: 5,
    title: "Best cleanser for humid weather & oily skin!",
    comment: "I have lived in Karachi all my life with very oily and acne-prone skin. Most foaming face washes dry out the skin barrier and cause more oil. ArcuGleam completely regulated my skin sebum without any tightness. Cleared my active breakout within 10 days.",
    verified: true,
    date: "September 12, 2026",
    images: ["/results/result-4-after.jpg", "/arcure/arcu-gleam.jpeg"],
    helpfulCount: 24,
  },
  {
    id: "rev-agf-02",
    productId: "10000000-0000-4000-8000-000000000001",
    name: "Bilal Ahmed",
    location: "Lahore, Pakistan",
    rating: 5,
    title: "Gentle salicylic formulation that actually works",
    comment: "Prescribed by my dermatologist for stubborn blackheads and clogged pores. The lather is velvety and soft. Pores on my nose look significantly smaller after 3 weeks of morning and night use.",
    verified: true,
    date: "August 28, 2026",
    images: ["/arcure/Arcu_Gleam_Seerom2.jpeg"],
    helpfulCount: 16,
  },
  {
    id: "rev-agf-03",
    productId: "10000000-0000-4000-8000-000000000001",
    name: "Dr. Hina K.",
    location: "Islamabad, Pakistan",
    rating: 5,
    title: "Excellent formulation standard",
    comment: "As a practicing physician, I review ingredient lists thoroughly. 2% salicylic acid combined with soothing aloe vera and panthenol prevents barrier damage while delivering clinical acne clearance. Highly recommended.",
    verified: true,
    date: "August 15, 2026",
    helpfulCount: 31,
  },
  {
    id: "rev-agf-04",
    productId: "10000000-0000-4000-8000-000000000001",
    name: "Zohaib Raza",
    location: "Faisalabad, Pakistan",
    rating: 4,
    title: "Great results, pleasant mild scent",
    comment: "Skin feels refreshed and non-greasy all day long. Arrived in 2 days safely packed. Very satisfied with the customer service on WhatsApp too.",
    verified: true,
    date: "July 29, 2026",
    helpfulCount: 8,
  },

  // 2. ArcuDerm CS Serum
  {
    id: "rev-acs-01",
    productId: "10000000-0000-4000-8000-000000000002",
    name: "Maham Noor",
    location: "Rawalpindi, Pakistan",
    rating: 5,
    title: "Stubborn dark spots vanished within 4 weeks!",
    comment: "I had dark acne marks after severe hormonal breakouts. Used 3 drops every night followed by moisturizer. My post-inflammatory hyperpigmentation has lightened noticeably. Uploading my 4-week progress photo below!",
    verified: true,
    date: "September 18, 2026",
    images: ["/results/result-2-after.jpg", "/results/result-2-before.jpg"],
    helpfulCount: 39,
  },
  {
    id: "rev-acs-02",
    productId: "10000000-0000-4000-8000-000000000002",
    name: "Dr. Zeeshan Ali",
    location: "Multan, Pakistan",
    rating: 5,
    title: "High purity actives with zero stickiness",
    comment: "The combination of Azelaic Acid, Salicylic Acid, and Centella Asiatica is fantastic for inflamed rosacea and acne lesions. Non-tacky texture that absorbs within 15 seconds.",
    verified: true,
    date: "September 02, 2026",
    helpfulCount: 22,
  },
  {
    id: "rev-acs-03",
    productId: "10000000-0000-4000-8000-000000000002",
    name: "Syeda Alizeh",
    location: "Lahore, Pakistan",
    rating: 5,
    title: "100% authentic pharmacy grade serum",
    comment: "This is my 2nd bottle. The dropper bottle is premium glass and the formula is crystal clear. My skin tone looks much more even and luminous.",
    verified: true,
    date: "August 20, 2026",
    images: ["/arcure/arcuderm-serum.png"],
    helpfulCount: 14,
  },

  // 3. ARCU-CAL K2
  {
    id: "rev-ack-01",
    productId: "10000000-0000-4000-8000-000000000003",
    name: "Zainab Siddiqui",
    location: "Karachi, Pakistan",
    rating: 5,
    title: "Relieved my persistent joint ache and fatigue!",
    comment: "My orthopedic doctor recommended ARCU-CAL K2 for post-pregnancy bone density and knee stiffness. Taking 1 tablet daily with lunch has made a dramatic difference. No stomach upset at all, excellent calcium absorption with D3 and zinc.",
    verified: true,
    date: "September 14, 2026",
    images: ["/arcure/arcu-cal-k2.png"],
    helpfulCount: 42,
  },
  {
    id: "rev-ack-02",
    productId: "10000000-0000-4000-8000-000000000003",
    name: "Tariq Mahmood",
    location: "Lahore, Pakistan",
    rating: 5,
    title: "High quality bone supplement, easy to swallow",
    comment: "Very balanced formula with Magnesium and Zinc. My morning knee stiffness has significantly reduced after 4 weeks of consistent use. Arrived safely packaged within 2 days.",
    verified: true,
    date: "August 30, 2026",
    helpfulCount: 19,
  },

  // 4. Mida-D Vitamin D3 200,000 IU
  {
    id: "rev-mmd-01",
    productId: "10000000-0000-4000-8000-000000000004",
    name: "Dr. Asma R.",
    location: "Islamabad, Pakistan",
    rating: 5,
    title: "Best therapeutic Vitamin D3 softgel with Omega-3",
    comment: "Most Vitamin D supplements lack adequate lipid carriers. Mida-D formulated in pure Omega fish oil ensures optimal cholecalciferol bio-absorption. My patients show rapid serum 25-OH-D normalization without adverse effects.",
    verified: true,
    date: "September 18, 2026",
    images: ["/arcure/mida-d3.jpeg"],
    helpfulCount: 39,
  },
  {
    id: "rev-mmd-02",
    productId: "10000000-0000-4000-8000-000000000004",
    name: "Noman Qureshi",
    location: "Lahore, Pakistan",
    rating: 5,
    title: "Restored my energy levels completely",
    comment: "My blood test showed severe Vitamin D deficiency (9 ng/ml). After taking Mida-D softgel as prescribed by my physician, chronic body fatigue and muscle aches vanished.",
    verified: true,
    date: "August 24, 2026",
    helpfulCount: 27,
  },

  // 5. ArcuBio (Hair, Skin & Nails)
  {
    id: "rev-abio-01",
    productId: "10000000-0000-4000-8000-000000000005",
    name: "Komal Farooq",
    location: "Rawalpindi, Pakistan",
    rating: 5,
    title: "Severe hair fall stopped within 4 weeks!",
    comment: "Post-monsoon shedding was devastating my hair volume. ArcuBio with 5000mcg Biotin and Folic Acid strengthened my hair roots and stimulated noticeable baby hair growth along my hairline. My nails no longer peel or chip.",
    verified: true,
    date: "September 11, 2026",
    images: ["/arcure/arcu-bio.jpeg"],
    helpfulCount: 33,
  },
  {
    id: "rev-abio-02",
    productId: "10000000-0000-4000-8000-000000000005",
    name: "Nimra Sheikh",
    location: "Multan, Pakistan",
    rating: 5,
    title: "Great results for hair thickness & healthy nails",
    comment: "I have been using ArcuBio for almost 2 months. My hair feels much thicker and has a healthy natural shine. Very gentle on the stomach and authentic batch seal.",
    verified: true,
    date: "August 19, 2026",
    helpfulCount: 21,
  },

  // 6. ARCU GLOW (Glutathione & Collagen)
  {
    id: "rev-aglw-01",
    productId: "10000000-0000-4000-8000-000000000006",
    name: "Sadia Waseem",
    location: "Karachi, Pakistan",
    rating: 5,
    title: "Remarkable radiance and natural whitening results",
    comment: "The 600mg reduced L-Glutathione combined with 200mg Marine Collagen peptides cleared stubborn facial pigmentation and restored deep skin elasticity. Skin tone is much more unified and glowing across my entire body.",
    verified: true,
    date: "September 10, 2026",
    images: ["/arcure/arcu-glow.jpeg"],
    helpfulCount: 48,
  },
  {
    id: "rev-aglw-02",
    productId: "10000000-0000-4000-8000-000000000006",
    name: "Ayesha Jahangir",
    location: "Faisalabad, Pakistan",
    rating: 5,
    title: "Authentic glutathione that actually works",
    comment: "Visible reduction in dark spots and dullness after 5 weeks of daily morning use on an empty stomach. Premium amber bottle packaging and QR verification code intact.",
    verified: true,
    date: "August 27, 2026",
    helpfulCount: 35,
  }
];

const STORAGE_KEY = 'arcure_pharma_product_reviews_v1';

export function getProductReviews(productId: string): ProductReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored: ProductReview[] = raw ? JSON.parse(raw) : [];
    
    // Combine stored user reviews with initial reviews, avoiding duplicates by id
    const allReviews = [...stored, ...INITIAL_PRODUCT_REVIEWS];
    const uniqueMap = new Map<string, ProductReview>();
    allReviews.forEach(r => {
      if (!uniqueMap.has(r.id)) {
        uniqueMap.set(r.id, r);
      }
    });

    return Array.from(uniqueMap.values()).filter(r => r.productId === productId);
  } catch {
    return INITIAL_PRODUCT_REVIEWS.filter(r => r.productId === productId);
  }
}

export function saveProductReview(review: ProductReview): ProductReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored: ProductReview[] = raw ? JSON.parse(raw) : [];
    const updated = [review, ...stored];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return getProductReviews(review.productId);
  } catch (err) {
    console.error("Failed to save review to localStorage", err);
    return [review, ...INITIAL_PRODUCT_REVIEWS.filter(r => r.productId === review.productId)];
  }
}

export function voteReviewHelpful(reviewId: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored: ProductReview[] = raw ? JSON.parse(raw) : [];
    const reviewInStored = stored.find(r => r.id === reviewId);
    
    if (reviewInStored) {
      reviewInStored.helpfulCount = (reviewInStored.helpfulCount || 0) + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } else {
      // If it is in INITIAL_PRODUCT_REVIEWS, save a copy into stored with incremented count
      const initial = INITIAL_PRODUCT_REVIEWS.find(r => r.id === reviewId);
      if (initial) {
        const copy = { ...initial, helpfulCount: (initial.helpfulCount || 0) + 1 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([copy, ...stored]));
      }
    }
  } catch (e) {
    console.error(e);
  }
}
