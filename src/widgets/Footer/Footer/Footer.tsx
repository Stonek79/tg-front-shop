'use client'

import cls from './Footer.module.css'
import { MainFooter } from '../MainFooter/MainFooter'
import { MobileFooter } from '../MobileFooter/MobileFooter'
import { useMatchMedia } from '@/shared/lib/hooks/useMatchMedia'

export const Footer = () => {
    const { isMobile } = useMatchMedia()

    return (
        <div className={cls.footerLayout}>
            {isMobile ? <MobileFooter /> : <MainFooter />}
        </div>
    )
}
