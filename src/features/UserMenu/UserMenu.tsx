import cls from './UserMenu.module.css'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const UserMenu = () => (
    <div>
        <Link href={'/user'} className={cls.profileBtn}>
            <Image
                src="/img/userIcon.svg"
                alt="Кнопка профиля"
                width={24}
                height={24}
            />
        </Link>
    </div>
)
