'use client'
import './AddFavoriteButton.css'
import Image from 'next/image'
import { useFavoritesStore } from '@/entities/FavoritesProducts'
import { Product } from '@/types/product'
import { Suspense, useEffect, useState } from 'react'

export const AddFavoriteButton = ({ product }: { product: Product }) => {
    const addFavorites = useFavoritesStore.use.addFavorites()
    const removeFavorites = useFavoritesStore.use.removeFavorites()
    const isFavorite = useFavoritesStore.use.isFavorite()
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        useFavoritesStore.persist.rehydrate()
        const hasHydrated = useFavoritesStore.persist.hasHydrated()
        hasHydrated && setFavorite(isFavorite(product))
    }, [])

    const handleAddFavorites = () => {
        addFavorites(product)
        setFavorite(true)
    }

    const handleRemoveFavorites = () => {
        removeFavorites(product)
        setFavorite(false)
    }

    return (
        <div>
            <Suspense fallback={<h4>LOADING...</h4>}>
                {favorite ? (
                    <button
                        onClick={handleRemoveFavorites}
                        className="favoritesBtn"
                    >
                        <Image
                            className="favoritesImg"
                            src={'/img/checked-favorites.svg'}
                            alt="favorites"
                            width={24}
                            height={24}
                        />
                    </button>
                ) : (
                    <button
                        onClick={handleAddFavorites}
                        className="favoritesBtn"
                    >
                        <Image
                            className="favoritesImg"
                            src={'/img/favorites.svg'}
                            alt="favorites"
                            width={24}
                            height={24}
                        />
                    </button>
                )}
            </Suspense>
        </div>
    )
}
