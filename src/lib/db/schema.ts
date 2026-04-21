import {
  pgTable,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  uuid,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core'

// ============================================================================
// USERS & AUTHENTICATION
// ============================================================================

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    cpf: text('cpf'), // criptografado com AES-256-GCM
    emailVerified: timestamp('email_verified'),
    image: varchar('image', { length: 500 }),
    role: varchar('role', { length: 20 }).default('USER'), // USER | ADMIN | VENDOR
    twoFactorSecret: varchar('two_factor_secret', { length: 255 }), // TOTP secret para 2FA
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
    roleIdx: index('users_role_idx').on(table.role),
    createdIdx: index('users_created_idx').on(table.createdAt),
  })
)

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('sessions_user_idx').on(table.userId),
    tokenIdx: index('sessions_token_idx').on(table.sessionToken),
  })
)

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 255 }).notNull(),
    tokenFamily: uuid('token_family').notNull(), // para detectar token reuse
    expiresAt: timestamp('expires_at').notNull(),
    revoked: boolean('revoked').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('refresh_tokens_user_idx').on(table.userId),
    familyIdx: index('refresh_tokens_family_idx').on(table.tokenFamily),
  })
)

// ============================================================================
// PRODUCTS
// ============================================================================

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    handle: varchar('handle', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 120 }).notNull(),
    description: text('description'),
    vendor: varchar('vendor', { length: 100 }).default('TrendNow Brasil'),
    category: varchar('category', { length: 50 }).notNull(),
    tags: jsonb('tags').default([]), // array of strings
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
    costPerItem: decimal('cost_per_item', { precision: 10, scale: 2 }),
    status: varchar('status', { length: 20 }).default('draft'), // draft | active | archived
    published: boolean('published').default(false),
    seoTitle: varchar('seo_title', { length: 60 }),
    seoDescription: varchar('seo_description', { length: 160 }),
    images: jsonb('images').default([]), // array of { src, alt, position }
    dimensions: jsonb('dimensions'), // { height, width, length, weight }
    segmentation: jsonb('segmentation'), // { segment, isBestSeller, isTrending, isNew }
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    handleIdx: uniqueIndex('products_handle_idx').on(table.handle),
    categoryIdx: index('products_category_idx').on(table.category),
    statusIdx: index('products_status_idx').on(table.status),
    priceIdx: index('products_price_idx').on(table.price),
  })
)

export const variants = pgTable(
  'variants',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    sku: varchar('sku', { length: 100 }).notNull().unique(),
    title: varchar('title', { length: 120 }).default('Default Title'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
    costPerItem: decimal('cost_per_item', { precision: 10, scale: 2 }),
    weight: integer('weight'), // em gramas
    option1Name: varchar('option1_name', { length: 50 }).default('Title'),
    option1Value: varchar('option1_value', { length: 100 }).default('Default Title'),
    option2Name: varchar('option2_name', { length: 50 }),
    option2Value: varchar('option2_value', { length: 100 }),
    imageSrc: varchar('image_src', { length: 500 }),
    requiresShipping: boolean('requires_shipping').default(true),
    taxable: boolean('taxable').default(true),
    quantity: integer('quantity').default(0), // estoque
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    productIdIdx: index('variants_product_idx').on(table.productId),
    skuIdx: uniqueIndex('variants_sku_idx').on(table.sku),
  })
)

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    rating: integer('rating').notNull(), // 1-5
    comment: text('comment'),
    verified: boolean('verified').default(false), // compra verificada
    helpful: integer('helpful').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    productIdIdx: index('reviews_product_idx').on(table.productId),
    userIdIdx: index('reviews_user_idx').on(table.userId),
    ratingIdx: index('reviews_rating_idx').on(table.rating),
  })
)

// ============================================================================
// CART & ORDERS
// ============================================================================

export const carts = pgTable(
  'carts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    items: jsonb('items').notNull(), // array of { variantId, quantity, price }
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('carts_user_idx').on(table.userId),
  })
)

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    orderNumber: varchar('order_number', { length: 20 }).notNull().unique(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    items: jsonb('items').notNull(), // array of { variantId, quantity, price }
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
    shipping: decimal('shipping', { precision: 10, scale: 2 }).notNull(),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    status: varchar('status', { length: 20 }).default('PENDING'), // PENDING | PAID | SHIPPED | DELIVERED | CANCELLED
    paymentStatus: varchar('payment_status', { length: 20 }).default('PENDING'), // PENDING | APPROVED | REJECTED
    paymentMethod: varchar('payment_method', { length: 50 }), // CREDIT_CARD | DEBIT_CARD | BOLETO
    paymentId: varchar('payment_id', { length: 255 }), // ID do Mercado Pago
    shippingAddress: jsonb('shipping_address').notNull(), // { street, city, state, zip, country }
    billingAddress: jsonb('billing_address'),
    trackingNumber: varchar('tracking_number', { length: 100 }),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex('orders_number_idx').on(table.orderNumber),
    userIdIdx: index('orders_user_idx').on(table.userId),
    statusIdx: index('orders_status_idx').on(table.status),
    createdIdx: index('orders_created_idx').on(table.createdAt),
  })
)

// ============================================================================
// LGPD & COMPLIANCE
// ============================================================================

export const consents = pgTable(
  'consents',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 255 }), // para não-logged users
    categories: jsonb('categories').notNull(), // { analytics: true, marketing: false }
    ipAddress: varchar('ip_address', { length: 45 }), // anonimizado
    userAgent: varchar('user_agent', { length: 500 }),
    version: varchar('version', { length: 20 }).notNull(), // versão da política
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('consents_user_idx').on(table.userId),
    createdIdx: index('consents_created_idx').on(table.createdAt),
  })
)

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    action: varchar('action', { length: 100 }).notNull(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    targetId: varchar('target_id', { length: 255 }),
    targetType: varchar('target_type', { length: 50 }), // USER, ORDER, PRODUCT, etc
    before: jsonb('before'),
    after: jsonb('after'),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: varchar('user_agent', { length: 500 }),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('audit_logs_user_idx').on(table.userId),
    actionIdx: index('audit_logs_action_idx').on(table.action),
    createdIdx: index('audit_logs_created_idx').on(table.createdAt),
  })
)

// ============================================================================
// BUNDLES & PROMOTIONS
// ============================================================================

export const bundles = pgTable(
  'bundles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    handle: varchar('handle', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 120 }).notNull(),
    description: text('description'),
    productIds: jsonb('product_ids').notNull(), // array of product UUIDs
    bundlePrice: decimal('bundle_price', { precision: 10, scale: 2 }).notNull(),
    discountPercent: integer('discount_percent').notNull(), // 5-50
    status: varchar('status', { length: 20 }).default('active'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    handleIdx: uniqueIndex('bundles_handle_idx').on(table.handle),
    statusIdx: index('bundles_status_idx').on(table.status),
  })
)

// ============================================================================
// TYPES & EXPORTS
// ============================================================================

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
export type Product = typeof products.$inferSelect
export type ProductInsert = typeof products.$inferInsert
export type Variant = typeof variants.$inferSelect
export type VariantInsert = typeof variants.$inferInsert
export type Order = typeof orders.$inferSelect
export type OrderInsert = typeof orders.$inferInsert
export type Review = typeof reviews.$inferSelect
export type ReviewInsert = typeof reviews.$inferInsert
export type Bundle = typeof bundles.$inferSelect
export type BundleInsert = typeof bundles.$inferInsert
