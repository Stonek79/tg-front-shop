import { useCallback, useEffect, useRef } from 'react'

export function useDebounceCallback(
    callback: (...args: any[]) => void,
    delay: number,
) {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<NodeJS.Timeout>()

    // Update the callback to be used, if it changes
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    // Return a debounced version of the callback
    return useCallback(
        (...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args)
            }, delay)
        },
        [delay],
    )
}
