'use client'

import { create } from 'zustand'
import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { Product } from '@/types/product'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartStore {
    cart: Product[]
    addProductToCart: (prod: Product) => void
    addSavedProductsToCart: (prod: Product[]) => void
    removeProductFromCart: (prod: Product) => void
    clearCart: () => void
    isInCart: (prod: Product) => boolean
}

export const useCartStore = createSelectors(
    create<CartStore>()(
        persist(
            (set, get) => ({
                cart: [],
                addProductToCart: (product) =>
                    set((state) => {
                        const isAdded = state.cart.find(
                            (item) => item.id === product.id,
                        )
                        return {
                            cart: isAdded
                                ? state.cart
                                : [...state.cart, product],
                        }
                    }),
                removeProductFromCart: (product) =>
                    set((state) => ({
                        cart: state.cart.filter(
                            (item) => item.id !== product.id,
                        ),
                    })),
                clearCart: () => set(() => ({ cart: [] })),
                addSavedProductsToCart: (products) =>
                    set(() => ({ cart: products })),
                isInCart: (product) => {
                    const found = get().cart.find(
                        (item) => item.id === product.id,
                    )
                    return !!found
                },
            }),
            {
                name: 'cart-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
