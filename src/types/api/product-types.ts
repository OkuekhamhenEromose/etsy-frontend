// src/types/api/product.types.ts
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  price: number;
  discount_price: number | null;
  final_price: number;
  discount_percentage: number;
  
  // Relationships
  category: Category;
  category_name: string;
  brand: Brand | null;
  brand_name: string | null;
  tags: Tag[];
  available_sizes: ProductSize[];
  
  // Images
  main: string;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  
  // Inventory
  is_available: boolean;
  in_stock: number;
  is_low_stock: boolean;
  is_out_of_stock: boolean;
  
  // Features
  is_featured: boolean;
  is_bestseller: boolean;
  is_deal: boolean;
  is_new_arrival: boolean;
  
  // Ratings
  rating: number;
  review_count: number;
  star_rating: StarRating;
  
  // Condition
  condition: 'new' | 'like_new' | 'good' | 'vintage' | 'handmade';
  color: string | null;
  material: string | null;
  
  // Timestamps
  created: string;
  updated: string;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
  page_count: number;
}

export interface ProductFilterParams {
  search?: string;
  category?: string | number;
  category_slug?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  featured?: boolean;
  bestseller?: boolean;
  deal?: boolean;
  new_arrival?: boolean;
  sort?: string;
  page?: number;
  page_size?: number;
}

export interface StarRating {
  full_stars: number;
  half_star: number;
  empty_stars: number;
  rating_value: number;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  category_type: string;
  image: string;
  icon: string | null;
  is_active: boolean;
  is_featured: boolean;
  subcategories_count: number;
  products_count: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  is_active: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ProductSize {
  id: number;
  category: 'clothing' | 'shoes' | 'jewelry' | 'home' | 'other';
  category_display: string;
  name: string;
  code: string;
}