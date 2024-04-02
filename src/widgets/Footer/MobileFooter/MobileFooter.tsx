'use client'

import cls from './MobileFooter.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderCartIcon } from '@/features/Cart'
import { FavoritesBtn } from '@/features/Favorites'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const MobileFooter = () => {
    const { t } = getTranslation()

    return (
        <nav className={cls.mobileFooter}>
            <Link className={cls.mobileNavbarBtn} href={'/'}>
                <Image
                    src={'/img/home.svg'}
                    alt={'Home page'}
                    width={30}
                    height={30}
                />
                <p>{t('buttons.home')}</p>
            </Link>
            <Link className={cls.mobileNavbarBtn} href={'/products'}>
                <Image
                    src={'/img/catalog.svg'}
                    alt={'Catalog'}
                    width={30}
                    height={30}
                />
                <p>{t('buttons.catalog')}</p>
            </Link>
            <div className={cls.mobileNavbarBtn}>
                <FavoritesBtn />
                <p>{t('buttons.favorites')}</p>
            </div>
            <div className={cls.mobileNavbarBtn}>
                <HeaderCartIcon />
                <p>{t('buttons.cart')}</p>
            </div>
            <Link className={cls.mobileNavbarBtn} href={'/form'}>
                <Image
                    src={'/img/more.svg'}
                    alt={'User page'}
                    width={30}
                    height={30}
                />
                <p>{t('buttons.form')}</p>
            </Link>
        </nav>
    )
}
