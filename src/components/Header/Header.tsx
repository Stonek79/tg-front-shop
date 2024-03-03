'use client'

import {ReactNode} from "react";
import styles from "./Header.module.css";
import {useTgApp} from "@/lib/hooks/useTgApp";

interface HeaderProps {
    children?: ReactNode
}
export const Header = (props: HeaderProps) => {
    const {children} = props
    const {tg, loaded} = useTgApp()

    const onToggle = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return (
        <div className={styles.header}>
            {children}
            {loaded && <span className={styles.username}>{tg.initDataUnsafe?.user?.username}</span>}
            <button className={styles.button} onClick={onToggle}>Toggle</button>
        </div>
    );
};
