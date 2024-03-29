'use client'

import './AppMenu.css'
import Image from 'next/image'

export const AppMenu = () => (
    <div>
        <button className="app_menu_btn">
            <Image
                src="/img/burger-menu.svg"
                alt="header-menu-button"
                width={24}
                height={24}
            />
        </button>
    </div>
)
