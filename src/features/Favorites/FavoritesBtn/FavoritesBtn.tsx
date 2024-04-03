'use client'
import Link from 'next/link'
import { useFavoritesStore } from '@/shared/state/favorites'
import Image from 'next/image'
import { useMatchMedia } from '@/shared/lib/hooks/useMatchMedia'

export const FavoritesBtn = ({
    checkMobile = false,
}: {
    checkMobile?: boolean
}) => {
    const amount = useFavoritesStore.use.favorites().length
    const { isMobile } = useMatchMedia()

    return checkMobile && isMobile ? null : (
        <div className="iconBtnCF">
            <Link
                className="iconLinkCF"
                href={'/favorites'}
                aria-label="aria-favorites-button"
            >
                <Image
                    src={'/img/favorites.svg'}
                    alt={'Корзина'}
                    className="iconCF"
                    width={24}
                    height={24}
                />
                {Boolean(amount) && (
                    <span className="notEmptyCF">{amount}</span>
                )}
            </Link>
        </div>
    )
}
