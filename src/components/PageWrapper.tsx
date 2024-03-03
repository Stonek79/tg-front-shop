'use client'

import {ReactNode, useEffect} from "react";
import {useTgApp} from "@/lib/hooks/useTgApp";

export const PageWrapper = ({ children }: { children?: ReactNode }) => {
const {tg} = useTgApp()

    useEffect(() => {
        tg.ready()
        return () => {
            tg.close()
        }
    })


    return <div className="page-wrapper">{children}</div>
}
