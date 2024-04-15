'use client'

import cls from './MenuButton.module.css'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button'
import { usePathname, useRouter } from 'next/navigation'

export const MenuButton = () => {
    const router = useRouter()
    const path = usePathname()
    const isMenuOpen = path === '/menu'

    const handleOpenMenu = () => {
        router.push('/menu')
    }

    const handleCloseMenu = () => {
        router.back()
    }

    return (
        <div>
            {!isMenuOpen ? (
                <Button
                    onClick={handleOpenMenu}
                    variant="transparent"
                    className={cls.openButton}
                >
                    <Image
                        src="/img/burger-menu.svg"
                        alt="header-menu-button-open"
                        width={24}
                        height={24}
                    />
                </Button>
            ) : (
                <Button
                    className={cls.closeButton}
                    variant="transparent"
                    onClick={handleCloseMenu}
                >
                    <span className={cls.span} />
                </Button>
            )}
        </div>
    )
}
