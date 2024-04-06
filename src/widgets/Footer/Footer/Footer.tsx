'use client'

import cls from './Footer.module.css'
import { MainFooter } from '../MainFooter/MainFooter'
import { MobileFooter } from '../MobileFooter/MobileFooter'
import { useMatchMedia } from '@/shared/lib/hooks/useMatchMedia'
import { useEffect, useState } from 'react'

export const Footer = () => {
    const { isMobile } = useMatchMedia()
    const [loaded, setLoaded] = useState(false)

    // TODO: research possibility to use middleware for checking the screen size
    useEffect(() => {
        setLoaded(true)
    },[])

    return (
        <div className={cls.footerLayout}>
            {loaded ?  (isMobile ? <MobileFooter /> : <MainFooter />) : null}
        </div>
    )
}
