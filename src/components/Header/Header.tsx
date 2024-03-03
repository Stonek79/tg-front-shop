'use client'

import {ReactNode} from "react";
import styles from "./Header.module.css";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {CloseButton} from "@/components/Button/CloseButton";
import {Button} from "@/components/Button/Button";
import Link from "next/link";

export const Header = () => {
    const {tg, loaded} = useTgApp()

    const onToggle = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return (
        <nav className={styles.header}>
            <Button>
                <Link style={{ textDecoration: 'none' }} href={'/'}>Main</Link>
            </Button>
            {loaded && <span className={styles.username}>{tg.initDataUnsafe?.user?.username}</span>}
            <button className={styles.button} onClick={onToggle}>Toggle</button>
            <CloseButton name={'Close'}/>
            <Button>
                <Link style={{ textDecoration: 'none' }} href={'/products'}>Products</Link>
            </Button>
        </nav>
    );
};
