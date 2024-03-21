import './UserMenu.css'
import React from 'react'
import Image from 'next/image'

export const UserMenu = () => {
    return (
        <div>
            <button className="profile_btn">
                <Image
                    src="/img/userIcon.svg"
                    alt="Кнопка профиля"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
