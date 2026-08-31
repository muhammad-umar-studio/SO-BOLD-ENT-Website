export type ProductCategory =
  | 'All'
  | 'Microphones'
  | 'Studio Monitors'
  | 'Audio Interfaces'
  | 'Synthesizers & Controllers'
  | 'Studio Accessories';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Pattern: Multi-Polar", "Finish: Onyx Black"
  sku: string;
  priceOffset?: number; // +/- USD adjustment from base product price
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: string[];
  variants?: ProductVariant[];
  description: string;
  features?: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface CartItemPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface OrderShippingAddress {
  addressLine1?: string;
  addressLine2?: string;
  adminArea2?: string; // City
  adminArea1?: string; // State
  postalCode?: string;
  countryCode?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderRecord {
  orderId: string;
  paypalOrderId: string;
  payerEmail: string;
  payerName?: string;
  shippingAddress?: OrderShippingAddress;
  items: OrderItem[];
  subtotalPaid: number;
  shippingPaid: number;
  totalPaid: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Cancelled';
  createdAt: string;
}
