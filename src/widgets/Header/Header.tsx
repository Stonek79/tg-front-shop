'use client'

import './Header.css'
import { HeaderLogo } from '@/features/HeaderLogo'
import { Favorites } from '@/features/Favorites'
import { UserMenu } from '@/features/UserMenu'
import { AppMenu } from '@/features/AppMenu'
import { Search } from '@/features/Search'

export const Header = () => {
    return (
        <header className="header_layout">
            <div className="header_main">
                <div className="header_wrapper">
                    <div className="header_left">
                        <AppMenu />
                        <Search />
                    </div>
                    <div className="header_center">
                        <HeaderLogo />
                    </div>
                    <div className="header_right">
                        <Favorites />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}
