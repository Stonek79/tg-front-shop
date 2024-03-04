'use client'

import styles from "./Header.module.css";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {Button} from "@/components/Button/Button";
import {useRouter} from "next/navigation";

export const Header = () => {
    const router = useRouter()
    const {tg, loaded} = useTgApp()

    const onClose = () => {
        tg.close()
    }

    const onToggle = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    // TODO fix sticky header
    return (
        <nav className={styles.header}>
            <Button onClick={() => router.push('/')}>Main</Button>
            {loaded && <span className={styles.username}>{tg.initDataUnsafe?.user?.username}</span>}
            <Button className={styles.button} onClick={onToggle}>Toggle</Button>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={() => router.push('/products')}>Products</Button>
        </nav>
    );
};
