import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { Product, ProductVariant, CartItem } from '@/types/store';

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Drawer visibility controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart modifications
  addItem: (product: Product, selectedVariant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;

  // Derived state calculations
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, selectedVariant, quantity = 1) => {
        const currentItems = get().items;
        const targetVariantId = selectedVariant ? selectedVariant.id : 'default';

        const existingIndex = currentItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            (item.selectedVariant ? item.selectedVariant.id : 'default') === targetVariantId
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                product,
                selectedVariant,
                quantity,
              },
            ],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, variantId) => {
        const targetVariantId = variantId || 'default';
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (item.selectedVariant ? item.selectedVariant.id : 'default') === targetVariantId
              )
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const targetVariantId = variantId || 'default';
        set((state) => ({
          items: state.items.map((item) => {
            const matchesProduct = item.product.id === productId;
            const matchesVariant =
              (item.selectedVariant ? item.selectedVariant.id : 'default') === targetVariantId;

            if (matchesProduct && matchesVariant) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => {
          const basePrice = item.product.price;
          const offset = item.selectedVariant?.priceOffset || 0;
          return acc + (basePrice + offset) * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'soboldents-cart-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : noopStorage)),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
