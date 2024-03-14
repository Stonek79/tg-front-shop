'use client'
import { useEffect, useRef } from 'react'

export const useTgApp = () => {
    const tgRef = useRef<any>(null)
    const loadedRef = useRef(false)
    const isTgPlatform = useRef<boolean>(false)

    useEffect(() => {
        // @ts-ignore
        const tgApp = window?.Telegram?.WebApp

        if (tgApp && !loadedRef.current) {
            tgApp.ready()
            tgApp.expand()

            tgRef.current = tgApp
            loadedRef.current = true
            isTgPlatform.current = tgApp.platform !== 'unknown'
        }
    }, [])

    return {
        tg: tgRef.current,
        loaded: loadedRef.current,
        queryId: tgRef.current?.initDataUnsafe?.query_id,
        isTgPlatform: isTgPlatform.current,
    }
}
