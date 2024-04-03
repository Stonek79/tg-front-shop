'use client'

import cls from './AppMenu.module.css'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button'

export const AppMenu = () => (
    <div>
        <Button variant="transparent" className={cls.appMenu}>
            <Image
                src="/img/burger-menu.svg"
                alt="header-menu-button"
                width={24}
                height={24}
            />
        </Button>
    </div>
)
