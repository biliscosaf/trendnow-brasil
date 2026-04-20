import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, AuthSession, Product } from '@/types'

// ============================================================================
// Cart Store
// ============================================================================

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateItem: (variantId: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.variantId === item.variantId)

        if (existingItem) {
          existingItem.quantity = Math.min(existingItem.quantity + item.quantity, 99)
        } else {
          items.push(item)
        }

        set({ items })
        get().calculateTotal()
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }))
        get().calculateTotal()
      },

      updateItem: (variantId, quantity) => {
        const items = get().items
        const item = items.find((i) => i.variantId === variantId)

        if (item) {
          if (quantity <= 0) {
            get().removeItem(variantId)
          } else {
            item.quantity = Math.min(quantity, 99)
            set({ items })
            get().calculateTotal()
          }
        }
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      calculateTotal: () => {
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total })
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
)

// ============================================================================
// Auth Store
// ============================================================================

interface AuthStore {
  session: AuthSession | null
  isLoading: boolean
  error: string | null
  setSession: (session: AuthSession | null) => void
  clearAuth: () => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  isLoading: false,
  error: null,

  setSession: (session) => set({ session }),

  clearAuth: () => set({ session: null, error: null }),

  setError: (error) => set({ error }),

  setLoading: (loading) => set({ isLoading: loading }),

  logout: async () => {
    try {
      set({ isLoading: true })
      await fetch('/api/auth/logout', { method: 'POST' })
      set({ session: null, isLoading: false })
    } catch (error) {
      set({ error: 'Falha ao fazer logout', isLoading: false })
    }
  },
}))

// ============================================================================
// UI Store
// ============================================================================

interface UIStore {
  theme: 'light' | 'dark'
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  selectedProduct: Product | null
  toggleTheme: () => void
  toggleMobileMenu: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  setSelectedProduct: (product: Product | null) => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  theme: 'light',
  isMobileMenuOpen: false,
  isCartOpen: false,
  selectedProduct: null,

  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
  },

  toggleMobileMenu: () => {
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }))
  },

  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }))
  },

  openCart: () => {
    set({ isCartOpen: true })
  },

  closeCart: () => {
    set({ isCartOpen: false })
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product })
  },
}))

// ============================================================================
// Combined hook para usar múltiplos stores
// ============================================================================

export function useStore() {
  return {
    cart: useCartStore(),
    auth: useAuthStore(),
    ui: useUIStore(),
  }
}
