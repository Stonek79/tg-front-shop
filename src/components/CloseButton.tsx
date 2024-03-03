'use client'

import {useTgApp} from "@/lib/hooks/useTgApp";

interface CloseButtonProps {
    name: string
}
export const CloseButton = (props: CloseButtonProps) => {
    const {name } = props
    const {tg} = useTgApp()

    const onClose = () => {
        tg.close()
    }

    return <button className="close-button" onClick={onClose}>{name}</button>
}
