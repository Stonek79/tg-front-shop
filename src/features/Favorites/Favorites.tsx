import './Favorites.css'
import Link from 'next/link'
import { classNames } from '@/shared/lib/helpers/classNames'

interface FavoritesProps {
    amount?: number
    className?: string
}

export const Favorites = (props: FavoritesProps) => {
    const { amount = 2, className } = props
    const cn = classNames('', { ['not-empty']: !!amount })
    return (
        <div className="favorites_btn">
            <Link
                className="favorites"
                href={'/favorites'}
                aria-label="Избранное"
            >
                <span className={cn}>{amount}</span>
            </Link>
        </div>
    )
}
