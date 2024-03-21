import { useCallback, useRef } from 'react'

type Callback = (...args: string[]) => void

export const useThrottle = (callback: Callback, delay: number): Callback => {
    const timeoutRef = useRef(false)

    return useCallback(
        (...args: string[]) => {
            if (!timeoutRef.current) {
                callback(...args)

                timeoutRef.current = true

                setTimeout(() => {
                    timeoutRef.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
