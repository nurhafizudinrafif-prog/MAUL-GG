export type ProductStatus = 'available' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  package: string;
  price: number;
  originalPrice?: number;
  isBestSeller?: boolean;
  isPromo?: boolean;
  duration: string;
  type: string;
  status: ProductStatus;
  category: string;
  features: string[];
  description?: string;
  iconName?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';

export interface AccountCredentials {
  emailOrUser: string;
  passwordOrKey: string;
  durationInfo?: string;
  notes?: string;
  sentAt?: string;
}

export interface Order {
  id: string; // e.g. #RXFIF-849201
  createdAt: string;
  productId: string;
  productName: string;
  package: string;
  price: number;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  paymentMethodId: string;
  paymentMethodName: string;
  status: OrderStatus;
  credentials?: AccountCredentials;
}

export type PaymentType = 'qris' | 'ewallet' | 'bank';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentType;
  accountNumber: string;
  accountName: string;
  logo: string;
  qrCodeUrl?: string;
  instructions: string[];
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  productUsed: string;
  date: string;
}

export interface StoreSettings {
  storeName: string;
  brandMonogram: string;
  tagline: string;
  whatsappNumber: string; // e.g. "6289512345678"
  whatsappDisplayName: string;
  adminUsername: string; // e.g. "admin"
  adminPin: string; // acts as admin password
  promoTitle: string;
  promoSubtitle: string;
  promoDiscountText: string;
  promoEndsAt: string; // ISO date string or timestamp
  isPromoActive: boolean;
}
