// Product Types
export interface Product {
  id: string
  handle: string
  title: string
  description?: string
  price: number
  compareAtPrice?: number
  costPerItem?: number
  category: string
  tags: string[]
  images: ProductImage[]
  variants: Variant[]
  reviews?: Review[]
  seoTitle?: string
  seoDescription?: string
  segmentation?: ProductSegmentation
}

export interface ProductImage {
  src: string
  alt: string
  position: number
}

export interface Variant {
  id: string
  sku: string
  title: string
  price: number
  compareAtPrice?: number
  option1Name: string
  option1Value: string
  option2Name?: string
  option2Value?: string
  quantity: number
}

export interface ProductSegmentation {
  segment: 'budget' | 'core' | 'premium' | 'ultra_premium'
  isBestSeller?: boolean
  isTrending?: boolean
  isNew?: boolean
  bundleIds?: string[]
  crossSellHandles?: string[]
}

// Cart & Order Types
export interface CartItem {
  variantId: string
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  paymentMethod: string
  paymentId: string
  shippingAddress: ShippingAddress
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface ShippingAddress {
  street: string
  number: string
  complement?: string
  city: string
  state: string
  zip: string
  country: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId?: string
  rating: number
  comment?: string
  verified: boolean
  createdAt: Date
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  image?: string
  role: 'USER' | 'ADMIN' | 'VENDOR'
  createdAt: Date
  updatedAt: Date
}

export interface AuthSession {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// Bundle Types
export interface Bundle {
  id: string
  handle: string
  title: string
  description: string
  productIds: string[]
  bundlePrice: number
  discountPercent: number
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  status: number
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface CheckoutFormData {
  email: string
  name: string
  phone: string
  cpf: string
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  cardToken: string
  installments: number
}

export interface ReviewFormData {
  rating: number
  comment: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  tags?: string[]
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating'
  page?: number
  limit?: number
}

// Error Types
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}
