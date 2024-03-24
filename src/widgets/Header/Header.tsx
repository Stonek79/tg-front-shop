import './Header.css'
import { HeaderLogo } from '@/features/HeaderLogo'
import { FavoritesBtn } from '@/features/Favorites'
import { UserMenu } from '@/features/UserMenu'
import { AppMenu } from '@/features/AppMenu'
import { SearchContainer } from '@/features/Search'
import { HeaderCartIcon } from '@/features/Cart'

export const Header = () => (
    <header className="header_layout">
        <div className="header_main">
            <div className="header_wrapper">
                <div className="header_left">
                    <AppMenu />
                    <SearchContainer />
                </div>
                <div className="header_center">
                    <HeaderLogo />
                </div>
                <div className="header_right">
                    <FavoritesBtn />
                    <HeaderCartIcon />
                    <UserMenu />
                </div>
            </div>
        </div>
    </header>
)
