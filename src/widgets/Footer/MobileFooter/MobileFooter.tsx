'use client'

import './MobileFooter.css'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderCartIcon } from '@/features/Cart'
import { FavoritesBtn } from '@/features/Favorites'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const MobileFooter = () => {
    const { t } = getTranslation('buttons')

    return (
        <nav className="mobile-footer">
            <Link className="mobile-navbar-btn" href={'/'}>
                <Image
                    src={'/img/home.svg'}
                    alt={'Home page'}
                    width={30}
                    height={30}
                />
                <p>{t('home')}</p>
            </Link>
            <Link className="mobile-navbar-btn" href={'/products'}>
                <Image
                    src={'/img/catalog.svg'}
                    alt={'Catalog'}
                    width={30}
                    height={30}
                />
                <p>{t('catalog')}</p>
            </Link>
            <div className="mobile-navbar-btn">
                <FavoritesBtn />
                <p>{t('favorites')}</p>
            </div>
            <div className="mobile-navbar-btn">
                <HeaderCartIcon />
                <p>{t('cart')}</p>
            </div>
            <Link className="mobile-navbar-btn" href={'/form'}>
                <Image
                    src={'/img/more.svg'}
                    alt={'User page'}
                    width={30}
                    height={30}
                />
                <p>{t('form')}</p>
            </Link>
        </nav>
    )
}
