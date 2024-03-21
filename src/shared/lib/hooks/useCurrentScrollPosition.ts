import { useEffect, useState } from 'react'

export const useCurrentScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY
            setScrollPosition(currentPosition)
            localStorage.setItem('scrollPosition', currentPosition.toString())
        }

        window.addEventListener('scroll', handleScroll)

        // Получение позиции скролла из localStorage при монтировании
        const savedScrollPosition = localStorage.getItem('scrollPosition')
        if (savedScrollPosition !== null) {
            setScrollPosition(parseInt(savedScrollPosition))
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return scrollPosition
}
