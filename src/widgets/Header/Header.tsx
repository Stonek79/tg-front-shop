import cls from './Header.module.css'
import { HeaderLogo } from '@/features/HeaderLogo'
import { FavoritesBtn } from '@/features/Favorites'
import { UserMenu } from '@/features/UserMenu'
import { AppMenu } from '@/features/AppMenu'
import { HeaderCartIcon } from '@/features/Cart'
import { SearchButton } from '@/features/Search'
import { Suspense } from 'react'

export const Header = () => (
    <header className={cls.headerLayout}>
        <div className={cls.headerMain}>
            <div className={cls.headerWrapper}>
                <section className={cls.headerLeft}>
                    <AppMenu />
                    <Suspense fallback={<div>Loading SearchButton...</div>}>
                        <SearchButton />
                    </Suspense>
                </section>
                <section className={cls.headerCenter}>
                    <HeaderLogo />
                </section>
                <section className={cls.headerRight}>
                    <FavoritesBtn checkMobile />
                    <HeaderCartIcon />
                    <UserMenu />
                </section>
            </div>
        </div>
    </header>
)
