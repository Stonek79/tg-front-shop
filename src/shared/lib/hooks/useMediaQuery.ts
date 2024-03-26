'use client'

import { useState, useEffect } from 'react'

export const useMaxWidthMediaQuery = (maxWidth: number) => {
    const [isMaxWidth, setIsMaxWidth] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMaxWidth(window.innerWidth <= maxWidth)
        }

        handleResize() // Инициализация значения при монтировании компонента

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [maxWidth])

    return isMaxWidth
}
