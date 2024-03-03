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

    if (loaded) {
        console.log( tg.initDataUnsafe, loaded, 'HEADER')
    }

    return (
        <div className={styles.header}>
            {children}
            {loaded && <span className={styles.username}>{tg.initDataUnsafe?.user?.username}</span>}
        </div>
    );
};
