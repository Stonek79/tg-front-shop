import './SearchButton.css'
import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

export const SearchButton = ({
    setSearchOpened,
}: {
    setSearchOpened: Dispatch<SetStateAction<boolean>>
}) => (
    <div>
        <button
            onClick={() => setSearchOpened(true)}
            className="search_menu_btn"
        >
            <Image
                src="/img/search.svg"
                alt="Кнопка поиска"
                width={24}
                height={24}
            />
        </button>
    </div>
)
