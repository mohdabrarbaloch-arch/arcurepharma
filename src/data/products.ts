import { Product, Review, ClinicalResult } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    title: "ARCU GLEAM Face Wash",
    price: 1280,
    originalPrice: 1550,
    category: "Skin Care",
    imageUrl: "/arcure/arcu-gleam-facewash.jpeg",
    images: ["/arcure/arcu-gleam-facewash.jpeg", "/arcure/arcu-gleam.jpeg"],
    ingredientSubtitle: "Salicylic Acid + Niacinamide + Hyaluronic Acid",
    featurePills: ["Deep Clean", "Oil Control", "Hydration Boost"],
    bulletPoints: [
      { icon: "drop", label: "Deep Cleanses & Unclogs Pores" },
      { icon: "shield", label: "Controls Oil & Improves Tone" },
      { icon: "sparkle", label: "Hydrates & Protects Barrier" }
    ],
    description: "Medicated clarifying foaming cleanser formulated for acne-prone skin. Salicylic Acid deeply cleanses and unclogs stubborn pores, Niacinamide controls oil and evens skin tone, while Hyaluronic Acid locks in essential hydration for clear, fresh, and healthy skin.",
    benefits: [
      "Deep Clean & Oil Control for Acne-Prone Skin",
      "Salicylic Acid Unclogs Congested Pores",
      "Niacinamide Fades Post-Blemish Redness & Tone",
      "Hyaluronic Acid Maintains Skin Moisture Barrier"
    ],
    ingredients: "Salicylic Acid (BHA), Niacinamide (Vitamin B3), Hyaluronic Acid, Aloe Vera Extract, Panthenol, Purified Water.",
    howToUse: "Pump 1-2 times onto wet palms. Gently massage over face for 60 seconds focusing on T-zone and breakout areas. Rinse thoroughly with cool water. Use morning and night.",
    sku: "AGF-001",
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    title: "ARCUDERM CS Serum",
    price: 1950,
    originalPrice: 2400,
    category: "Skin Care",
    imageUrl: "/arcure/arcuderm-cs-serum.png",
    images: ["/arcure/arcuderm-cs-serum.png", "/arcure/arcuderm-serum.png"],
    ingredientSubtitle: "Salicylic Acid + Vitamin C + Hyaluronic Acid",
    featurePills: ["Restorative Complex", "Dermatologist Formulated", "30ml / 1 fl.oz."],
    bulletPoints: [
      { icon: "target", label: "Clarifies Breakouts & Blemishes" },
      { icon: "sun", label: "Fades Dark Spots & Restores Glow" },
      { icon: "sparkle", label: "Deep Plumping Hydration" }
    ],
    description: "Restorative Complex dermatologist-formulated restorative facial serum (30ml / 1 fl.oz.). Combines medical-grade Vitamin C for luminous tone correction, Salicylic Acid for deep cellular pore clarification, and Hyaluronic Acid for intensive bouncy hydration.",
    benefits: [
      "Restorative Triple Active Medical Complex",
      "Lightens Melasma & Post-Inflammatory Hyperpigmentation",
      "Refines Cellular Texture & Skin Smoothness",
      "Rapidly Absorbing Non-Sticky Dropper Formula"
    ],
    ingredients: "Salicylic Acid, Ethyl Ascorbic Acid (Vitamin C), Hyaluronic Acid, Niacinamide, Panthenol, Centella Asiatica Extract.",
    howToUse: "Dispense 3-4 drops onto freshly cleansed skin every morning and evening. Pat gently until absorbed. Follow with moisturizer and sun protection in daytime.",
    sku: "ACS-002",
    rating: 5.0,
    reviewCount: 34,
    inStock: true,
    badge: "Top Rated"
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    title: "ARCU-CAL K2",
    price: 1650,
    originalPrice: 2100,
    category: "Supplements",
    imageUrl: "/arcure/arcu-cal-k2.png",
    images: ["/arcure/arcu-cal-k2.png"],
    ingredientSubtitle: "Calcium + Vitamin D3 + Magnesium + Zinc",
    featurePills: ["Bone & Joint Health", "Supports Bone Density", "30 Tablets"],
    bulletPoints: [
      { icon: "shield", label: "Strengthens Bones & Joint Architecture" },
      { icon: "heart", label: "Improves Calcium Bioavailability" },
      { icon: "sparkle", label: "Maintains Healthy Bone Density" }
    ],
    description: "Dietary supplement for comprehensive Bone & Joint Health (30 Tablets). Synergistically combines Calcium, Vitamin D3, Magnesium, and Zinc to maximize calcium absorption directly into the bone matrix, preventing brittleness and supporting joint flexibility.",
    benefits: [
      "Strengthens Skeletal Structure & Joint Cartilage",
      "Improves Calcium Absorption with Vitamin D3 & K2",
      "Supports Bone Mineral Density at All Life Stages",
      "Alleviates Post-Exercise and Age-Related Joint Fatigue"
    ],
    ingredients: "Calcium Carbonate, Vitamin D3 (Cholecalciferol), Magnesium Oxide, Zinc Sulfate, Vitamin K2 (MK-7), Microcrystalline Cellulose.",
    howToUse: "Take 1 tablet daily with or after a main meal with a full glass of water, or as prescribed by your physician.",
    sku: "ACK-003",
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    badge: "Clinical Grade"
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    title: "Mida-D Vitamin D3 200,000 IU",
    price: 450,
    originalPrice: 600,
    category: "Supplements",
    imageUrl: "/arcure/mida-d3.jpeg",
    images: ["/arcure/mida-d3.jpeg", "/arcure/mida-d.png"],
    ingredientSubtitle: "Omega Fish Oil + Vitamin D3 200,000 IU",
    featurePills: ["Heart Health", "Bone Health", "Immune System"],
    bulletPoints: [
      { icon: "heart", label: "Cardiovascular & Heart Wellness" },
      { icon: "shield", label: "Fortifies Immune Resistance" },
      { icon: "drop", label: "High Potency D3 with Omega-3" }
    ],
    description: "High-potency Vitamin D3 (200,000 IU) in purified Omega Fish Oil softgel vehicle (1 Softgel Capsule). Clinically designed to rapidly restore Vitamin D deficiency, reinforce immune defense, and support strong bones, cardiovascular wellness, and overall vitality.",
    benefits: [
      "Rapidly Corrects Severe Vitamin D3 Deficiency",
      "Infused with Omega Fish Oil for Superior Lipid Absorption",
      "Fortifies Natural Immune Resistance Against Infections",
      "Supports Bone Strength, Muscle Function & Cardiovascular Health"
    ],
    ingredients: "Vitamin D3 (Cholecalciferol) 200,000 IU, Natural Omega-3 Fish Oil (EPA/DHA), Gelatin Softgel Capsule, Glycerol, Purified Water.",
    howToUse: "Take 1 softgel capsule with water after a heavy or fatty meal, once every 1 to 4 weeks, or strictly according to medical prescription.",
    sku: "MMD-004",
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    badge: "High Potency"
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    title: "ArcuBio (Hair, Skin & Nails)",
    price: 1850,
    originalPrice: 2300,
    category: "Supplements",
    imageUrl: "/arcure/arcu-bio.jpeg",
    images: ["/arcure/arcu-bio.jpeg"],
    ingredientSubtitle: "Biotin 5000mcg + Folic Acid 1600mcg",
    featurePills: ["Glow - Shine", "Safed Chamak", "30 Tablets Caplets"],
    bulletPoints: [
      { icon: "sparkle", label: "Stimulates Keratin & Hair Growth" },
      { icon: "heart", label: "Radiant Skin & Safed Chamak" },
      { icon: "shield", label: "Strengthens Weak, Brittle Nails" }
    ],
    description: "Targeted beauty and vitality dietary supplement (30 Tablets Caplets). Formulated with high-strength Biotin (5000 mcg) and Folic Acid (1600 mcg) to nourish hair follicles, reduce excessive shedding, fortify brittle nails, and impart natural glow and shine.",
    benefits: [
      "Stimulates Natural Keratin for Fuller, Thicker Hair",
      "Visibly Reduces Hair Fall, Split Ends & Breakage",
      "Strengthens Fragile, Peeling and Splitting Nails",
      "Folic Acid Boosts Cellular Renewal for Vibrant, Glowing Skin"
    ],
    ingredients: "Biotin (D-Biotin 5000mcg), Folic Acid (1600mcg), Zinc Gluconate, Vitamin C, Calcium Phosphate, Magnesium Stearate.",
    howToUse: "Take 1 tablet caplet daily after breakfast with water. Recommended course is 60 to 90 days for optimal hair and nail results.",
    sku: "ABIO-005",
    rating: 5.0,
    reviewCount: 36,
    inStock: true,
    badge: "Hair & Nails"
  },
  {
    id: "10000000-0000-4000-8000-000000000006",
    title: "ARCU GLOW (Glutathione & Collagen)",
    price: 3850,
    originalPrice: 4600,
    category: "Supplements",
    imageUrl: "/arcure/arcu-glow.jpeg",
    images: ["/arcure/arcu-glow.jpeg"],
    ingredientSubtitle: "L-Reduced Glutathione 600mg + Marine Collagen 200mg",
    featurePills: ["Natural Skin Whitening", "Age Defying Formula", "30 Tablets"],
    bulletPoints: [
      { icon: "sparkle", label: "Lightens Pigmentation & Melanin" },
      { icon: "target", label: "Powerful Master Antioxidant" },
      { icon: "feather", label: "Restores Youthful Skin Elasticity" }
    ],
    description: "Natural skin whitening and age-defying dietary supplement (30 Tablets). Combines pure pharmaceutical-grade L-Reduced Glutathione (600mg) with bioavailable Marine Collagen (200mg) to block melanin darkening, neutralize oxidative stress, and firm skin from within.",
    benefits: [
      "Potent Master Antioxidant & Free-Radical Defense",
      "Inhibits Tyrosinase Enzyme to Fade Dark Melanin",
      "Marine Collagen Restores Firmness, Bounce & Reduces Fine Lines",
      "Promotes Unified, Glowing Whole-Body Complexion"
    ],
    ingredients: "L-Reduced Glutathione (600mg), Marine Hydrolyzed Collagen Peptides (200mg), Ascorbic Acid (Vitamin C 100mg), Alpha Lipoic Acid (50mg), Zinc.",
    howToUse: "Take 1 tablet daily with a full glass of water, preferably on an empty stomach in the morning or 2 hours after dinner.",
    sku: "AGLW-006",
    rating: 5.0,
    reviewCount: 49,
    inStock: true,
    badge: "Skin Whitening"
  }
];

export const CLINICAL_RESULTS: ClinicalResult[] = [
  {
    id: 1,
    name: "Huma K. (Age 24)",
    condition: "Active Inflammatory Acne",
    duration: "6 Weeks",
    beforeImage: "/results/result-1-before.jpg",
    afterImage: "/results/result-1-after.jpg",
    description: "Severe pustular breakouts and active epidermal erythema. Calmed active acne lesions and eliminated micro-cysts within 42 days of consistent morning and evening protocol.",
    productUsed: "ARCUDERM CS Serum + ARCU GLEAM Face Wash"
  },
  {
    id: 2,
    name: "Shahid M. (Age 29)",
    condition: "Post-Acne Hyperpigmentation",
    duration: "4 Weeks",
    beforeImage: "/results/result-2-before.jpg",
    afterImage: "/results/result-2-after.jpg",
    description: "Persistent post-inflammatory dark marks and rough epidermal texture. Significant 85%+ lightening of localized melanin spots with restored skin barrier luminosity.",
    productUsed: "ARCUDERM CS Serum (10% Vitamin C + 2% Salicylic)"
  },
  {
    id: 3,
    name: "Zoha A. (Age 32)",
    condition: "Stubborn Melasma & Uneven Complexion",
    duration: "8 Weeks",
    beforeImage: "/results/result-3-before.jpg",
    afterImage: "/results/result-3-after.jpg",
    description: "Dermal melasma patches and chronic photo-damage across cheekbones. Gradual epidermal cell turnover achieved deep pigmentation fading and unified facial radiance.",
    productUsed: "ARCUDERM CS Serum + Daily Barrier Protocol"
  },
  {
    id: 4,
    name: "Mubeen S. (Age 22)",
    condition: "Congested Pores & Papular Texture",
    duration: "5 Weeks",
    beforeImage: "/results/result-4-before.jpg",
    afterImage: "/results/result-4-after.jpg",
    description: "Excessive sebaceous shine, micro-comedones, and inflamed follicular bumps. Deeply cleared congested pores, regulated sebum production, and smoothed coarse skin surface.",
    productUsed: "ARCU GLEAM Medicated Face Wash + ARCUDERM CS"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Dr. Fatima Khan",
    role: "Hospital Medical Administrator",
    rating: 5,
    text: "Arcure Pharma has been our trusted medical supplier for over 3 years. Their pharmaceutical standards, product stability, and delivery reliability are unmatched in the region.",
    verified: true,
    date: "Verified Institutional Client"
  },
  {
    id: "rev-2",
    name: "Dr. Shaheena Baloch",
    role: "Consultant Dermatologist",
    rating: 5,
    text: "I regularly prescribe ARCU GLEAM and ARCUDERM Serum to patients with stubborn adult acne and melasma. The clinical formulations are gentle yet deliver visible epidermal clarity in weeks.",
    verified: true,
    date: "Aesthetic Clinic Lead"
  },
  {
    id: "rev-3",
    name: "Ahmed Raza",
    role: "Verified Customer",
    rating: 5,
    text: "Fast doorstep delivery across Karachi in less than 24 hours. The ARCU GLEAM face wash cleared my oily skin without drying it out. Genuine products with QR code verification.",
    verified: true,
    productTitle: "ARCU GLEAM Face Wash",
    date: "2 weeks ago"
  },
  {
    id: "rev-4",
    name: "Sara Malik",
    role: "Pharmacy Owner, Lahore",
    rating: 5,
    text: "Professional distribution team with authentic batches and clear expiry dates. Our pharmacy customers frequently return specifically asking for Arcure Pharma formulations.",
    verified: true,
    date: "Retail Pharmacy Partner"
  },
  {
    id: "rev-5",
    name: "Muhammad Usman",
    role: "Clinic Manager",
    rating: 5,
    text: "We place recurring monthly orders for our clinic. Every single parcel arrives impeccably sealed with cold-chain packaging when needed and complete clinical documentation.",
    verified: true,
    date: "Healthcare Provider"
  },
  {
    id: "rev-6",
    name: "Ayesha Siddiqui",
    role: "Verified Customer",
    rating: 5,
    text: "Ordering directly on WhatsApp is super fast and pleasant. The pharmacist answered all my questions regarding Vitamin D3 dosage. 10/10 recommend Arcure Pharma.",
    verified: true,
    productTitle: "Mida-D Vitamin D3",
    date: "1 month ago"
  }
];

export const CLIENT_CLINICS = [
  { name: "Dermalax Clinic", type: "Aesthetic Dermatology" },
  { name: "AB Skin Clinic", type: "Clinical Dermatology" },
  { name: "Al Khaleej Hospital", type: "Multi-Specialty Center" },
  { name: "Shamsi Hospital", type: "Medical & Surgical Facility" },
  { name: "Dr. Shaheena Clinic", type: "Skin & Laser Center" },
  { name: "Shan Clinic", type: "Family Health & Medicine" },
  { name: "Revive Aesthetic Clinic", type: "Advanced Skincare" },
  { name: "Dr. Ilyas Medical Center", type: "Orthopedic & Wellness" },
  { name: "Adnan Khan Hospital", type: "Tertiary Healthcare" },
];
