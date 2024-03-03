'use client'

import {useTgApp} from "@/lib/hooks/useTgApp";
import styles from './Button.module.css'

interface CloseButtonProps {
    name: string
}
export const CloseButton = (props: CloseButtonProps) => {
    const {name } = props
    const {tg} = useTgApp()

    const onClose = () => {
        tg.close()
    }

    return <button className={styles.button} onClick={onClose}>{name}</button>
}
