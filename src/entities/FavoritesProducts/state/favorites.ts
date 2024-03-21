'use client'

import { Product } from '@/types/product'
import { create } from 'zustand'
import { createSelectors } from '@/shared/lib/helpers/createSelectors'

interface FavoritesStore {
    favorites: Product[]
    addFavorites: (prod: Product) => void
    removeFavorites: (prod: Product) => void
}

export const useFavoritesStore = createSelectors(
    create<FavoritesStore>()((set) => ({
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
                    (item) => item.id === product.id,
                ),
            })),
    })),
)
