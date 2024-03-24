'use client'

import { Product } from '@/types/product'
import { create } from 'zustand'
import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesStore {
    favorites: Product[]
    addFavorites: (prod: Product) => void
    removeFavorites: (prod: Product) => void
    isFavorite: (prod: Product) => boolean
    clearFavorites: () => void
}

export const useFavoritesStore = createSelectors(
    create<FavoritesStore>()(
        persist(
            (set, get) => ({
                favorites: [],
                addFavorites: (product) =>
                    set((state) => {
                        const isAdded = state.favorites.find(
                            (item) => item.id === product.id,
                        )
                        return {
                            favorites: isAdded
                                ? state.favorites
                                : [...state.favorites, product],
                        }
                    }),
                removeFavorites: (product) =>
                    set((state) => ({
                        favorites: state.favorites.filter(
                            (item) => item.id !== product.id,
                        ),
                    })),
                isFavorite: (product) => {
                    const found = get().favorites.find(
                        (item) => item.id === product.id,
                    )
                    return !!found
                },
                clearFavorites: () => set(() => ({ favorites: [] })),
            }),
            {
                name: 'favorites',
                // skipHydration: true,
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
