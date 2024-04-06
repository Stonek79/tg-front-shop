'use client'
import { useLayoutEffect, useState } from 'react'

const queries = [
    '(max-width: 768px)',
    '(min-width: 769px) and (max-width: 1200px)',
    '(min-width: 1201px)',
]

interface MatchMediaState {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
}

/**
 * Custom hook to handle match media queries and return the state of different screen sizes.
 *
 * @return {MatchMediaState} The state of different screen sizes
 */
export const useMatchMedia = (): MatchMediaState => {
    const initialQueryList = queries.map((query) => !!query)
    const [values, setValues] = useState(initialQueryList)

    useLayoutEffect(() => {
        const mediaQueryLists = queries.map((query) => matchMedia(query))

        /**
         * Retrieves the values from the media query lists.
         *
         * @return {Array<boolean>} an array containing the matches of the media query lists
         */
        const getValues = (): Array<boolean> =>
            mediaQueryLists.map((list) => list.matches)

        const handler = () => setValues(getValues)

        setValues(getValues)

        mediaQueryLists.forEach((list) =>
            list.addEventListener('change', handler),
        )

        return () =>
            mediaQueryLists.forEach((list) =>
                list.removeEventListener('change', handler),
            )
    }, [])

    return ['isMobile', 'isTablet', 'isDesktop'].reduce(
        (acc, screen, index) => ({
            ...acc,
            [screen]: values[index],
        }),
        {} as MatchMediaState,
    )
}
