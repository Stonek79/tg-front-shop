'use client'

import {useEffect, useState} from "react";


export const useTgApp = () => {
    const [tg, setTg] = useState<any>({})
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        // @ts-ignore
        const tgApp = window?.Telegram?.WebApp

        console.log(tgApp, 'EFFECT')
        if (tgApp) {
            setTg(tgApp)
            setLoaded(true)

            tgApp.ready()
            console.log(tgApp?.initDataUnsafe?.user?.username);
        }
    }, [])

    return { tg, loaded }
}
