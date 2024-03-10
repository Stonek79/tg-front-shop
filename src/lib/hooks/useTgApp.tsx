'use client'

import {useEffect, useState} from "react";

export const useTgApp = () => {
    const [tg, setTg] = useState<any>({})
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        // @ts-ignore
        const tgApp = window?.Telegram?.WebApp

        if (tgApp) {
            setTg(tgApp)
            setLoaded(true)

            tgApp.ready()
            tgApp.expand()
        }
    }, [])

    return { tg, loaded, queryId: tg?.initDataUnsafe?.query_id, }
}
