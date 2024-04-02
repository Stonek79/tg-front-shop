'use client'

import cls from './Footer.module.css'
import { MainFooter } from '../MainFooter/MainFooter'
import { MobileFooter } from '../MobileFooter/MobileFooter'
import { useMaxWidthMediaQuery } from '@/shared/lib/hooks/useMediaQuery'

export const Footer = () => {
    const isMobile = useMaxWidthMediaQuery(768)

    return (
        <div className={cls.footerLayout}>
            {isMobile ? <MobileFooter /> : <MainFooter />}
        </div>
    )
}
