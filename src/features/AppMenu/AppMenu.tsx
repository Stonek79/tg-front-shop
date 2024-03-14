import './AppMenu.css'
import React from 'react'
import Image from 'next/image'

export const AppMenu = () => {
    return (
        <div>
            <button className="app_menu_btn">
                <Image
                    src="/img/burger-menu.svg"
                    alt="Кнопка меню"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
