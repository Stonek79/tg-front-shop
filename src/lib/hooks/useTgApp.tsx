'use client'

import {useEffect, useState} from "react";

export const useTgApp = () => {
    const [tg, setTg] = useState<any>()
    useEffect(() => {
        // @ts-ignore
        const tgApp = window?.Telegram?.WebApp

        setTg(tgApp)
    }, [])

    return { tg }
}
