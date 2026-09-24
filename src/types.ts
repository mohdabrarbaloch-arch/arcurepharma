export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  sku: string;
  rating: number;
  reviewCount: number;
  isPrescriptionRequired?: boolean;
  inStock: boolean;
  badge?: string;
  ingredientSubtitle?: string;
  featurePills?: string[];
  bulletPoints?: { icon: string; label: string }[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  verified: boolean;
  date?: string;
  productTitle?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  name: string;
  location?: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  date: string;
  images?: string[];
  helpfulCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ClinicalResult {
  id: number;
  name: string;
  condition: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  productUsed: string;
}
