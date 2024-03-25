import { useEffect, useState, useRef } from 'react'

/**
 * Returns the current scroll position of the window and saves it to localStorage.
 *
 * @param {string} positionName - The name used to store the scroll position in localStorage.
 * @param {number} [delay=300] - The delay in milliseconds before the scroll position is saved to localStorage.
 * @return {number} The current scroll position of the window.
 */
export const useCurrentScrollPosition = (positionName: string, delay = 300) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Получение позиции скролла из localStorage при монтировании
        const savedScrollPosition = localStorage.getItem(positionName)
        if (savedScrollPosition !== null) {
            setScrollPosition(parseInt(savedScrollPosition))
        }

        const handleScroll = () => {
            const currentPosition = window.scrollY
            setScrollPosition(currentPosition)
            localStorage.setItem(positionName, currentPosition.toString())
        }

        const delayedHandleScroll = () => {
            if (timeoutIdRef.current !== null) {
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(handleScroll, delay)
        }

        window.addEventListener('scroll', delayedHandleScroll)

        return () => {
            if (timeoutIdRef.current !== null) {
                clearTimeout(timeoutIdRef.current)
            }
            window.removeEventListener('scroll', delayedHandleScroll)
        }
    }, [delay])

    return scrollPosition
}
