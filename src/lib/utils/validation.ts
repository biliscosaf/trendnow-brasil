import { z } from 'zod'

// CPF validation
export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleaned)) return false

  let sum = 0
  let remainder: number

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false

  return true
}

// ============================================================================
// Auth Schemas
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(5).max(255),
  password: z.string().min(8).max(128),
})

export const registerSchema = z
  .object({
    email: z.string().email('Email inválido').min(5).max(255),
    password: z.string().min(12).max(128),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(12).max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

// ============================================================================
// User Schemas
// ============================================================================

export const userProfileSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome inválido'),
  phone: z
    .string()
    .regex(/^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/, 'Telefone inválido')
    .optional()
    .or(z.literal('')),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .refine((cpf) => validateCPF(cpf), 'CPF inválido')
    .optional()
    .or(z.literal('')),
})

export const shippingAddressSchema = z.object({
  street: z.string().min(5).max(100),
  number: z.string().min(1).max(20),
  complement: z.string().max(100).optional(),
  city: z.string().min(2).max(100),
  state: z.string().regex(/^[A-Z]{2}$/, 'UF inválido'),
  zip: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
    .transform((val) => val.replace('-', '')),
  country: z.string().default('BR'),
})

// ============================================================================
// Product Schemas
// ============================================================================

export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().max(9999).optional(),
  search: z.string().max(255).optional(),
  tags: z.array(z.string()).optional(),
  sort: z
    .enum(['newest', 'price_asc', 'price_desc', 'rating'])
    .optional()
    .default('newest'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(15),
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z
    .string()
    .min(10)
    .max(1000)
    .transform((s) => {
      // Sanitização básica (sem HTML)
      return s.replace(/<[^>]*>/g, '')
    })
    .optional()
    .or(z.literal('')),
})

// ============================================================================
// Cart & Checkout Schemas
// ============================================================================

export const cartItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
})

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().uuid(),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1)
    .max(50),
  email: z.string().email(),
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/),
  phone: z.string().regex(/^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .refine((cpf) => validateCPF(cpf), 'CPF inválido'),
  shippingAddress: shippingAddressSchema,
  billingAddress: shippingAddressSchema.optional(),
  cardToken: z.string().min(10).max(100),
  installments: z.number().int().min(1).max(12).default(1),
})

// ============================================================================
// Type Exports
// ============================================================================

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type UserProfileInput = z.infer<typeof userProfileSchema>
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>
export type ProductFilterInput = z.infer<typeof productFilterSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
