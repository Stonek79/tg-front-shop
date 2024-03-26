'use client'

import './Footer.css'
import { MainFooter } from '../MainFooter/MainFooter'
import { useCurrentScrollPosition } from '@/shared/lib/hooks/useCurrentScrollPosition'
import { MobileFooter } from '../MobileFooter/MobileFooter'

export const Footer = () => {
    const position = useCurrentScrollPosition('Footer')

    return (
        <div className="footer_layout">
            {position > 768 ? <MainFooter /> : <MobileFooter />}
        </div>
    )
}
