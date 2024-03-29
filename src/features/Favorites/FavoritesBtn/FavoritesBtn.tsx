'use client'
import './FavoritesBtn.css'
import Link from 'next/link'
import { useFavoritesStore } from '@/shared/state/favorites'

export const FavoritesBtn = () => {
    const amount = useFavoritesStore.use.favorites().length

    return (
        <div className="favorites_btn">
            <Link
                className="favorites"
                href={'/favorites'}
                aria-label="aria-favorites-button"
            >
                {Boolean(amount) && (
                    <span className={'not-empty'}>{amount}</span>
                )}
            </Link>
        </div>
    )
}
