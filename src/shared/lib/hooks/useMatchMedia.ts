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

export const useMatchMedia = (): MatchMediaState => {
    const initialQueryList = queries.map((query) => !!query)
    const [values, setValues] = useState(initialQueryList)

    useLayoutEffect(() => {
        const mediaQueryLists = queries.map((query) => matchMedia(query))

        const getValues = () => mediaQueryLists.map((list) => list.matches)

        const handler = () => setValues(getValues)

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
