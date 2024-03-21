'use client'
import './FavoritesBtn.css'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useFavoritesStore } from '@/entities/FavoritesProducts'

export const FavoritesBtn = () => {
    const { t } = getTranslation()
    const amount = useFavoritesStore.use.favorites().length

    return (
        <div className="favorites_btn">
            <Link
                className="favorites"
                href={'/favorites'}
                aria-label={t('ariaLabelFavorites')}
            >
                {Boolean(amount) && (
                    <span className={'not-empty'}>{amount}</span>
                )}
            </Link>
        </div>
    )
}
