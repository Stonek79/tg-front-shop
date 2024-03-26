'use client'

import './Footer.css'
import { MainFooter } from '../MainFooter/MainFooter'
import { MobileFooter } from '../MobileFooter/MobileFooter'
import { useMaxWidthMediaQuery } from '@/shared/lib/hooks/useMediaQuery'

export const Footer = () => {
    const isMobile = useMaxWidthMediaQuery(768)

    return (
        <div className="footer_layout">
            {isMobile ? <MobileFooter /> : <MainFooter />}
        </div>
    )
}
