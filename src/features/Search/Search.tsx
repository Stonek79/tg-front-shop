import './Search.css'
import React from 'react'
import Image from 'next/image'

export const Search = () => {
    return (
        <div>
            <button className="search_menu_btn">
                <Image
                    src="/img/search.svg"
                    alt="Кнопка поиска"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
